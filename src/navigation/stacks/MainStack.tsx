import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Products, Details, Signup } from '../../screens';

const MainStack = createNativeStackNavigator()
export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{
      headerShown: false
    }}>
          <MainStack.Screen name="Products" component={Products} />
          <MainStack.Screen name="Details" component={Details} />
          <MainStack.Screen name="Signup" component={Signup} />
    </MainStack.Navigator>
  )
}

