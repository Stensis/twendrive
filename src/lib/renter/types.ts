export interface CarType {
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

export interface BookingType {
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

export interface ChatConversationType {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  role: "owner" | "renter"; // ✅ Only "owner" or "renter" allowed
}

export interface ChatMessageType {
  id: number;
  sender: "user" | "other"; // ✅ Only "user" or "other" allowed
  message: string;
  time: string;
}

export interface BookingsPageProps {
  bookings: BookingType[];
  cars: CarType[];
  walletBalance: number;
  setShowWallet: (show: boolean) => void;
  setSelectedCar: (car: CarType | null) => void;
  setShowInspection: (show: boolean) => void;
  setShowRating: (show: boolean) => void;
  setSelectedBookingForCancel: (booking: BookingType | null) => void;
  handleBookingCancel: (id: number) => void;
}

export interface BrowseCarsProps {
  searchLocation: string;
  setSearchLocation: (val: string) => void;
  carType: string;
  setCarType: (val: string) => void;
  availability: string;
  setAvailability: (val: string) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  cars: CarType[];
  setSelectedCar: (car: CarType) => void;
  setShowPayment: (val: boolean) => void;
  setShowCarDetails: (val: boolean) => void;
}

export interface MessagesPageProps {
  chatConversations: ChatConversationType[];
  chatMessages: ChatMessageType[];
}

export interface ProfilePageProps {
  userName: string;
  userEmail: string;
}

export interface PaymentPageProps {
  selectedCar: CarType;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export interface VerificationPageProps {
  onVerificationComplete: () => void;
}

export interface CarDetailsPageProps {
    selectedCar: CarType;
    onBack: () => void;
    onBook: () => void;
}
