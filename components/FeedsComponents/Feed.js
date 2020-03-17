import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function FeedNavbar(props) {
  return (
    <View style={FeedNavbarStyle.Parent}>
      <View style={FeedNavbarStyle.firstPart}>
        <View style={FeedNavbarStyle.imageContainer}>
          <Image
            source={require('../../images/avatar.png')}
            resizeMode="contain"
            style={FeedNavbarStyle.image}
          />
        </View>
        <View>
          <Text style={FeedNavbarStyle.nameText}>Sandra Micheals</Text>
          <Text style={FeedNavbarStyle.timeText}>@sandra124 - 11h ago</Text>
        </View>
      </View>
      <View style={FeedNavbarStyle.iconContainer}>
        <Icon name="md-add-circle" size={24} color="black" />
        <Icon name="md-more" size={24} color="black" />
      </View>
    </View>
  );
}

function DateHolder(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="md-clock" size={18} />
          <Text style={{marginLeft: 10, fontSize: 13, marginTop: 2}}>
            Friday 29 October 1 – 7 pm
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Icon name="md-pin" color="#FF406E" size={18} />
          <Text style={{marginLeft: 10, fontSize: 13, marginTop: 2}}>
            La Casa Royale, Bronx, NYC
          </Text>
        </View>
      </View>

      <View
        style={{
          height: '100%',
          backgroundColor: '#FF4471',
          padding: 10,
          borderRadius: 6,
          width: 60,
          marginTop: -3,
        }}>
        <View>
          <Text style={{color: 'white', textAlign: 'center'}}>OCT</Text>
          <Text style={{color: 'white', textAlign: 'center'}}>29</Text>
        </View>
      </View>
    </View>
  );
}

function Actions(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
      }}>
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'lightgrey',
          flexDirection: 'row',
        }}>
        <Icon name="md-heart" size={18} color="grey" />
          <Text style={{marginLeft: 10}}>Like</Text>
      </View>

      <View
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'lightgrey',
          flexDirection: 'row',
        }}>
        <Icon name="md-paper" size={18} />
          <Text style={{marginLeft: 10}}>Event Details</Text>
      </View>

      <View
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'lightgrey',
          flexDirection: 'row',
        }}>
        <Icon name="md-document" size={18} color="grey" />
          <Text style={{marginLeft: 10}}>Get Tickets</Text>
      </View>
    </View>
  );
}

export default function Feed(props) {
  return (
    <View style={FeedStyle.Parent}>
      <FeedNavbar />
      <View>
        <ImageBackground
          source={require('../../images/background.png')}
          style={{
            width: '100%',
            height: 300,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: 'black',
              opacity: 0.6,
              borderRadius: 6,
              padding: 10,
              margin: 10,
              width: 120,
              flexDirection: 'row',
            }}>
            <Icon name="md-people" color="white" size={16} />
            <Text style={{color: 'white', fontSize: 12, marginLeft: 10}}>
              334.6k Going
            </Text>
          </View>
        </ImageBackground>
        <View style={{padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>
            New Decade 2020 VIP Pool Party
          </Text>
        </View>
      </View>
      <DateHolder />
      <Actions />
    </View>
  );
}

let FeedNavbarStyle = StyleSheet.create({
  Parent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  firstPart: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Heebo-Regular',
    marginLeft: 5,
  },
  timeText: {
    color: 'grey',
    fontFamily: 'Heebo-Regular',
    fontSize: 12,
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-around',
    paddingTop: 8,
  },
});

let FeedStyle = StyleSheet.create({
  Parent: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 5,
    elevation: 1,
    overflow: 'hidden',
    paddingBottom: 20,
  },
});
