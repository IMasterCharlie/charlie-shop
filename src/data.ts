import { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'men', name: "Men's Clothes", image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800', icon: '👕' },
  { id: 'women', name: "Women's Clothes", image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800', icon: '👗' },
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800', icon: '📱' },
  { id: 'toys', name: 'Toys', image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800', icon: '🧸' },
  { id: 'gifts', name: 'Gifts', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', icon: '🎁' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', icon: '👟' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    description: 'A timeless classic made from 100% genuine leather. Perfect for any occasion.',
    price: 129.99,
    mrp: 249.99,
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800',
    category: 'men',
    rating: 4.8,
    reviews: 124,
    isSale: true,
    discount: 48,
    gallery: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    name: 'Silk Evening Gown',
    description: 'Elegant silk gown with a flowing silhouette. Ideal for formal events.',
    price: 189.99,
    mrp: 399.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    category: 'women',
    rating: 4.9,
    reviews: 89,
    isNew: true,
    discount: 52
  },
  {
    id: '3',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Experience pure sound with our latest noise-cancelling technology.',
    price: 199.99,
    mrp: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'electronics',
    rating: 4.7,
    reviews: 2150,
    isSale: true,
    discount: 33
  },
  {
    id: '4',
    name: 'Smart Watch Pro',
    description: 'Track your fitness, sleep, and heart rate with precision.',
    price: 149.99,
    mrp: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    category: 'electronics',
    rating: 4.5,
    reviews: 560,
    discount: 25
  },
  {
    id: '5',
    name: 'Vintage Camera',
    description: 'Capture memories with a classic feel. Fully functional film camera.',
    price: 89.99,
    mrp: 120.00,
    image: 'https://images.unsplash.com/photo-1526170315870-ef6826b351ad?auto=format&fit=crop&q=80&w=800',
    category: 'electronics',
    rating: 4.6,
    reviews: 45,
    isNew: true,
    discount: 25
  },
  {
    id: '6',
    name: 'Handmade Ceramic Vase',
    description: 'Beautifully crafted ceramic vase to add a touch of art to your home.',
    price: 45.00,
    mrp: 60.00,
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
    category: 'gifts',
    rating: 4.8,
    reviews: 32,
    discount: 25
  },
  {
    id: '7',
    name: 'Classic White Sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear.',
    price: 59.99,
    mrp: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'accessories',
    rating: 4.4,
    reviews: 890,
    isSale: true,
    discount: 33
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    description: 'Protect your eyes with style. UV protection included.',
    price: 120.00,
    mrp: 180.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    category: 'accessories',
    rating: 4.7,
    reviews: 120,
    discount: 33
  },
  {
    id: '9',
    name: 'Wooden Building Blocks',
    description: 'Safe and educational toy for children of all ages.',
    price: 29.99,
    mrp: 45.00,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    category: 'toys',
    rating: 4.9,
    reviews: 156,
    isNew: true,
    discount: 33
  },
  {
    id: '10',
    name: 'Luxury Perfume',
    description: 'A captivating scent that lasts all day.',
    price: 75.00,
    mrp: 110.00,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    category: 'gifts',
    rating: 4.6,
    reviews: 230,
    discount: 32
  }
];
