import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet, EventEmitter,
  Image,Linking,
} from 'react-native';
//import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionCheck from 'react-native-version-check';


const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  global.glbDomainurl="https://birainfosystem.com/";//"https://birainfosystem.com/"; //"http://192.168.1.100/";
  useEffect(() => {
    displayData();
  }, []);

  const displayData = async () =>{
    try {
      var Component = "Login";
      AsyncStorage.setItem("domain",global.glbDomainurl);
      console.log(VersionCheck.getPackageName());       
      console.log(VersionCheck.getCurrentBuildNumber());
      console.log(VersionCheck.getCurrentVersion());    
      VersionCheck.getLatestVersion()
      .then(latestVersion => {    
      console.log(latestVersion);   
      });
      VersionCheck.needUpdate()
      .then(async res => {
        console.log(res.isNeeded);  
        if (!res.isNeeded) {
          console.log(res.storeUrl);
        //  Linking.openURL(res.storeUrl);  
        }
      });
      setTimeout(() => {
        setAnimating(false);
        navigation.replace('Login', { curComp: Component });
      }, 2000);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/logo.jpg')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#000000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
