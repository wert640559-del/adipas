export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ProductState {
  products: Product[];
  localProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void; // quantity optional
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

export interface ExtendedProductState extends ProductState {
  filters: FilterState;
  categories: string[];
  updateFilters: (newFilters: Partial<FilterState>) => void;
  clearFilters: () => void;
  isAnyFilterActive: boolean;
}