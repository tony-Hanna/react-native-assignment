import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/store/themeContext';
import {RootNavigator} from './src/navigation/navigator/RootNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {OneSignal, LogLevel} from 'react-native-onesignal';
const queryClient = new QueryClient();
const App = () => {

      // Enable verbose logging for debugging (remove in production)
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);   
      // Initialize with your OneSignal App ID
      OneSignal.initialize('82626782-21ca-44f5-b55e-090c2431cd36');
      // Use this method to prompt for push notifications.
      // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
      OneSignal.Notifications.requestPermission(false);
    
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