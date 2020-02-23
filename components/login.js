import React, { Component } from 'react'
import {View, Text, TextInput, Image, StyleSheet, Button, TouchableHighlight, ActivityIndicator,
ScrollView} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from 'react-native-check-box'

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            isChecked: false,
            fullname: "",
            email: '',
            password: '',
            canSubmit: null,
            submitting: false,
            passwordVisible: true,
        };
    }

    componentDidMount() {
        this.setState({
            canSubmit: false,
        });
    }

    _submit = () => {
        this.setState((state, props) => ({
            canSubmit: !state.canSubmit,
            submitting: !state.submitting
        }))
    }

    togglePasswordVisibilty(){
        this.setState((state, props) => ({
            passwordVisible: !state.passwordVisible
        }));
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
                                <TextInput style={style.input} />
                            </View>
                        </View>

                        <View>
                            <Text style={{ marginTop: 20}}>Password</Text>
                            <View style={{ flexDirection: "row", marginTop: 10}}>
                                <Icon style={{ position: "absolute", zIndex: 10, marginTop: 12, marginLeft: 10}} name="md-lock" color="#ABABAB" size={25}/>
                                <TextInput secureTextEntry={this.state.passwordVisible} style={style.input} />

                                {this.state.passwordVisible ? <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye" color="#ABABAB" size={25}/> : <Icon onPress={() => this.togglePasswordVisibilty() } style={style.eyeIocn} name="md-eye-off" color="#ABABAB" size={25}/>}

                            </View>
                        </View>
                    

                    </View>

                    <View style={{ marginTop: 40, height: 50}}>
                        <TouchableHighlight onPress={() => this._submit()}  style={style.submitButton} >
                            { this.state.submitting ? <ActivityIndicator size="large" color="white" /> : <Text style={{ color: "white"}}>Login</Text> }
                        </TouchableHighlight>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 20, marginTop: 10 }}>
                        <Text style={{ textAlign:"center", marginTop: 30}} onPress={() => {}}>
                            Don't have an account? 
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate("Signup")} style={{ color: "#E61648", paddingLeft: 10, fontSize: 18, marginTop: 27, fontWeight: "bold"}}>Sign up</Text>
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
    }
});
