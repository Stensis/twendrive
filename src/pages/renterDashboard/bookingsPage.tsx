// src/pages/renter/BookingsPage.tsx

import React from 'react';
import { Badge, Wallet } from 'lucide-react';
import { BookingsPageProps, BookingType, CarType } from '@/lib/renter/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const BookingsPage: React.FC<BookingsPageProps> = ({
  bookings,
  cars,
  walletBalance,
  setShowWallet,
  setSelectedCar,
  setShowInspection,
  setShowRating,
  setSelectedBookingForCancel,
  handleBookingCancel
}) => {
  return (
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
                          const car = cars.find(c => c.id === booking.carId) || null;
                          setSelectedCar(car);
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
                          const car = cars.find(c => c.id === booking.carId) || null;
                          setSelectedCar(car);
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
};

export default BookingsPage;
