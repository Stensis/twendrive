
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { PaymentEscrowProps } from '@/lib/types';

const PaymentEscrow: React.FC<PaymentEscrowProps> = ({
  carDetails,
  bookingDetails,
  onPaymentSuccess,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const baseAmount = carDetails.price * bookingDetails.days;
  const appCommission = Math.round(baseAmount * 0.15); // 15% commission
  const ownerAmount = baseAmount - appCommission;
  const securityDeposit = Math.round(baseAmount * 0.2); // 20% security deposit
  const totalAmount = baseAmount + securityDeposit;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Here you would integrate with actual payment processor
    // For now, we'll simulate success
    
    // Send notifications to owner
    console.log('Sending booking notification to owner:', carDetails.owner);
    console.log('Payment held in escrow:', baseAmount);
    console.log('App commission:', appCommission);
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-orange-600" />
            <span>Secure Escrow Payment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Secure Payment:</strong> Your payment is held safely in escrow until you confirm receipt of the vehicle. 
              The owner will be paid only after successful pickup confirmation.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Car:</span>
                  <span className="font-medium">{carDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{bookingDetails.days} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate per day:</span>
                  <span className="font-medium">KSh {carDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rental amount:</span>
                  <span className="font-medium">KSh {baseAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security deposit:</span>
                  <span className="font-medium">KSh {securityDeposit}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-bold text-green-600">KSh {totalAmount}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Payment Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>To Owner:</span>
                  <span className="font-medium">KSh {ownerAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span className="font-medium">KSh {appCommission}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span className="font-medium">KSh {securityDeposit}</span>
                </div>
              </div>
              <Alert className="mt-3 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-xs">
                  Security deposit will be refunded within 24 hours after vehicle return, 
                  subject to damage inspection.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <div className="space-y-4">
              <div>
                <Label>Card Number</Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiry Date</Label>
                  <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              onClick={handlePayment}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay KSh {totalAmount} Securely
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentEscrow;
