import React from 'react';
import { Shield, Clock, Award, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import whyChooseUsData from '@/data/whyChooseUs.json';

const WhyChooseUsPage: React.FC = () => {

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Clock,
  Award,
  CreditCard
};

    return (
        <section id='about' className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Choose Twende Ride?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We're committed to providing the best car rental experience with unmatched security, convenience, and value.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChooseUsData.map((feature, index) => {
                        const Icon = iconMap[feature.icon];
                        return (
                            <Card
                                key={index}
                                className="border-2 border-white bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="p-6 text-center">
                                    {Icon && <Icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />}
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsPage;
