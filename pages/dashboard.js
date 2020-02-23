import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feeds from '../components/mainpages/feed'
import Search from '../components/mainpages/search'

const BottomTab = createBottomTabNavigator();

export default class dashboard extends Component {
    render() {
        return (
            <SafeAreaView>
                <BottomTab.Navigator initialRouteName="feeds" >
                    <BottomTab.Screen name="feeds" component={Feeds} />
                    <BottomTab.Screen name="search" component={Search} />
                </BottomTab.Navigator>
            </SafeAreaView>
        )
    }
}
