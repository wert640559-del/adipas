// src/contexts/ProductContext.tsx
import React, { createContext, useContext, useState, type ReactNode, useCallback, useMemo } from 'react';
import type { Product, ProductState } from '../types';

// Tambahkan interface untuk filter
interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

interface ExtendedProductState extends ProductState {
  filters: FilterState;
  categories: string[];
  updateFilters: (newFilters: Partial<FilterState>) => void;
  clearFilters: () => void;
  isAnyFilterActive: boolean;
}

const ProductContext = createContext<ExtendedProductState | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk filter
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0
  });

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = products.map(product => product.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [products]);

  // Check if any filter is active
  const isAnyFilterActive = useMemo(() => {
    return filters.category !== 'all' || 
           filters.minPrice > 0 || 
           filters.maxPrice < 1000 || 
           filters.minRating > 0;
  }, [filters]);

  // Apply search and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    filtered = filtered.filter(product => {
      // Filter category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Filter price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      
      // Filter rating
      if (product.rating.rate < filters.minRating) {
        return false;
      }
      
      return true;
    });

    return filtered;
  }, [products, searchQuery, filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0
    });
  }, []);

  // Existing functions...
  const addProduct = useCallback((productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now()
    };
    setLocalProducts(prev => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: number, productData: Partial<Product>) => {
    setLocalProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setLocalProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // const allProducts = useMemo(() => {
  //   return [...products, ...localProducts];
  // }, [products, localProducts]);

  const value: ExtendedProductState = {
    products: filteredProducts,
    localProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    updateProduct,
    deleteProduct,
    // Filter related
    filters,
    categories,
    updateFilters,
    clearFilters,
    isAnyFilterActive
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};