/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as WP, heightPercentageToDP as HP } from 'react-native-responsive-screen'

import Customscrollview from './customscrollview';

const Home = ({navigation}) => {
  return (
    <ScrollView style={style.scrollview}>

    <View >
            <View style={style.logoContainer}>
              <Image source={require(
    // @ts-ignore
              '../images/logo.png')} style={style.logoImage} resizeMode={"contain"} />
              <Text style={style.logoText}>Vently</Text>
            </View>

            <View>
              <Customscrollview />
            </View>

            <View style={style.buttonContainer}>

              <TouchableHighlight style={[style.button, style.redButton]} onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "white"}}>Login</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[style.button, style.greyButton]}
              onPress={()=> navigation.navigate("Signup")}>
                <Text style={{ color: "black"}}>Get Started</Text>
              </TouchableHighlight>

            </View>
            

        </View>

    </ScrollView>
  );
};

let style =StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: "white"
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: HP('5%'), 
    height: HP('8%'),
  },
  logoImage: {
     width: 50, 
     height: 50
  },
  logoText: {
     marginTop: 15, fontFamily: "Poppins-Medium", fontSize: 20
  },
  buttonContainer: {
    flexDirection: "row", 
    justifyContent: "center", 
    padding: 15, 
    marginTop: 20
  },
  button: {
    elevation: 4, 
    borderRadius: 5, 
    flex: 1, 
    height: 60, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  redButton: {
    backgroundColor: "#E61648",
    marginRight: "2%"
  },
  greyButton: {
    backgroundColor: "#EEEEEE",
    marginLeft: "2%"
  }
});

export default Home;
