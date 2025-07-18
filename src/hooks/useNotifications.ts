import { useState, useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
  id?: number;
}

export const useNotifications = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeNotifications();
    }
  }, []);

  const initializeNotifications = async () => {
    try {
      // Request permission for push notifications
      const pushPermission = await PushNotifications.requestPermissions();
      const localPermission = await LocalNotifications.requestPermissions();
      
      setPermissionGranted(
        pushPermission.receive === 'granted' && 
        localPermission.display === 'granted'
      );

      if (pushPermission.receive === 'granted') {
        // Register for push notifications
        await PushNotifications.register();

        // Listen for registration
        PushNotifications.addListener('registration', (token) => {
          setPushToken(token.value);
        });

        // Listen for push notification received
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push notification received:', notification);
        });

        // Listen for push notification action performed
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          console.log('Push notification action performed:', notification);
        });
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const sendLocalNotification = async (notification: NotificationPayload) => {
    if (!Capacitor.isNativePlatform()) {
      // Fallback for web - use browser notifications
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.body,
          icon: '/favicon.ico'
        });
      }
      return;
    }

    try {
      await LocalNotifications.schedule({
        notifications: [{
          title: notification.title,
          body: notification.body,
          id: notification.id || Date.now(),
          extra: notification.data,
          schedule: { at: new Date(Date.now() + 1000) }
        }]
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  };

  const requestWebNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionGranted(permission === 'granted');
      return permission === 'granted';
    }
    return false;
  };

  return {
    permissionGranted,
    pushToken,
    sendLocalNotification,
    requestWebNotificationPermission,
    isNative: Capacitor.isNativePlatform()
  };
};