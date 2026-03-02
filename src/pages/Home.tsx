import React from 'react';
import { motion } from 'motion/react';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import SaleBanners from '../components/home/SaleBanners';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      <Hero />
      <SaleBanners />
      <CategorySection />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
