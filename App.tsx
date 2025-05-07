import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/store/themeContext';
import { MainStackNavigator, AuthStackNavigator } from './src/navigation/stacks';
import { AuthProvider, useAuth } from './src/store/AuthContext';
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
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
export default App