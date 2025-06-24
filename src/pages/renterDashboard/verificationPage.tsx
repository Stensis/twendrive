import React from 'react';
import VerificationSystem from '@/components/VerificationSystem';
import { VerificationPageProps } from '@/lib/renter/types';


const VerificationPage: React.FC<VerificationPageProps> = ({ onVerificationComplete }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Verification</h2>
            <VerificationSystem userType="renter" onVerificationComplete={onVerificationComplete} />
        </div>
    );
};

export default VerificationPage;
