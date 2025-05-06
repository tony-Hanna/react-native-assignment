import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../../components/organisms/LoginForm/Login';
import { Signup } from '../../screens/Signup/Signup';
const AuthStack = createNativeStackNavigator()
export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};
