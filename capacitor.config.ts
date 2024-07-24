import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hu.lsmhun.wagesum.angui',
  appName: 'WageSumUI',
  webDir: 'dist/wage-sum-angular-ui',
  server: {
    androidScheme: 'https'
  }
};

export default config;
