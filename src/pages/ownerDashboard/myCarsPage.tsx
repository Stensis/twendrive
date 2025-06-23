import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Eye, Edit, Trash2, Plus } from 'lucide-react';
import carData from '@/data/cars.json';
import { useNavigate } from 'react-router-dom';

const MyCarsPage = () => {
    const navigate = useNavigate();
    const cars = carData;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Cars</h2>

                <Button
                    onClick={() => navigate('/owner-dashboard/add-car')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Car
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Card key={car.id} className="border-2 border-orange-200">
                        <CardContent className="p-0">
                            <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">{car.name}</h3>
                                    <Badge className={car.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {car.status}
                                    </Badge>
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
                                        <span>Total bookings:</span>
                                        <span className="font-medium">{car.bookings}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Rating:</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">{car.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total earnings:</span>
                                        <span className="font-medium text-green-600">KSh {car.totalEarnings}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => navigate(`/owner-dashboard/view-car-details/${car.id}`)}
                                    >
                                        <Eye className="mr-1 h-3 w-3" />
                                        View
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => navigate(`/owner-dashboard/edit-car/${car.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default MyCarsPage;
