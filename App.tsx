import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/store/themeContext';
import {RootNavigator} from './src/navigation/navigator/RootNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import {OneSignal, LogLevel} from 'react-native-onesignal';
import { Linking } from 'react-native';
import BootSplash from "react-native-bootsplash";
import Config from 'react-native-config';
const queryClient = new QueryClient();
const App = () => {
      console.log('COFN',Config.APP_ID)
      // Enable verbose logging for debugging (remove in production)
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);   
      // Initialize with your OneSignal App ID
      OneSignal.initialize('82626782-21ca-44f5-b55e-090c2431cd36');
      // Use this method to prompt for push notifications.
      // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
      OneSignal.Notifications.requestPermission(false);
      useEffect(() => {
        // Listen for notification open events
        OneSignal.Notifications.addEventListener('click', (event) => {
          const url = event.notification?.launchURL;
          if (url) {
            Linking.openURL(url);
          }
        });
      }, []);
      useEffect(() => {
        const init = async () => {
          // …do multiple sync or async tasks
        };
    
        init().finally(async () => {
          await BootSplash.hide({ fade: true });
          console.log("BootSplash has been hidden successfully");
        });
      }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider>
              <RootNavigator /> 
              <Toast />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default App