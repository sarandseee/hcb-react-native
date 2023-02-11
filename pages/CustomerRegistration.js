import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,TouchableOpacity,
  Text, ActivityIndicator,
  useColorScheme, ImageBackground, Image, KeyboardAvoidingView, Keyboard,
  View, Dimensions
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles.js';
import Footer from './Footer.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors.js';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { TextInput } from "react-native-paper";

const dataCountry = [
  { label: 'United States', value: 'USA' },
  { label: 'Other Country', value: 'Others' },
];

const dataCondition = [
  { label: 'CUSTOMER', value: 'C' },
  { label: 'CAPTAIN', value: 'S' },
];

const CustomerRegister = ({ navigation, route }) => {
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [Rpassword, setRpassword] = useState(false);
  const [UniqueId, setUniId] = useState();
  const [status, setStatus] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [animating, setAnimating] = useState(false);
  const [userId, setUserid] = useState('')
  const [dbuserId, setdbUserid] = useState('')
  const [password, setPassword] = useState('')
  const [Country, setCountry] = useState('USA');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Zipcode, setZipcode] = useState('');
  const [Address, setAddress] = useState('');
  const [Countrycode, setCountrycode] = useState([]);
  const [domain, setdomain] = useState(global.glbDomainurl);
  const[ddDisable,setddDisable]=useState(false);
  const[Ctype,setCtype]=useState('C');
  const [Cname,setCname]= useState('CUSTOMER');
  const[roleid,setRoleid]=useState(1);

  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setUniId(uniqueId);
      displayData();
      // getCountrycodes();
    });
  }, []);

  const displayData = async () => {
    try {
      setCountrycode(dataCountry);
      // let letDomain = await AsyncStorage.getItem('domain');
      // console.log("letDomain==>" + letDomain);
      // setdomain(letDomain);
      let url = domain + 'hcblifestyle/getCustomerId.php';
      console.log("urlcu" + url);
      let response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      var jsonResponce = await response.json();
      console.log("json==>" + JSON.stringify(jsonResponce));
      setdbUserid(jsonResponce.customerids[0].customerid);
      setUserid(Ctype+jsonResponce.customerids[0].customerid);

    } catch (error) {
      console.log(error);
      if (error == "TypeError: Network request failed") {
        alert("please check your internet connection");
      }
      else {
        console.log(error);
      }
    }
    // finally{
    // await getCountrycodes();
    //}
  }
  const getCountrycodes = async () => {
    try {
      let url = domain + 'hcblifestyle/getCountryCode.php';
      let response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      var jsonResponce = await response.json();
      console.log("json==>" + JSON.stringify(jsonResponce));
      //setCountrycode(jsonResponce.countryvalues);dataCountry

    } catch (error) {
      alert(error);
    }
  }

  async function onDropchange(item) {
    // setShowcategory(false);

    // if (item.value === 'PENDING')
    //   setShowcategory(true);
    setUserid(item.value+dbuserId);
    setCname(item.label)
    setCtype(item.value)

    //await fetchBoatdetails(item.value);
  }


  const registerValidate = async () => {
    //setAnimating(true);
    var clrText = false;
    Keyboard.dismiss();
    const url = domain + 'hcblifestyle/createcustomer.php';
    console.log(url);
    try {
      var Fullname = firstName + " " + lastName;
      setAnimating(true);
      if (userId != '' && password != '' && Email != '' && Mobile != '' && Country != '' && Zipcode != '' && State != '' && City != '' && firstName != '' && lastName != '') {
        clrText = true;
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "customerid": userId,
            "customername": Fullname,
            "firstname": firstName,
            "lastname": lastName,
            "phoneno": Mobile,
            "emailid": Email,
            "cityaddress": City,
            "loginid": userId,
            "loginpwd": password,
            "streetaddress": Address,
            "stateaddresss": State,
            "zipcodeaddress": Zipcode,
            "countrycode": Country,
            "customertype":Ctype,
            "roleid":roleid,
          })
        });
        console.log("fetData====>" + JSON.stringify({
          "customerid": userId,
          "customername": Fullname,
          "firstname": firstName,
          "lastname": lastName,
          "phoneno": Mobile,
          "emailid": Email,
          "cityaddress": City,
          "loginid": userId,
          "loginpwd": password,
          "streetaddress": Address,
          "stateaddresss": State,
          "zipcodeaddress": Zipcode,
          "countrycode": Country,
          "customertype":Ctype,
          "roleid":roleid,
        }));
        var json = await response.json();
        console.log("fetData====>" + JSON.stringify(json));
        setAnimating(false);
        if (json.statusCode == 200) {
          setStatus(Cname+' Saved Successfully');
        }
        else
          setStatus('Failure to Save');
      }
      else {
        setAnimating(false);
        // alert("001"+Reason)

        if (firstName == '') {
          alert("Enter The firstName")
          return false;
        }
        else if (lastName == '') {
          alert("Enter The lastName")
          return false;
        }
        else if (Email == '') {
          alert("Enter The Email")
          return false;
        }
        else if (Mobile == '') {
          alert("Enter The MobileNo")
          return false;
        }
        else if (Country == '') {
          alert("Enter The Country")
          return false;
        }
        else if (State == '') {
          alert("Enter The State")
          return false;
        }
        else if (City == '') {
          alert("Enter The City")
          return false;
        }
        else if (Zipcode == '') {
          alert("Enter The Zipcode")
          return false;
        }
        else if (userId == '') {
          alert("Enter The CustomerId");
          return false;
        }
        else if (password == '') {
          alert("Enter The password")
          return false;
        }
      }
      //var fetData = json.boatdetails;
      setAnimating(false);
    } catch (error) {
      clrText = true;
      setAnimating(false);
      console.log(error);
      if (error == "TypeError: Network request failed") {
        alert("please check your internet connection");
      }
      else {
        console.log(error);
      }
    }
    finally {
      if (clrText == true) {
        setAddress('');
        setEmail('');
        setMobile('');
        setFirstname('');
        setLastname('');
        setUserid('');
        setCountry('');
        setCity('');
        setState('');
        setZipcode('');
        setPassword('');
        await displayData();

      }

    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
      <View style={[styles.centerAlign, styles.topClss]}>
        <Text style={styles.headTitle}>
          {Cname} REGISTRATION
        </Text>
        <View>
          <Dropdown
              style={[styles.input,styles.dropinputpadding]}
              data={dataCondition}
              labelField="label"
              valueField="value"
              disable={ddDisable}
              searchPlaceholder="Search..."
              placeholder='Select Service Condiiton'
              placeholderStyle={styles.placeholderStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{ color: Colors.placeHoldercolor,fontSize:moderateScale(14,0.4) }}
              itemContainerStyle={{color:Colors.placeHoldercolor}}
              containerStyle={{color:Colors.placeHoldercolor}}
              selectedTextStyle={{ color:Colors.placeHoldercolor,fontSize:moderateScale(14,0.4),}}
              numberOfLines={10}
              multiline={true}
              value={Ctype}
              keyboardAvoiding={true}
              dropdownPosition={"auto"}
              onChange={onDropchange}
              renderRightIcon={() => (
                <Icon name="chevron-down-sharp" size={scale(18)} style={{marginRight:scale(4)}} color={Colors.primaryThemecolor}/>
              )}
            />
        </View>
      </View>
      <View style={styles.wholeBorder}>
        <View>
          <TextInput
            placeholder="First Name"
            label="First Name"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            value={firstName}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            onChangeText={text => { setFirstname(text); setStatus('') }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Last Name"
            label="Last Name"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            value={lastName}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            onChangeText={text => { setLastname(text); setStatus('') }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Email"
            label="Email"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            value={Email}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            onChangeText={text => { setEmail(text); setStatus('') }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Mobile No"
            label="Mobile No"
            activeUnderlineColor={Colors.primaryThemecolor}
           // keyboardType='numeric'
            //maxLength={10}
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            onChangeText={text => { setMobile(text); setStatus('') }}
            value={Mobile}
          />
        </View>
        <View>
          <TextInput
            placeholder="Street"
            label="Street"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={Address}
            onChangeText={text => {
              setAddress(text)
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="City"
            label="City"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={City}
            onChangeText={text => { setCity(text); setStatus('') }}
          />
        </View>
        <View>
          <TextInput
            placeholder="State"
            label="State"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={State}
            onChangeText={text => { setState(text); setStatus('') }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Zipcode"
            label="Zipcode"
            activeUnderlineColor={Colors.primaryThemecolor}
            placeholderTextColor={Colors.placeHoldercolor}
            keyboardType='numeric'
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={Zipcode}
            onChangeText={text => { setZipcode(text); setStatus('') }}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]}
            data={Countrycode}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            placeholder='Select Country'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            numberOfLines={10}
            multiline={true}
            value={Country}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            onChange={item => setCountry(item.value)}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />
        </View>
        <View>
          <TextInput
            placeholder="User Id"
            label="User Id"
            activeUnderlineColor={Colors.primaryThemecolor}
            editable={false}
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={userId}
            onChangeText={text => { setUserid(text); setStatus('') }}
          />
        </View>
        <View>
          <TextInput
            placeholder="Password"
            activeUnderlineColor={Colors.primaryThemecolor}
            label="Password"
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={password}
            secureTextEntry
            onChangeText={text => { setPassword(text); setStatus('') }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={registerValidate}
          >
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer Animating={animating} Status={status} />
    </ScrollView>
  );
};

export default CustomerRegister;
