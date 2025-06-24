import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProfilePageProps } from '@/lib/renter/types';
import { Avatar } from '@/components/ui/avatar';

const ProfilePage: React.FC<ProfilePageProps> = ({ userName, userEmail }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
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
                <CardContent className="space-y-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input defaultValue={userName} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input defaultValue={userEmail} />
                    </div>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        Update Profile
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
