import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-24 px-6 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} className="text-zinc-300" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-zinc-500 mb-10">Looks like you haven't added anything to your cart yet. Start exploring our collection!</p>
          <Link
            to="/shop"
            className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold transition-transform active:scale-95"
          >
            Go Shopping
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
        <h1 className="text-4xl font-bold tracking-tight mb-12">Shopping Cart ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col sm:flex-row items-center gap-6"
                >
                  <Link to={`/product/${item.id}`} className="w-32 h-32 rounded-2xl overflow-hidden bg-zinc-50 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </Link>
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-lg text-zinc-900 mb-1 hover:text-emerald-600 transition-colors">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest mb-4">{item.category}</p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                      <div className="flex items-center bg-zinc-100 rounded-xl px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-emerald-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-emerald-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-zinc-900">{formatPrice(item.price * item.quantity)}</p>
                    <p className="text-xs text-zinc-400 font-medium">{formatPrice(item.price)} each</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 sticky top-32">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-bold text-zinc-900">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-zinc-900">{formatPrice(tax)}</span>
                </div>
                <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-zinc-900">Total</span>
                  <span className="text-3xl font-bold text-emerald-600">{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all hover:bg-emerald-600 active:scale-95 shadow-xl shadow-zinc-900/10"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </Link>
              <div className="mt-8 pt-8 border-t border-zinc-100">
                <div className="flex items-center space-x-3 text-xs text-zinc-400">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center shrink-0">
                    <ShoppingBag size={18} />
                  </div>
                  <p>Free shipping on orders over $100. Easy 30-day returns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
