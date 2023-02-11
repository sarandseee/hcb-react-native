import React, { useState, useEffect } from 'react'
import {
    StyleSheet, FlatList, Text, View, Button, ScrollView, Platform, Dimensions, SafeAreaView,
    TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import Footer from './Footer';
import Styles from '../styles/Styles';
import { scale,moderateScale } from 'react-native-size-matters';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Notification() {
    const [NotiId, setNotiId] = useState();
    const [NotiStaus, setNotiStaus] = useState();
    const [isVisible, setPopup] = useState(false)
    const [notification, setNotification] = useState('')
    const [notificationhead, setNotificationhead] = useState('')
    const [data, setData] = useState([]);
    const [notiCount, setnotiCount] = useState("");
    const [allnoticount, setallnoticount] = useState("");
    const [varColor, setvarColor] = useState({});
    const [shouldShow, setShouldShow] = useState(false);
    const [showLoad, setshowLoad] = useState(false);
    const [nodata, setnodata] = useState('none');
    const [domain, setdomain] = useState(global.glbDomainurl);
    useEffect(() => {
        fetchNoti();
    }, []);
    async function fetchNoti() {
        try {
            // let letDomain = await AsyncStorage.getItem('domain');
            // console.log("letDomain==>" + letDomain);
            // setdomain(letDomain);
            let user = await AsyncStorage.getItem('userId');
            setshowLoad(true);
            let url = domain + 'hcblifestyle/getNotificationDetails.php';
            console.log(url);
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'customerid': user })
            });
            var json = await response.json();
            console.log("fetData====>" + JSON.stringify(json));
            var jsonValue = json.notificationdetails;
            setData(jsonValue);
            console.log(jsonValue);
            if (jsonValue[0].statusCode == "found") {
                setShouldShow(true);
                setshowLoad(false);
            }
            else {
                setshowLoad(false);
                setnodata('flex');

            }
        }
        catch (err) {
            console.log(err);
            if(err == "TypeError: Network request failed")
            {
                alert("please check your internet connection");
            }
            else
            {
                console.log(err);
            }
            setshowLoad(false);
        }
    }
    const Notiread = async (item) => {
        try {
            setPopup(!isVisible)
            setNotification(item.details)
            setNotificationhead(item.subject)
            setShouldShow(false)
            if (item.notificationstatus == "NEW") {
                let url = domain + 'hcblifestyle/UpdateNotificationRequest.php';
                console.log(url + '==j==>' + JSON.stringify({ 'notificationid': item.notificationid, "statusmessage": "OLD" }));
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'notificationid': item.notificationid, "statusmessage": "OLD" })
                });
                var json = await response.json();
                console.log("fetData====>" + JSON.stringify(json));
                if (json.statusCode == "200")
                    await fetchNoti();

            }

            //  var fetData = json.customerdetails;
            // console.log("Arraylabel===>" + JSON.stringify(fetData));
            //await fetchNoti();
        }
        catch (err) {
            console.log(err);
            if(err == "TypeError: Network request failed")
            {
                alert("please check your internet connection");
            }
            else
            {
                console.log(err);
            }
        }

    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: screenHeight * 0.002,
                    // width: '100%',
                    backgroundColor: '#C8C8C8'
                }}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { paddingHorizontal: screenHeight * 0.02 }]}>
                <View style={{flex:.7}}>
                    <View style={[styles.clsTop, { height: screenHeight * 0.7,flex:1}]}>
                        {shouldShow ? (
                                <FlatList
                                    data={data}
                                    keyExtractor={item => item.notificationid}
                                    //   ItemSeparatorComponent={ItemSeparatorView}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ marginTop: screenHeight * 0.02 }}
                                            onPress={() => { Notiread(item) }}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <View style={{ width: screenWidth * 0.06, marginRight: screenWidth * 0.02 }}>
                                                    <Text 
                                                    style={{color: 'teal', display: item.notificationstatus == "OLD" ? "none" : "flex" }}>{'\u2B24'}</Text></View>
                                                <View>
                                                    <Text style={Styles.normalText}>{item.subject}</Text>
                                                    <Text style={Styles.normalText2} numberOfLines={1}>{item.details}</Text>
                                                    <View style={styles.hairline} />
                                                </View>
                                            </View>

                                        </TouchableOpacity>

                                    )}
                                />
                        ) : null}
                    </View>
                    <View style={{ display: nodata }}>
                        <Text style={[{ textAlign: 'center'},Styles.headTitle]}>No New Notifications</Text>
                    </View>
                </View>
                <Footer Animating={showLoad} Status={''} />
                <Modal //animationType={"slide"}
                    //animationIn={"bounceInUp"} animationInTiming={2000} 
                    // animationOut={"bounceInDown"} animationOutTiming={2000}
                    //  transparent={true}
                    animationIn={'slideInUp'} animationInTiming={400}
                    animationOutTiming={400}
                    isVisible={isVisible}
                    onBackdropPress={() => { setPopup(false); setPopup(!isVisible); setShouldShow(true); }} onBackButtonPress={() => { setPopup(false); setPopup(!isVisible); setShouldShow(true); }}
                >
                    <View style={styles.modelview}>
                        <Icon name="close-circle" size={scale(30)} color="#1d355e"
                            onPress={() => { setPopup(!isVisible); setShouldShow(true) }} />
                        <Text style={Styles.headTitle}>{notificationhead}</Text>
                        {/* <Text style={{ color: 'gray' }}>
                            {notification}
                        </Text> */}
                        {/* <View>
                             <Image
                                     source={{ uri: Images.uri }}
                                     style={styles.imageStyle}
                            />
                       </View>        */}
                        <Text style={{ marginTop: screenHeight * 0.07, color: 'black',fontSize:moderateScale(14,0.4),  }}>{notification}</Text>
                        <Text style={{ alignSelf: 'flex-start', marginTop: screenHeight * 0.05, color: 'black',fontSize:moderateScale(14,0.4) }}>Thank you</Text>
                        <Text style={{ alignSelf: 'flex-start', color: 'black',fontSize:moderateScale(14,0.4) }}>HCB Test and Service Center</Text>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    clsTop: {
        marginTop: screenHeight * 0.01,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        // padding: 10,
        // paddingHorizontal: screenHeight * 0.02,
        //justifyContent: 'center',
    },
    hairline: {
        backgroundColor: '#A2A2A2',
        height: screenHeight * 0.002,
        marginTop: screenHeight * 0.007,
        width: screenWidth * 0.95
    },
    modelview: {
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: screenHeight * 0.01,
        shadowColor: "#000",
        backgroundColor: '#fff',
        height: screenHeight * 0.7,
        paddingHorizontal: screenHeight * 0.02
    }
});