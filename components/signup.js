import React, { Component } from 'react'
import {View, Text, TextInput, Image, StyleSheet, Button, TouchableHighlight, ActivityIndicator, ScrollView, Alert, ToastAndroid,
Platform } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from 'react-native-check-box'
import ValidationComponent from 'react-native-form-validator';
import { widthPercentageToDP as WP, heightPercentageToDP as HP } from 'react-native-responsive-screen'
import NetInfo from "@react-native-community/netinfo";

export default class Signup extends ValidationComponent {

    constructor(props){
        super(props);
        this.state = {
            isChecked: false,
            fullname: "",
            email: '',
            password: '',
            submitting: false,
            passwordVisible: true,
            error: false,
            editable: true,
        };
    }

    componentDidMount() {
        this.setState({
            canSubmit: false,
            fullname: "",
            email: "",
            Password: ""
        });

        let unsubscribe = NetInfo.addEventListener(state => {
            if(state.isInternetReachable) {
               if(Platform.OS == "android"){
                ToastAndroid.showWithGravity("There is no internet connection", ToastAndroid.LONG, ToastAndroid.BOTTOM);
               } else {
                   Alert.alert("There is no internet connection");
               }
            }
        });


        unsubscribe();
    }

    componentWillUnmount() {
        this.setState({
            canSubmit: false,
            fullname: "",
            email: "",
            Password: ""
        });
    }

    updateEmail(e) {
        this.setState({
            email: e,
        })
    }

    updateFullname(e){
        this.setState({
            fullname: e,
        });
    }

    password(e){
        this.setState({
            password: e
        });
    }

    togglePasswordVisibilty(){
        this.setState((state, props) => ({
            passwordVisible: !state.passwordVisible
        }));
    }

    goToLogin(){
        this.setState({
            canSubmit: false,
            fullname: "",
            email: "",
            Password: ""
        });
        this.props.navigation.navigate("Login");
    }

