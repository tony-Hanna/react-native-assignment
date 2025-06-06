import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/store/themeContext';
import {RootNavigator} from './src/navigation/navigator/RootNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { oneSignal } from './src/utils/onesignal';
import { splash } from './src/utils/splash';
const queryClient = new QueryClient();

const App = () => {

      useEffect(() => {
        oneSignal()    
        splash()
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