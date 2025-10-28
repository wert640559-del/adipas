// src/pages/Cart.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { type CartItem } from '../types';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [localStorageItems, setLocalStorageItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Check localStorage directly untuk debug
  useEffect(() => {
    console.log('=== CART PAGE DEBUG ===');
    console.log('🛒 Context items:', items);
    console.log('🛒 Context items length:', items.length);
    
    // Check localStorage langsung
    try {
      const savedCart = localStorage.getItem('shopHub-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        setLocalStorageItems(parsed);
      }
    } catch (error) {
      console.error('❌ Error reading localStorage:', error);
    }
    
    console.log('====================');
  }, [items]);

  // Fallback: Gunakan localStorage items jika context items kosong
  const displayItems = items.length > 0 ? items : localStorageItems;

  // Fixed event handlers - pastikan tidak ada event propagation issues
  const handleDecreaseQuantity = (productId: number, currentQuantity: number) => {
    console.log('Decreasing quantity for:', productId);
    updateQuantity(productId, currentQuantity - 1);
  };

  const handleIncreaseQuantity = (productId: number, currentQuantity: number) => {
    console.log('Increasing quantity for:', productId);
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleRemoveItem = (productId: number) => {
    console.log('Removing item:', productId);
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    console.log('Clearing cart');
    clearCart();
  };

  const handleContinueShopping = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Navigating to products');
    navigate('/products');
  };

  const handleProceedToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Proceeding to checkout');
    // Untuk sementara, redirect ke products dulu
    navigate('/products');
  };

  if (!displayItems || !Array.isArray(displayItems)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Error Loading Cart</h1>
            <p className="text-muted-foreground mt-2">Please try refreshing the page</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            
            {/* Gunakan Button dengan onClick daripada Link untuk testing */}
            <Button onClick={handleContinueShopping} size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleClearCart}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {displayItems.map((item) => (
              <Card key={item.product.id} className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 object-contain bg-muted rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize mb-2">
                        {item.product.category}
                      </p>
                      <div className="text-lg font-bold text-foreground">
                        ${item.product.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleDecreaseQuantity(item.product.id, item.quantity);
                          }}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleIncreaseQuantity(item.product.id, item.quantity);
                          }}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Total: <span className="font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          handleRemoveItem(item.product.id);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="border shadow-sm sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items ({getTotalItems()})</span>
                    <span className="text-foreground font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Gunakan Button dengan onClick daripada Link */}
                <Button onClick={handleProceedToCheckout} className="w-full" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* Gunakan Button dengan onClick daripada Link */}
                <Button onClick={handleContinueShopping} variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;