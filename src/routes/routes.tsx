// src/routes/routes.tsx
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import NotFound from "@/pages/NotFound";

// Owner Pages
import OwnerDashboard from "@/pages/ownerDashboard/page";

// Renter Pages
import RenterDashboard from "@/pages/renterDashboard/RenterDashboard";
import EditCarPage from "@/pages/ownerDashboard/editCarPage";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Owner Routes */}
            <Route path="/owner-dashboard/:section?" element={<OwnerDashboard />} />
            <Route path="/owner-dashboard/:section/*" element={<OwnerDashboard />} />

            {/* Renter Routes */}
            <Route path="/renter-dashboard" element={<RenterDashboard />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
