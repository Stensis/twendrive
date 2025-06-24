import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Car, Star } from 'lucide-react';
import React from 'react';
import { OverviewPageProps } from '@/lib/owner/types';
import { useNavigate } from 'react-router-dom';

const OverviewPage: React.FC<OverviewPageProps> = ({
  financialData,
  cars,
  recentBookings,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Available Balance */}
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-3xl font-bold text-green-600">
                  KSh {financialData.availableBalance.toLocaleString()}
                </p>
              </div>
              {/* <DollarSign className="h-8 w-8 text-green-600" /> */}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => navigate('/owner-dashboard/earnings')}
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Active Cars */}
        <Card className="border-2 border-orange-200 cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Cars</p>
                <p className="text-3xl font-bold text-orange-600">{cars.length}</p>
              </div>
              <Car className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {cars.map((car) => (
                <div key={car.id} className="flex justify-between">
                  <span>{car.name}</span>
                  <span className="text-green-600">KSh {car.totalEarnings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Bookings */}
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-red-600">20</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Rating */}
        <Card className="border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-yellow-600">4.7</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-orange-600" />
            <span>Recent Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{booking.renterName}</p>
                  <p className="text-sm text-gray-600">{booking.carName}</p>
                  <p className="text-sm text-gray-500">{booking.dates}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">KSh {booking.amount}</p>
                  <Badge
                    className={
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {booking.status}
                  </Badge>
                  {booking.status === 'completed' && (
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-xs text-gray-500">Rate Renter:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 cursor-pointer ${i < booking.renterRating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
