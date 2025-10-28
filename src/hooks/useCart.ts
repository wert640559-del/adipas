import { useState } from 'react';
import type { CartItem, Product } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]); // ✅ tipe array pasti

   const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
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

  return { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems, addToCart };
};
