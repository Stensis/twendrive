// src/routes/routes.tsx
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import HeroPage from "@/pages/landingPage/HeroPage";
import NotFound from "@/pages/NotFound";

// Owner Pages
import OwnerDashboard from "@/pages/ownerDashboard/page";

// Renter Pages
import RenterDashboard from "@/pages/renterDashboard/RenterDashboard";
import TestimonialsPage from "@/pages/landingPage/TestimonialsPage";
import FeaturedCarsPage from "@/pages/landingPage/FeaturedCarsPage";
import WhyChooseUsPage from "@/pages/landingPage/WhyChooseUsPage";
import FAQPage from "@/pages/landingPage/FAQPage";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/hero" element={<HeroPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faqs" element={<FAQPage />} />

            {/* Owner Routes */}
            <Route path="/owner-dashboard/:section?" element={<OwnerDashboard />} />
            <Route path="/owner-dashboard/:section/*" element={<OwnerDashboard />} />

            {/* Renter Routes */}
            <Route path="/renter-dashboard/:section?" element={<RenterDashboard />} />
            <Route path="/renter-dashboard/:section/*" element={<RenterDashboard />} />


            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
