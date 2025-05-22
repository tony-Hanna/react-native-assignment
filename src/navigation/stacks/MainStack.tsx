import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Details } from '../../screens';
import { MainStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import EditProduct from '../../screens/EditProduct/EditProduct';
import { CameraScreen } from '../../screens/Camera/CameraScreen';
import { Location } from '../../screens/location/Location';
const MainStack = createNativeStackNavigator<MainStackParamList>()

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <MainStack.Screen name="MainTabs" component={TabNavigator} />
      <MainStack.Screen name="Details" component={Details} />
      <MainStack.Screen name="EditProduct" component={EditProduct} />
      <MainStack.Screen name="CameraScreen" component={CameraScreen} />
      <MainStack.Screen name="Location" component={Location} />
    </MainStack.Navigator>
  )
}

