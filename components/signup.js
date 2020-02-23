import React, { Component } from 'react'
import {View, Text, TextInput, Image, StyleSheet, Button, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from 'react-native-check-box'
import * as axios from 'axios';

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            isChecked: false,
            fullname: "",
            email: '',
            password: '',
            canSubmit: null,
            submitting: false,
            fullnameError: false,
            emailError: false,
            passwordError: false,
            passwordVisible: true,
        };
    }

    componentDidMount() {
        this.setState({
            canSubmit: false,
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

    _submit = () => {
        fetch("http://localhost:3000")
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
       // validate full name
       let Firstname;
       let Lastname;
       let error = false;

       if (this.state.fullname === "") {
            this.setState({
                fullnameError: true,
            });
            error = true;
       } else {
        this.setState({
            fullnameError: false,
        });
           let nameSplit = this.state.fullname.split(" ");
            Firstname = nameSplit[0];
            Lastname = nameSplit[1];
            error = false;
       }

       if (this.state.email === "") {
           this.setState({
               emailError: true,
           });
           error = true;
       } else if (this.state.email.length > 3) {
            // validate the email
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let emailPass = regex.test(this.state.email)
           if (!emailPass) {
               this.setState((state, props) => ({
                   emailError: !state.emailError
               }));
               error = true;
           } else {
               error = false;
               return null;
           }
       }

       if (this.state.password.length < 8) {
           this.setState((state, props) => ({
               passwordError: !state.passwordError
           }));
           error = true;
       } else {
           error = false;
       }


       if (error) {
           return null;
       } else {
        axios.get("https://api.vent.ly/api/v1/event/interests")
        .then((data) => console.log(data.data))
        .catch((error) => console.log(error));
       }


    }

    render() {
        return (
            <ScrollView style={{  flex:1, backgroundColor: "white", paddingBottom: 20 }}>

                    <View style={{paddingLeft: 20, paddingRight: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "15%"}}>
                        <Image source={require(
                        // @ts-ignore
                        '../images/logo.png')} style={{ width: 50, height: 50}} resizeMode={"contain"} />
                    </View>

                    <View testID="texts" style={{ marginTop:"20%"}}>
                        <Text style={{ fontFamily: "Poppins-Medium.ttf", fontSize: 24}}>Get Started</Text>
                        <Text style={{ marginTop: 10}}>We're glad to have you aboard, signing up is easy</Text>
                    </View>

                    <View testID="form-fields" style={{ marginTop: 20}}>

                        <View>
                            <Text>Full Name</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={style.normalIcons} name="md-mail" color="#ABABAB" size={25}/>
                                <TextInput style={style.input} onChangeText={(fullname) => { this.updateFullname(fullname)}}/>
                            </View>
                            {this.state.fullnameError ? <Text style={{ color: "red"}}>This field is required</Text>: null}
                        </View>

                        <View>
                            <Text style={{ marginTop: 20}}>Email</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={style.normalIcons} name="md-mail" color="#ABABAB" size={25}/>
                                <TextInput style={style.input} onChangeText={(email) => this.updateEmail(email)} />
                            </View>
                            {this.state.emailError ? <Text style={{ color: "red"}}>Invalid Email</Text> : null}
                        </View>

                        <View>
                            <Text style={{ marginTop: 20}}>Password</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={style.normalIcons} name="md-lock" color="#ABABAB" size={25}/>

                                <TextInput secureTextEntry={this.state.passwordVisible} style={style.input}  />

                                {this.state.passwordVisible ? <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye" color="#ABABAB" size={25}/> : <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye-off" color="#ABABAB" size={25}/>}
                            </View>
                            {this.state.passwordError ? <Text style={{ color: "red"}}>Invalid password. minimium length 8</Text> : null}
                        </View>
                    

                    </View>

                    <View style={{ flexDirection: "row", marginTop: 30, flexWrap: "wrap"}}>
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
                        <View>
                            <Text style={{ marginTop: 7}}>By signing up you agree with our </Text>
                            <Text style={{ color: "#FF4471", marginTop: "1%", textDecorationLine:"underline", fontWeight: "bold"}}>Terms & Conditions</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 40, height: 50}}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Usernameselect")}  style={style.submitButton} >
                            { this.state.submitting ? <ActivityIndicator /> : <Text style={{ color: "white"}}>Sign Up</Text> }
                        </TouchableHighlight>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 20, marginTop: 10}}>
                        <Text style={{ textAlign:"center", marginTop: 10}} onPress={() => {}}>
                            Already have an account? 
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate("Login")} style={{ color: "#E61648", paddingLeft: 10, marginTop: 8, fontWeight: "bold"}}>Login</Text>
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
        marginTop: 15, 
        marginLeft: 10
    }
});
