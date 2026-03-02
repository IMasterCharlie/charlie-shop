import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-zinc-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-5xl font-bold tracking-tight mb-6">Get in Touch</h1>
          <p className="text-zinc-500 text-lg">Have a question or need assistance? Our team is here to help you 24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-zinc-500 text-sm mb-4">Our support team will get back to you within 24 hours.</p>
              <a href="mailto:support@charlieshop.com" className="text-emerald-600 font-bold hover:underline">support@charlieshop.com</a>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-zinc-500 text-sm mb-4">Available Mon-Fri, 9am - 6pm EST.</p>
              <a href="tel:+15550000000" className="text-blue-600 font-bold hover:underline">+1 (555) 000-0000</a>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-zinc-500 text-sm mb-4">123 Commerce St, Digital City, DC 12345</p>
              <a href="#" className="text-orange-600 font-bold hover:underline">Get Directions</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-zinc-100">
              <h2 className="text-3xl font-bold mb-10">Send us a Message</h2>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Subject</label>
                  <input type="text" className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Message</label>
                  <textarea rows={6} className="w-full bg-zinc-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Your message here..."></textarea>
                </div>
                <button className="bg-zinc-900 text-white px-12 py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-zinc-900/10">
                  <span>Send Message</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
