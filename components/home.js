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
  ScrollView
} from 'react-native';

import Customscrollview from './customscrollview';

const Home = ({navigation}) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white"}}>

    <View >
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "10%", height: 80}}>
              <Image source={require(
    // @ts-ignore
              '../images/logo.png')} style={{ width: 50, height: 50}} resizeMode={"contain"} />
              <Text style={{ marginTop: 15, fontFamily: "Poppins-Medium", fontSize: 20}}>Vently</Text>
            </View>
            <View>
              <Customscrollview />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", padding: 15, marginTop: 20 }}>

              <TouchableHighlight style={{ elevation: 4, borderRadius: 5, flex: 1, height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "#E61648"}} onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "white"}}>Login</Text>
              </TouchableHighlight>

              <TouchableHighlight style={{ elevation: 4, borderRadius: 5, flex: 1, height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "#EEEEEE",  marginLeft: 20}}
              onPress={()=> navigation.navigate("Signup")}>
                <Text style={{ color: "black"}}>Get Started</Text>
              </TouchableHighlight>

            </View>
            

        </View>

    </ScrollView>
  );
};


export default Home;
