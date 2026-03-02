import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SaleBanners = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const banners = [
    {
      title: "🔥 Big Sale",
      subtitle: "Summer Collection",
      offer: "Flat 50% OFF",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "💥 Super Offer",
      subtitle: "Tech Gadgets",
      offer: "Up to 40% OFF",
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "🎉 Festive Dhamaka",
      subtitle: "Home & Gifts",
      offer: "Buy 1 Get 1",
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-20 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        {/* Countdown Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">⚡ Limited Time Deals</h2>
            <p className="text-zinc-500">Hurry up! These offers won't last forever.</p>
          </div>
          <div className="flex items-center space-x-4">
            {[
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="bg-zinc-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold mb-1">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest mb-4">
                  {banner.subtitle}
                </span>
                <h3 className="text-3xl font-bold mb-2">{banner.title}</h3>
                <p className="text-emerald-400 font-bold text-xl">{banner.offer}</p>
              </div>
              <div className="absolute top-8 right-8">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-zinc-900 font-bold text-xs shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  SALE!
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleBanners;
