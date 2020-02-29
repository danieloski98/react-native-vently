import React, { Component } from 'react'
import {View, Text, TextInput, Image, StyleSheet, Button, TouchableHighlight, ActivityIndicator,
ScrollView} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from 'react-native-check-box'

export default class Interest extends Component {

    constructor(props){
        super(props);
    }

   

    render() {
        return (
            <View>
                <Text>Interest page</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "#ECECEC",
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        flex: 1,
        paddingLeft: 35,
        paddingRight: 20
    },
    checkbox: {
        color: "#FF406E"
    },
    submitButton: {
        flex: 1,
        backgroundColor: "#E61648",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        elevation: 1
    },
    eyeIocn: {
        position: "absolute",
        zIndex: 10, 
        marginTop: 15, 
        marginLeft: "90%"
    },
    normalIcons: {
        position: "absolute", 
        zIndex: 10, 
        marginTop: 15, 
        marginLeft: 10
    }
});
