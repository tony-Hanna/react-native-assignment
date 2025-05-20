import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Products } from '../../screens/Products/Products';
import { Profile } from '../../screens/Profile/Profile';
import { useTheme } from '../../store/themeContext';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { TabParamList } from './types';
import AddProduct from '../../screens/AddProduct.tsx/AddProduct';
import { HomeIcon, AddIcon, ProfileIcon } from '../../assets/icons/tabBarIcons';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? theme.background : '#fff',
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
            <CustomText style={{ color, fontSize: 12 }}>Home</CustomText>
          ),
        }}
      />
      <Tab.Screen 
        name="AddProduct" 
        component={AddProduct}
        options={{
          tabBarIcon: ({ color }) => <AddIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color, fontSize: 12 }}>Add Product</CustomText>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <CustomText style={{ color, fontSize: 12 }}>Profile</CustomText>
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 