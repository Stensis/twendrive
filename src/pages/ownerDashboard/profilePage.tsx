import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Shield,
    CheckCircle,
    Upload,
    Camera,
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const ProfilePage = ({
    userName = 'John Doe',
    userEmail = 'owner@test.com'
}: {
    userName?: string;
    userEmail?: string;
}) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-2 border-orange-200">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Avatar Section */}
                        <div className="flex items-center space-x-4">
                            <div>
                                <Avatar className="w-16 h-16">
                                    <img
                                        src="/default-avatar.png" // replace with actual user avatar or dynamic URL
                                        alt="User avatar"
                                        className="rounded-full object-cover w-full h-full"
                                    />
                                </Avatar>
                            </div>
                            <div>
                                <Button variant="outline" size="sm">
                                    Upload New Photo
                                </Button>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG, max 2MB</p>
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <Label>Full Name</Label>
                            <Input defaultValue={userName} />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input defaultValue={userEmail} />
                        </div>

                        <div>
                            <Label>Phone Number</Label>
                            <Input defaultValue="+254 123 456 789" />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input defaultValue="Nairobi, Kenya" />
                        </div>

                        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                            Update Profile
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-2 border-orange-200">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-orange-600" />
                            <span>KYC & Documentation</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                Complete KYC verification builds trust with renters and increases booking rates.
                            </AlertDescription>
                        </Alert>

                        <div>
                            <Label className="flex items-center space-x-2">
                                <span>Driving License</span>
                                <Badge className="bg-green-100 text-green-800">Verified</Badge>
                            </Label>
                            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 text-center">
                                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                <p className="text-sm text-green-700">License verified successfully</p>
                            </div>
                        </div>

                        <div>
                            <Label>National ID</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Upload national ID</p>
                                <Button variant="outline" className="mt-2">Choose File</Button>
                            </div>
                        </div>

                        <div>
                            <Label>Selfie Verification</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Take a selfie for verification</p>
                                <Button variant="outline" className="mt-2">Take Photo</Button>
                            </div>
                        </div>

                        <div>
                            <Label>Business License (Optional)</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Upload business license for commercial use</p>
                                <Button variant="outline" className="mt-2">Choose File</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-red-600" />
                        <span>Security Settings</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label>Two-Factor Authentication</Label>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mt-2">
                                <span className="text-sm">SMS Authentication</span>
                                <Badge className="bg-red-100 text-red-800">Disabled</Badge>
                            </div>
                            <Button variant="outline" className="mt-2">Enable 2FA</Button>
                        </div>

                        <div>
                            <Label>Login Alerts</Label>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mt-2">
                                <span className="text-sm">Email Notifications</span>
                                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                            </div>
                            <Button variant="outline" className="mt-2">Manage Alerts</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-2 border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-red-700">
                        Deleting your account is irreversible. All your listings and data will be permanently removed.
                    </div>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                            const confirmed = confirm("Are you sure you want to delete your account? This action is irreversible.");
                            if (confirmed) {
                                // TODO: Replace with actual API call
                                console.log("Account deletion confirmed.");
                                alert("Your account has been deleted.");
                                // Optionally redirect or logout the user
                            }
                        }}
                    >
                        Delete My Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
