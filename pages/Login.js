import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, //TextInput, 
  TouchableOpacity,
  Text, ActivityIndicator,
  useColorScheme, ImageBackground, Image, KeyboardAvoidingView,
  View, Dimensions, Keyboard, Linking, Alert,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-paper";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Footer from './Footer';
import styles from '../styles/Styles';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../styles/Colors';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Login = ({ navigation, route }) => {
  const [userId, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [Rpassword, setRpassword] = useState(false);
  const [UniqueId, setUniId] = useState();
  const [currComponent, setcurrComponent] = useState();
  const [status, setStatus] = useState('');
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [animating, setAnimating] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const element = <TextInput.Icon icon={secureTextEntry == true ? "eye" : "eye-off"} onPress={() => { setSecureTextEntry(!secureTextEntry); return false; }} />
  useEffect(() => {
    displayData();
  }, []);


  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  function getFile() {
    setAnimating(true);
    const url = "https://birainfosystem.com/hcblifestyle/uploads/hcb-privacy.pdf";
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/hcb-privacy.pdf`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        console.log("sucsess");
        setAnimating(false);
      })
      .catch((error) => {
        console.log("failure");
        setAnimating(false);
      });
  }

  const getCurrDate = async () => {
    try {
      const today = new Date();

      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      let currDate = dd + '/' + mm + '/' + yyyy;
      return currDate;
    }
    catch (err) {
      alert(err);
    }
  }
  const displayData = async () => {
    try {
     // let letDomain = await AsyncStorage.getItem('domain');
      console.log("letDomain==>" + domain);
      //setdomain(letDomain);
      DeviceInfo.getUniqueId().then((uniqueId) => {
        setUniId(uniqueId);
      });
      let user = await AsyncStorage.getItem('userId');
      console.log(user);
      setUserid(user);
      if (user) {
        let remindPs = await AsyncStorage.getItem('remindPs');
        if (remindPs) {
          let currDate = await getCurrDate();
          Arrdatetime = remindPs.split("~");
          console.log(Arrdatetime);
          if (Arrdatetime[1] === currDate) {
            setRpassword(true);
            setPassword(Arrdatetime[0]);
          }
          else {
            AsyncStorage.removeItem('remindPs');
          }
        }
      }


    } catch (error) {
      //alert(error)
      console.log(error);
    }
  }
  const loginValidate = async () => {
    setStatus('');
    setAnimating(true);
    Keyboard.dismiss();
    var varuserId = userId;
    if(userId.toUpperCase() == "ADMIN")
    {
      varuserId='Admin';
    }
    else
    {
      varuserId = userId.toUpperCase();
    }
          
    const url = domain + 'hcblifestyle/loginvalidate.php?appid=' + UniqueId + '&customerid=' +varuserId;
    console.log(url);
    try {
      let response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      var jsonResponce = await response.json();
      setAnimating(false);
      console.log("json==>" + JSON.stringify(jsonResponce));
      if (jsonResponce.statusCode == "notfound") {
        setStatus('User Id Not Found')
      }
      else {
        AsyncStorage.setItem("userId", jsonResponce.appid);
        AsyncStorage.setItem("roleId", jsonResponce.roleid);
        AsyncStorage.setItem("userps", password);
        AsyncStorage.setItem("userName", jsonResponce.username);
        if (Rpassword == true) {
          let currDate = await getCurrDate();
          await AsyncStorage.setItem('remindPs', password + "~" + currDate);
        }
        else if (Rpassword == false) {
          AsyncStorage.removeItem('remindPs')
        }
        jsonResponce.password.trim().toUpperCase() === password.trim().toUpperCase() ? navigation.navigate("Menu", { curRole: jsonResponce.roleid }) : alert("Incorrect Password");//setStatus("Incorrect Password");
      }
    } catch (error) {
      setAnimating(false);
      console.log(error);
      if (error == "TypeError: Network request failed") {
        alert("please check your internet connection");
      }
      else {
        console.log(error);
      }

    }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.bgColor}}>
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
        <View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <View>
              <Image
                source={require('../Image/logo.jpg')}
                style={{ width: scale(140), height: verticalScale(70), }}
                resizeMode='contain'
              />
            </View>
          </View>
          <View >
            <Text style={styles.headTitle}>
              LogIn To HCB Lifestyle
            </Text>
            <TouchableOpacity style={styles.topClss}
              onPress={getFile}
            >
              <Text style={styles.normalText}>PRIVACY POLICY{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wholeBorder}>
            {/* <View>
            <TextInput
              placeholder="Enter the User Id or Mobile No or Email Id"
              placeholderTextColor={'gray'}
              style={styles.input}
              value={userId}
              onChangeText={text => { setUserid(text); setStatus('') }}
            />
          </View> */}
            <View>
              <TextInput
                placeholder="Enter the UserId or Mobile No or Email Id"
                placeholderTextColor={Colors.placeHoldercolor}
                style={styles.bottomInput}
                value={userId}
                activeUnderlineColor={Colors.primaryThemecolor}
                onChangeText={text => { setUserid(text); setStatus('') }}
              />
            </View>
            {/* <View>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'gray'}
              style={styles.input}
              value={password}
              secureTextEntry
              onChangeText={text => { setPassword(text); setStatus('') }}
            />
          </View> */}
            <View>
              <TextInput
                // label="Password"
                placeholder='Password'
                placeholderTextColor={Colors.placeHoldercolor}
                // editable={false}
                value={password}
                secureTextEntry={secureTextEntry}
                onChangeText={text => { setPassword(text); setStatus('') }}
                style={styles.bottomInput}
                activeUnderlineColor={Colors.primaryThemecolor}
                right={element}
              />
            </View>
            <View style={[styles.topClss2, {alignSelf: 'flex-start', flexDirection: 'row',marginLeft: moderateScale(7) }]}>
              {/* <TouchableOpacity>
              <Text><Text style={{ color: '#1F51FF',textAlign:'left' }}>Forget Login </Text><Text> | </Text></Text>
            </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate("FORGET PASSWOR")}>
                <Text style={styles.normalText}> Forget Password</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.topClss2, {
              alignSelf: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row', marginLeft: moderateScale(5) 
            }]}>
              <Checkbox.Android
                status={Rpassword ? 'checked' : 'unchecked'}
                color={Colors.primaryThemecolor}
                onPress={() => {
                  setRpassword(!Rpassword);
                }}
              />
              <View><Text onPress={() => setRpassword(!Rpassword)} style={styles.normalText2}>Remember Me</Text></View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={loginValidate}
              >
                <Text style={styles.buttonText}>LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => { navigation.navigate("Menu", { curRole: "GUEST" }); AsyncStorage.setItem("userId", "GUEST"); }}>
              <Text style={[styles.topClss, styles.normalText]}>CONTINUE AS A GUEST{'>'}</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={[styles.centerAlign]}>
             <Image
                source={require('../Image/new2.jpeg')}
                style={{aspectRatio:1}}
                resizeMode='contain'
              />
          </View> */}
        </View>
        <View style={[styles.topClss2,{justifyContent:'flex-end'}]}>
          <View>
            <Footer Animating={animating} Status={status} />
          </View>
          <View style={{ backgroundColor: '#1d355e',justifyContent:'flex-end', alignItems: 'center', paddingVertical: scale(4), }}>
            <Text style={[styles.normalText3,{ textAlign: 'left', color: Colors.fontColor2}]}>
              NEED HELP:
              <Icon name={'call'} size={moderateScale(14,0.4)} color={Colors.fontColor2} /> : +1865.406.6514 <Icon name={'ios-mail'} size={moderateScale(14,0.4)} color={Colors.fontColor2} /> : hcb@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default Login;
