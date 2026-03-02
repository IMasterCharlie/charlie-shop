export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  specs?: Record<string, string>;
  gallery?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating';
