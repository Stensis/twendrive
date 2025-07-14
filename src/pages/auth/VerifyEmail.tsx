import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { resendVerificationEmail, verifyEmailToken } from '@/services/auth';
import { useToast } from "@/hooks/use-toast";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState<string | null>(null);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendError, setResendError] = useState<string | null>(null);

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const { toast } = useToast();

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                toast({
                    title: "Missing Token",
                    description: "No token was provided for verification.",
                    variant: "destructive",
                });
                setStatus("error");
                return;
            }

            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                setEmail(decodedToken.email);

                await verifyEmailToken(token);

                toast({
                    title: "Email Verified",
                    description: "Your email has been successfully verified!",
                });

                setStatus("success");
            } catch (err: any) {
                toast({
                    title: "Verification Failed",
                    description:
                        err?.response?.data?.message || "The token may be invalid or expired.",
                    variant: "destructive",
                });

                setStatus("error");
            }
        };

        verify();
    }, [token]);


    const handleResend = async () => {
        if (!email) return;
        setResendLoading(true);
        setResendError(null);

        try {
            await resendVerificationEmail(email);
            toast({
                title: "Verification Email Sent",
                description: "A new verification link has been sent to your inbox.",
            });
        } catch (err: any) {
            toast({
                title: "Failed to Resend",
                description: err?.response?.data?.message || "Please try again later.",
                variant: "destructive",
            });
            setResendError("Failed to resend verification email.");
        } finally {
            setResendLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>

                <Card className="border-2 border-orange-200 shadow-lg">
                    <CardHeader className="text-center">
                        <div className="w-14 h-14 mx-auto mb-4">
                            <img src="/assets/logo.png" alt="twendrive-logo" className="object-contain" />
                        </div>
                        <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Email Verification
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="text-center text-gray-700 space-y-4">
                        {status === 'loading' && <p className="animate-pulse">Verifying your email...</p>}

                        {status !== 'loading' && <p>{message}</p>}

                        {resendError && <p className="text-sm text-red-500">{resendError}</p>}

                        {status === 'success' && (
                            <Button
                                variant="outline"
                                onClick={() => navigate('/login')}
                                className="text-orange-600 border-orange-300 hover:bg-orange-50"
                            >
                                Proceed to Login
                            </Button>
                        )}

                        {status === 'error' && email && (
                            <Button
                                onClick={handleResend}
                                disabled={resendLoading}
                                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md disabled:opacity-50"
                            >
                                {resendLoading ? 'Resending...' : 'Resend Verification Email'}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VerifyEmail;
