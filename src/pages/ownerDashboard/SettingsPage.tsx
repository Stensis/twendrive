// src/pages/ownerDashboard/SettingsPage.tsx

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
    });

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState('en');
    const [isPublic, setIsPublic] = useState(true);

    const handleDownloadData = () => {
        alert("Downloading your data...");
        // Simulate or connect to actual backend download
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings & Preferences</h2>

            {/* Notifications */}
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Email Notifications</Label>
                        <Switch
                            checked={notifications.email}
                            onCheckedChange={(val) => setNotifications({ ...notifications, email: val })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>SMS Notifications</Label>
                        <Switch
                            checked={notifications.sms}
                            onCheckedChange={(val) => setNotifications({ ...notifications, sms: val })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Push Notifications</Label>
                        <Switch
                            checked={notifications.push}
                            onCheckedChange={(val) => setNotifications({ ...notifications, push: val })}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label>Theme</Label>
                    <Select value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Language */}
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Language</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label>Select Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="sw">Swahili</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Visibility */}
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Account Visibility</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <Label>{isPublic ? 'Public Profile' : 'Private Profile'}</Label>
                    <Switch
                        checked={isPublic}
                        onCheckedChange={(val) => setIsPublic(val)}
                    />
                </CardContent>
            </Card>

            {/* Data Export */}
            <Card className="border-2 border-orange-200">
                <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Download a copy of your personal data and usage information.
                    </p>
                    <Button onClick={handleDownloadData} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download My Data
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
