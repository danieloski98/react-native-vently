import React, {Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feeds from './feeds';
import Tickets from './Tickets';
import Profile from './Profile';
import Settings from './Settings';
import {useNavigation} from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

function CreateEvent() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'red',
        marginTop: -15,
        borderWidth: 7,
        borderColor: 'whitesmoke',
      }}>
      <TouchableWithoutFeedback
        style={{width: 80, height: 80, borderWidth: 7}}
        onPress={() => navigation.navigate('Event')}>
        <Image
          source={require('../assets/icon/event.png')}
          resizeMode="cover"
          style={{
            width: 80,
            height: 80,
            borderWidth: 7,
            borderColor: 'lightgrey',
            borderRadius: 50,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

function IconSwitch(props) {
  let iconColor;
  let iconSize;
  if (props.focused) {
    (iconColor = '#FF4471'), (iconSize = 30);
  } else {
    (iconColor = 'grey'), (iconSize = 26);
  }
  return (
    <View>
      <Icon name={props.iconName} color={iconColor} size={iconSize} />
    </View>
  );
}

export default class dashboard extends Component {
  render() {
    return (
      <BottomTab.Navigator
        tabBarOptions={{
          style: tabstyle.tab,
          activeTintColor: 'red',
          inactiveTintColor: 'grey',
          adaptive: true,
          allowFontScaling: true,
        }}
        initialRouteName="Feeds">
        <BottomTab.Screen
          name="Feeds"
          component={Feeds}
          options={{
            tabBarIcon: ({focused}) => (
              <IconSwitch focused={focused} iconName="md-paper" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Tickets"
          component={Tickets}
          options={{
            tabBarIcon: ({focused}) => (
              <IconSwitch focused={focused} iconName="md-document" />
            ),
          }}
        />
        <BottomTab.Screen
          name="feeds"
          options={{
            tabBarButton: navigation => <CreateEvent navigation={navigation} />,
          }}
          component={Feeds}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <IconSwitch focused={focused} iconName="md-person" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <IconSwitch focused={focused} iconName="md-options" />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

let tabstyle = StyleSheet.create({
  tab: {
    backgroundColor: 'white',
    height: '8%',
  },
});
