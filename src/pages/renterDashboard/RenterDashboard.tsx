import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Car, 
  MapPin,
  Calendar as CalendarIcon, 
  Search,
  Star,
  MessageCircle,
  Settings,
  LogOut,
  CreditCard,
  Shield,
  Building,
  Wallet,
  AlertTriangle,
  CheckCircle,
  Camera,
  Upload,
  Eye,
  X,
  Clock
} from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import VerificationSystem from '@/components/VerificationSystem';
import VehicleInspection from '@/components/VehicleInspection';
import RatingSystem from '@/components/RatingSystem';
import WalletManagement from '@/components/WalletManagement';

interface CarType {
  id: number;
  name: string;
  type: string;
  images: string[];
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  availability: string;
  ownerVerified: boolean;
  lastInspection: string;
  features: string[];
  fuelType: string;
  transmission: string;
  seats: number;
}

interface BookingType {
  id: number;
  carName: string;
  carId: number;
  dates: string;
  amount: number;
  status: string;
  canCancel?: boolean;
  cancellationDeadline?: string;
  inspectionCompleted?: boolean;
  rated?: boolean;
}

interface ChatConversationType {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  role: 'owner' | 'renter';
}

interface ChatMessageType {
  id: number;
  sender: 'user' | 'other';
  message: string;
  time: string;
}

const RenterDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('browse');
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showInspection, setShowInspection] = useState(false);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<BookingType | null>(null);
  
  // Filter states
  const [searchLocation, setSearchLocation] = useState('');
  const [carType, setCarType] = useState('');
  const [availability, setAvailability] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  // Wallet state
  const [walletBalance, setWalletBalance] = useState(2500);
  
  const userName = localStorage.getItem('userName') || 'Jane Doe';
  const userEmail = localStorage.getItem('userEmail') || 'renter@test.com';

  // Enhanced cars data with more details
  const cars: CarType[] = [
    {
      id: 1,
      name: 'Toyota Camry 2022',
      type: 'Sedan',
      images: [
        'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552519507-6958c132d338?w=400&h=300&fit=crop'
      ],
      location: 'Nairobi CBD',
      price: 400,
      rating: 4.8,
      reviewCount: 45,
      description: 'Comfortable sedan perfect for city trips',
      availability: 'Available',
      ownerVerified: true,
      lastInspection: '2024-12-15',
      features: ['Air Conditioning', 'GPS', 'Bluetooth', 'Backup Camera'],
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5
    },
    {
      id: 2,
      name: 'Honda Civic 2021',
      type: 'Sedan',
      images: [
        'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=300&fit=crop'
      ],
      location: 'Westlands',
      price: 350,
      rating: 4.6,
      reviewCount: 32,
      description: 'Reliable and fuel-efficient car',
      availability: 'Available',
      ownerVerified: true,
      lastInspection: '2024-12-10',
      features: ['Air Conditioning', 'GPS', 'Bluetooth'],
      fuelType: 'Petrol',
      transmission: 'Manual',
      seats: 5
    },
    {
      id: 3,
      name: 'Nissan X-Trail 2018',
      type: 'SUV',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
      ],
      location: 'Kilimani',
      price: 500,
      rating: 4.5,
      reviewCount: 28,
      description: 'Spacious SUV for family adventures',
      availability: 'Available',
      ownerVerified: true,
      lastInspection: '2024-12-08',
      features: ['Air Conditioning', 'GPS', '4WD', 'Roof Rack'],
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 7
    }
  ];

  // Enhanced bookings with more details
  const bookings: BookingType[] = [
    {
      id: 1,
      carName: 'Toyota Camry 2022',
      carId: 1,
      dates: 'Dec 20-22, 2024',
      amount: 1200,
      status: 'Upcoming',
      canCancel: true,
      cancellationDeadline: '2024-12-19',
      inspectionCompleted: false,
      rated: false
    },
    {
      id: 2,
      carName: 'Nissan X-Trail 2018',
      carId: 3,
      dates: 'Dec 25-27, 2024',
      amount: 1500,
      status: 'Upcoming',
      canCancel: true,
      cancellationDeadline: '2024-12-24',
      inspectionCompleted: false,
      rated: false
    },
    {
      id: 3,
      carName: 'Honda Civic 2021',
      carId: 2,
      dates: 'Dec 10-12, 2024',
      amount: 1050,
      status: 'Completed',
      canCancel: false,
      inspectionCompleted: true,
      rated: false
    }
  ];

  const chatConversations: ChatConversationType[] = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Sounds good! I\'ll be there.',
      time: '10:30 AM',
      unread: 0,
      role: 'owner'
    },
    {
      id: 2,
      name: 'Alice Smith',
      lastMessage: 'Can I extend the booking?',
      time: 'Yesterday',
      unread: 1,
      role: 'owner'
    }
  ];

  const chatMessages: ChatMessageType[] = [
    {
      id: 1,
      sender: 'user',
      message: 'Hi! Is the car available for next weekend?',
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'other',
      message: 'Yes, it\'s available! The price is KSh 400 per day.',
      time: '10:32 AM'
    },
    {
      id: 3,
      sender: 'user',
      message: 'Perfect! I\'ll book it now.',
      time: '10:35 AM'
    }
  ];

  const handleBookingCancel = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const cancellationFee = booking.amount * 0.04; // 4% fee
      const refundAmount = booking.amount - cancellationFee;
      
      setWalletBalance(prev => prev + refundAmount);
      
      console.log(`Booking ${bookingId} cancelled. Refund: KSh ${refundAmount}, Fee: KSh ${cancellationFee}`);
      alert(`Booking cancelled successfully! KSh ${refundAmount} has been refunded to your wallet.`);
      setSelectedBookingForCancel(null);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesLocation = car.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesType = carType === '' || carType === 'all' || car.type === carType;
    const matchesAvailability = availability === '' || availability === 'all' || car.availability === availability;
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    const isOwnerVerified = car.ownerVerified; // Only show cars from verified owners
    
    return matchesLocation && matchesType && matchesAvailability && matchesPrice && isOwnerVerified;
  });

  const renderBrowseCars = () => (
    <div className="space-y-6">
      {/* Enhanced Filters */}
      <Card className="border-2 border-orange-200">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            
            <Select value={carType} onValueChange={setCarType}>
              <SelectTrigger>
                <SelectValue placeholder="Car Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
              </SelectContent>
            </Select>

            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Booked">Booked</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                className="w-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cars Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car.id} className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img src={car.images[0]} alt={car.name} className="w-full h-48 object-cover rounded-t-lg" />
                <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                  {car.availability}
                </Badge>
                {car.ownerVerified && (
                  <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800 flex items-center space-x-1 px-2">
                    <Shield className="h-3 w-3" />
                    <span className="text-xs">Verified Owner</span>
                  </Badge>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{car.name}</h3>
                  <Badge variant="outline">{car.type}</Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {car.location}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Price per day:</span>
                    <span className="font-medium">KSh {car.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{car.rating} ({car.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Inspection:</span>
                    <span className="font-medium">{car.lastInspection}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={() => {
                      setSelectedCar(car);
                      setShowPayment(true);
                    }}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedCar(car);
                      setShowCarDetails(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <Button 
          onClick={() => setShowWallet(true)}
          className="bg-gradient-to-r from-green-500 to-green-600"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Wallet (KSh {walletBalance})
        </Button>
      </div>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="border-2 border-orange-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{booking.carName}</h3>
                  <p className="text-sm text-gray-600">{booking.dates}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {booking.status}
                    </Badge>
                    {booking.status === 'Completed' && !booking.inspectionCompleted && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedCar(cars.find(c => c.id === booking.carId) || null);
                          setShowInspection(true);
                        }}
                      >
                        Complete Inspection
                      </Button>
                    )}
                    {booking.status === 'Completed' && !booking.rated && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedCar(cars.find(c => c.id === booking.carId) || null);
                          setShowRating(true);
                        }}
                      >
                        Rate Vehicle
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-green-600">KSh {booking.amount}</p>
                  {booking.canCancel && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500">
                        Cancel before {booking.cancellationDeadline}
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => setSelectedBookingForCancel(booking)}
                          >
                            Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Booking Confirmation</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this booking for {booking.carName}?
                              <br /><br />
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                                <p className="text-sm text-yellow-800">
                                  <strong>Cancellation Details:</strong>
                                </p>
                                <p className="text-sm text-yellow-800">
                                  Original Amount: KSh {booking.amount}
                                </p>
                                <p className="text-sm text-yellow-800">
                                  Cancellation Fee (4%): KSh {(booking.amount * 0.04).toFixed(2)}
                                </p>
                                <p className="text-sm text-yellow-800 font-medium">
                                  Refund Amount: KSh {(booking.amount - booking.amount * 0.04).toFixed(2)}
                                </p>
                              </div>
                              <br />
                              This action cannot be undone. The refund will be credited to your wallet.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setSelectedBookingForCancel(null)}>
                              Keep Booking
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleBookingCancel(booking.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Confirm Cancellation
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
      <ChatInterface 
        userRole="renter"
        conversations={chatConversations}
        currentConversation={chatConversations[0]}
        messages={chatMessages}
      />
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input defaultValue={userName} />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={userEmail} />
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Account Verification</h2>
      <VerificationSystem 
        userType="renter" 
        onVerificationComplete={() => setShowVerification(false)}
      />
    </div>
  );

  const renderCarDetails = () => {
    if (!selectedCar) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setShowCarDetails(false)}>
            ← Back to Browse
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">{selectedCar.name}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {selectedCar.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${selectedCar.name} ${index + 1}`} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">{selectedCar.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Seats:</span>
                      <span className="ml-2 font-medium">{selectedCar.seats}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fuel Type:</span>
                      <span className="ml-2 font-medium">{selectedCar.fuelType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Transmission:</span>
                      <span className="ml-2 font-medium">{selectedCar.transmission}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-gray-600">Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCar.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{selectedCar.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per day:</span>
                    <span className="font-medium">KSh {selectedCar.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedCar.rating} ({selectedCar.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Inspection:</span>
                    <span className="font-medium">{selectedCar.lastInspection}</span>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This vehicle is from a verified owner and has passed all safety inspections.
                  </AlertDescription>
                </Alert>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={() => {
                    setShowCarDetails(false);
                    setShowPayment(true);
                  }}
                >
                  Book This Vehicle
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentPage = () => {
    if (!selectedCar) return null;

    // For simplicity, assume 1 day booking for payment page
    const days = 1;
    const totalAmount = selectedCar.price * days; // No service fee added for renter

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={() => setShowPayment(false)}>
            ← Back to Car Details
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img src={selectedCar.images[0]} alt={selectedCar.name} className="w-full h-48 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold text-lg">{selectedCar.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedCar.location}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{days} day{days > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate per day:</span>
                    <span className="font-medium">KSh {selectedCar.price}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-green-600">KSh {totalAmount}</span>
                  </div>
                </div>
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Payment is secured through our escrow system. Funds are released to the owner only after you confirm vehicle receipt.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-medium">M-Pesa</p>
                      <p className="text-sm text-gray-600">Pay with your mobile money</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard accepted</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'bank' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className="flex items-center space-x-3">
                    <Building className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-gray-600">Direct bank transfer</p>
                    </div>
                  </div>
                </div>
              </div>

              {paymentMethod === 'mpesa' && (
                <div className="space-y-3">
                  <Label>Phone Number</Label>
                  <Input placeholder="254712345678" />
                  <Alert className="border-green-200 bg-green-50">
                    <Shield className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      You will receive an M-Pesa prompt on your phone to complete payment.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-3">
                  <div>
                    <Label>Bank</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select your bank</option>
                      <option value="equity">Equity Bank</option>
                      <option value="kcb">KCB Bank</option>
                      <option value="coop">Co-operative Bank</option>
                      <option value="absa">Absa Bank</option>
                    </select>
                  </div>
                  <Alert className="border-blue-200 bg-blue-50">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      You will be redirected to your bank's secure portal to complete payment.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={!paymentMethod}
                onClick={() => {
                  setShowPayment(false);
                  setActiveSection('bookings');
                  setSelectedCar(null);
                  alert('Payment successful! Booking confirmed.');
                }}
              >
                <Shield className="h-4 w-4 mr-2" />
                Pay KSh {totalAmount} Securely
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (showVerification) return renderVerification();
    if (showWallet) return <WalletManagement balance={walletBalance} onClose={() => setShowWallet(false)} />;
    if (showRating) return <RatingSystem car={selectedCar} onClose={() => setShowRating(false)} />;
    if (showInspection) return <VehicleInspection car={selectedCar} onClose={() => setShowInspection(false)} />;
    if (showCarDetails) return renderCarDetails();
    if (showPayment) return renderPaymentPage();

    switch (activeSection) {
      case 'browse':
        return renderBrowseCars();
      case 'bookings':
        return renderBookings();
      case 'messages':
        return renderMessages();
      case 'settings':
        return renderSettings();
      case 'verification':
        return renderVerification();
      default:
        return renderBrowseCars();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-orange-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Twende Ride
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{userName}</p>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
            </div>
            <Button 
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
              variant="outline" 
              className="text-gray-600 hover:text-red-600 hover:border-red-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-orange-200 min-h-screen">
          <div className="p-6 border-b border-orange-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Twende Ride
                </h2>
                <p className="text-sm text-gray-600">Car Renter</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {[
              { id: 'browse', label: 'Browse Cars', icon: Search },
              { id: 'bookings', label: 'My Bookings', icon: CalendarIcon },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'verification', label: 'Verification', icon: Shield },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userName.split(' ')[0]}!
              </h1>
              <p className="text-gray-600">Find the perfect car for your next adventure.</p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;
