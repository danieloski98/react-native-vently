import React, { Component } from 'react'
import {View, Text, TextInput, Image, StyleSheet, TouchableHighlight, ActivityIndicator,
ScrollView, Modal, Alert} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import ValidationComponent from 'react-native-form-validator';

export default class Login extends ValidationComponent {

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
        this.makeRequest.bind(this);
        this._submit.bind(this);
    }

    componentDidMount() {
    }


    togglePasswordVisibilty(){
        this.setState((state, props) => ({
            passwordVisible: !state.passwordVisible
        }));
    }

    updateEmail(e) {
        this.setState({
            email: e,
        })
    }

    password(e){
        this.setState({
            password: e
        });
    }

    async makeRequest() {
      try {
        
        let payload = {
            Email: this.state.email,
            Password: this.state.password
        }
        console.log(payload)

        let response = await fetch("https://api.vent.ly/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });

        switch(response.status) {
            case 200: {
                console.log("Making requesttttsssghg");
                let body = await response.json();
                console.log(body);
                this.setState({
                    submitting: false
                });
                this.props.navigation.navigate("Dashboard");
                break;
            }
            case 500: {
                console.log("errort");

                this.setState({
                    submitting: false
                });
                Alert.alert("An error occured", "Try again later")
            }
        }

      } catch (error) {
        Alert.alert("Network slow")
      }
    }

    _submit(){

       this.setState({
           submitting: true
       });

        this.validate({
            email: {required: true, email: true},
            password: {required: true, minlength: 8}
        });

        if(!this.isFormValid()){
            this.setState({
                submitting: false
            });
            Alert.alert("Please fill the form correctly")
        }else {
            
            this.makeRequest();
        }
    }

    render() {
        return (
            <ScrollView style={{ flex:1, backgroundColor: "white" }}>


                    <View style={{paddingLeft: 20, paddingRight: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "15%"}}>
                        <Image source={require(
                        // @ts-ignore
                        '../images/logo.png')} style={{ width: 50, height: 50}} resizeMode={"contain"} />
                    </View>

                    <View testID="texts" style={{ marginTop: "20%"}}>
                        <Text style={{ fontFamily: "Poppins-Medium.ttf", fontSize: 24}}>Welcome Back</Text>
                        <Text style={{ marginTop: 10}}>Log in to continue using vently</Text>
                    </View>

                    <View testID="form-fields" style={{ marginTop: 20}}>

                        <View>
                            <Text style={{ marginTop: 20}}>Email</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={{ position: "absolute", zIndex: 10, marginTop: 15, marginLeft: 10}} name="md-mail" color="#ABABAB" size={25}/>
                                <TextInput editable={this.state.editable} style={style.input} onChangeText={(email) => this.updateEmail(email)} />
                            </View>
                            {this.isFieldInError('email') && this.getErrorsInField('email').map((errorMessage, index) => <Text key={index} style={style.errorText}>{errorMessage}</Text>) }
                        </View>

                        <View>
                            <Text style={{ marginTop: 20}}>Password</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={{ position: "absolute", zIndex: 10, marginTop: 12, marginLeft: 10}} name="md-lock" color="#ABABAB" size={25}/>
                                <TextInput onChangeText={(password) => this.password(password)} editable={this.state.editable} secureTextEntry={this.state.passwordVisible} style={style.input} />

                                {this.state.passwordVisible ? <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye" color="#ABABAB" size={25}/> : <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye-off" color="#ABABAB" size={25}/>}

                            </View>
                            {this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage, index) => <Text key={index} style={style.errorText}>{errorMessage}</Text>) }
                        </View>
                    

                    </View>

                    <View style={{ marginTop: 40, height: 50}}>
                        <TouchableHighlight onPress={() => this._submit()}  style={style.submitButton} >
                            { this.state.submitting ? <ActivityIndicator size="large" color="white" /> : <Text style={{ color: "white"}}>Login</Text> }
                        </TouchableHighlight>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", }}>
                        <Text onPress={() => this.props.navigation.navigate("resetpassword")} style={{ color: "#E61648", paddingLeft: 10,  textDecorationLine: "underline",  marginTop: 15}}>Forgot Password?</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 20, marginTop: 10 }}>
                        <Text style={{ textAlign:"center", marginTop: 10}} onPress={() => {}}>
                            Don't have an account? 
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate("Signup")} style={{ color: "#E61648", paddingLeft: 5, marginTop: 10}}>Sign up</Text>
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
    },
    errorText: {
        color: "red"
    }
});
