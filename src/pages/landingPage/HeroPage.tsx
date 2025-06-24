import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, CheckCircle, CreditCard, Headphones, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
                    Rent Cars, Earn Money, Drive Forward
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Kenya's premier peer-to-peer car rental platform. Find the perfect car for your journey or earn money by renting out your vehicle.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button
                        size="lg"
                        onClick={() => navigate('/signup')}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-4"
                    >
                        <Car className="mr-2 h-5 w-5" />
                        Rent a Car
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/signup')}
                        className="border-2 border-orange-300 text-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white text-lg px-8 py-4"
                    >
                        <CreditCard className="mr-2 h-5 w-5" />
                        List Your Car
                    </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex justify-center items-center space-x-8 text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span>Fully Insured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>KYC Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Headphones className="h-5 w-5 text-green-500" />
                        <span>24/7 Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroPage;
