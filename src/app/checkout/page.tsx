"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems, clearCart, updateCartItemQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  // Shipping info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Canada");

  // Payment info
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const provincesCanada = [
    "Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador",
    "Nova Scotia","Ontario","Prince Edward Island","Quebec","Saskatchewan"
  ];

  // Load saved shipping info
  useEffect(() => {
    const saved = localStorage.getItem("shippingInfo");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setEmail(data.email || "");
      setAddress1(data.address1 || "");
      setAddress2(data.address2 || "");
      setCity(data.city || "");
      setProvince(data.province || "");
      setPostalCode(data.postalCode || "");
      setPhone(data.phone || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({ name, email, address1, address2, city, province, postalCode, phone, country })
    );
  }, [name, email, address1, address2, city, province, postalCode, phone, country]);

  const handleNextStep = () => {
    if (currentStep === 1 && (!name || !email || !address1 || !city || !province || !postalCode || !phone)) {
      showToast("Please fill all required shipping details!");
      return;
    }
    if (currentStep === 2 && (!cardName || !cardNumber || !cardExpiry || !cardCVC)) {
      showToast("Please fill all payment details!");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    showToast("Order placed successfully!");
  };

  const steps = ["Shipping", "Payment", "Review"];

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Your cart is empty</h1>
        <Link href="/shop">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {orderPlaced ? (
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-700 mb-6">Thank you for your purchase, {name}. Your items are on the way!</p>
          <Link href="/shop">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Steps and Forms */}
          <div className="md:col-span-2 space-y-6">
            {/* Clickable Step Bar */}
            <div className="flex justify-between items-center mb-6">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col items-center relative cursor-pointer" onClick={() => setCurrentStep(index+1)}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                    ${currentStep === index+1 ? "bg-indigo-600" : currentStep > index+1 ? "bg-green-600" : "bg-gray-300"}`}>
                    {index+1}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${currentStep === index+1 ? "text-indigo-600" : "text-gray-500"}`}>{step}</span>
                  {index < 2 && <div className={`absolute top-3 left-1/2 w-full h-1 -translate-x-1/2 z-0
                    ${currentStep > index+1 ? "bg-green-600" : "bg-gray-300"}`}></div>}
                </div>
              ))}
            </div>

            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
                <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <input type="text" placeholder="Address Line 1" value={address1} onChange={e=>setAddress1(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <input type="text" placeholder="Address Line 2 (Optional)" value={address2} onChange={e=>setAddress2(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <input type="text" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <select value={province} onChange={e=>setProvince(e.target.value)} className="w-full border rounded-lg px-4 py-2">
                  <option value="">Select Province</option>
                  {provincesCanada.map(p=> <option key={p} value={p}>{p}</option>)}
                </select>
                <input type="text" placeholder="Postal Code" value={postalCode} onChange={e=>setPostalCode(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <input type="text" placeholder="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <div className="flex justify-between mt-4">
                  <div/>
                  <button onClick={handleNextStep} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">Next</button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <input type="text" placeholder="Cardholder Name" value={cardName} onChange={e=>setCardName(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} className="w-full border rounded-lg px-4 py-2"/>
                <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={e=>setCardExpiry(e.target.value)} className="border rounded-lg px-4 py-2 flex-1"/>
                  <input type="text" placeholder="CVC" value={cardCVC} onChange={e=>setCardCVC(e.target.value)} className="border rounded-lg px-4 py-2 flex-1"/>
                </div>
                <div className="flex justify-between mt-4">
                  <button onClick={handlePrevStep} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 transition">Back</button>
                  <button onClick={handleNextStep} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">Next</button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Review Order</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded shadow-sm">
                      <div className="flex items-center gap-3">
                        {item.image && <Image src={item.image} alt={item.name} width={50} height={50} className="rounded object-cover"/>}
                        <p className="font-medium">{item.name} x {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price*item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <button onClick={handlePrevStep} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 transition">Back</button>
                  <button onClick={handlePlaceOrder} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Place Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="bg-gray-50 shadow-md rounded-lg p-6 sticky top-20">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    {item.image && <Image src={item.image} alt={item.name} width={40} height={40} className="rounded object-cover"/>}
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm font-semibold">${(item.price*item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-2"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between mb-2"><span>Tax (13%):</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between mb-4 text-lg font-bold"><span>Total:</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
