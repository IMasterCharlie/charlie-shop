import React from 'react';
import { motion } from 'motion/react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Redefining the Future of Shopping.</h1>
          <p className="text-lg text-zinc-500 leading-relaxed">
            Charlie's Shop started with a simple idea: to create an e-commerce experience that feels as premium as the products we sell. We believe in quality, transparency, and exceptional service.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { icon: <Users />, label: 'Happy Customers', value: '500K+' },
            { icon: <Award />, label: 'Quality Awards', value: '25+' },
            { icon: <Globe />, label: 'Global Offices', value: '12' },
            { icon: <Heart />, label: 'Team Members', value: '150+' },
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-50 p-10 rounded-[2.5rem] text-center">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-emerald-600">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-zinc-900 mb-2">{stat.value}</h3>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="rounded-[3rem] overflow-hidden aspect-square">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
              alt="Our Team"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-zinc-600 leading-relaxed mb-6 text-lg">
              We are on a mission to empower consumers by providing access to high-quality products from around the world. We curate every item in our shop to ensure it meets our rigorous standards for design, functionality, and durability.
            </p>
            <p className="text-zinc-600 leading-relaxed text-lg">
              Whether you're looking for the latest tech gadgets, timeless fashion pieces, or unique gifts for your loved ones, Charlie's Shop is your destination for excellence.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
