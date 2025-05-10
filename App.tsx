import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/store/themeContext';
import {RootNavigator} from './src/navigation/navigator/RootNavigator'
import { AuthProvider } from './src/store/AuthContext';
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigator /> 
        </AuthProvider>      
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App