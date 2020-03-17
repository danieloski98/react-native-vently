import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Feed from './Feed';

export default function FeedsContainer(props) {
  return (
    <ScrollView style={FeedConatinerStyle.Parent}>
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </ScrollView>
  );
}

let FeedConatinerStyle = StyleSheet.create({
  Parent: {
    flex: 1,
    backgroundColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 40,
  },
});
