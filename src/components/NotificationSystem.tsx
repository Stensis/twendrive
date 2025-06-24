
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, Phone, MessageSquare, CheckCircle, AlertTriangle, Car, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import rawNotificationData from '@/data/notifications.json';
import { Notification } from "../lib/owner/types";

const notificationData: Notification[] = rawNotificationData.map((n) => ({
  ...n,
  type: n.type as Notification['type'],
  priority: n.priority as Notification['priority']
}));

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationData);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Car className="h-4 w-4" />;
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'return': return <CheckCircle className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new booking notification
      if (Math.random() > 0.95) {
        const newNotification: Notification = {
          id: Date.now(),
          type: 'booking',
          title: 'New Booking Alert',
          message: 'Your vehicle has been booked! Payment is secured in escrow.',
          timestamp: new Date().toLocaleString(),
          read: false,
          priority: 'high',
          actionRequired: true
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Bell className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Notification Preferences:</strong> You can receive notifications via email, SMS, or in-app.
          Visit settings to customize your preferences.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`border-2 transition-all cursor-pointer ${notification.read ? 'border-gray-200 bg-gray-50' : 'border-orange-200 bg-white'
              }`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${notification.type === 'booking' ? 'bg-orange-100 text-orange-600' :
                  notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                    notification.type === 'return' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                  }`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                      {notification.actionRequired && (
                        <Badge className="bg-red-100 text-red-800">Action Required</Badge>
                      )}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{notification.timestamp}</span>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        SMS
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationSystem;
