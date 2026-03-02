import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-40 pb-24 px-6 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Placed!</h1>
          <p className="text-zinc-500 mb-10">Thank you for your purchase. Your order #CS-12345 has been confirmed and will be shipped soon.</p>
          <Link
            to="/"
            className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold transition-transform active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-zinc-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-zinc-100">
              {/* Steps */}
              <div className="flex items-center justify-between mb-12 max-w-md mx-auto">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
                      step >= s ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-400"
                    )}>
                      {s}
                    </div>
                    {s < 3 && <div className={cn("flex-grow h-1 mx-4 rounded-full", step > s ? "bg-emerald-600" : "bg-zinc-100")} />}
                  </React.Fragment>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Truck className="text-emerald-600" /> Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">First Name</label>
                      <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Last Name</label>
                      <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Doe" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Address</label>
                      <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="123 Street Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">City</label>
                      <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Zip Code</label>
                      <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="10001" />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-12 w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-600 transition-all"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <CreditCard className="text-emerald-600" /> Payment Method
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-emerald-600 rounded-[2rem] bg-emerald-50/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <CreditCard className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">Credit / Debit Card</p>
                          <p className="text-xs text-zinc-500">Secure encrypted payment</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-4 border-emerald-600 bg-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Card Number</label>
                      <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Expiry Date</label>
                        <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">CVV</label>
                        <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-12">
                    <button onClick={() => setStep(1)} className="flex-grow bg-zinc-100 text-zinc-600 py-5 rounded-2xl font-bold">Back</button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-[2] bg-zinc-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-600 transition-all"
                    >
                      <span>Review Order</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <ShieldCheck className="text-emerald-600" /> Review Your Order
                  </h2>
                  <div className="space-y-6 mb-12">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-4 border-b border-zinc-50">
                        <div className="flex items-center gap-4">
                          <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                          <div>
                            <p className="font-bold text-zinc-900">{item.name}</p>
                            <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-grow bg-zinc-100 text-zinc-600 py-5 rounded-2xl font-bold">Back</button>
                    <button
                      onClick={() => setIsCompleted(true)}
                      className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20"
                    >
                      <span>Place Order {formatPrice(total)}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-bold text-zinc-900">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Tax</span>
                  <span className="font-bold text-zinc-900">{formatPrice(tax)}</span>
                </div>
                <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                  <span className="font-bold text-zinc-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Secure Checkout</p>
                <p className="text-xs text-zinc-500">Your data is protected by industry-standard SSL encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
