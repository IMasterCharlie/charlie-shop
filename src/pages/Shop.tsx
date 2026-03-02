import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '../data';
import ProductCard from '../components/shared/ProductCard';
import { SortOption } from '../types';
import { cn } from '../lib/utils';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = searchParams.get('category') || 'all';
  const isSaleOnly = searchParams.get('sale') === 'true';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (isSaleOnly) {
      result = result.filter(p => p.isSale);
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Assume default is newest (mocked by id)
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [activeCategory, isSaleOnly, sortBy, searchQuery]);

  const handleCategoryChange = (id: string) => {
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-zinc-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Explore Our Collection</h1>
            <p className="text-zinc-500">Showing {filteredProducts.length} premium products</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-zinc-200 rounded-2xl px-4 py-2.5 pl-10 focus:ring-2 focus:ring-emerald-500 outline-none w-64"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-white border border-zinc-200 px-6 py-2.5 rounded-2xl font-bold hover:bg-zinc-50 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-zinc-200 px-6 py-2.5 pr-10 rounded-2xl font-bold hover:bg-zinc-50 transition-colors outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className={cn(
            "lg:w-64 space-y-10 transition-all duration-300",
            isFilterOpen ? "block" : "hidden lg:block"
          )}>
            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg mb-6">Categories</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    activeCategory === 'all' ? "bg-emerald-600 text-white" : "hover:bg-white text-zinc-600"
                  )}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                      activeCategory === cat.id ? "bg-emerald-600 text-white" : "hover:bg-white text-zinc-600"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-60">{cat.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-lg mb-6">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-emerald-600" min="0" max="1000" />
                <div className="flex items-center justify-between text-sm font-bold text-zinc-600">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div>
              <h3 className="font-bold text-lg mb-6">Offers</h3>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                  isSaleOnly ? "bg-emerald-600 border-emerald-600" : "border-zinc-300 group-hover:border-emerald-500"
                )} onClick={() => {
                  if (isSaleOnly) searchParams.delete('sale');
                  else searchParams.set('sale', 'true');
                  setSearchParams(searchParams);
                }}>
                  {isSaleOnly && <X size={12} className="text-white" />}
                </div>
                <span className="text-sm font-medium text-zinc-600">Sale Products Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                    <Search size={32} className="text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-zinc-500 mb-8">Try adjusting your filters or search query.</p>
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setSearchQuery('');
                      setSortBy('newest');
                    }}
                    className="bg-zinc-900 text-white px-8 py-3 rounded-2xl font-bold transition-transform active:scale-95"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
