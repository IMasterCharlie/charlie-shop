import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, cn } from '../lib/utils';
import ProductCard from '../components/shared/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = useMemo(() => products.find(p => p.id === id), [id]);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-emerald-600 font-bold mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const images = product.gallery || [product.image];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-12">
          <Link to="/" className="hover:text-zinc-900">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-zinc-900">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-zinc-900">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-zinc-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-50 border border-zinc-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex space-x-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                      selectedImage === idx ? "border-emerald-600 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                In Stock
              </span>
              <div className="flex space-x-2">
                <button className="p-3 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors">
                  <Share2 size={20} className="text-zinc-600" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "p-3 rounded-full transition-all active:scale-90",
                    isWishlisted ? "bg-pink-500 text-white" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                  )}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={cn(
                      "fill-yellow-400 text-yellow-400",
                      i >= Math.floor(product.rating) && "fill-zinc-200 text-zinc-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-500">{product.rating} ({product.reviews} Reviews)</span>
            </div>

            <div className="flex items-baseline space-x-4 mb-10">
              <span className="text-4xl font-bold text-zinc-900">{formatPrice(product.price)}</span>
              {product.mrp > product.price && (
                <span className="text-xl text-zinc-400 line-through font-medium">{formatPrice(product.mrp)}</span>
              )}
              {product.discount && (
                <span className="text-emerald-600 font-bold text-lg">{product.discount}% OFF</span>
              )}
            </div>

            <p className="text-zinc-600 leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center bg-zinc-100 rounded-2xl px-4 py-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:text-emerald-600 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:text-emerald-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(product);
                }}
                className="flex-grow bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all hover:bg-emerald-600 active:scale-95 shadow-xl shadow-zinc-900/10"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-zinc-100">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Truck size={20} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900">Free Delivery</p>
                  <p className="text-zinc-400">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <RotateCcw size={20} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900">30 Days Return</p>
                  <p className="text-zinc-400">Easy exchange policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900">Secure Payment</p>
                  <p className="text-zinc-400">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-24">
          <div className="flex border-b border-zinc-100 mb-10">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                  activeTab === tab ? "text-emerald-600" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="prose prose-zinc text-zinc-600 leading-relaxed">
                <p>{product.description}</p>
                <p className="mt-4">Our products are crafted with the highest attention to detail and quality. We believe in creating items that not only look great but also stand the test of time.</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(product.specs || {
                  Material: 'Premium Quality',
                  Weight: 'Lightweight',
                  Dimensions: 'Standard Size',
                  Warranty: '1 Year Limited'
                }).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-zinc-100">
                    <span className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest">{key}</span>
                    <span className="font-bold text-zinc-900">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  <button className="text-emerald-600 font-bold text-sm hover:underline">Write a Review</button>
                </div>
                {[1, 2].map(i => (
                  <div key={i} className="bg-zinc-50 p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-zinc-200 rounded-full" />
                        <div>
                          <p className="font-bold text-sm">Verified Customer</p>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400">2 days ago</span>
                    </div>
                    <p className="text-zinc-600 text-sm leading-relaxed">Absolutely love it! The quality exceeded my expectations. Shipping was fast too.</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
