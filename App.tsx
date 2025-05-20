import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/store/themeContext';
import {RootNavigator} from './src/navigation/navigator/RootNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
            <RootNavigator /> 
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App