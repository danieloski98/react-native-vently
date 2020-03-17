import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, ScrollView, ActivityIndicator, Alert,Platform, ToastAndroid } from 'react-native';
import { widthPercentageToDP as WP } from 'react-native-responsive-screen';
import Interests from '../utiles/interests';

let Loading = <View style={{ marginTop: "40%"}}>
    <ActivityIndicator size={38} color="#FF003D" />
    <Text style={{ textAlign: "center"}}>Loading interests...</Text>
</View>

export default class interests extends Component {

    constructor(props){
        super(props);
        this.state = {
            canSubmit: false,
            interest: [],
            interests: [],
            submitting: false
        }
    }

   componentDidMount() {
       // let email = this.props.route.params.email;
       // let ID = this.props.route.params.ID;
        fetch("https://api.vent.ly/api/v1/event/interests")
        .then((response) => response.json())
        .then((data) => {
            this.state.interest = data['interest']
            this.setState({
                interest: this.state.interest
            });
        })
        .catch((error) => console.log(error))
    }

    pickInterest = (interest) => {
        if(this.state.interests.includes(interest)) {
            let index = this.state.interests.indexOf(interest);
            this.state.interests.splice(index, 1);
            this.setState({
                interests: this.state.interests
            });
        }else {
            this.state.interests.push(interest);
            this.setState({
                interests: this.state.interests
            });
        }
    }

   async submit() {
       this.setState({
           submitting: true,
       });
      try {
        if(this.state.interests. length < 3) {
            this.setState({
                submitting: false,
            });
            if(Platform.OS === "android"){
                ToastAndroid.showWithGravity("You must select at  least 3 interets", ToastAndroid.LONG, ToastAndroid.BOTTOM);
            } else {
                Alert.alert("You must select at  least 3 interets");
            }
        }else {
            // let email = this.props.route.params.email;
            let ID = this.props.route.params.ID;
            let payload = {
                Interest: this.state.interests,
            }
            let request = await fetch(`https://api.vent.ly/api/v1/user/firstinterets/${ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            })
            switch(request.status){
                case 201: {
                    this.setState({
                        submitting: false,
                    });
                    this.props.navigation.navigate("Login");
                    break;
                }
                case 400: {
                    this.setState({
                        submitting: false,
                    });
                    let response = await request.json();
                    Alert.alert(response['message'])
                    break;
                }
                case 500: {
                    this.setState({
                        submitting: false,
                    });
                    let response = await request.json();
                    console.log(Response)
                }
            }

        }
      } catch (error) {
        this.setState({
            submitting: false,
        });
          console.log(error);
      }
    }

    render() {
        return (
            <View style={style.parent}>
                <View style={style.firstContainer} >
                    <Text style={style.headerText}>Select Your Interests</Text>
                    <Text style={style.bodyText}>
                    We've suggested a couple of users and event categories you might be interested in following. Please follow at least 3 tags
                    </Text>
                    <ScrollView style={style.scrollView} showsVerticalScrollIndicator={false}>
                        {
                        this.state.interest.length === 0 ? Loading : 
                        <View>
                            <Text style={style.headerText}>Tags</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginBottom: 30}}>
                                {
                                    this.state.interest.map((interest, index) => (
                                        <TouchableHighlight key={index} onPress={() => this.pickInterest(interest)}  style={!this.state.interests.includes(interest) ? style.interest : style.selectedInterest}>
                                            <Text style={!this.state.interests.includes(interest) ? style.interestText : style.selectedText} >{interest}</Text>
                                        </TouchableHighlight>
                                    ))
                                }
                            </View>
                        </View>
                        }
                    </ScrollView>
                </View>
                <View style={style.secondContainer}>
                    <View style={style.buttonContainer}>
                        <TouchableHighlight onPress={() => this.submit()} style={style.button}>
                            { this.state.submitting ? <ActivityIndicator size={38} color="white" /> : <Text style={style.buttonText}>Submit</Text>}
                        </TouchableHighlight >
                    </View>
                </View>
            </View>
        )
    }
}



let style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "white"
    },
    firstContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#EFEFEF"
    },
    headerText: {
        fontFamily: "Poppins-Medium",
        fontSize: 20,
        marginTop: 20
    },
    bodyText: {
        fontFamily: "Heebo-Regular",
        fontSize: 16,
        paddingRight: "5%",
        marginTop: 10,
        fontWeight: "100"
    },
    scrollView: {
        flex: 1,
        marginTop: 10
    },
    secondContainer: {
        height: 80,
        elevation: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonContainer: {
        width: WP("80%"),
        height: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: WP("80%"),
        height: 60,
        backgroundColor: "#FF003D",
        borderRadius: 5
    },

    buttonText: {
        color: "white",
        fontSize: 14,
        fontFamily: "Heebo-Regular"
    },
    interest: {
        padding: 20,
        backgroundColor: "lightgrey",
        borderRadius: 5,
        margin: 3
    },
    selectedInterest: {
        padding: 20,
        backgroundColor: "#FF406E",
        borderRadius: 5,
        margin: 3
    },
    selectedText: {
        color: "white",
        fontFamily: "Heebo-Regular"
    },
    interestText: {
        color: "black",
        fontFamily: "Heebo-Regular"
    }

});
