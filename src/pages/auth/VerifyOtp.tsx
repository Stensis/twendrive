import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { verifyOtp } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || JSON.parse(localStorage.getItem('tempLogin') || '{}');
    const { userId, email } = state;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!otp || !userId) {
    toast({
      title: "Missing Information",
      description: "OTP or user info is missing.",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);
  try {
    const data = await verifyOtp({ userId, otp });

    const { accessToken, user } = data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', user.role);
    localStorage.removeItem('tempLogin');

    toast({
      title: "OTP Verified",
      description: "Redirecting to your dashboard...",
    });

    navigate(user.role === 'car_owner' ? '/owner-dashboard' : '/renter-dashboard');
  } catch (err: any) {
    toast({
      title: "Verification Failed",
      description: err?.response?.data?.message || "OTP verification failed.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};
    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="max-w-md w-full">
                <Card className="border-2 border-orange-200 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-orange-600">
                            Enter OTP
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            We've sent a 6-digit code to <strong>{email}</strong>
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="otp">OTP Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                    className="border-orange-200 focus:border-orange-400"
                                    placeholder="Enter 6-digit code"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all"
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VerifyOtp;
