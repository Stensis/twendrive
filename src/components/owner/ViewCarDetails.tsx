// src/components/ViewCarDetails.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Camera, CheckCircle, Edit, Shield, Star } from 'lucide-react';
import VehicleInspectionSection from './VehicleInspectionSection';
import { ViewCarDetailsProps } from '@/lib/types';

const ViewCarDetails: React.FC<ViewCarDetailsProps> = ({ car, recentBookings }) => {

    const [showInspection, setShowInspection] = useState(false);
    const [reviews, setReviews] = useState<{ [renterId: number]: { rating?: number; comment?: string } }>({});

    const handleStarClick = (renterId: number, rating: number) => {
        setReviews(prev => ({
            ...prev,
            [renterId]: {
                ...(prev[renterId] || {}),
                rating,
            },
        }));
    };

    const handleCommentChange = (renterId: number, comment: string) => {
        setReviews(prev => ({
            ...prev,
            [renterId]: {
                ...(prev[renterId] || {}),
                comment,
            },
        }));
    };

    const handleSubmitReview = (renterId: number) => {
        const review = reviews[renterId];
        if (!review || review.rating == null || !review.comment) {
            alert("Please provide both rating and comment.");
            return;
        }

        console.log("Submitting review for renter", renterId, review);

        // TODO: send to backend
    };

    return (
        <div className="p-6 max-w-6xl w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{car.name}</h2>
                <button
                    // onClick={onClose}
                    className="text-gray-500 hover:text-red-600 font-bold text-lg"
                >
                    ×
                </button>
            </div>

            {showInspection ? (
                <VehicleInspectionSection
                    car={car}
                    onBack={() => setShowInspection(false)}
                />
            ) : (
                <>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Card */}
                        <Card className="border-2 border-orange-200">
                            <CardContent className="p-0">
                                <img src={car.image} alt={car.name} className="w-full h-64 object-cover rounded-t-lg" />
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold">{car.name}</h3>
                                        <div className="flex space-x-2">
                                            <Badge className="bg-green-100 text-green-800">Available</Badge>
                                            <Badge className={car.inspectionStatus === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Inspected
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span className="font-medium">{car.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Price per day:</span>
                                            <span className="font-medium">KSh {car.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total bookings:</span>
                                            <span className="font-medium">{car.bookings}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Last inspection:</span>
                                            <span className="font-medium text-green-600">{car.lastInspection}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total earnings:</span>
                                            <span className="font-medium text-green-600">KSh {car.totalEarnings}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                            onClick={() => setShowInspection(true)}
                                        >
                                            <Camera className="h-4 w-4 mr-2" />
                                            Vehicle Inspection
                                        </Button>

                                        <Button variant="outline" className="w-full">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Right Card */}
                        <Card className="border-2 border-orange-200">
                            <CardHeader>
                                <CardTitle>Booking Calendar</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Calendar mode="single" className="rounded-md border" />
                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-green-200 rounded" />
                                        <span>Available</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-red-200 rounded" />
                                        <span>Booked</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-yellow-200 rounded" />
                                        <span>Maintenance</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Renters */}
                    <Card className="mt-6 border-2 border-orange-200">
                        <CardHeader>
                            <CardTitle>Recent Renters</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentBookings.filter(b => b.status === 'completed').map((b) => (
                                    <div key={b.id} className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                                        {b.renterName.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{b.renterName}</p>
                                                    <p className="text-sm text-gray-600">{b.dates}</p>
                                                    {b.renterVerified && (
                                                        <Badge className="mt-1 bg-green-100 text-green-800">
                                                            <Shield className="h-3 w-3 mr-1" />
                                                            Verified
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Rating stars */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-600">Rate:</span>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 cursor-pointer ${reviews[b.id]?.rating > i ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                }`}
                                                            onClick={() => handleStarClick(b.id, i + 1)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comment input */}
                                        <textarea
                                            className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm"
                                            placeholder="Write a short review..."
                                            rows={2}
                                            value={reviews[b.id]?.comment || ''}
                                            onChange={(e) => handleCommentChange(b.id, e.target.value)}
                                        />

                                        <div className="text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => handleSubmitReview(b.id)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white"
                                            >
                                                Submit Review
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};

export default ViewCarDetails;
