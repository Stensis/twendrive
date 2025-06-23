export type Role = "renter" | "owner";
export type Sender = "user" | "other";

export interface Notification {
  id: number;
  type: "booking" | "payment" | "return" | "message" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionRequired?: boolean;
}

export interface PaymentEscrowProps {
  carDetails: {
    id: number;
    name: string;
    price: number;
    owner: string;
    image: string;
  };
  bookingDetails: {
    startDate: string;
    endDate: string;
    days: number;
  };
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export interface RatingSystemProps {
  car: any;
  onClose: () => void;
}

export interface VehicleInspectionProps {
  car: any;
  onClose: () => void;
}

export interface VerificationSystemProps {
  userType: "renter" | "owner";
  onVerificationComplete?: () => void;
}

export interface WalletManagementProps {
  balance: number;
  onClose: () => void;
}

export interface ChatConversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  role: Role;
}

export interface ChatConversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  role: Role;
}

export interface ChatMessage {
  id: number;
  sender: Sender;
  message: string;
  time: string;
}

export interface Booking {
  id: number;
  renterName: string;
  carName: string;
  dates: string;
  amount: number;
  status: string;
  renterRating: number;
  renterVerified: boolean;
}

export interface CarData {
  id: number;
  name: string;
  image: string;
  status: string;
  price: number;
  bookings: number;
  rating: number;
  totalEarnings: number;
  location: string;
  description: string;
  lastInspection: string;
  inspectionStatus: string;
  inspectionImages: string[];
}

export interface OverviewPageProps {
  financialData: {
    availableBalance: number;
  };
  cars: CarData[];
  recentBookings: Booking[];
  setShowEarningsDetail: (show: boolean) => void;
}

export interface WithdrawModalProps {
  show: boolean;
  onClose: () => void;
  onWithdraw: () => void;
  withdrawalAmount: string;
  setWithdrawalAmount: (value: string) => void;
  withdrawalMethod: string;
  setWithdrawalMethod: (value: string) => void;
  availableBalance: number;
}

export interface AddCarFormProps {
  selectedDates: Date[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
}

export interface ViewCarDetailsProps {
  car: CarData;
  recentBookings: Booking[];
}

export interface ChatMessage {
  id: number;
  sender: "user" | "other";
  message: string;
  time: string;
}

export interface ChatConversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  role: "owner" | "renter";
}

export interface ChatInterfaceProps {
  userRole: "owner" | "renter";
  conversations: ChatConversation[];
  currentConversation?: ChatConversation;
  messages: ChatMessage[];
}
