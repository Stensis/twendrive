
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, ArrowLeft, Users } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'renter' | 'owner'>('renter');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, check if user exists in localStorage
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedEmail && storedEmail === formData.email) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/renter-dashboard');
      }
    } else {
      // Demo users for testing
      if (formData.email === 'owner@test.com' || (formData.email === 'renter@test.com' && activeTab === 'owner')) {
        localStorage.setItem('userRole', 'owner');
        localStorage.setItem('userName', 'John Doe');
        localStorage.setItem('userEmail', formData.email);
        navigate('/owner-dashboard');
      } else if (formData.email === 'renter@test.com' || (formData.email === 'owner@test.com' && activeTab === 'renter')) {
        localStorage.setItem('userRole', 'renter');
        localStorage.setItem('userName', 'Jane Smith');
        localStorage.setItem('userEmail', formData.email);
        navigate('/renter-dashboard');
      } else {
        // Use the selected tab to determine role
        localStorage.setItem('userRole', activeTab);
        localStorage.setItem('userName', activeTab === 'owner' ? 'John Doe' : 'Jane Smith');
        localStorage.setItem('userEmail', formData.email);
        navigate(activeTab === 'owner' ? '/owner-dashboard' : '/renter-dashboard');
      }
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
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
            </div>
            <p className="text-gray-600">Sign in to your Twende Ride account</p>
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
                  placeholder="Enter your password"
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Sign In as {activeTab === 'owner' ? 'Car Owner' : 'Renter'}
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
              <div className="text-xs text-gray-500 bg-gradient-to-r from-orange-50 to-red-50 p-2 rounded border border-orange-200">
                Demo: Any email with any password works
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
