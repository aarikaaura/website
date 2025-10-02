// src/app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Shield, 
  Truck, 
  ArrowRight, 
  Users, 
  Globe, 
  Award,
  Star,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Empowering women through fashion that celebrates individuality, 
            confidence, and timeless elegance.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to Aarika Aura
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025, Aarika Aura emerged from a simple belief: every woman 
                deserves to feel beautiful, confident, and empowered in what she wears. 
                Our journey began with a small collection of carefully curated pieces 
                and has grown into a beloved destination for women seeking quality, 
                style, and authenticity.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We partner with ethical manufacturers and independent designers who 
                share our commitment to quality craftsmanship and sustainable practices. 
                Each piece in our collection is chosen with intention, designed to 
                become a cherished part of your wardrobe.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/shop" 
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/about-1.jpg"
                    alt="Our fashion collection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/about-2.jpg"
                    alt="Quality craftsmanship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/about-3.jpg"
                    alt="Sustainable fashion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/about-4.jpg"
                    alt="Customer satisfaction"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Aarika Aura
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
              >
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Commitment</h2>
              <p className="text-lg text-gray-300 mb-8">
                We're dedicated to creating a positive impact through our business 
                practices and community involvement.
              </p>
              
              <div className="space-y-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{commitment.title}</h4>
                      <p className="text-gray-300">{commitment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 text-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Us</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Aarika Aura
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="w-48 h-48 mx-auto relative rounded-full overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Join the Aarika Aura Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover fashion that makes you feel confident, beautiful, and authentically you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/shop" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Start Shopping
            </Link>
            <Link 
              href="/contact" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition font-semibold"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Data
const values = [
  {
    icon: Heart,
    title: "Quality First",
    description: "We meticulously select every piece in our collection, ensuring exceptional quality, comfort, and durability that lasts beyond trends."
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Your satisfaction is our priority. We're dedicated to providing exceptional service and building lasting relationships with our community."
  },
  {
    icon: Globe,
    title: "Sustainable Practices",
    description: "We're committed to ethical manufacturing, sustainable materials, and reducing our environmental footprint at every step."
  }
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Curated Products" },
  { value: "50+", label: "Design Partners" },
  { value: "24/7", label: "Customer Support" }
];

const commitments = [
  {
    title: "Ethical Manufacturing",
    description: "Partnering with factories that ensure fair wages and safe working conditions."
  },
  {
    title: "Sustainable Materials",
    description: "Increasing our use of organic, recycled, and eco-friendly fabrics each year."
  },
  {
    title: "Community Support",
    description: "Giving back through donations and supporting women's empowerment programs."
  },
  {
    title: "Carbon Neutral Shipping",
    description: "Offsetting our carbon footprint through environmental initiatives."
  }
];

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every piece meets our strict quality standards"
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free shipping on orders over $50"
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your data and payments are always protected"
  },
  {
    icon: Star,
    title: "Curated Collections",
    description: "Handpicked styles that complement each other"
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    image: "/team-1.jpg",
    bio: "With over 10 years in fashion retail, Sarah founded Aarika Aura to create a brand that celebrates authentic feminine beauty."
  },
  {
    name: "Maya Rodriguez",
    role: "Creative Director",
    image: "/team-2.jpg",
    bio: "Maya brings her expertise from luxury fashion houses to curate collections that blend trend-forward with timeless elegance."
  },
  {
    name: "James Wilson",
    role: "Operations Manager",
    image: "/team-3.jpg",
    bio: "James ensures our operations run smoothly while maintaining our commitment to sustainability and ethical practices."
  }
];