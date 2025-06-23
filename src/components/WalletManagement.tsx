
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Building, X, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WalletManagementProps } from '@/lib/types';
import transactionData from '@/data/transactions.json';

const WalletManagement: React.FC<WalletManagementProps> = ({ balance, onClose }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const transactions = transactionData;

  const handleWithdraw = () => {
    if (parseFloat(withdrawAmount) > balance) {
      alert('Insufficient balance');
      return;
    }

    console.log('Withdrawal request:', {
      amount: withdrawAmount,
      method: withdrawMethod,
      mpesaNumber: withdrawMethod === 'mpesa' ? mpesaNumber : null,
      bankAccount: withdrawMethod === 'bank' ? bankAccount : null
    });

    // Simulate withdrawal processing
    alert('Withdrawal request submitted. Funds will be transferred within 24 hours.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Wallet Management</h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Balance & Withdraw */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-orange-600" />
              <span>Wallet Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">KSh {balance}</p>
              <p className="text-sm text-gray-600">Available for withdrawal</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Withdrawal Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={balance}
                />
              </div>

              <div>
                <Label>Withdrawal Method</Label>
                <div className="space-y-2 mt-2">
                  <div
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${withdrawMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                    onClick={() => setWithdrawMethod('mpesa')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <span className="font-medium">M-Pesa</span>
                    </div>
                  </div>

                  <div
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${withdrawMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    onClick={() => setWithdrawMethod('bank')}
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                  </div>
                </div>
              </div>

              {withdrawMethod === 'mpesa' && (
                <div>
                  <Label>M-Pesa Number</Label>
                  <Input
                    placeholder="254712345678"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                  />
                </div>
              )}

              {withdrawMethod === 'bank' && (
                <div>
                  <Label>Bank Account</Label>
                  <Input
                    placeholder="Account number"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>
              )}

              <Button
                onClick={handleWithdraw}
                className="w-full bg-gradient-to-r from-green-500 to-green-600"
                disabled={!withdrawAmount || !withdrawMethod || parseFloat(withdrawAmount) <= 0}
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Withdraw KSh {withdrawAmount || '0'}
              </Button>

              <Alert className="border-blue-200 bg-blue-50">
                <Clock className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm">
                  Withdrawals are processed within 24 hours during business days.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${transaction.type === 'refund' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                      {transaction.type === 'refund' ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {transaction.amount > 0 ? '+' : ''}KSh {Math.abs(transaction.amount)}
                    </p>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletManagement;
