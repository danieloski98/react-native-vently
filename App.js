/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Image, TouchableHighlight, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Usernameselect from './components/usernameselect';
import Emailverification from './components/emailverification';
import Dashboard from './pages/dashboard';
import Password from './components/resetpassword';
import Events from './pages/event';
import PasswordReset from './components/resetpassword';
import Interests from './components/interests';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen  name="home" component={Home} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen  name="home" component={Interests} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Event"
          component={Events}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Usernameselect"
          component={Usernameselect}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Emailverify"
          component={Emailverification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="resetpassword"
          component={PasswordReset}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Interests"
          component={Interests}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
