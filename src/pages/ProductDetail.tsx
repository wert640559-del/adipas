import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart(); 

  const product = products.find(p => p.id === parseInt(id || ''));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground">Product Not Found</h2>
          <p className="text-muted-foreground text-lg">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/products">
            <Button size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // Simulasi multiple images

   // Di ProductDetail.tsx - tanpa mengubah CartContext
const handleAddToCart = () => {
  if (product) {
    console.log('🛒 ProductDetail: Adding to cart:', product.title, quantity);
    
    try {
      // Tambahkan produk sebanyak quantity kali
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Alert untuk feedback
      alert(`✅ ${product.title} (${quantity} ${quantity === 1 ? 'item' : 'items'}) added to cart!`);
      
      // Reset quantity setelah berhasil ditambahkan
      setQuantity(1);
      
      console.log('🛒 ProductDetail: Add to cart completed');
        } catch (error) {
          console.error('❌ ProductDetail: Error adding to cart:', error);
          alert('❌ Failed to add product to cart. Please try again.');
        }
      } else {
        console.error('❌ ProductDetail: Cannot add to cart - product is null');
      }
    };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted/20 border">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 bg-muted/20 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-lg">{product.rating.rate}</span>
                  </div>
                  <span className="text-muted-foreground">({product.rating.count} reviews)</span>
                </div>
                <span className="text-lg font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold text-primary">${product.price}</span>
                <span className="text-lg text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Save 20%
                </span>
              </div>
            </div>

            <p className="text-lg text-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 h-14 text-lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-3" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="h-14 w-14">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">30-day guarantee</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">Protected by SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{product.rating.rate}</span>
                    <span className="text-muted-foreground">({product.rating.count})</span>
                  </div>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-medium">#{product.id.toString().padStart(6, '0')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Free standard shipping on orders over $50</p>
                <p>• Express delivery available for $9.99</p>
                <p>• 30-day easy return policy</p>
                <p>• 1-year manufacturer warranty</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;