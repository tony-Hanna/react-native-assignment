import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../../screens/LoginForm/Login';
import { Signup } from '../../screens/Signup/Signup';
import { Verification } from '../../screens/Verification/Verification';
const AuthStack = createNativeStackNavigator()
export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Signup" component={Signup} />
          <AuthStack.Screen name="Verification" component={Verification} />
    </AuthStack.Navigator>
  );
};
