import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {


//     DollarSign,
//     Clock,
//     Upload,
//     BarChart3
// } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import earningsBreakdownData from '@/data/owner/earningsBreakdown.json';
import transactionHistoryData from '@/data/owner/transactionHistory.json';
import { BarChart3, Clock, DollarSign, Upload } from 'lucide-react';
import WithdrawModal from '@/components/owner/WithdrawModal';

const OwnerEarningsPage = () => {
    const navigate = useNavigate();
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const [withdrawalMethod, setWithdrawalMethod] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    const userName = localStorage.getItem('userName') || 'John Doe';
    const userEmail = localStorage.getItem('userEmail') || 'owner@test.com';

    const financialData = {
        totalEarnings: 6970,
        availableBalance: 5940,
        pendingEarnings: 1030,
        totalCommission: 1230,
        totalWithdrawn: 15000,
        thisMonthEarnings: 2040,
        lastMonthEarnings: 1657,
    };

    const earningsBreakdown = earningsBreakdownData;
    const transactionHistory = transactionHistoryData;

    const handleWithdrawal = () => {
        console.log(`Withdrawing KSh ${withdrawalAmount} via ${withdrawalMethod}`);
        setShowWithdrawal(false);
        setWithdrawalAmount('');
        setWithdrawalMethod('');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Earnings</h2>
                <Button
                    onClick={() => setShowWithdrawal(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Withdraw Funds
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-2 border-green-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Available Balance</p>
                                <p className="text-3xl font-bold text-green-600">KSh {financialData.availableBalance.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">After 15% commission</p>
                            </div>
                            {/* <DollarSign className="h-8 w-8 text-green-600" /> */}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-yellow-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending Earnings</p>
                                <p className="text-3xl font-bold text-yellow-600">KSh {financialData.pendingEarnings.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">Net amount</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-red-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Commission</p>
                                <p className="text-3xl font-bold text-red-600">KSh {financialData.totalCommission.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">15% service fee</p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Withdrawn</p>
                                <p className="text-3xl font-bold text-purple-600">KSh {financialData.totalWithdrawn.toLocaleString()}</p>
                            </div>
                            <Upload className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Earnings by Car</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {earningsBreakdown.map((car) => (
                            <div key={car.carId} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{car.carName}</h3>
                                        <p className="text-sm text-gray-600">{car.bookingsCount} bookings • {car.avgRating} ⭐</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-green-600">KSh {car.netEarnings.toLocaleString()}</p>
                                        <p className="text-sm text-gray-600">Your earnings</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Gross Earnings</p>
                                        <p className="font-medium">KSh {car.grossEarnings.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Commission (15%)</p>
                                        <p className="font-medium text-red-600">-KSh {car.commission}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Net Earnings</p>
                                        <p className="font-medium text-green-600">KSh {car.netEarnings.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {transactionHistory.map((transaction) => (
                            <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-2 rounded-full ${transaction.type === 'earning' ? 'bg-green-100' : 'bg-blue-100'}`}>
                                        {transaction.type === 'earning' ? (
                                            <DollarSign className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Upload className="h-4 w-4 text-blue-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {transaction.type === 'earning' ? `Booking payment - ${transaction.carName}` : `Withdrawal via ${transaction.method}`}
                                        </p>
                                        <p className="text-sm text-gray-600">{transaction.date}</p>
                                        {transaction.renterName && (
                                            <p className="text-sm text-gray-500">Renter: {transaction.renterName}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    {transaction.type === 'earning' ? (
                                        <div>
                                            <p className="text-sm text-gray-500">Gross: KSh {transaction.grossAmount}</p>
                                            <p className="text-sm text-red-600">Commission: -KSh {transaction.commission}</p>
                                            <p className="font-bold text-green-600">Net: +KSh {transaction.netAmount}</p>
                                        </div>
                                    ) : (
                                        <p className="font-bold text-blue-600">-KSh {transaction.amount}</p>
                                    )}
                                    <Badge className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                        {transaction.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <WithdrawModal
                show={showWithdrawal}
                onClose={() => setShowWithdrawal(false)}
                onWithdraw={handleWithdrawal}
                withdrawalAmount={withdrawalAmount}
                setWithdrawalAmount={setWithdrawalAmount}
                withdrawalMethod={withdrawalMethod}
                setWithdrawalMethod={setWithdrawalMethod}
                availableBalance={financialData.availableBalance}
            />

        </div>
    );
};

export default OwnerEarningsPage;