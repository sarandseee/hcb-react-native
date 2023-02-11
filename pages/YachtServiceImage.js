import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView, Dimensions, TouchableOpacity
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import Con from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import styles from '../styles/Styles';
import Colors from '../styles/Colors';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const YachtServiceImage = ({ navigation, route }) => {
  const [curBoat, setCurBoat] = useState('');
  const [curBoatdetails, setCurBoatdetails] = useState('');
  const [showRealApp, setShowRealApp] = useState('');
  useEffect(() => {
    displayData();
  }, []);
  const [disblebtn, setdisblebtn] = useState(true);


  useFocusEffect(
    useCallback(() => {
      upComingservice();
      console.log("focus");
      return () => {
        console.log("Unfocus");
      };
    }, [])
  );
  const upComingservice = async () => {
    try {
      let letDomain = global.glbDomainurl;//global.glbDomainurl await AsyncStorage.getItem('domain');
      var curRow = route.params.curRow;
      console.log("letDomain==>" + letDomain + "curRow" + curRow);
      let url = letDomain + 'hcblifestyle/getupcommingdetails.php';
      console.log(url);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'customerid': curRow.customerid, 'boatid': curRow.boatid })
      });
      var json = await response.json();
      var jsonArray = json.serviceregistrationdetails;
      console.log("fetData====>" + jsonArray[0].statusCode + "===" + JSON.stringify(json));

      if (jsonArray[0].statusCode === "notfound")
        setdisblebtn(false);
      else {
        setCurBoatdetails(jsonArray[0]);
        setdisblebtn(true);
      }

    } catch (error) {
      console.log(error);
      if (error == "TypeError: Network request failed") {
        alert("please check your internet connection");
      }
      else {
        console.log(error);
      }
    }
  }

  const displayData = async () => {
    try {
      console.log(JSON.stringify(route.params.curRow));
      var curRow = route.params.curRow;
      const slides = [
        {
          key: 's1',
          image: curRow.imgpath1 == "noimage" ? require('../Image/Front.jpg') : { uri: curRow.imgpath1 },
        },
        {
          key: 's2',
          image: curRow.imgpath2 == "noimage" ? require('../Image/side.jpg') : { uri: curRow.imgpath2 },
        },
        {
          key: 's3',
          image: curRow.imgpath3 == "noimage" ? require('../Image/Back.jpg') : { uri: curRow.imgpath3 },
        },

      ];
      setCurBoat(route.params.curRow);
      setShowRealApp(slides);

    } catch (error) {
      alert(error)
    }
  }


  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {/* <Text style={styles.introTitleStyle}>
          {item.title}
        </Text> */}
        <Image
          style={styles.introImageStyle}
          source={item.image} />
        {/* <Text style={styles.introTextStyle}>
          {item.text}
        </Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView style={styles.container}>
        {/* <View style={[styles.topClss,{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
          <View>
            <Text style={{ fontSize: moderateScale(16, 0.4), color: 'black' }}>
              Captain Name
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[{ alignItems: 'flex-end',display: curBoat.customertype == 'C' ? 'flex' : 'none' }]}>
              <Text style={styles.normalText}>
                Appoint New Captain <Con name='account-tie-hat' size={moderateScale(20, 0.4)} 
                                      color={Colors.primaryThemecolor} />
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <TouchableOpacity 
        style={[{ alignItems: 'flex-end', marginRight: moderateScale(20, 0.5), display:curBoat.customertype == 'C'?'flex':'none' }, styles.topClss]}
        onPress={()=>{navigation.navigate("AdminCap",{curRole: "Captain",Hinno:curBoat.boatid,Capid:curBoat.captonid})}}
        >
          <Text style={styles.normalText}>
            Captain Details<Con name='account-tie-hat' size={moderateScale(25, 0.4)} color={Colors.primaryThemecolor} />
          </Text>
        </TouchableOpacity>
        <View style={styles.topClss}>
          <Text style={[styles.topClss, { color: 'black', alignSelf: 'center' }]}>
            {curBoat.model + "-" + curBoat.modelyear}
          </Text>
        </View>
        <View style={styles.topClss}>
          <AppIntroSlider
            data={showRealApp}
            renderItem={RenderItem}
            showNextButton={false}
            showDoneButton={false}
          />
        </View>
        <View style={[styles.centerAlign, styles.topClss]}>
          <Text style={[styles.normalText, { textAlign: 'center' }]}>
            {curBoatdetails.scheduladate == "" || curBoatdetails.scheduladate == null ? "" : "Upcoming Services : " + curBoatdetails.scheduladate}{'\n'}
            {curBoatdetails.servicestatus == "" || curBoatdetails.servicestatus == null ? "" : "Service Status : " + curBoatdetails.servicestatus}
          </Text>
        </View>
        <View style={styles.topClss}>
          <View style={styles.Buttoncontainer}>
            <TouchableOpacity style={styles.square} disabled={disblebtn}
              onPress={() => { navigation.navigate("SCHEDULE SERVICE", { curBoat: route.params.curRow }) }}
            >
              <Icon name="boat-outline" size={scale(25)} color="#1D355E" />
              <Text style={styles.iconTextstyle}>Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square}>
              <Icon name="cog-sharp" size={scale(25)} color="#1D355E" />
              <Text style={styles.iconTextstyle}>Service History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square}>
              <Icon name="today-outline" size={scale(25)} color="#1D355E" />
              <Text style={styles.iconTextstyle}>Maintance Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topClss}>
          <View style={styles.Buttoncontainer}>
            <TouchableOpacity style={styles.square}>
              <Icon name="reader-sharp" size={scale(25)} color="#1D355E" />
              <Text style={styles.iconTextstyle}>Referance Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square}>
              <Icon name="shield-checkmark-sharp" size={scale(25)} color="#1D355E" />
              <Text style={styles.iconTextstyle}>Warranty</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square}>
              <Icon name="medkit-outline" size={scale(25)} color="#1D355E" />
              <Text style={styles.iconTextstyle}>Yacht Health Reports</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{
          justifyContent: 'flex-end',
          marginTop: screenHeight * 0.1,
          padding: 20, alignItems: 'center'
        }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>Copyright</Text>
          <Text style={{ fontSize: 20, color: 'gray' }}>HCB Yachts</Text>
        </View> */}
        <View style={{ paddingBottom: verticalScale(10) }}>
          <Footer Animating={false} Status={''} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YachtServiceImage;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


