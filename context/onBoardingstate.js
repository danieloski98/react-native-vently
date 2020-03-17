import React, { Component, createContext } from 'react'
import { View, Text } from 'react-native';

export let OnBoardingContext = createContext({});

export class OnBoardingstate extends Component {
    constructor(props){
        super(props);
        this.state = {
            Email: "dandolla",
            Username: "",
            Interests: "",
            Business: false
        };
    }

    changeEmail = (email) => {
        this.setState({
            Email: email,
        });
    }

    changeUsername = (username) => {
        this.setState({
            Username: username
        });
    }

    changeInterests = (interests) => {
        this.state.Interests = interests
        this.setState({
            Interests: this.state.Interests
        });
    }

    changeBuisnessType = (type) => {
        this.setState({
            Business:type
        });
    }

    render() {
        return (
            <OnBoardingContext.Provider value={{ state: this.state, changeEmail: this.changeEmail, changeUsername: this.changeUsername, changeInterests: this.changeInterests, changeBuisnessType: this.changeBuisnessType }}>
                {
                  this.props.children  
                }
            </OnBoardingContext.Provider>
        )
    }
}
