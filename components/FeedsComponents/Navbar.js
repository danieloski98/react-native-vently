import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Navbar(props) {
  return (
    <View style={NavbarStyle.Parent}>
      <View style={NavbarStyle.logoContainer}>
        <Image
          source={require('../../images/logo.png')}
          resizeMode="contain"
          style={NavbarStyle.logo}
        />
        <Text style={NavbarStyle.logoText}>Vently</Text>
      </View>

      <View style={NavbarStyle.iconContainer}>
        <Icon name="md-search" size={26} />
        <Icon name="md-notifications-outline" size={26} />
      </View>
    </View>
  );
}

let NavbarStyle = StyleSheet.create({
  Parent: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    elevation: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logoContainer: {
    marginTop: 18,
    flexDirection: 'row',
  },
  logoText: {
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 35,
    height: 35,
  },
  iconContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
});
