import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/login';
import React from 'react';
import HomeScreen from '../pages/home';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
