import { MainStackNavigator, AuthStackNavigator } from '../stacks';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../../store/AuthStore';
import { ActivityIndicator, View } from 'react-native';
const RootNavigator = () => {
  const { accessToken, hasStoreLoaded } = useAuthStore();
  const isAuthenticated = !!accessToken
  const linking = {
    prefixes: ['firstapp://', 'https://firstapp.com'],
    config: {
      screens: {
        Details: 'product/:id',
      },
    },
  };
  if (!hasStoreLoaded) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
    </View>
  }
  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
export {RootNavigator}