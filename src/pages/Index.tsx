import Navbar from '@/pages/landingPage/Navbar';
import HeroPage from '@/pages/landingPage/HeroPage';
import FeaturedCarsPage from '@/pages/landingPage/FeaturedCarsPage';
import WhyChooseUsPage from '@/pages/landingPage/WhyChooseUsPage';
import TestimonialsPage from '@/pages/landingPage/TestimonialsPage';
import FAQPage from '@/pages/landingPage/FAQPage';
import Footer from '@/pages/landingPage/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navbar />

      {/* Main content wrapper */}
      <div className="space-y-2"> {/* Optional: Add spacing between sections */}
        {/* Hero Section */}
        <HeroPage />

        {/* Featured Cars */}
        <FeaturedCarsPage />

        {/* Why Choose Us */}
        <WhyChooseUsPage />

        {/* Testimonials */}
        <TestimonialsPage />

        {/* FAQ Section */}
        <FAQPage />
      </div>

      {/* Footer outside main content */}
      <Footer />
    </div>
  );
};

export default Index;
