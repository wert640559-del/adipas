// src/components/products/ProductCard.tsx
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import type { Product } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { Edit, Trash2, Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

const ProductCard = memo<ProductCardProps>(({ product, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [showAddButton, setShowAddButton] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🛒 ProductCard: Add to cart clicked for:', product.title);
    
    // Panggil addToCart dari context
    addToCart(product);
    
    // Feedback visual
    setShowAddButton(false);
    
    // Optional: Show toast notification
    console.log('✅ Product added to cart:', product.title);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 border"
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => setShowAddButton(false)}
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Quick Actions Overlay */}
          <div className={`absolute inset-x-2 bottom-2 transition-all duration-300 ${
            showAddButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-background border hover:bg-primary hover:text-primary-foreground text-foreground shadow-md"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
            {product.category}
          </span>
          {isAuthenticated && onEdit && onDelete && (
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(product);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(product.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.rating.count})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ${product.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/products/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;