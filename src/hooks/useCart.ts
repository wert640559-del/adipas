// src/hooks/useCart.ts
import { useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('shopHub-cart');
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopHub-cart', JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (id: number, newQty: number) => {
    setItems(prev =>
      prev.map(item =>
        item.product.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(item => item.product.id !== id));
  };

  const clearCart = () => setItems([]);

  const getTotalPrice = () =>
    items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const getTotalItems = () =>
    items.reduce((acc, item) => acc + item.quantity, 0);

  return { 
    items, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  };
};