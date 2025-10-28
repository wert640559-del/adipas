import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '+623132212944';
    const message = `Halo Muhammad Harits, saya tertarik untuk berdiskusi lebih lanjut.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare WhatsApp message
    const phoneNumber = '+623132212944';
    const message = `*New Contact Form Submission*
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}

_Sent from Adipas Website_`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      description: '+62 813-2212-944',
      details: 'Available via WhatsApp'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'harits@adipas.com',
      details: 'We\'ll reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Indonesia',
      details: 'Serving customers nationwide'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'Mon - Fri: 9AM - 6PM',
      details: 'WIB (Western Indonesia Time)'
    }
  ];

  const subjectOptions = [
    'General Inquiry',
    'Product Support',
    'Partnership Opportunity',
    'Technical Issue',
    'Feedback & Suggestions',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Have questions about our products or need assistance? We're here to help. 
              Reach out to us through any of the channels below.
            </p>
            <Button size="lg" onClick={handleWhatsAppRedirect}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="border text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-foreground font-medium mb-2">{item.description}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for your message. We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+62 812-3456-7890"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this regarding?"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your inquiry in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message via WhatsApp
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleWhatsAppRedirect}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Direct Chat
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Quick Contact & Info */}
            <div className="space-y-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Prefer instant communication? Click below to start a conversation directly on WhatsApp.
                  </p>
                  <Button 
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start WhatsApp Chat
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Typically replies within minutes
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-xl">Why Choose WhatsApp?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Instant responses and real-time communication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Share images and documents easily</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Available on mobile and desktop</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Secure and private messaging</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border bg-muted/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-2">Muhammad Harits</h3>
                    <p className="text-muted-foreground mb-4">Your Contact Person</p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href="tel:+623132212944">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleWhatsAppRedirect}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  What's the best way to reach you?
                </h3>
                <p className="text-muted-foreground text-sm">
                  WhatsApp is the fastest way to get in touch. We typically respond within minutes during business hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  What are your business hours?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Monday to Friday, 9:00 AM to 6:00 PM WIB. Outside these hours, we'll respond the next business day.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you provide technical support?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes! We offer comprehensive technical support for all our products via WhatsApp and email.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Can I schedule a call or meeting?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely! Message us on WhatsApp to schedule a video call or meeting at your convenience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;