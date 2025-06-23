import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building } from 'lucide-react';
import { WithdrawModalProps } from '@/lib/types';

const WithdrawModal: React.FC<WithdrawModalProps> = ({
    show,
    onClose,
    onWithdraw,
    withdrawalAmount,
    setWithdrawalAmount,
    withdrawalMethod,
    setWithdrawalMethod,
    availableBalance,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Withdraw Funds</span>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            ✕
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Available Balance</Label>
                        <p className="text-2xl font-bold text-green-600">
                            KSh {availableBalance.toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <Label>Withdrawal Amount</Label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            max={availableBalance}
                        />
                    </div>

                    <div>
                        <Label>Withdrawal Method</Label>
                        <div className="space-y-2 mt-2">
                            <div
                                className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${withdrawalMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                                    }`}
                                onClick={() => setWithdrawalMethod('mpesa')}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">M</span>
                                    </div>
                                    <span className="font-medium">M-Pesa</span>
                                </div>
                            </div>

                            <div
                                className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${withdrawalMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                onClick={() => setWithdrawalMethod('bank')}
                            >
                                <div className="flex items-center space-x-3">
                                    <Building className="h-6 w-6 text-blue-600" />
                                    <span className="font-medium">Bank Transfer</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {withdrawalMethod === 'mpesa' && (
                        <div>
                            <Label>M-Pesa Number</Label>
                            <Input placeholder="254712345678" />
                        </div>
                    )}

                    {withdrawalMethod === 'bank' && (
                        <div className="space-y-3">
                            <div>
                                <Label>Bank</Label>
                                <select className="w-full p-2 border border-gray-300 rounded-md">
                                    <option value="">Select bank</option>
                                    <option value="equity">Equity Bank</option>
                                    <option value="kcb">KCB Bank</option>
                                    <option value="coop">Co-operative Bank</option>
                                </select>
                            </div>
                            <div>
                                <Label>Account Number</Label>
                                <Input placeholder="Enter account number" />
                            </div>
                        </div>
                    )}

                    <Button
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        onClick={onWithdraw}
                        disabled={!withdrawalAmount || !withdrawalMethod}
                    >
                        Withdraw KSh {withdrawalAmount || '0'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default WithdrawModal;
