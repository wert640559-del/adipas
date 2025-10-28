import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  CheckCircle2,
  Truck,
} from 'lucide-react';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Indonesia'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart before checkout.</p>
          <Button onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been successfully placed and will be shipped soon.
          </p>
          <div className="space-y-4">
            <Button onClick={handleContinueShopping} className="w-full">
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')} className="w-full">
              Track Your Order
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground mt-2">
              Complete your purchase
            </p>
          </div>
          <Button variant="outline" onClick={handleBackToCart}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      placeholder="+62 812-3456-7890"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingChange}
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      placeholder="JOHN DOE"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="border sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Items ({getTotalItems()})</h4>
                    {items.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-8 h-8 object-contain"
                          />
                          <span className="line-clamp-1 flex-1">
                            {item.product.title}
                          </span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                        </div>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total</span>
                      <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground border-t pt-4">
                    <Shield className="h-4 w-4" />
                    Secure checkout · Encrypted
                  </div>

                  {/* Place Order Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Place Order · ${(getTotalPrice() * 1.1).toFixed(2)}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card className="border bg-muted/30">
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Secure Payment
                    </h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 256-bit SSL encryption</li>
                      <li>• PCI DSS compliant</li>
                      <li>• Your data is protected</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;