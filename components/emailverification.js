import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';

export default class Emailverification extends React.Component {
   

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
                <Text style={style.normalText}>We just sent an email to michaelajah@gmail.com with a link to activate your account. Check your inbox or apam folder</Text>

               <View style={{ height: 50, marginTop: 90}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("Emailverify")}  style={style.submitButton} >
                        <Text style={{ color: "white"}}>Resend Activation Email</Text> 
                    </TouchableHighlight>
               </View>

               <View style={{ height: 50, marginTop: 10}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("dashboard")}  style={style.borderButton} >
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