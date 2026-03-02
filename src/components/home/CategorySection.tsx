import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { categories } from '../../data';

const CategorySection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Shop by Category</h2>
            <p className="text-zinc-500 max-w-md">Explore our wide range of products across various categories tailored for you.</p>
          </div>
          <Link to="/shop" className="text-emerald-600 font-bold hover:underline">View All Categories</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${category.id}`}
                className="group block text-center"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-zinc-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold shadow-lg">Explore</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className="font-bold text-sm text-zinc-900">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
