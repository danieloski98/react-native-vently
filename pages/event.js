import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import FirstPage from '../components/createEvent/firstpage';

let Stack = createStackNavigator();

function Event(props) {
  return (
     <Stack.Navigator initialRouteName="first">
       <Stack.Screen name="first" component={FirstPage} options={{ headerShown: false}} />
     </Stack.Navigator>
  );
}

export default Event;
