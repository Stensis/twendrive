import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { requestPasswordReset } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function RequestReset() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        console.log('🔄 Submitting reset form with email:', email);

        const res = await requestPasswordReset(email);

        setLoading(false);

        toast({
            description: res.message || 'Something went wrong',
        });

        // 👇 Redirect to login if successful
        if (res.success) {
            setTimeout(() => {
                navigate('/login');
            }, 1500); // Wait 1.5s so user sees the toast
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="max-w-md w-full">
                <Card className="border-2 border-orange-200 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-orange-600">
                            Forgot Password?
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            Enter your email to receive a reset link.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRequest} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border-orange-200 focus:border-orange-400"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
