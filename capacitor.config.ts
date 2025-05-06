import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tracker.pet',
  webDir: 'www',
  plugins: {
    Geolocation: {
      // Para iOS
      iosScheme: 'location',
      // Para Android
      androidAccuracy: 'high'
    }
  }
};

export default config;
