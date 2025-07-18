import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export const useHaptics = () => {
  const impact = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.warn('Haptics not available:', error);
      }
    }
  };

  const notification = async (type: NotificationType = NotificationType.Success) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.notification({ type });
      } catch (error) {
        console.warn('Haptics not available:', error);
      }
    }
  };

  const vibrate = async (duration: number = 300) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.vibrate({ duration });
      } catch (error) {
        console.warn('Haptics not available:', error);
      }
    } else if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  };

  return {
    impact,
    notification,
    vibrate,
    isAvailable: Capacitor.isNativePlatform()
  };
};