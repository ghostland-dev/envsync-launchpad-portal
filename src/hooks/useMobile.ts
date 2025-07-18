import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';

interface DeviceInfo {
  platform: string;
  model: string;
  operatingSystem: string;
  osVersion: string;
  manufacturer: string;
  isVirtual: boolean;
}

interface NetworkInfo {
  connected: boolean;
  connectionType: string;
}

export const useMobile = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({ connected: true, connectionType: 'unknown' });
  const [isNativeMobile, setIsNativeMobile] = useState(false);

  useEffect(() => {
    const initializeMobile = async () => {
      // Check if running on native mobile
      setIsNativeMobile(Capacitor.isNativePlatform());

      if (Capacitor.isNativePlatform()) {
        // Get device information
        const info = await Device.getInfo();
        setDeviceInfo(info as DeviceInfo);

        // Get network status
        const status = await Network.getStatus();
        setNetworkInfo({
          connected: status.connected,
          connectionType: status.connectionType
        });

        // Listen for network changes
        Network.addListener('networkStatusChange', (status) => {
          setNetworkInfo({
            connected: status.connected,
            connectionType: status.connectionType
          });
        });
      }
    };

    initializeMobile();
  }, []);

  return {
    isNativeMobile,
    deviceInfo,
    networkInfo,
    isOnline: networkInfo.connected
  };
};