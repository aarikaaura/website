// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    console.log('Received contact form submission:', { name, email, subject });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Email transporter verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email to business
    const businessMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #7c3aed; }
                .message { background: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #7c3aed; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>New Contact Form Submission</h1>
                <p>Aarika Aura Website</p>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">Name:</span> ${name}
                </div>
                <div class="field">
                    <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                </div>
                <div class="field">
                    <span class="label">Subject:</span> ${subject}
                </div>
                <div class="field">
                    <span class="label">Message:</span>
                    <div class="message">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                    <p>This email was sent from your website contact form at ${new Date().toLocaleString()}.</p>
                    <p>You can reply directly to this email to respond to ${name}.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Aarika Aura!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
                .message { background: white; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #7c3aed; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
                <p>Dear <strong>${name}</strong>,</p>
                
                <p>Thank you for reaching out to Aarika Aura! We have received your message and will get back to you within 24 hours.</p>
                
                <div class="message">
                    <strong>Your Message:</strong><br>
                    ${message.replace(/\n/g, '<br>')}
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Our team will review your inquiry</li>
                    <li>We'll respond to ${email} within 24 hours</li>
                    <li>For urgent matters, you can call us at +1 (123) 456-7890</li>
                </ul>
                
                <div class="footer">
                    <p>Best regards,<br>The Aarika Aura Team</p>
                    <p>Email: hello@aarikaaura.com<br>Phone: +1 (123) 456-7890</p>
                    <p><em>This is an automated confirmation. Please do not reply to this email.</em></p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(businessMailOptions);
    console.log('Business email sent successfully');

    await transporter.sendMail(userMailOptions);
    console.log('Confirmation email sent to user');

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email service configuration error. Please check your email credentials.';
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Unable to connect to email service. Please try again later.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}