    async makeRequest(body){
       try {
           let result = await  fetch("https://api.vent.ly/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })
        switch(result.status) {
            case 201: {
                this.setState({
                    submitting: false,
                });
                this.props.navigation.navigate("Emailverify", { email: this.state.email });
                break;
                
            }
            case 400: {
                this.setState({
                    submitting: false,
                    editable: true
                });
                Alert.alert(`The email ${this.state.email} has already been registered`,
                "Please try to log in to your account or reset your password",
                [
                    {text: 'Login', onPress: () => this.props.navigation.navigate("Login")},
                    {
                      text: 'Reset Password',
                      onPress: () => this.props.navigation.navigate("resetpassword"),
                      style: 'cancel',
                    },
                    {text: 'Use Another Email', onPress: () => { this.setState({ email: ''})}},
                  ],
                  {cancelable: false});
                break;
            }
            case 500: {
                this.setState({
                    submitting: false,
                    editable: true,
                });
                Alert.alert("An error occured on our end",
                        "please try again");
                break;
            }
        }

       } catch (error) {
        this.setState({
            submitting: false,
        });
        this.setState({
            editable: true,
        });
           Alert.alert("There is no internet connection",
                    "Please connect to the internet and try again");
       }
    }

    _submit = () => {

        let unsubscribe = NetInfo.addEventListener(state => {
            if(!state.isInternetReachable) {
               if(Platform.OS === "android"){
                ToastAndroid.showWithGravity("There is no internet connection", ToastAndroid.LONG, ToastAndroid.BOTTOM);
               } else {
                   Alert.alert("There is no internet connection");
               }
            } else {

                this.setState({
                    submitting: true,
                    editable: false,
                });
        
                this.validate({
                    fullname: {required: true, string: true},
                    email: { required: true, email: true},
                    password: { required: true, string: true, minlength: 8}
                });
        
                if(this.isFormValid()) {
                    if(this.state.isChecked) {
                        // split the firstname and lastname
                        let nameArray = this.state.fullname.split(' ');
                        let Firstname = nameArray[0];
                        let Lastname = nameArray[1];
                        let payload = {
                            Firstname,
                            Lastname,
                            Email: this.state.email,
                            Password: this.state.password
                        };
                        this.makeRequest(payload);
        
                    }else {
                        this.setState({
                            submitting: false,
                        });
                        this.setState({
                            editable: true,
                        });
                        Alert.alert("You have to agree to our terms and conditions")
                    }
                }else {
                    this.setState({
                        submitting: false,
                    });
                    this.setState({
                        editable: true,
                    });
                    Alert.alert("The form is not valid, check the fields")
                }

            }
        });
        unsubscribe();
    }

    render() {
        return (
            <ScrollView style={{  flex:1, backgroundColor: "white", paddingBottom: 20 }}>

                    <View style={{paddingLeft: 20, paddingRight: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "8%"}}>
                        <Image source={require(
                        // @ts-ignore
                        '../images/logo.png')} style={{ width: WP("20%"), height: HP("6%")}} resizeMode={"contain"} />
                    </View>

                    <View testID="texts" style={{ marginTop:"14%"}}>
                        <Text style={{ fontFamily: "Poppins-Medium.ttf", fontSize: 24}}>Get Started</Text>
                        <Text style={{ marginTop: 10}}>We're glad to have you aboard, signing up is easy</Text>
                    </View>

                    <View testID="form-fields" style={{ marginTop: 20}}>

                        <View>
                            <Text>Full Name</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={style.normalIcons} name="md-mail" color="#ABABAB" size={25}/>
                                <TextInput editable={this.state.editable} style={style.input} onChangeText={(fullname) => { this.updateFullname(fullname)}}/>
                            </View>
                            {this.isFieldInError('fullname') && this.getErrorsInField('fullname').map((errorMessage, index) => <Text key={index} style={style.errorText}>{errorMessage}</Text>) }
                        </View>

                        <View>
                            <Text style={{ marginTop: 20}}>Email</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={style.normalIcons} name="md-mail" color="#ABABAB" size={25}/>
                                <TextInput editable={this.state.editable} style={style.input} onChangeText={(email) => this.updateEmail(email)} />
                            </View>
                            {this.isFieldInError('email') && this.getErrorsInField('email').map((errorMessage, index) => <Text key={index} style={style.errorText}>{errorMessage}</Text>) }
                        </View>

                        <View>
                            <Text style={{ marginTop: 20}}>Password</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={style.normalIcons} name="md-lock" color="#ABABAB" size={25}/>

                                <TextInput editable={this.state.editable} onChangeText={(password) => this.password(password)} secureTextEntry={this.state.passwordVisible} style={style.input}  />

                                {this.state.passwordVisible ? <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye" color="#ABABAB" size={25}/> : <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye-off" color="#ABABAB" size={25}/>}
                            </View>
                            {this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage, index) => <Text key={index} style={style.errorText}>{errorMessage}</Text>) }
                        </View>
                    

                    </View>

                    <View style={{ flexDirection: "row", marginTop: 30, flexWrap: "nowrap"}}>
                        <CheckBox
                            checkedCheckBoxColor="#E61648"
                            style={{padding: 10, height: 10, marginTop: 10, marginLeft: -10}}
                            onClick={()=>{
                            this.setState((state, props) => ({
                                isChecked: !state.isChecked,
                            }))
                            }}
                            isChecked={this.state.isChecked}
                            leftText="checkbox"
                        />
                        <View style={{ flexDirection: "row", marginTop: 4, flex: 1}}>
                            <Text style={{ marginTop: 7, flex: 1, lineHeight: 15, justifyContent: "space-between"}}>By signing up you agree with our 
                                <Text style={{ color: "#FF4471", marginTop: "1%", textDecorationLine:"underline", fontWeight: "bold", paddingLeft: 20 }}>Terms & Conditions </Text>
                            </Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 40, height: 50}}>
                        <TouchableHighlight onPress={() => this._submit()}  style={style.submitButton} >
                            { this.state.submitting ? <ActivityIndicator color="white" size={26} /> : <Text style={{ color: "white"}}>Sign Up</Text> }
                        </TouchableHighlight>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 20, marginTop: 10}}>
                        <Text style={{ textAlign:"center", marginTop: 10}} onPress={() => {}}>
                            Already have an account? 
                        </Text>
                        <Text onPress={() => this.goToLogin()} style={{ color: "#E61648", paddingLeft: 10, marginTop: 10 }}>Login</Text>
                    </View>

                    </View>

            </ScrollView>
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
        paddingRight: 35
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
        marginTop: 13, 
        marginLeft: 10
    },
    errorText: {
        color: "red"
    }
});
