import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-zinc-100">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl text-white"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6"
          >
            Dhamaka Sale – Up to 70% OFF
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
            Welcome to <br />
            <span className="text-emerald-400">CHARLIE'S</span> SHOP
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-lg leading-relaxed">
            Discover our curated collection of premium fashion, cutting-edge electronics, and unique gifts. Elevate your lifestyle today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="group flex items-center justify-center space-x-2 bg-white text-zinc-900 px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
            >
              <span>Shop Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/shop?sale=true"
              className="flex items-center justify-center bg-transparent border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10"
            >
              Explore Offers
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
