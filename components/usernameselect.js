import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Picker, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


export default class Usernameselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: "Personal",
            image: "",
        }

        this.personaltext = <Text>Use this account type if you would just be using Vent.ly for personal use. You can always switch accounts later</Text>

        this.businessText = <Text>Use this account type if you would be using Vent.ly for Business use. You can always switch accounts later</Text>

        this.options = {
            title: 'Select Profile Picture',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
    }

    onImagePickerClicked = (res) => {
       console.log(res['uri'])
    }

    render() {
        return (
            <ScrollView style={style.parent}>

            <View>
               
               <View style={style.ImageContainer}>
                    <Image resizeMode="contain" style={style.logo} source={require("../images/logo.png")} />
               </View>

               <Text style={style.headerText}>Welcome Mike</Text>
               <Text style={style.normalText}>Let's finish setting up your account</Text>

               <View style={style.ImagePickerContainer}>
                   <TouchableHighlight onPress={() => console.log("Hello")} style={style.imagePicker} >
                       <Icon name="md-camera" color="white" size={24} />
                   </TouchableHighlight>
               </View>

               <View>
                    <View style={{ flexDirection: "row", marginTop: 10}}>
                        <View style={{ flex: 1}}>
                            <Text style={style.usernameText}>Create Username</Text>

                            <View style={style.usernameTextbox}>
                                <Icon style={style.usernametextboxIcon} name="md-at" size={20} />
                                <TextInput  style={style.input}  />
                            </View>

                        </View>
                    </View>
               </View>


               <View style={style.accountTypeContainer}>
                   <Text style={style.accounttypeText}>Select An Account Type</Text>
                   <View style={{ flexDirection: "row"}} >
                       <Icon style={{ position: "absolute", zIndex: 10, marginTop: 25,marginLeft: 320}} name="md-arrow-dropdown" color="grey" size={20} />
                       <Picker
                            style={style.input}
                            selectedValue={this.state.accountType}
                            onValueChange={(itemvalue, itemIndex) => this.setState({ accountType: itemvalue })}
                            mode="dialog"
                       >
                           <Picker.Item label="Personal" value="Personal"/>
                           <Picker.Item label="Business" value="Business" />
                       </Picker>
                   </View>
               </View>

               <Text style={{ marginTop: 20}}>
                   {this.state.accountType === "Personal" ? this.personaltext : this.businessText}
               </Text>

               <View style={{ marginTop: 40, height: 50}}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate("Emailverify")}  style={style.submitButton} >
                            { this.state.submitting ? <ActivityIndicator /> : <Text style={{ color: "white"}}>Sign Up</Text> }
                        </TouchableHighlight>
               </View>


            </View>

            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    parent: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        backgroundColor: "white"
    },
    ImageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 40
    },

    logo: {
        width: 70,
        height: 70,
    },
    headerText: {
        fontFamily: "Poppins-Medium",
        color: "black",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20
    },
    normalText: {
        textAlign: "center",
        fontFamily: "Heebo-Regular",
        color: "#414040"
    },

    ImagePickerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 40
    },

    imagePicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ABB4BD',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    usernameTextbox: {
        flexDirection: "row"
    },
    usernametextboxIcon: {
        position: "absolute",
        marginTop: 27,
        marginLeft: 10,
        zIndex: 10,
        color: "grey"
    },
    input: {
        borderWidth: 2,
        borderColor: "#ECECEC",
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        flex: 1,
        paddingLeft: 28,
        paddingRight: 15,
        marginTop: 10
    },
    usernameText: {
        textAlign: "center",
        fontFamily: "Heebo-Regular",
        fontSize: 16
    },

    accountTypeContainer: {
        marginTop: 40,
        textAlign: "center"
    },

    accounttypeText: {
        textAlign: "center",
        fontFamily: "Heebo-Regular",
        fontSize: 16
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
});
