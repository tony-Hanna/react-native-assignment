import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Products } from '../../screens/Products/Products';
import { Profile } from '../../screens/Profile/Profile';
import { useTheme } from '../../store/themeContext';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { TabParamList } from './types';
import AddProduct from '../../screens/AddProduct.tsx/AddProduct';
import { HomeIcon, AddIcon, ProfileIcon, CartIcon } from '../../assets/icons/TabBarIcons';
import { Cart } from '../../screens/Cart/Cart';
const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { theme, isDark } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#374151' : '#fff',
          height:70
        },
        tabBarInactiveTintColor: theme.text,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Products}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color, fontSize: 12, paddingBottom:20 }}>Home</CustomText>
          ),
        }}
      />
      <Tab.Screen 
        name="AddProduct" 
        component={AddProduct}
        options={{
          tabBarIcon: ({ color }) => <AddIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color, fontSize: 12, paddingBottom:20 }}>Add Product</CustomText>
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color, fontSize: 12, paddingBottom:20 }}>Cart</CustomText>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color, fontSize: 12, paddingBottom:20 }}>Profile</CustomText>
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 