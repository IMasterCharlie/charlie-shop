import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

const Newsletter = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Join the Inner Circle</h2>
            <p className="text-zinc-400 mb-10 text-lg">
              Subscribe to our newsletter and get 15% off your first order. Be the first to know about new arrivals and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-95">
                <span>Subscribe</span>
                <Send size={18} />
              </button>
            </form>
            <p className="mt-6 text-xs text-zinc-500">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
