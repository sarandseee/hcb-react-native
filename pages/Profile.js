import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Dimensions,Keyboard,ActivityIndicator, TouchableOpacity } from 'react-native'
import { TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles.js';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/core';
import Footer from './Footer.js';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors.js';
export default function Profile() {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [Name, setName] = useState('')
  const [lastName, setlastName] = useState('')
  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Address, setAddress] = useState('');
  const [animating, setAnimating] = useState(false);
  const [userId, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [showLoad, setshowLoad] = useState(false);
  const [Addadmin, setAddadmin] = useState('none');
  const [Edittrue, setEdittrue] = useState(false);
  const [Country, setCountry] = useState('');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Zipcode, setZipcode] = useState('');
  const [status, setStatus] = useState('');

  const element = <TextInput.Icon icon={secureTextEntry == true ? "eye" : "eye-off"} onPress={() => { setSecureTextEntry(!secureTextEntry); return false; }} />
  useEffect(() => {
    displayData();
  }, []);

  const displayData = async () => {
    let user = await AsyncStorage.getItem('userId');
    console.log(user)
    let userRole = await AsyncStorage.getItem('roleId');
    console.log(userRole)
    if (userRole == 0)
      setAddadmin('flex');
    console.log("pROfile" + user);
    setUserid(user);
    setshowLoad(true);
    try {
      //let letDomain = await AsyncStorage.getItem('domain');
      // setdomain(letDomain);
      let url = domain+'hcblifestyle/getcustomerdetails.php';//http://192.168.1.101/domain
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
      var fetData = json.customerdetails[0];
      setshowLoad(false);
      if (fetData.statusCode == "found") {
        setAddress(fetData.street);
        setCountry(fetData.country)
        setState(fetData.state);
        setCity(fetData.city);
        setZipcode(fetData.zipcode);
        setEmail(fetData.emailid)
        setUserid(user);
        setMobile(fetData.phoneno);
        setPassword(fetData.loginpwd);
        setName(fetData.firstname)
        setlastName(fetData.lastname);
      }
      else {
        setAddress(user);
        setEmail(user)
        setUserid(user);
        setMobile(user);
        setPassword(user);
        setName(user);
      }
      console.log("fetData====>" + fetData.statusCode);

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
  const registerValidate = async () => {
    Keyboard.dismiss();
    const url = domain +'hcblifestyle/UpdateCustomerProfile.php';
    console.log(url);
    try {
      setshowLoad(true);
        let response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "customerid": userId,
          //  "customername": Fullname,
           // "firstname": firstName,
            //"lastname": lastName,
            //"phoneno": Mobile,
            //"emailid": Email,
            "cityaddress": City,
            "streetaddress": Address,
            "stateaddresss": State,
            "zipcodeaddress": Zipcode,
            "countrycode": Country,
          })
        });
        console.log(JSON.stringify({
          "customerid": userId,
        //  "customername": Fullname,
         // "firstname": firstName,
          //"lastname": lastName,
          //"phoneno": Mobile,
          //"emailid": Email,
          "cityaddress": City,
          "streetaddress": Address,
          "stateaddresss": State,
          "zipcodeaddress": Zipcode,
          "countrycode": Country,
        }));
        var json = await response.json();
        console.log("fetData====>" + JSON.stringify(json));
        setAnimating(false);
        if (json.statusCode == 200) {
          setStatus('Profile Updated Successfully');
        }
        else
          setStatus('Failure to Update Profile');
         await displayData(); 
    } catch (error) {
      console.log(error);
      if (error == "TypeError: Network request failed") {
        alert("please check your internet connection");
      }
      else {
        console.log(error);
      }
    }
    finally {
      setshowLoad(false);
      setEdittrue(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity 
        onPress={()=>{navigation.navigate("AdminCap",{curRole: "Admin",Hinno:'',Capid:''})}}
        style={[{ alignItems: 'flex-end', marginRight: moderateScale(8, 0.5), display: Addadmin }, styles.topClss]}>
          <Text style={styles.normalText}>
            Add Admin <Icon name='person-add-sharp' size={moderateScale(20, 0.4)} color={Colors.primaryThemecolor} />
          </Text>
        </TouchableOpacity>
        <View style={[styles.centerAlign, styles.topClss, { flexDirection: 'row', justifyContent: 'space-evenly',}]}>
          <TouchableOpacity
            onPress={() => { setEdittrue(false) }}
            style={[stylesOver.twoBtn, { backgroundColor: Edittrue ? Colors.textBorderColor : Colors.primaryThemecolor }]}
          >
            <Text style={[styles.twoBtntext, { color: Edittrue ? Colors.headingColor : Colors.fontColor2 }]}>
              View Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setEdittrue(true) }}
            style={[stylesOver.twoBtn, { backgroundColor: Edittrue ? Colors.primaryThemecolor : Colors.textBorderColor }]}
          >
            <Text style={[styles.twoBtntext, { color: Edittrue ? Colors.fontColor2 : Colors.headingColor }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clsTittle}>
          <Text style={[styles.clsFont, styles.normalText3]}>
            Basic Info
          </Text>
        </View>
        <View style={styles.topClss}>
          <TextInput
            label="First Name"
            placeholderTextColor={Colors.placeHoldercolor}
            activeUnderlineColor={Colors.primaryThemecolor}
            value={Name}
            style={stylesOver.input}
            editable={Edittrue ? true : false}
            onChangeText={text => {
              setName(text)
            }}
          />
        </View>
        <View style={styles.topClss}>
          <TextInput
            label="Last Name"
            placeholderTextColor={Colors.placeHoldercolor}
            activeUnderlineColor={Colors.primaryThemecolor}
            value={lastName}
            style={stylesOver.input}
            editable={Edittrue ? true : false}
            onChangeText={text => {
              setlastName(text)
            }}
          />
        </View>
        <View style={styles.clsTittle}>
            <Text style={[styles.clsFont, styles.normalText3]}>
              Address Info
            </Text>
          </View>
        <View style={styles.topClss}>
          <TextInput
            placeholder="Street"
            label="Street"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            value={Address}
            style={stylesOver.input}
            editable={Edittrue ? true : false}
            onChangeText={text => {
              setAddress(text)
            }}
          />
        </View>
        <View style={styles.topClss}>
          <TextInput
            placeholder="City"
            label="City"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            style={stylesOver.input}
            editable={Edittrue ? true : false}
            value={City}
            onChangeText={text => { setCity(text); setStatus('') }}
          />
        </View>
        <View style={styles.topClss}>
          <TextInput
            placeholder="State"
            label="State"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            style={stylesOver.input}
            editable={Edittrue ? true : false}
            value={State}
            onChangeText={text => { setState(text); setStatus('') }}
          />
        </View>
        <View style={styles.topClss}>
          <TextInput
            placeholder="Zipcode"
            label="Zipcode"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            keyboardType='numeric'
            style={stylesOver.input}
            editable={Edittrue ? true : false}
            value={Zipcode}
            onChangeText={text => { setZipcode(text); setStatus('') }}
          />
        </View>
        <View style={styles.topClss}>
          <TextInput
            label="Country"
            placeholderTextColor={Colors.placeHoldercolor}
            activeUnderlineColor={Colors.primaryThemecolor}
            value={Country}
            editable={Edittrue ? true : false}
            onChangeText={text => { setCountry(text); setStatus('') }}
            style={stylesOver.input}
          />
        </View>
        <View>
          <View style={styles.clsTittle}>
            <Text style={[styles.clsFont, styles.normalText3]}>
              Contact Info
            </Text>
          </View>
          <View style={styles.topClss}>
            <TextInput
              label="Email"
              placeholderTextColor={Colors.placeHoldercolor}
              activeUnderlineColor={Colors.primaryThemecolor}
              value={Email}
              editable={Edittrue ? true : false}
              style={stylesOver.input}
            />
          </View>
          <View style={styles.topClss}>
            <TextInput
              label="Phone"
              placeholderTextColor={Colors.placeHoldercolor}
              keyboardType='number-pad'
              activeUnderlineColor={Colors.primaryThemecolor}
              value={Mobile}
              editable={Edittrue ? true : false}
              style={stylesOver.input}
            />
          </View>
          <View style={styles.clsTittle}>
            <Text style={[styles.clsFont, styles.normalText3]}>
              Login Info
            </Text>
          </View>
          <View style={styles.topClss}>
            <TextInput
              label="User Id"
              placeholderTextColor={Colors.placeHoldercolor}
              activeUnderlineColor={Colors.primaryThemecolor}
              editable={false}
              value={userId}
              style={stylesOver.input}
            />
          </View>
          <View style={styles.topClss}>
            <TextInput
              label="Password"
              placeholderTextColor={Colors.placeHoldercolor}
              activeUnderlineColor={Colors.primaryThemecolor}
              editable={false}
              value={password}
              secureTextEntry={secureTextEntry}
              style={stylesOver.input}
              right={element}
            />
          </View>
          <View style={{ display: Edittrue ? 'flex' : 'none' }}>
            <View style={[styles.buttonContainer, { alignSelf: 'center' }]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={registerValidate}
              >
                <Text style={styles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer, { alignSelf: 'center' }]}>
              <TouchableOpacity
                style={styles.btn}
                onPress={()=>{navigation.navigate("RESET PASSWORD");}}
              >
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer Animating={showLoad} Status={status} />
    </ScrollView>
  )
}

const stylesOver = StyleSheet.create({
  input: {
    color: 'gray',
    fontSize: moderateScale(14, 0.4),
  },
  twoBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.45,
    height: verticalScale(50)
  },
  twoBtntext: {
    fontSize: moderateScale(14, 0.4),
    textAlign: 'center'
  }
});