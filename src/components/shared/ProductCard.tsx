import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'motion/react';
import { formatPrice, cn } from '../../lib/utils';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  return (
    <>
      <div className="group relative bg-white rounded-[2rem] p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-200/50 border border-zinc-100">
        {/* Badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-orange-500/20">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={cn(
            "absolute top-6 right-6 z-10 p-2.5 rounded-full shadow-lg transition-all active:scale-90",
            isWishlisted ? "bg-pink-500 text-white" : "bg-white text-zinc-400 hover:text-pink-500"
          )}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Image Container */}
        <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-zinc-50 mb-6 cursor-pointer" onClick={() => setIsQuickViewOpen(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye size={20} className="text-zinc-900" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-zinc-600">{product.rating}</span>
            </div>
          </div>
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-zinc-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-zinc-900">{formatPrice(product.price)}</span>
              {product.mrp > product.price && (
                <span className="text-xs text-zinc-400 line-through">{formatPrice(product.mrp)}</span>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-zinc-900 text-white p-3 rounded-2xl transition-all hover:bg-emerald-600 active:scale-90 shadow-lg shadow-zinc-900/10"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
