
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Users, ArrowLeft } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || '';
  
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState<'renter' | 'owner'>(
    initialRole === 'owner' ? 'owner' : 'renter'
  );
  const [formData, setFormData] = useState({
    fullName: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Store user data in localStorage for demo purposes
    localStorage.setItem('userRole', activeTab);
    localStorage.setItem('userName', formData.fullName);
    localStorage.setItem('userEmail', formData.email);
    
    // Navigate to appropriate dashboard
    if (activeTab === 'owner') {
      navigate('/owner-dashboard');
    } else {
      navigate('/renter-dashboard');
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
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                  <Car className="h-6 w-6 text-white" />
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Button
          variant="ghost"
          onClick={() => setSelectedRole('')}
          className="mb-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Role
        </Button>
        
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                {activeTab === 'owner' ? (
                  <Car className="h-6 w-6 text-white" />
                ) : (
                  <Users className="h-6 w-6 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Join Twende Ride
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
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'renter'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Renter</span>
              </button>
              <button
                onClick={() => setActiveTab('owner')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'owner'
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
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
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
                Create {activeTab === 'owner' ? 'Car Owner' : 'Renter'} Account
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/signin')}
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
