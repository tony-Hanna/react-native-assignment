import { MainStackNavigator, AuthStackNavigator } from '../stacks';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../store/AuthContext';
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
export {RootNavigator}