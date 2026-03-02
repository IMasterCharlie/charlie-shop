import React from 'react';
import { motion } from 'motion/react';
import { products } from '../../data';
import ProductCard from '../shared/ProductCard';

const FeaturedProducts = () => {
  const featured = products.slice(0, 8);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Trending Now</h2>
          <p className="text-zinc-500 max-w-lg mx-auto">Discover our most popular products this week. Handpicked quality for your lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
