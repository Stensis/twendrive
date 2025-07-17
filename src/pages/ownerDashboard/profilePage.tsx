import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, Upload, Camera } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { updateUserProfile } from '@/services/owner/updates';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
    // user from auth slice
    const { user, setUser } = useAuth();
    const { toast } = useToast();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [userName, setUserName] = useState(user?.userName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [location, setLocation] = useState('Nairobi, Kenya');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!user)
        return <div className="text-center text-red-600 font-medium">User not found. Please log in again.</div>;

    const initials =
        typeof user.userName === 'string' && user.userName.trim() !== ''
            ? user.userName
                .trim()
                .split(/\s+/)
                .map((n) => n[0])
                .join('')
                .toUpperCase()
            : 'U';
    console.log("the user avatar:", user.avatar)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatar(URL.createObjectURL(file)); // Preview
        }
    };
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();

            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('userName', String(userName));
            formData.append('email', email);
            formData.append('phone', String(phone));
            formData.append('location', location);

            // Only send avatar if it's a file
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            } else if (avatar) {
                formData.append('avatarUrl', avatar); // separate field for URL
            }

            const res = await updateUserProfile(formData); // updated to accept FormData

            toast({
                title: 'Profile Updated',
                description: 'Your profile information has been updated successfully.',
            });

            if (res.user) {
                setUser?.(res.user);
            }
        } catch (error: any) {
            toast({
                title: 'Update Failed',
                description: error.response?.data?.message || 'Something went wrong.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-2 border-orange-200">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        {/* Avatar and Upload */}
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                                <img
                                    src={avatar || '/default-avatar.png'}
                                    alt="User avatar"
                                    className="rounded-full object-cover w-full h-full"
                                />
                                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                {/* <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG, max 2MB</p> */}

                                <Label className="text-sm mt-2 block">Avatar URL</Label>
                                <Input
                                    value={avatar}
                                    onChange={(e) => {
                                        setAvatarFile(null); // clear file if URL entered
                                        setAvatar(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Full Name</Label>
                            <Input
                                value={`${firstName} ${lastName}`}
                                onChange={(e) => {
                                    const parts = e.target.value.split(' ');
                                    setFirstName(parts[0] || '');
                                    setLastName(parts.slice(1).join(' ') || '');
                                }}
                            />
                        </div>

                        <div>
                            <Label>Username</Label>
                            <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>

                        <div>
                            <Label>Email</Label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <Label>Phone Number</Label>
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <Button
                            onClick={handleUpdate} disabled={isLoading}
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                            Update Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* KYC Section */}
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

            {/* Security Settings */}
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

            {/* Danger Zone */}
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
                                console.log("Account deletion confirmed.");
                                alert("Your account has been deleted.");
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
