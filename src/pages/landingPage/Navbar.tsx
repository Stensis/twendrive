import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="border-b bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <Car className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Twende Ride
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#cars" className="text-gray-600 hover:text-orange-600 transition-colors">Cars</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-orange-600 transition-colors">How it Works</a>
                        <a href="#about" className="text-gray-600 hover:text-orange-600 transition-colors">About</a>
                        <a href="#testimonies" className="text-gray-600 hover:text-orange-600 transition-colors">Testimonies</a>
                        <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" onClick={() => navigate('/signin')} className="border-orange-200 text-orange-600 hover:bg-orange-50">
                            Sign In
                        </Button>
                        <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
