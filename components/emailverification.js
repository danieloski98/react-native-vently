import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, ActivityIndicator, BackHandler, Alert } from 'react-native';
import io from 'socket.io-client';

export default class Emailverification extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
        this.socket = io("https://api.vent.ly");
    }

    componentDidMount() {
        this.socket.on(`Activated${this.props.route.params.email}`, () => {
            this.props.navigation.navigate("Usernameselect")
        });
        console.log(this.props.route.params.email)
        // BackHandler.addEventListener('hardwareBackPress', function() {
        //     Alert.alert("Cannot go back")
        //     return false;
        //   });
    }
   

    render() {
        return (
            <View style={style.container}>
                
                <View style={style.imageContainer}>
                    <Image resizeMode="contain" source={require('../images/logo.png')} />
                </View>

                <View style={style.emailImage}>
                    <Image style={style.email} resizeMode="contain" source={require('../images/email.png')} />
                </View>

                <Text style={style.headerText}>Activate Your Account</Text>
                <Text style={style.normalText}>We just sent an email to {this.props.route.params.email} with a link to activate your account. Check your inbox or spam folder, please Don't close the app</Text>

               <View style={{ height: 50, marginTop: 90}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("Emailverify")}  style={style.submitButton} >
                        <Text style={{ color: "white"}}>Resend Activation Email</Text> 
                    </TouchableHighlight>
               </View>

               <View style={{ height: 50, marginTop: 10}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("Signup")}  style={style.borderButton} >
                        <Text style={{ color: "#E61648" }}>Use Another Email Address</Text> 
                    </TouchableHighlight>
               </View>

            </View>
        );
    }
}


const style = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 40
    },

    emailImage: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 100
    },
    email: {
        width: 100,
        height: 100
    },
    headerText: {
        textAlign: "center",
        fontFamily: "Poppins-Medium",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 30
    },
    normalText: {
        textAlign: "center",
        color: "grey",
        fontFamily: "Heebo-Regular",
        marginTop: 20,
        padding: 10
    },
    submitButton: {
        flex: 1,
        backgroundColor: "#E61648",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
       
    },
    borderButton: {
        borderWidth: 1.5,
        borderColor: "#E61648",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 50
    }

});