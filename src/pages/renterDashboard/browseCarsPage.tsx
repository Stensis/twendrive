import React from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {
    MapPin,
    Search,
    Star,
    Shield,
    Eye,
} from 'lucide-react';
import { BrowseCarsProps } from '@/lib/renter/types';

const BrowseCars: React.FC<BrowseCarsProps> = ({
    searchLocation,
    setSearchLocation,
    carType,
    setCarType,
    availability,
    setAvailability,
    priceRange,
    setPriceRange,
    cars,
    setSelectedCar,
    setShowPayment,
    setShowCarDetails,
}) => {
    const filteredCars = cars.filter((car) => {
        const matchesLocation = car.location.toLowerCase().includes(searchLocation.toLowerCase());
        const matchesType = carType === '' || carType === 'all' || car.type === carType;
        const matchesAvailability = availability === '' || availability === 'all' || car.availability === availability;
        const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
        const isOwnerVerified = car.ownerVerified;

        return matchesLocation && matchesType && matchesAvailability && matchesPrice && isOwnerVerified;
    });

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card className="border-2 border-orange-200">
                <CardContent className="p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search by location..."
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>

                        <Select value={carType} onValueChange={setCarType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Car Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Sedan">Sedan</SelectItem>
                                <SelectItem value="SUV">SUV</SelectItem>
                                <SelectItem value="Hatchback">Hatchback</SelectItem>
                                <SelectItem value="Coupe">Coupe</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={availability} onValueChange={setAvailability}>
                            <SelectTrigger>
                                <SelectValue placeholder="Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Booked">Booked</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                placeholder="Min Price"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                className="w-20"
                            />
                            <span>-</span>
                            <Input
                                type="number"
                                placeholder="Max Price"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                                className="w-20"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Cars Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                    <Card key={car.id} className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                            <div className="relative">
                                <img src={car.images[0]} alt={car.name} className="w-full h-48 object-cover rounded-t-lg" />
                                <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                                    {car.availability}
                                </Badge>
                                {car.ownerVerified && (
                                    <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800 flex items-center space-x-1 px-2">
                                        <Shield className="h-3 w-3" />
                                        <span className="text-xs">Verified Owner</span>
                                    </Badge>
                                )}
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">{car.name}</h3>
                                    <Badge variant="outline">{car.type}</Badge>
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
                                        <span>Rating:</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">
                                                {car.rating} ({car.reviewCount})
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Last Inspection:</span>
                                        <span className="font-medium">{car.lastInspection}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-2 mt-4">
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                        onClick={() => {
                                            setSelectedCar(car);
                                            setShowPayment(true);
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedCar(car);
                                            setShowCarDetails(true);
                                        }}
                                    >
                                        <Eye className="h-4 w-4" />
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

export default BrowseCars;
