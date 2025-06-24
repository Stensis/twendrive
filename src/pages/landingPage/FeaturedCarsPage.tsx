import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, CheckCircle } from 'lucide-react';
import featuredCarsData from '@/data/featuredCarsData.json';

const FeaturedCarsPage: React.FC = () => {
    const navigate = useNavigate();

    const featuredCars = featuredCarsData;

    return (
        <section id="cars" className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Cars</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of premium vehicles, all verified and ready for your next adventure.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredCars.map((car) => (
                        <Card key={car.id} className="border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group">
                            <CardContent className="p-0">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {car.verified && (
                                        <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="text-sm text-gray-600">{car.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-3 flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {car.location}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {car.features.map((feature, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                                KSh {car.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500"> /day</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                            onClick={() => navigate('/signup')}
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCarsPage;
