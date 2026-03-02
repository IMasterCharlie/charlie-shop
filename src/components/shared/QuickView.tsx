import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, cn } from '../../lib/utils';

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="md:w-1/2 aspect-[4/5] md:aspect-auto bg-zinc-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 block">{product.category}</span>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={cn("fill-yellow-400 text-yellow-400", i >= Math.floor(product.rating) && "fill-zinc-200 text-zinc-200")} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-zinc-400">({product.reviews} Reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-3 mb-8">
                <span className="text-3xl font-bold text-zinc-900">{formatPrice(product.price)}</span>
                {product.mrp > product.price && (
                  <span className="text-lg text-zinc-400 line-through">{formatPrice(product.mrp)}</span>
                )}
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mb-10 line-clamp-4">
                {product.description}
              </p>

              <div className="mt-auto flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-grow bg-zinc-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-all active:scale-95"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "p-4 rounded-2xl transition-all active:scale-95",
                    isWishlisted ? "bg-pink-500 text-white" : "bg-zinc-100 text-zinc-400 hover:text-pink-500"
                  )}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickView;
