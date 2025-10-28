// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react';
import type { CartItem, CartState, Product } from '../types';

// Debug identifier
const CART_DEBUG_ID = `cart-${Math.random().toString(36).substr(2, 9)}`;
console.log(`🆕 CartContext Instance Created: ${CART_DEBUG_ID}`);

const CartContext = createContext<CartState | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('shopHub-cart');
        console.log(`🔄 [${CART_DEBUG_ID}] Loading cart from localStorage:`, savedCart);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          console.log(`✅ [${CART_DEBUG_ID}] Parsed cart:`, parsed);
          return Array.isArray(parsed) ? parsed : [];
        }
      } catch (error) {
        console.error(`❌ [${CART_DEBUG_ID}] Error loading cart:`, error);
      }
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(`💾 [${CART_DEBUG_ID}] Saving ${items.length} items to localStorage:`, items);
      try {
        localStorage.setItem('shopHub-cart', JSON.stringify(items));
        console.log(`✅ [${CART_DEBUG_ID}] Cart saved successfully`);
      } catch (error) {
        console.error(`❌ [${CART_DEBUG_ID}] Error saving cart:`, error);
      }
    }
  }, [items]);

  // Add to cart - FIXED dengan functional update
 const addToCart = useCallback((product: Product, quantity: number = 1) => {
  console.log(`🛒 [${CART_DEBUG_ID}] ADD_TO_CART called with product:`, product.title, product.id, 'quantity:', quantity);
  
  setItems(prevItems => {
    console.log(`🔄 [${CART_DEBUG_ID}] setItems called with prevItems:`, prevItems);
    
    const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity jika product sudah ada
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      console.log(`📦 [${CART_DEBUG_ID}] Updated existing item. New cart:`, updatedItems);
      return updatedItems;
    } else {
      // Tambah product baru
      const newItem: CartItem = {
        product: product,
        quantity: quantity
      };
      const newItems = [...prevItems, newItem];
      console.log(`🆕 [${CART_DEBUG_ID}] Added new item. New cart:`, newItems);
      return newItems;
    }
  });
}, []); // Tetap tanpa dependencies

  const removeFromCart = useCallback((productId: number) => {
    console.log(`🗑️ [${CART_DEBUG_ID}] Removing item:`, productId);
    setItems(prevItems => {
      const updated = prevItems.filter(item => item.product.id !== productId);
      console.log(`✅ [${CART_DEBUG_ID}] After removal:`, updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    console.log(`🔢 [${CART_DEBUG_ID}] Update quantity:`, productId, 'to', quantity);
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => {
      const updated = prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      console.log(`✅ [${CART_DEBUG_ID}] After quantity update:`, updated);
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    console.log(`🧹 [${CART_DEBUG_ID}] Clearing cart`);
    setItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    const total = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    console.log(`💰 [${CART_DEBUG_ID}] Total price:`, total);
    return total;
  }, [items]);

  const getTotalItems = useCallback(() => {
    const total = items.reduce((total, item) => total + item.quantity, 0);
    console.log(`📊 [${CART_DEBUG_ID}] Total items:`, total);
    return total;
  }, [items]);

  const value: CartState = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  console.log(`🔄 [${CART_DEBUG_ID}] CartContext rendered with ${items.length} items`);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    console.error(`❌ useCart used outside CartProvider!`);
    throw new Error('useCart must be used within a CartProvider');
  }
  
  console.log(`🎯 [useCart] Called, items count: ${context.items.length}`);
  
  return context;
};