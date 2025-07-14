import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, ArrowLeft, Users } from 'lucide-react';
import { loginUser } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'car_renter' | 'car_owner'>('car_renter');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({
        identifier: formData.email,
        password: formData.password,
        role: activeTab,
      });

      if (res.status === 401 && res.data?.status === 'otp-required') {
        localStorage.setItem('tempLogin', JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: activeTab,
        }));
        navigate('/verify-otp', {
          state: {
            userId: res.data.data.userId,
            email: res.data.data.email,
          },
        });
      } else if (res.data?.data?.accessToken) {
        const { accessToken, user } = res.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);

        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });

        navigate(user.role === 'car_owner' ? '/owner-dashboard' : '/renter-dashboard');
      }
    } catch (err: any) {
      const errorData = err.response?.data;

      if (err.response?.status === 401 && errorData?.status === 'otp-required') {
        localStorage.setItem('tempLogin', JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: activeTab,
        }));
        navigate('/verify-otp', {
          state: {
            userId: errorData.data.userId,
            email: errorData.data.email,
          },
        });
      } else {
        toast({
          title: "Login Failed",
          description: errorData?.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
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
            <div className="flex items-center justify-center space-x-2 mb-2">

              <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                <img src="/assets/logo.png" alt="twendrive-logo" className="object-contain" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
            </div>
            <p className="text-gray-600">Sign in to your TwenDrive account</p>
          </CardHeader>
          <CardContent>
            {/* Role Toggle Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('car_renter')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'car_renter'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Users className="h-4 w-4" />
                <span>Renter</span>
              </button>

              <button
                onClick={() => setActiveTab('car_owner')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'car_owner'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Car className="h-4 w-4" />
                <span>Car Owner</span>
              </button>

            </div>


            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                  placeholder="your@email.com"
                />
              </div>

              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400 pr-10"
                  placeholder="Enter your password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                >
                  {showPassword ? <span>🙈</span> : <span>👁️</span>}
                </div>
              </div>


              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? 'Signing in...' : `Sign In as ${activeTab === 'car_owner' ? 'Car Owner' : 'Car Renter'}`}
              </Button>

            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>

        </Card>
      </div>
    </div>
  );
};

export default SignIn;