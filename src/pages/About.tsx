import React from 'react';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Target, 
  Globe, 
  Heart, 
  ArrowRight,
  ShoppingCart,
  Clock,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate(); // Tambahkan hook ini

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Visionary leader with 10+ years in e-commerce'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      description: 'Tech enthusiast driving innovation'
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      description: 'Product expert ensuring quality'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide the best shopping experience with quality products and exceptional customer service.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, innovation, and customer satisfaction are at the core of everything we do.'
    },
    {
      icon: Globe,
      title: 'Our Vision',
      description: 'To become the most trusted e-commerce platform globally by 2025.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: Users },
    { number: '500+', label: 'Products', icon: ShoppingCart },
    { number: '95%', label: 'Satisfaction Rate', icon: Star },
    { number: '24/7', label: 'Customer Support', icon: Clock }
  ];

  // Handle onClick untuk navigasi
  const handleShopNow = () => {
    navigate('/products');
  };

  const handleExploreProducts = () => {
    navigate('/products');
  };

  const handleLearnMore = () => {
    // Bisa diarahkan ke section tertentu atau halaman lain
    // Untuk sementara, arahkan ke products juga
    navigate('/products');
  };

  const handleContactUs = () => {
    // Untuk sementara, arahkan ke products
    // Nanti bisa diganti dengan halaman contact jika ada
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About ShopHub
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're revolutionizing the way people shop online. With a commitment to quality, 
              innovation, and customer satisfaction, we've become a trusted destination for millions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleShopNow}>
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleLearnMore}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering exceptional value through innovation, 
              quality, and outstanding customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="border">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate professionals dedicated to making your shopping experience exceptional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-muted">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <div className="text-muted-foreground font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border bg-muted">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Shopping?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover amazing products today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleExploreProducts}>
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={handleContactUs}>
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;