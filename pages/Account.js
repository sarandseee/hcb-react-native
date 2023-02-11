import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, SafeAreaView, Image, ScrollView, FlatList, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-paper';
import Styles from '../styles/Styles';
import { scale, moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import Footer from './Footer';
import Colors from '../styles/Colors';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Account() {
  const navigation = useNavigation()
  const [columns, setColumns] = useState([
    "YACHT",
    "YEAR-MODEL",
    "HIN#",
  ]);
  const [data, setData] = useState();
  const [shouldShow, setShouldShow] = useState(false);
  const [showLoad, setshowLoad] = useState(false);
  const [userId, setUserid] = useState('')
  const [userName, setUserName] = useState('')
  const [status, setStatus] = useState('');
  const [Notiread, setNotiread] = useState('');
  const [NotiDisplay, setNotiDisplay] = useState('none');
  const [countRender, setcountRender] = useState(1);
  const [domain, setdomain] = useState(global.glbDomainurl);

  useFocusEffect(
    useCallback(() => {
      fetchBoatdetails();
      return () => {

      };
    }, [])
  );

  const fetchBoatdetails = async () => {
    let user = await AsyncStorage.getItem('userId');
    let userName;// = await AsyncStorage.getItem('userName');
    setUserid(user);
    if (user == 'GUEST') {
      userName = 'GUEST';
      setUserName(userName);
      setStatus('Guest profile Yacht/Boat data is not available to list')
      return;
    }
    else {
      userName = await AsyncStorage.getItem('userName')
      setUserName(userName)
    }
    console.log(user);
    setUserName(userName)


    try {
      // let letDomain = await AsyncStorage.getItem('domain');
      if (countRender == 1) {
        setshowLoad(true);
        setcountRender(countRender + 1);
        //setdomain(letDomain);
      }
      let url = domain + 'hcblifestyle/getboatdetails.php';
      console.log("Boqt->" + url);
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
      var fetData = json.boatdetails;
      if (fetData[0].statusCode == "notfound") {
        setStatus('No Boats Available')
      }
      else {
        if (parseInt(fetData[0].NOTICOUNT) > 0) {
          setNotiread(fetData[0].NOTICOUNT);
          setNotiDisplay('flex');
        } else {
          setNotiDisplay('none');
        }
        setData(fetData);
        setShouldShow(true);
        setStatus('')
      }

      setshowLoad(false);
      console.log("fetData====>" + fetData);

    } catch (error) {
      setshowLoad(false);
      console.log(error);
      if (error == "TypeError: Network request failed") {
        alert("please check your internet connection");
      }
      else {
        console.log(error);
      }
    }
  }
  const moveService = async (thatrow) => {
    try {
      navigation.navigate("Yacht Service", { curRow: thatrow });
    } catch (error) {
      alert(error)
    }
  }
  const tableHeader = () => (
    <View style={Styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={[column == "YEAR-MODEL" ? styles.clsMake : column == "YACHT" ? styles.clsModal : column == "HIN#" ? styles.clsHineno : null,
                Styles.centerPage]}
              >
                <Text style={Styles.columnHeaderTxt}>{column + " "}
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{ flex: .8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <View style={{ width: scale(200) }}
          >
            <View style={Styles.topClss}>
              <Text style={{ fontSize: moderateScale(16, 0.4), color: 'black' }}>
                Welcome {userName}
              </Text>
            </View>
            <View style={Styles.topClss}>
              <Text style={{ fontSize: moderateScale(16, 0.4), color: 'black' }}>
                User Id : {userId}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', padding: scale(10), marginLeft: moderateScale(14) }}>
            <TouchableOpacity style={styles.badgeContainer}
              onPress={() => { navigation.navigate("NOTIFICATIONS"); setNotiDisplay('none'); }}>
              <Icon name="notifications" size={scale(30)} color={Colors.primaryThemecolor}
                style={{ marginTop: verticalScale(15) }} />
              <Badge
                visible={true}
                size={scale(20)}
                style={{ top: verticalScale(8), right: scale(10), position: 'absolute', display: NotiDisplay }}>
                {Notiread}
              </Badge>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[Styles.topClss, Styles.centerAlign]}>
          <Text style={Styles.headTitle}>
            Yachts details
          </Text>
        </View>
        <View style={Styles.topClss}>
          <Text style={[Styles.normalText, { textAlign: 'center', }]}>
            Select to Schedule Yacht Service
          </Text>
        </View>
        {shouldShow ? (<View style={[Styles.topClss, Styles.centerAlign, { flex: 1 }]}>
          <FlatList
            data={data}
            //style={{ width: "97%" }}
            scrollEnabled={true}
            keyExtractor={(item, index) => index + ""}
            ListHeaderComponent={tableHeader}
            stickyHeaderIndices={[0]}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={(event) => moveService(item)}
                >
                  <View style={{ ...Styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                    <Image
                      source={item.imgpath1 == "noimage" ? require('../Image/Front.jpg') : { uri: item.imgpath1 }}
                      style={[styles.clsModal, {
                        resizeMode: 'contain',
                        height: verticalScale(55),
                      }]}
                    />
                    <Text style={styles.clsMake}>{item.model + "-" + item.modelyear}</Text>
                    <Text style={styles.clsHineno}>{item.boatid}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>) : null}
      </View>
      <Footer Animating={showLoad} Status={status} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  badgeContainer: {
    width: scale(65),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clsMake: {
    textAlign: "center", color: Colors.tableFontcolor, width: moderateScale(130), fontSize: moderateScale(14),
  },
  clsModal:
  {
    textAlign: "center", color: Colors.tableFontcolor, width: moderateScale(120),//fontSize:moderateScale(14),
  },
  clsHineno:
  {
    textAlign: "center", color: Colors.tableFontcolor, width: moderateScale(130), fontSize: moderateScale(14),
  },
});
