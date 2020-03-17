import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Navbar from '../components/FeedsComponents/Navbar';
import FeedContainer from '../components/FeedsComponents/FeedsContainer';

export default class Feed extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightgrey'}}>
        <Navbar />
        <FeedContainer />
      </View>
    );
  }
}
