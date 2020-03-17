import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Picker,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Storage from '@react-native-firebase/storage';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

export default class Usernameselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: 'Personal',
      image: '',
      imageSelected: false,
      username: '',
      editable: true,
      imageURI: '',
    };
    this._handlebackbuttonpressed.bind(this);

    this.personaltext = (
      <Text>
        Use this account type if you would just be using Vent.ly for personal
        use. You can always switch accounts later
      </Text>
    );

    this.businessText = (
      <Text>
        Use this account type if you would be using Vent.ly for Business use.
        You can always switch accounts later
      </Text>
    );

    this.options = {
      title: 'Select Profile Picture',
      maxHeight: 600,
      maxWidth: 800,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this._handlebackbuttonpressed(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  _handlebackbuttonpressed() {
    ToastAndroid.showWithGravity(
      'Please complete your registration',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
    return true;
  }

  updateUsername(name) {
    this.setState({
      username: name,
    });
  }

  onImagePickerClicked = () => {
    ImagePicker.showImagePicker(this.options, response => {
      if (response.didCancel) {
        ToastAndroid.showWithGravity(
          'Cancelled',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } else if (response.error) {
        ToastAndroid.showWithGravity(
          'An error occured, please try again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } else {
        let source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({
          image: source,
          imageSelected: true,
          imageURI: response.uri,
        });
      }
    });
  };

  async uploadImage() {
    let fileExtention = this.state.imageURI.split('.').pop();
    let uuid = this.props.route.params.email + 'DP';
    let fileName = `${uuid}.${fileExtention}`;
    let storageRef = Storage().ref(
      `DisplayPics/${this.props.route.params.email}/${fileName}`,
    );
    storageRef
      .putFile(this.state.imageURI)
      .on(Storage.TaskEvent.STATE_CHANGED, async snapshot => {
        switch (snapshot.state) {
          case Storage.TaskState.ERROR: {
            this.setState({
              submitting: false,
            });
            ToastAndroid.showWithGravity(
              'An error occured while updating Profile Pic, please try again',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            break;
          }
          case Storage.TaskState.SUCCESS: {
            let DisplayPic = await storageRef.getDownloadURL();
            this._makeRequest(DisplayPic);
          }
        }
      });
  }

  async _makeRequest(DisplayPic) {
    try {
      let payload = {
        Business: this.state.accountType === 'Personal' ? false : true,
        Username: this.state.username,
        DisplayPic,
      };
      let response = await fetch(
        `https://api.vent.ly/api/v1/user/firstupdate/${
          this.props.route.params.ID
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      switch (response.status) {
        case 201: {
          let ID = this.props.route.params.ID;
          this.props.navigation.navigate('Interests', {ID});
          break;
        }
        case 400: {
          this.setState({
            submitting: false,
          });
          let result = await response.json();
          Alert.alert(result.message);
          break;
        }
        case 500: {
          this.setState({
            submitting: false,
          });
          Alert.alert('An error occured please try later');
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  _submit() {
    this.setState({
      submitting: true,
    });
    if (this.state.username === '' || this.state.username.length < 3) {
      Alert.alert('Username too short');
    } else {
      this.uploadImage();
    }
  }

  render() {
    return (
      <ScrollView style={style.parent}>
        <View style={style.mainContainer}>
          <View style={style.ImageContainer}>
            <Image
              resizeMode="contain"
              style={style.logo}
              source={require('../images/logo.png')}
            />
          </View>

          <Text style={style.headerText}>Welcome Mike</Text>
          <Text style={style.normalText}>
            Let's finish setting up your account
          </Text>

          <View style={style.ImagePickerContainer}>
            {!this.state.imageSelected ? (
              <TouchableHighlight
                onPress={() => this.onImagePickerClicked()}
                style={style.imagePicker}>
                <Icon name="md-camera" color="white" size={24} />
              </TouchableHighlight>
            ) : (
              <TouchableWithoutFeedback
                style={style.imagePicker}
                onPress={() => this.onImagePickerClicked()}>
                <Image
                  resizeMode="cover"
                  style={{width: 100, height: 100, borderRadius: 50}}
                  source={{uri: this.state.image['uri']}}
                />
              </TouchableWithoutFeedback>
            )}
          </View>

          <View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
                <Text style={style.usernameText}>Create Username</Text>

                <View style={style.usernameTextbox}>
                  <Icon
                    style={style.usernametextboxIcon}
                    name="md-at"
                    size={20}
                  />
                  <TextInput
                    value={this.state.username}
                    onChangeText={username => this.updateUsername(username)}
                    editable={this.state.editable}
                    style={style.input}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={style.accountTypeContainer}>
            <Text style={style.accounttypeText}>Select An Account Type</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  marginTop: 25,
                  marginLeft: 320,
                }}
                name="md-arrow-dropdown"
                color="grey"
                size={20}
              />
              <Picker
                style={style.input}
                selectedValue={this.state.accountType}
                onValueChange={(itemvalue, itemIndex) =>
                  this.setState({accountType: itemvalue})
                }
                mode="dialog"
                enabled={this.state.editable}>
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Business" value="Business" />
              </Picker>
            </View>
          </View>

          <Text style={{marginTop: 20}}>
            {this.state.accountType === 'Personal'
              ? this.personaltext
              : this.businessText}
          </Text>

          <View style={{marginTop: 40, height: 50}}>
            <TouchableHighlight
              onPress={() => this._submit()}
              style={style.submitButton}>
              {this.state.submitting ? (
                <ActivityIndicator size={28} color="white" />
              ) : (
                <Text style={{color: 'white'}}>Continue</Text>
              )}
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  parent: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingBottom: HP('5%'),
  },
  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: HP('2%'),
  },

  logo: {
    width: WP('15%'),
    height: HP('15%'),
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  normalText: {
    textAlign: 'center',
    fontFamily: 'Heebo-Regular',
    color: '#414040',
  },

  ImagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 40,
  },

  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ABB4BD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameTextbox: {
    flexDirection: 'row',
  },
  usernametextboxIcon: {
    position: 'absolute',
    marginTop: 27,
    marginLeft: 10,
    zIndex: 10,
    color: 'grey',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ECECEC',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    flex: 1,
    paddingLeft: 28,
    paddingRight: 15,
    marginTop: 10,
  },
  usernameText: {
    textAlign: 'center',
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
  },

  accountTypeContainer: {
    marginTop: 40,
    textAlign: 'center',
  },

  accounttypeText: {
    textAlign: 'center',
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#E61648',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    elevation: 1,
  },
});
