import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { ThemeProvider } from './src/store/themeContext';
import { MainStackNavigator, AuthStackNavigator } from './src/navigation/stacks';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <SafeAreaProvider>
      <ThemeProvider>
      <NavigationContainer>
        {isAuthenticated? <MainStackNavigator />: <AuthStackNavigator />}
      </NavigationContainer>       
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App