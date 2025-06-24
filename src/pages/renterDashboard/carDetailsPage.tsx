import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Star, Shield } from 'lucide-react';
import { CarDetailsPageProps } from '@/lib/renter/types';

const CarDetailsPage: React.FC<CarDetailsPageProps> = ({ selectedCar, onBack, onBook }) => {
    if (!selectedCar) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack}>
                    ← Back to Browse
                </Button>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCar.name}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Car Images and Details */}
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
                                <div><span className="text-gray-600">Type:</span> <span className="ml-2 font-medium">{selectedCar.type}</span></div>
                                <div><span className="text-gray-600">Seats:</span> <span className="ml-2 font-medium">{selectedCar.seats}</span></div>
                                <div><span className="text-gray-600">Fuel Type:</span> <span className="ml-2 font-medium">{selectedCar.fuelType}</span></div>
                                <div><span className="text-gray-600">Transmission:</span> <span className="ml-2 font-medium">{selectedCar.transmission}</span></div>
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

                {/* Right: Booking Info */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Location:</span> <span className="font-medium">{selectedCar.location}</span></div>
                                <div className="flex justify-between"><span>Price per day:</span> <span className="font-medium">KSh {selectedCar.price}</span></div>
                                <div className="flex justify-between">
                                    <span>Rating:</span>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{selectedCar.rating} ({selectedCar.reviewCount} reviews)</span>
                                    </div>
                                </div>
                                <div className="flex justify-between"><span>Last Inspection:</span> <span className="font-medium">{selectedCar.lastInspection}</span></div>
                            </div>

                            <Alert className="border-green-200 bg-green-50">
                                <Shield className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    This vehicle is from a verified owner and has passed all safety inspections.
                                </AlertDescription>
                            </Alert>

                            <Button
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                onClick={onBook}
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

export default CarDetailsPage;
