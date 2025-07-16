// src/components/RequireAuth.tsx
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

interface Props {
    allowedRoles: string[];
    children: ReactNode; // ✅ Add this line
}

const RequireAuth = ({ allowedRoles, children }: Props) => {
    const { token, user } = useSelector((state: RootState) => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>; 
};

export default RequireAuth;
