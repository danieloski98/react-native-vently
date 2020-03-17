import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Picker,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Firstpage() {
  let {accounType, setAccounType} = useState('Single');
  return (
    <View style={FirstpageStyle.Parent}>
      <View style={FirstpageStyle.firstSection}>
        <View>
          <Icon
            style={FirstpageStyle.backIcon}
            name="md-arrow-back"
            size={30}
          />
        </View>

        <View style={FirstpageStyle.headerContainer}>
          <Text style={FirstpageStyle.headerText}>Create A New Event</Text>
        </View>
      </View>

      <View style={FirstpageStyle.writeUpContainer}>
        <Text style={FirstpageStyle.writeUp}>
          Let's help you get your event ready, What kind of event do you want to
          create
        </Text>
      </View>

      <View style={FirstpageStyle.imgContainer}>
        <Image
          source={require('../../images/newevent.png')}
          style={FirstpageStyle.img}
        />
      </View>

      <View style={FirstpageStyle.accountTypeContainer}>
        <Text style={FirstpageStyle.accounttypeText}>Select An Event Type</Text>
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
            style={FirstpageStyle.input}
            selectedValue={accounType}
            onValueChange={(itemvalue, itemIndex) => {
              setAccounType(itemvalue);
            }}
            mode="dropdown">
            <Picker.Item label="Single Day Event" value="Personal" />
            <Picker.Item label="Multi Day Event" value="Business" />
          </Picker>
        </View>
      </View>

      <View
        style={{marginTop: 40, height: 50, marginLeft: 30, marginRight: 30}}>
        <TouchableHighlight
          onPress={() => this._submit()}
          style={FirstpageStyle.submitButton}>
          <Text style={{color: 'white'}}>Continue</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

let FirstpageStyle = StyleSheet.create({
  Parent: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  firstSection: {
    padding: 20,
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIcon: {
    position: 'relative',
    top: 1,
  },
  headerContainer: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Poppins-Medium',
  },
  writeUpContainer: {
    padding: 20,
  },
  writeUp: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Heebo-Regular',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    width: 450,
    height: 300,
  },
  accountTypeContainer: {
    marginTop: 40,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
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
  input: {
    borderWidth: 2,
    borderColor: '#ECECEC',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    flex: 1,
    paddingLeft: 28,
    paddingRight: 15,
    marginTop: 10,
  },
});
