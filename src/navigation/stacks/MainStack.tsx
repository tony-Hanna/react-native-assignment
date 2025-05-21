import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Details } from '../../screens';
import { MainStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import EditProduct from '../../screens/EditProduct/EditProduct';

const MainStack = createNativeStackNavigator<MainStackParamList>()

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <MainStack.Screen name="MainTabs" component={TabNavigator} />
      <MainStack.Screen name="Details" component={Details} />
      <MainStack.Screen name="EditProduct" component={EditProduct} />
    </MainStack.Navigator>
  )
}

