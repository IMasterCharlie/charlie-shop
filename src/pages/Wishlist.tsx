import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

const Wishlist = () => {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-24 px-6 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} className="text-pink-200" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-zinc-500 mb-10">Save items you love to your wishlist and they'll appear here. Start browsing now!</p>
          <Link
            to="/shop"
            className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold transition-transform active:scale-95"
          >
            Explore Products
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
        <h1 className="text-4xl font-bold tracking-tight mb-12">My Wishlist ({items.length})</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[2rem] p-4 border border-zinc-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-zinc-50 mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-red-500 transition-colors shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="px-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-zinc-900 mb-2 hover:text-emerald-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-lg font-bold text-zinc-900 mb-6">{formatPrice(product.price)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-zinc-900 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-all active:scale-95"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;
