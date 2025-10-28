// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react';
import type { CartItem, CartState, Product } from '../types';

// Debug identifier untuk memastikan kita menggunakan instance yang sama
const CART_DEBUG_ID = Math.random().toString(36).substr(2, 9);
console.log('🔄 CartContext Instance ID:', CART_DEBUG_ID);

const CartContext = createContext<CartState | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage hanya sekali saat mount
  useEffect(() => {
    console.log('🔄 CartProvider MOUNTED - ID:', CART_DEBUG_ID);
    
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('shopHub-cart');
        console.log('📦 Loading cart from localStorage:', savedCart);
        
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            console.log('✅ Cart loaded successfully:', parsed.length, 'items');
            setItems(parsed);
          }
        }
      } catch (error) {
        console.error('❌ Error loading cart:', error);
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      console.log('💾 Saving cart to localStorage:', items);
      try {
        localStorage.setItem('shopHub-cart', JSON.stringify(items));
      } catch (error) {
        console.error('❌ Error saving cart:', error);
      }
    }
  }, [items, isInitialized]);

  const addToCart = useCallback((product: Product) => {
    console.log('🛒 ADD TO CART - Product:', product.title, 'ID:', product.id);
    console.log('🛒 Current items before add:', items);
    
    setItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const updated = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('📦 Updated existing item. New cart:', updated);
        return updated;
      }
      
      const newItems = [...prev, { product, quantity: 1 }];
      console.log('🆕 Added new item. New cart:', newItems);
      return newItems;
    });
  }, [items]);

  const removeFromCart = useCallback((productId: number) => {
    console.log('🗑️ REMOVE FROM CART:', productId);
    setItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      console.log('✅ Removed item. Remaining:', updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    console.log('🔢 UPDATE QUANTITY:', productId, quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prev => {
      const updated = prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      console.log('✅ Quantity updated. New cart:', updated);
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    console.log('🧹 CLEARING CART');
    setItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    const total = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    console.log('💰 Total price calculated:', total, 'for', items.length, 'items');
    return total;
  }, [items]);

  const getTotalItems = useCallback(() => {
    const total = items.reduce((total, item) => total + item.quantity, 0);
    console.log('📊 Total items calculated:', total, 'from', items.length, 'products');
    return total;
  }, [items]);

  const value: CartState = {
    items: isInitialized ? items : [],
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  console.log('🔄 CartContext RENDER - Initialized:', isInitialized, 'Items:', items.length, 'ID:', CART_DEBUG_ID);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    console.error('❌ useCart used outside CartProvider!');
    throw new Error('useCart must be used within a CartProvider');
  }
  
  console.log('🎯 useCart CALLED - Items:', context.items.length, 'Context ID:', CART_DEBUG_ID);
  
  return context;
};