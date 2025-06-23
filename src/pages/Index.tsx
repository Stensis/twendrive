
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Search, 
  Star, 
  MapPin, 
  Shield, 
  Clock, 
  CreditCard,
  Users,
  CheckCircle,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  ChevronUp,
  Award,
  Globe,
  Lock,
  Headphones
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Index = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const featuredCars = [
    {
      id: 1,
      name: 'Toyota Camry 2022',
      location: 'Nairobi CBD',
      price: 400,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=300&fit=crop',
      features: ['GPS', 'AC', 'Bluetooth'],
      verified: true
    },
    {
      id: 2,
      name: 'Honda CR-V 2021',
      location: 'Westlands',
      price: 420,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=300&fit=crop',
      features: ['SUV', 'Family', 'Spacious'],
      verified: true
    },
    {
      id: 3,
      name: 'BMW X5 2020',
      location: 'Karen',
      price: 600,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      features: ['Luxury', 'Premium', 'Sport'],
      verified: true
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      comment: 'Amazing service! Found the perfect car for my business trip. The owner was very professional and the car was exactly as described.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
    },
    {
      name: 'David Kimani',
      role: 'Car Owner',
      comment: 'Great platform for car owners! I\'ve been earning consistently from my car rentals. The security measures give me peace of mind.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      name: 'Mary Wanjiku',
      role: 'Weekend Renter',
      comment: 'Perfect for weekend getaways! Easy booking process and great variety of cars. Customer support is excellent.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    }
  ];

  const faqs = [
    {
      question: 'How do I rent a car on Twende Ride?',
      answer: 'Simply browse available cars, select your preferred vehicle, choose your rental dates, and complete the booking process. You\'ll need to verify your identity and driving license before your first rental.'
    },
    {
      question: 'What documents do I need to rent a car?',
      answer: 'You need a valid driving license, national ID or passport, and a credit/debit card for payment. For added security, we also recommend completing our KYC verification process.'
    },
    {
      question: 'How do I list my car for rental?',
      answer: 'Sign up as a car owner, add your vehicle details with photos, set your pricing and availability, complete KYC verification, and start earning from your car rentals.'
    },
    {
      question: 'What happens if there\'s damage to the car?',
      answer: 'All rentals are covered by our comprehensive insurance policy. Any damage should be reported immediately. We conduct pre and post-rental inspections to document the vehicle condition.'
    },
    {
      question: 'How are payments processed?',
      answer: 'Payments are processed securely through our platform. Renters pay upfront, and car owners receive payment after successful completion of the rental period, minus our service fee.'
    },
    {
      question: 'What if I need to cancel my booking?',
      answer: 'You can cancel bookings according to our cancellation policy. Cancellations made 24 hours before the rental start time are eligible for a full refund, minus processing fees.'
    },
    {
      question: 'Is there 24/7 customer support?',
      answer: 'Yes, we provide 24/7 customer support through chat, phone, and email. Our team is always ready to assist with any issues or emergencies during your rental period.'
    },
    {
      question: 'How is the safety of vehicles ensured?',
      answer: 'All vehicles undergo regular inspections, and owners must provide recent inspection reports. We also have a rating system where both renters and owners can rate each other for transparency.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Twende Ride
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#cars" className="text-gray-600 hover:text-orange-600 transition-colors">Cars</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-orange-600 transition-colors">How it Works</a>
              <a href="#about" className="text-gray-600 hover:text-orange-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/signin')} className="border-orange-200 text-orange-600 hover:bg-orange-50">
                Sign In
              </Button>
              <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
            Rent Cars, Earn Money, Drive Forward
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Kenya's premier peer-to-peer car rental platform. Find the perfect car for your journey or earn money by renting out your vehicle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-4"
            >
              <Car className="mr-2 h-5 w-5" />
              Rent a Car
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/signup')}
              className="border-2 border-orange-300 text-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white text-lg px-8 py-4"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              List Your Car
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>KYC Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones className="h-5 w-5 text-green-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section id="cars" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Cars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium vehicles, all verified and ready for your next adventure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card key={car.id} className="border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {car.verified && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{car.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {car.location}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          KSh {car.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500"> /day</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        onClick={() => navigate('/signup')}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose Twende Ride?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best car rental experience with unmatched security, convenience, and value.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure & Safe',
                description: 'All users are KYC verified with comprehensive insurance coverage for peace of mind.',
                color: 'text-green-500'
              },
              {
                icon: Clock,
                title: '24/7 Availability',
                description: 'Book cars anytime, anywhere with our round-the-clock customer support.',
                color: 'text-blue-500'
              },
              {
                icon: Award,
                title: 'Quality Assured',
                description: 'All vehicles undergo regular inspections to ensure top-notch quality and safety.',
                color: 'text-purple-500'
              },
              {
                icon: CreditCard,
                title: 'Easy Payments',
                description: 'Secure payment processing with multiple payment options for your convenience.',
                color: 'text-orange-500'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-2 border-white bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real users have to say about their Twende Ride experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-orange-100 bg-gradient-to-br from-white to-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Get answers to the most common questions about Twende Ride.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-white bg-white/70 backdrop-blur-sm">
                <Collapsible>
                  <CollapsibleTrigger 
                    className="w-full"
                    onClick={() => toggleFaq(index)}
                  >
                    <CardHeader className="cursor-pointer hover:bg-orange-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-left text-lg font-semibold text-gray-900">
                          {faq.question}
                        </CardTitle>
                        {openFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-orange-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Twende Ride</span>
              </div>
              <p className="text-gray-400 mb-4">
                Kenya's premier peer-to-peer car rental platform connecting car owners with renters nationwide.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Cars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">List Your Car</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-400">+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-400">support@twenderide.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-400">Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Twende Ride. All rights reserved. | Made with ❤️ in Kenya
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
