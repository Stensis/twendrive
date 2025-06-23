
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Car,
  DollarSign,
  Settings,
  LogOut,
  MessageCircle,
  BarChart3,
  Bell,
  SettingsIcon,
  User,
  ChevronDown,
  CircleUser,
} from 'lucide-react';
import carData from '@/data/cars.json';
import recentBookingsData from '@/data/recentBookings.json';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import EarningsPage from '@/pages/ownerDashboard/earningsPage';
import MyCarsPage from '@/pages/ownerDashboard/myCarsPage';
import ProfilePage from '@/pages/ownerDashboard/profilePage';
import MessagesPage from '@/pages/ownerDashboard/messagesPage';
import OverviewPage from '@/pages/ownerDashboard/overviewPage';
import AddCarPage from './AddCarPage';
import ViewCarDetails from '@/components/owner/ViewCarDetails';
import EditCarPage from '@/pages/ownerDashboard/editCarPage';
import SettingsPage from './SettingsPage';

const OwnerDashboard = () => {
  // const { section, } = useParams();
  const { section, '*': rest } = useParams(); // rest will be like "1" in "view-car-details/1"

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const [selectedCar, setSelectedCar] = useState(null);
  const [showEarningsDetail, setShowEarningsDetail] = useState(false);
  const activeSection = section || 'overview';

  const carId = section === 'view-car-details' && rest ? rest.split('/')[0] : null;
  const selectedCar = carId ? carData.find((car) => String(car.id) === carId) : null;

  const userName = localStorage.getItem('userName') || 'John Doe';
  const userEmail = localStorage.getItem('userEmail') || 'owner@test.com';

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    {
      id: "cars",
      label: "Cars",
      icon: Car,
      children: [
        { id: "add-car", label: "Add New Car" },
      ],
    },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "profile", label: "Profile", icon: CircleUser },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Updated financial data to reflect commission deducted from owner
  const financialData = {
    totalEarnings: 6970, // After commission deduction
    availableBalance: 5940,
    pendingEarnings: 1030,
    totalCommission: 1230, // Commission deducted from total bookings
    totalWithdrawn: 15000,
    thisMonthEarnings: 2040, // After commission
    lastMonthEarnings: 1657 // After commission
  };

  // Sample data for car owner
  const cars = carData
  const recentBookings = recentBookingsData;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };


  const renderContent = () => {
    if (activeSection?.startsWith('edit-car')) {
      const editCarId = rest?.split('/')?.[0]; // Gets the ID from the URL path
      const carToEdit = editCarId ? cars.find(c => String(c.id) === editCarId) : null;
      if (!carToEdit) return <div>Car not found</div>;
      return <EditCarPage car={carToEdit} />;
    }

    switch (activeSection) {
      case 'overview':
        return (
          <OverviewPage
            financialData={financialData}
            cars={cars}
            recentBookings={recentBookings}
            setShowEarningsDetail={setShowEarningsDetail}
          />
        );
      case 'cars':
        return <MyCarsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'earnings':
        return <EarningsPage />;
      case 'profile':
        return <ProfilePage userName={userName} userEmail={userEmail} />;
      case 'settings':
        return <SettingsPage />

      case 'add-car':
        return <AddCarPage />;
      case 'view-car-details':
        if (!selectedCar) return <div>Car not found</div>;
        return (
          <ViewCarDetails
            car={selectedCar}
            recentBookings={recentBookings}
          />
        );
      default:
        return (
          <OverviewPage
            financialData={financialData}
            cars={cars}
            recentBookings={recentBookings}
            setShowEarningsDetail={setShowEarningsDetail}
          />
        );
    }
  };

  // THE MENU:
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='mt-4'>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-bold text-xl pl-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Twende Ride
              </h1>
            </SidebarGroupLabel>
            <SidebarGroupContent className='mt-4'>
              <SidebarMenu>

                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    {item.children ? (
                      <div className="w-full">
                        {/* Main menu with dropdown toggle + navigation */}
                        <div
                          onClick={() => {
                            navigate(`/owner-dashboard/${item.id}`); // Always go to cars
                            setOpenDropdown(openDropdown === item.id ? null : item.id); // Toggle dropdown
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeSection === item.id || openDropdown === item.id
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700"
                            }`}
                        >
                          <div className="flex items-center space-x-2">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transform transition-transform ${openDropdown === item.id ? "rotate-180" : ""
                              }`}
                          />
                        </div>

                        {/* Show dropdown children when open */}
                        {openDropdown === item.id && (
                          <div className="ml-6 mt-2 space-y-1">
                            {item.children.map((subItem) => (
                              <button
                                key={subItem.id}
                                onClick={() => navigate(`/owner-dashboard/${subItem.id}`)}
                                className={`w-full text-left px-3 py-1 rounded-md text-sm transition-colors ${activeSection === subItem.id
                                  ? "bg-orange-100 text-orange-700 font-medium"
                                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                                  }`}
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => navigate(`/owner-dashboard/${item.id}`)}
                          className={`flex items-center space-x-2 w-full px-3 py-2 text-left rounded-lg transition-colors ${activeSection === item.id
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "text-gray-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700"
                            }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col">
          {/* Top Navigation */}
          <div className="bg-white border-b border-orange-200 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              {/* Left: App Title */}
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-3">
                <h1 className="text-xl font-bold text-gray-700">
                  Welcome back, <span className="text-orange-600">{userName}</span>
                </h1>
                <span className="text-sm text-orange-500">(Car Owner)</span>
              </div>


              {/* Right: User Info and Actions */}
              <div className="ml-auto flex items-center space-x-4">
                {/* Notification Icon */}
                <button className="text-gray-500 hover:text-orange-600">
                  <Bell className="h-5 w-5" />
                </button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {userName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                    {/* <p>{userEmail}</p> */}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-white shadow-md rounded-md border p-2 border-gray-200"
                  >

                    {/* Profile + Settings */}
                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2 h-px bg-gray-200" />

                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <SettingsIcon className="h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-2 h-px bg-gray-200" />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
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
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );

}


export default OwnerDashboard;
