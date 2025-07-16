import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { resetPassword } from '@/services/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // 👁️ Icons

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { toast } = useToast();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await resetPassword(token || '', password, confirmPassword);
        setLoading(false);

        toast({
            description: res.message || 'Reset failed',
        });

        if (res.success) {
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }
    };

    if (!token) {
        return <p className="text-center text-red-500 mt-10">Invalid or missing token.</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="max-w-md w-full">
                <Card className="border-2 border-orange-200 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-orange-600">
                            Reset Your Password
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            Enter your new password below.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleReset} className="space-y-4">
                            <div className="relative">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border-orange-200 focus:border-orange-400 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-9 right-3 text-orange-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <div className="relative">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="border-orange-200 focus:border-orange-400 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((prev) => !prev)}
                                    className="absolute top-9 right-3 text-orange-500"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="animate-spin" size={18} />}
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
