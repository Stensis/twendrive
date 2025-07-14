
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Users, ArrowLeft } from 'lucide-react';
import { registerUser } from '@/services/auth';
import { signUpSchema } from '@/validators/auth/signupValidator';

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || '';
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState<'renter' | 'owner'>(
    initialRole === 'owner' ? 'owner' : 'renter'
  );
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Validate the form data
      await signUpSchema.validate(formData, { abortEarly: false });

      const role: 'car_owner' | 'car_renter' = activeTab === 'owner' ? 'car_owner' : 'car_renter';
      const { confirmPassword, ...rest } = formData;

      const dataToSend = {
        ...rest,
        role,
      };

      const response = await registerUser(dataToSend);

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });

      navigate(role === 'car_owner' ? '/owner-dashboard' : '/renter-dashboard');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        // ✅ Collect all error messages and show them
        err.inner.forEach((validationErr: any) => {
          toast({
            title: "Validation Error",
            description: validationErr.message,
            variant: "destructive",
          });
        });
      } else if (err.response?.data?.message) {
        toast({
          title: "Registration Failed",
          description: err.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Registration failed. Please try again.",
          variant: "destructive",
        });
      }

      console.error(err);
    }
  };

  if (!selectedRole) {
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
                <div className="w-14 h-14  rounded-lg flex">
                  <img src="/assets/logo.png" alt="twendrive-logo" className=" object-contain" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Choose Your Role
                </CardTitle>
              </div>
              <p className="text-gray-600">How do you want to use Twende Ride?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setSelectedRole('renter');
                  setActiveTab('renter');
                }}
                className="w-full h-20 border-2 border-orange-200 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">I'm a Renter</div>
                    <div className="text-sm text-gray-600">I want to rent cars</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setSelectedRole('owner');
                  setActiveTab('owner');
                }}
                className="w-full h-20 border-2 border-red-200 hover:border-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4">
                  <Car className="h-8 w-8 text-red-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">I'm a Car Owner</div>
                    <div className="text-sm text-gray-600">I want to rent out my car</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4 mb-3">
      <div className="max-w-md w-full">
        <Button
          variant="ghost"
          onClick={() => setSelectedRole('')}
          className="m-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Role
        </Button>

        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="rounded-full p-2">
                {activeTab === 'owner' ? (
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                    <img src="/assets/logo.png" alt="twendrive-logo" className="object-contain" />
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                      <img src="/assets/logo.png" alt="twendrive-logo" className="object-contain" />
                    </div>
                  </>
                )}
              </div>

              <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Join TwenDrive
              </CardTitle>
            </div>
            <p className="text-gray-600">
              Create your account and start your journey
            </p>
          </CardHeader>
          <CardContent>
            {/* Role Toggle Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('renter')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'renter'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Users className="h-4 w-4" />
                <span>Car Renter</span>
              </button>
              <button
                onClick={() => setActiveTab('owner')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'owner'
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
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                />
              </div>
              <div>
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                />
              </div>

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
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-orange-200 focus:border-orange-400"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Create {activeTab === 'owner' ? 'Car Owner' : ' Car Renter'} Account
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
