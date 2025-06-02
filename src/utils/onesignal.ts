import {OneSignal, LogLevel} from 'react-native-onesignal';
import { Linking } from 'react-native';
import Config from 'react-native-config';
export const oneSignal = () => {
    console.log('env type',Config.ENV_TYPE)
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);   
    // Initialize with your OneSignal App ID
    OneSignal.initialize('82626782-21ca-44f5-b55e-090c2431cd36');
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
    OneSignal.Notifications.requestPermission(false);
    OneSignal.Notifications.addEventListener('click', (event) => {
      const url = event.notification?.launchURL;
      if (url) {
        Linking.openURL(url);
      }
    });
}