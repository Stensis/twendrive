import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Shield, CreditCard, Building } from 'lucide-react';
import {  PaymentPageProps } from '@/lib/renter/types';

const PaymentPage: React.FC<PaymentPageProps> = ({
  selectedCar,
  paymentMethod,
  setPaymentMethod,
  onBack,
  onPaymentComplete
}) => {
  const days = 1;
  const totalAmount = selectedCar.price * days;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Car Details
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img src={selectedCar.images[0]} alt={selectedCar.name} className="w-full h-48 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold text-lg">{selectedCar.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedCar.location}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Duration:</span><span className="font-medium">{days} day</span></div>
                <div className="flex justify-between"><span>Rate per day:</span><span className="font-medium">KSh {selectedCar.price}</span></div>
                <div className="flex justify-between border-t pt-2"><span className="font-bold">Total Amount:</span><span className="font-bold text-green-600">KSh {totalAmount}</span></div>
              </div>
              <Alert className="border-blue-200 bg-blue-50">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Payment is secured through our escrow system.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* M-Pesa */}
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('mpesa')}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-medium">M-Pesa</p>
                    <p className="text-sm text-gray-600">Pay with your mobile money</p>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard accepted</p>
                  </div>
                </div>
              </div>

              {/* Bank */}
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer ${paymentMethod === 'bank' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-600">Direct bank transfer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditional Inputs */}
            {paymentMethod === 'mpesa' && (
              <div className="space-y-3">
                <Label>Phone Number</Label>
                <Input placeholder="254712345678" />
                <Alert className="border-green-200 bg-green-50">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    You will receive an M-Pesa prompt to complete payment.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                  <div><Label>CVV</Label><Input placeholder="123" /></div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-3">
                <div>
                  <Label>Bank</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select your bank</option>
                    <option value="equity">Equity Bank</option>
                    <option value="kcb">KCB Bank</option>
                    <option value="coop">Co-operative Bank</option>
                    <option value="absa">Absa Bank</option>
                  </select>
                </div>
                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    You will be redirected to your bank's secure portal.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <Button
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              disabled={!paymentMethod}
              onClick={onPaymentComplete}
            >
              <Shield className="h-4 w-4 mr-2" />
              Pay KSh {totalAmount} Securely
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
