/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
  ScrollView,
  ToastAndroid,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import io from 'socket.io-client';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';


// , {
//   timeout: 10000,
//   jsonp: false,
//   transports: ['websocket'],
//   autoConnect: false,
//   agent: '-',
//   path: '/', // Whatever your path is
//   pfx: '',
//   key: '', // Using token-based auth.
//   passphrase: '', // Using cookie auth.
//   cert: '',
//   ca: '',
//   ciphers: '',
//   rejectUnauthorized: '',
//   perMessageDeflate: '',
// }

export default class Emailverification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      COUNT: 0,
      MIN: 0,
      SEC: 0,
      disable: false,
      showModal: false,
      havingIssues: false,
      animatedTextOpacity: 0,
    };
    this.socket = io('https://api.vent.ly');
    this.backhandler;
    this.interval;
  }

  componentDidMount() {

    // this.socket.connect();
    this.backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._handlebackbuttonpressed,
    );

    this.socket.on(`Activated${this.props.route.params.email}`, () => {
      this.props.navigation.navigate('Usernameselect', {
        email: this.props.route.params.email,
        ID: this.props.route.params.ID,
      })
    })
  }

  componentWillUnmount() {
    this.backhandler = BackHandler.removeEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
  }

  _handlebackbuttonpressed() {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        'Cannot Go back',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else {
      Alert.alert('Cannot go back to the previous page');
    }
    return true;
  }

  async _makeResendRequest() {
    try {
      let body = {
        Email: this.props.route.params.email,
      };
      let res = await fetch(
        'https://api.vent.ly/api/v1/auth/accountactivationresend',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // check status code

      switch (res.status) {
        case 200: {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              'Email sent',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            Alert.alert('Email Sent');
          }
          break;
        }
        case 404: {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              'There is no user with this email',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            this.setState({
              MIN: 0,
              SEC: 0,
            });
          } else {
            Alert.alert('There is no user with this email');
          }
          break;
        }
        case 500: {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
              'An error occured, try again',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
          } else {
            Alert.alert('An error occured, try again');
          }
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async resendEmail() {
    try {
      if (this.state.disable) {
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            'Please wait...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
        if (Platform.OS === 'ios') {
          Alert.alert('Please wait...');
        }
      } else {
        this._makeResendRequest();
        this.state.MIN += this.state.COUNT;
        this.state.SEC = 59;
        this.setState({
          MIN: this.state.COUNT,
          SEC: this.state.SEC,
          disable: true,
          havingIssues: true,
        });
        this.interval = setInterval(() => {
          if (this.state.SEC === 0) {
            if (this.state.MIN === 0) {
              clearInterval(this.interval);
              this.state.COUNT += 1;
              this.setState({
                COUNT: this.state.COUNT,
                disable: false,
              });
            }
            this.state.MIN -= 1;
            this.state.SEC = 59;
            this.setState({
              MIN: this.state.MIN,
              SEC: this.state.SEC,
            });
          }
          this.state.SEC -= 1;
          this.setState({
            SEC: this.state.SEC,
          });
        }, 1000);
      }
    } catch (error) {}
  }

  async checkAccountStatus() {
    try {
      console.log(this.props.route.params.email);

      const response = await fetch(`https://api.vent.ly/api/v1/user/Activated/${this.props.route.params.email}`, {
        method: 'GET'
      })
      switch(response.status) {
        case 200: {
          let timer = setTimeout(() => {
              this.setState({
                showModal: true,
              });
              clearTimeout(timer);
              
              console.log(message);
             }, 1000);
             this.props.navigation.navigate('Usernameselect', {
              email: this.props.route.params.email,
              ID: this.props.route.params.ID,
            })
            break;
        }
        case 400: {
          let message = await response.json();
          console.log(message);
          Alert.alert('Account not Activated', 'Please check your email or request for another email');
          break;
        }
        case 500: {
          let message = await response.json();
            console.log(message);
            Alert.alert('An error occured please try again');
            break;
        }
      }
      // if(response.status === 200) {
      //  let timer = setTimeout(() => {
      //   this.setState({
      //     showModal: true,
      //   });
      //   clearTimeout(timer);
        
      //   console.log(message);
      //  }, 1000);
      //  this.props.navigation.navigate('Usernameselect', {
      //   email: this.props.route.params.email,
      //   ID: this.props.route.params.ID,
      // })
      // }

      // if(response.status === 400) {
      //   let message = await response.json();
      // console.log(message);
      //   Alert.alert('Account not Activated', 'Please check your email or request for another email');
      // }

      // if(response.status === 500) {
      //   let message = await response.json();
      //   console.log(message);
      //   Alert.alert('An error occured please try again');
      // }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ScrollView>
        <Modal
          animated={true}
          animationType="fade"
          visible={this.state.showModal}
          transparent={true}>
          <View style={style.modal}>
            <View style={style.modalView}>
              <ActivityIndicator color="red" size={32} />
            </View>
          </View>
        </Modal>
        <View style={style.container}>
          <View style={style.imageContainer}>
            <Image
              resizeMode="contain"
              style={style.logo}
              source={require('../images/icons/logo.png')}
            />
          </View>

          <View style={style.emailImage}>
            <Image
              style={style.email}
              resizeMode="contain"
              source={require('../images/email.png')}
            />
          </View>
          {/* {this.props.route.params.email}  */}
          <Text style={style.headerText}>Activate Your Account</Text>
          <Text style={style.normalText}>
            We just sent an email to {this.props.route.params.email} with a link to activate your account. Check
            your inbox or spam folder, please Don't close the app
          </Text>

          <View style={{height: 65, marginTop: '8%'}}>
            <TouchableHighlight
              disable={this.state.disable}
              onPress={() => this.resendEmail()}
              style={style.submitButton}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white'}}>Resend Activation Email</Text>
                <Text style={{color: 'white', paddingLeft: 5}}>
                  {this.state.disable === false ? (
                    ''
                  ) : (
                    <Text>
                      ({this.state.MIN}: {this.state.SEC})
                    </Text>
                  )}
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={{height: 50, marginTop: 1}}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Signup')}
              style={style.borderButton}>
              <Text style={{color: '#E61648'}}>Use Another Email Address</Text>
            </TouchableHighlight>
          </View>
          {this.state.havingIssues ? (
            <Text
              onPress={() => this.checkAccountStatus()}
              style={[style.linkTag]}>
              Having issues? check account status
            </Text>
          ) : (
            // eslint-disable-next-line react/self-closing-comp
            <Text> </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: '10%',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '1%',
  },
  logo: {
    width: WP('15%'),
    height: HP('15%'),
  },
  emailImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  email: {
    width: 80,
    height: 80,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
  },
  normalText: {
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Heebo-Regular',
    marginTop: 20,
    padding: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#E61648',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  borderButton: {
    borderWidth: 1.5,
    borderColor: '#E61648',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  linkTag: {
    textAlign: 'center',
    color: 'red',
    marginTop: HP('5%'),
    fontSize: 16,
    fontFamily: 'Heebo-Regular',
  },
  modal: {
    width: WP('100%'),
    height: HP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.8,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WP('20%'),
    height: HP('10%'),
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    opacity: 1,
  },
});
