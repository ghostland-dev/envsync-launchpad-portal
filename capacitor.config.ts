import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9a72b6015158408c9004c048e505e885',
  appName: 'envsync-launchpad-portal',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://9a72b601-5158-408c-9004-c048e505e885.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;