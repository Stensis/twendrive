import React from 'react';
import {
    Car,
    Facebook,
    Twitter,
    Instagram,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Car className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Twende Ride</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Kenya's premier peer-to-peer car rental platform connecting car owners with renters nationwide.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                            <Twitter className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                            <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Cars</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">List Your Car</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-400">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-orange-500" />
                                <span className="text-gray-400">+254 700 123 456</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-orange-500" />
                                <span className="text-gray-400">support@twenderide.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-orange-500" />
                                <span className="text-gray-400">Nairobi, Kenya</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Twende Ride. All rights reserved. | Made with ❤️ in Kenya
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
