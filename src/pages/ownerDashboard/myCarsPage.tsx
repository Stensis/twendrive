import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MapPin,
    Star,
    Eye,
    Edit,
    Trash2,
    Plus,
    Fuel,
    GaugeCircle,
    Calendar,
    CarFront,
} from 'lucide-react';
import { fetchOwnerCars } from '@/redux/slices/owner/ownerCarsSlice';

const MyCarsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { cars, loading, error } = useSelector((state: RootState) => state.ownerCars);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchOwnerCars()).then((res) => {
            console.log("Dispatch result:", res);
        });
    }, [dispatch]);

    if (loading) return <p>Loading cars...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

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
                {cars.map((car: any) => (
                    <Card key={car.id} className="border-2 border-orange-200">
                        <CardContent className="p-0">
                            <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4">
                                {/* Name + Status */}
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">{car.name}</h3>
                                    <Badge className={car.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {car.status}
                                    </Badge>
                                </div>

                                {/* Location */}
                                <p className="text-sm text-gray-600 mb-2 flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {car.location}
                                </p>

                                {/* Price / Bookings / Earnings */}
                                <div className="space-y-2 text-sm text-gray-600 mb-2">
                                    <div className="flex justify-between">
                                        <span>Price per day:</span>
                                        <span className="font-medium">KSh {car.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total bookings:</span>
                                        <span className="font-medium">{car.bookings}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total earnings:</span>
                                        <span className="font-medium text-green-600">KSh {car.totalEarnings}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Rating:</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">{car.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Car Details - Horizontal Layout */}
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Car Details</h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-700">

                                        {/* Make */}
                                        <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-md">
                                            <CarFront className="h-4 w-4 text-gray-600" />
                                            <span className="text-gray-600">Make:</span>
                                            <span className="font-medium">{car.make}</span>
                                        </div>

                                        {/* Model */}
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                            <CarFront className="h-4 w-4 text-gray-600" />
                                            <span className="text-gray-600">Model:</span>
                                            <span className="font-medium">{car.model}</span>
                                        </div>

                                        {/* Year */}
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                            <Calendar className="h-4 w-4 text-gray-600" />
                                            <span className="text-gray-600">Year:</span>
                                            <span className="font-medium">{car.year}</span>
                                        </div>

                                        {/* Fuel Type */}
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                            <Fuel className="h-4 w-4 text-gray-600" />
                                            <span className="text-gray-600">Fuel:</span>
                                            <span className="font-medium">{car.fuelType}</span>
                                        </div>

                                        {/* Mileage */}
                                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                            <GaugeCircle className="h-4 w-4 text-gray-600" />
                                            <span className="text-gray-600">Mileage:</span>
                                            <span className="font-medium">{car.mileage.toLocaleString()} km</span>
                                        </div>

                                    </div>
                                </div>


                                {/* Features */}
                                {car.features?.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Features:</h4>
                                        <ul className="flex flex-wrap gap-2 text-xs text-gray-600">
                                            {car.features.map((feature: string, index: number) => (
                                                <li
                                                    key={index}
                                                    className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full border border-orange-200"
                                                >
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Action Buttons */}
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
                                        <Edit className="mr-1 h-3 w-3" />
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
