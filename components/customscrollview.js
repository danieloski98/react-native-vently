import React, {useState} from 'react'
// @ts-ignore
import { Image, ScrollView, Text, View, Dimensions, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const screenWidth = Dimensions.get("screen").width;
const counts = [0,1,2,3];
const Texts = [
    "Create & Attend Your Favorite Events All In One Place",
    "Digital Tickets Made For Everyone",
    "Invite Creatives & Vendors To Your Event",
    "Sign Up As A Service Proivder To Start Earning",
];


export default function Customscrollview() {
    const [activePosition, setActivePostion] = useState(0);
    const updateActive = (e) => {
        setActivePostion(e['nativeEvent'].position);
    }
    return (
        <View style={{ width: Dimensions.get('window').width }}>
            <ViewPager initialPage={0} style={{ backgroundColor: "white", width: screenWidth, height: 400, marginTop: 10}}onPageSelected={(e) => updateActive(e)}>

                <View style={{ alignItems: "center"}}>
                    <View>
                        <Image source={require(
// @ts-ignore
                        "../images/1.png")} resizeMode={"contain"} style={{ width: 180, height: 390}}/>
                    </View>
                </View>


                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    <View>
                        <Image source={require(
// @ts-ignore
                        "../images/2.png")} resizeMode={"contain"} style={{ width: 180, height: 390}}/>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    <View>
                        <Image source={require(
// @ts-ignore
                        "../images/3.png")} resizeMode={"contain"} style={{ width: 180, height: 390}}/>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    <View>
                        <Image source={require(
// @ts-ignore
                        "../images/4.png")} resizeMode={"contain"} style={{ width: 200, height: 390}}/>
                    </View>
                </View>

            </ViewPager>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                {counts.map((
// @ts-ignore
                item, index) => (
                    <View key={index} style={activePosition == index ? indicatorStyle.active : indicatorStyle.inActive} >
                    </View>
                ))}
            </View>

            <View style={{ height: 70, paddingLeft: 10, paddingRight: 10}}>
                <Text style={{ fontSize: 18, marginTop: 20, textAlign: "center", color: "#000000", fontFamily: "Heebo-Regular"}}>
                    {Texts[activePosition]}
                </Text>
            </View>

        </View>
    )
}

const indicatorStyle = StyleSheet.create({
    inActive: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#E61648",
        margin: 5,
        opacity: .5
        
    },
    active: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: "#E61648",
        margin: 3,
    }
});
