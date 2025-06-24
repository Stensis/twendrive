import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  SettingsIcon,
  Bell,
  User
} from 'lucide-react';
import VerificationSystem from '@/components/VerificationSystem';
import VehicleInspection from '@/components/VehicleInspection';
import RatingSystem from '@/components/RatingSystem';
import WalletManagement from '@/components/owner/WalletManagement';
import { BookingType, CarType, ChatConversationType, ChatMessageType } from '@/lib/renter/types';
import carTypeData from '@/data/renter/carType.json';
import renterBookings from '@/data/renter/renterBookings.json';
import renterChatMessages from '@/data/renter/renterChatMessages.json';
import renterChatConversations from '@/data/renter/renterChatConversations.json';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import BrowseCars from '@/pages/renterDashboard/browseCarsPage';
import BookingsPage from '@/pages/renterDashboard/bookingsPage';
import MessagesPage from '@/pages/renterDashboard/messagesPage';
import SettingsPage from '@/pages/renterDashboard/settingsPage';
import VerificationPage from '@/pages/renterDashboard/verificationPage';
import CarDetailsPage from '@/pages/renterDashboard/carDetailsPage';
import PaymentPage from '@/pages/renterDashboard/paymentPage';
import ProfilePage from '@/pages/renterDashboard/profilePage';

const RenterDashboard = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [activeSection, setActiveSection] = useState(section || 'browse');
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

  useEffect(() => {
    if (section && section !== activeSection) {
      setActiveSection(section);
    }
  }, [section]);


  const userName = localStorage.getItem('userName') || 'Jane Doe';
  const userEmail = localStorage.getItem('userEmail') || 'renter@test.com';

  // Enhanced cars data with more details
  const cars: CarType[] = carTypeData

  // Enhanced bookings with more details
  const bookings: BookingType[] = renterBookings;

  const chatConversations = renterChatConversations as ChatConversationType[];

  const chatMessages = renterChatMessages as ChatMessageType[];

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

  const renderContent = () => {
    if (showVerification || activeSection === 'verification')
      return <VerificationPage onVerificationComplete={() => {
        setShowVerification(false);
        setActiveSection('browse'); // Optional: redirect after verification
        navigate('/renter-dashboard/browse'); // Optional: update URL
      }} />;

    if (showWallet) return <WalletManagement balance={walletBalance} onClose={() => setShowWallet(false)} />;
    if (showRating) return <RatingSystem car={selectedCar} onClose={() => setShowRating(false)} />;
    if (showInspection) return <VehicleInspection car={selectedCar} onClose={() => setShowInspection(false)} />;
    if (showCarDetails && selectedCar) {
      return (
        <CarDetailsPage
          selectedCar={selectedCar}
          onBack={() => setShowCarDetails(false)}
          onBook={() => {
            setShowCarDetails(false);
            setShowPayment(true);
          }}
        />
      );
    }

    if (showPayment && selectedCar) {
      return (
        <PaymentPage
          selectedCar={selectedCar}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onBack={() => setShowPayment(false)}
          onPaymentComplete={() => {
            setShowPayment(false);
            setActiveSection('bookings');
            setSelectedCar(null);
            alert('Payment successful! Booking confirmed.');
          }}
        />
      );
    }

    switch (activeSection) {
      case 'browse':
        return (
          <BrowseCars
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            carType={carType}
            setCarType={setCarType}
            availability={availability}
            setAvailability={setAvailability}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            cars={cars}
            setSelectedCar={setSelectedCar}
            setShowPayment={setShowPayment}
            setShowCarDetails={setShowCarDetails}
          />
        );
      case 'bookings':
        return (
          <BookingsPage
            bookings={bookings}
            cars={cars}
            walletBalance={walletBalance}
            setShowWallet={setShowWallet}
            setSelectedCar={setSelectedCar}
            setShowInspection={setShowInspection}
            setShowRating={setShowRating}
            setSelectedBookingForCancel={setSelectedBookingForCancel}
            handleBookingCancel={handleBookingCancel}
          />
        );

      case 'messages':
        return (
          <MessagesPage
            chatConversations={chatConversations}
            chatMessages={chatMessages}
          />
        );

      case 'profile':
        return <ProfilePage userName={userName} userEmail={userEmail} />;
      case 'settings':
        return <SettingsPage />;

      default:
        return <div>Section not found.</div>;
    }
  };

  // THE MAIN MENU
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mt-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-bold text-xl pl-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Twende Ride
              </h1>
            </SidebarGroupLabel>

            <SidebarGroupContent className="mt-4">
              <SidebarMenu>
                {[
                  { id: 'browse', label: 'Browse Cars', icon: Search },
                  { id: 'bookings', label: 'My Bookings', icon: CalendarIcon },
                  { id: 'messages', label: 'Messages', icon: MessageCircle },
                  { id: 'verification', label: 'Verification', icon: Shield },
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => navigate(`/renter-dashboard/${item.id}`)}
                        className={`flex items-center space-x-2 w-full px-3 py-2 text-left rounded-lg transition-colors ${activeSection === item.id
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700'
                          }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col">
          {/* Topbar */}
          <div className="bg-white border-b border-orange-200 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-3">
                <h1 className="text-xl font-bold text-gray-700">
                  Welcome back, <span className="text-orange-600">{userName}</span>
                </h1>
                <span className="text-sm text-orange-500">(Car-Renter)</span>
              </div>

              {/* Right side */}
              <div className="ml-auto flex items-center space-x-4">
                <button className="text-gray-500 hover:text-orange-600">
                  <Bell className="h-5 w-5" />
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white shadow-md rounded-md border p-2 border-gray-200">
                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <SettingsIcon className="h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2 h-px bg-gray-200" />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.clear();
                        navigate('/');
                      }}
                      className="flex items-center space-x-2 cursor-pointer text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">{renderContent()}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );

};

export default RenterDashboard;
