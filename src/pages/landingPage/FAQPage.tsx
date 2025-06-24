import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import faqsData from '@/data/faqs.json';

const FAQPage: React.FC = () => {

    const faqs = faqsData;
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section id='how-it-works' className="py-14 px-4 bg-gradient-to-r from-orange-50 to-red-50 min-h-screen">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600">
                        Get answers to the most common questions about Twende Ride.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Card
                            key={index}
                            className="border-2 border-white bg-white/70 backdrop-blur-sm"
                        >
                            <Collapsible open={openFaq === index}>
                                <CollapsibleTrigger
                                    className="w-full"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <CardHeader className="cursor-pointer hover:bg-orange-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-left text-lg font-semibold text-gray-900">
                                                {faq.question}
                                            </CardTitle>
                                            {openFaq === index ? (
                                                <ChevronUp className="h-5 w-5 text-orange-600" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-orange-600" />
                                            )}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent className="pt-0 pb-4">
                                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                    </CardContent>
                                </CollapsibleContent>
                            </Collapsible>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQPage;
