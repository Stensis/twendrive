// src/routes/routes.tsx
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import HeroPage from "@/pages/landingPage/HeroPage";
import NotFound from "@/pages/NotFound";

// Auth & Verification
import VerifyEmail from "@/pages/auth/VerifyEmail";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import RequestReset from "@/pages/auth/RequestReset";
import ResetPasswordPage from "@/pages/auth/ResetPassword";

// Landing Pages
import TestimonialsPage from "@/pages/landingPage/TestimonialsPage";
import FeaturedCarsPage from "@/pages/landingPage/FeaturedCarsPage";
import WhyChooseUsPage from "@/pages/landingPage/WhyChooseUsPage";
import FAQPage from "@/pages/landingPage/FAQPage";

// Dashboards
import OwnerDashboard from "@/pages/ownerDashboard/page";
import RenterDashboard from "@/pages/renterDashboard/RenterDashboard";
import RequireAuth from "@/components/RequireAuth"; // 🔐

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/request-reset" element={<RequestReset />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/hero" element={<HeroPage />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faqs" element={<FAQPage />} />

            {/* Owner Routes (Protected) */}
            <Route
                path="/owner-dashboard/:section?"
                element={
                    <RequireAuth allowedRoles={["car_owner"]}>
                        <OwnerDashboard />
                    </RequireAuth>
                }
            />
            <Route
                path="/owner-dashboard/:section/*"
                element={
                    <RequireAuth allowedRoles={["car_owner"]}>
                        <OwnerDashboard />
                    </RequireAuth>
                }
            />

            {/* Renter Routes (Protected) */}
            <Route
                path="/renter-dashboard/:section?"
                element={
                    <RequireAuth allowedRoles={["car_renter"]}>
                        <RenterDashboard />
                    </RequireAuth>
                }
            />
            <Route
                path="/renter-dashboard/:section/*"
                element={
                    <RequireAuth allowedRoles={["car_renter"]}>
                        <RenterDashboard />
                    </RequireAuth>
                }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
