import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, TouchableOpacity,
  Text, ActivityIndicator,
  useColorScheme, ImageBackground, Image, KeyboardAvoidingView, Keyboard,
  View, Dimensions
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import styles from '../styles/Styles.js';
import Footer from './Footer.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors.js';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import { TextInput } from "react-native-paper";

const dataCountry = [
  { label: 'United States', value: 'USA' },
  { label: 'Other Country', value: 'Others' },
];

const AdminuCappdate = ({ navigation, route }) => {
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [Rpassword, setRpassword] = useState(false);
  const [UniqueId, setUniId] = useState();
  const [status, setStatus] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [animating, setAnimating] = useState(false);
  const [userId, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [Country, setCountry] = useState('USA');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Zipcode, setZipcode] = useState('');
  const [Address, setAddress] = useState('');
  const [Countrycode, setCountrycode] = useState(dataCountry);
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [ddDisable, setddDisable] = useState(false);
  const [Ctype, setCtype] = useState('A');
  const [formTitle, setFormtitle] = useState('');
  const [Edittrue, setEdittrue] = useState(false);
  const [textEdittrue, settextEdittrue] = useState(true);
  const [Hinno, setHinno] = useState('');
  const [dbuserId, setdbUserid] = useState('');
  const[roleid,setRoleid]=useState('');
  const[roleName,setRoleName]=useState('');
  //const [clrText,setClear]= useState();

  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    // displayData();
    currentForm();
  }, []);


  const currentForm = async () => 
  {
    try {
      console.log("role->"+route.params.curRole);
      setRoleName(route.params.curRole);
      if(route.params.curRole == 'Captain')
      {
        setFormtitle("Captain Details");
        let user = route.params.Capid;
        console.log(user);
        setUserid(user);
        settextEdittrue(false);
        setCtype('S');
        setRoleid(1);
        await profileDetails();
      } 
      else
      {
        setFormtitle("Admin Registration");
        setCtype('A');
        settextEdittrue(true);
        setEdittrue(true);
        setRoleid(0);
        await displayData();
      }
      setHinno(route.params.Hinno);
      //route.params.curRole
    } catch (error) {
      console.log(error)
    }
  }
  const EdittrueFalse = async (blnEdit) => 
  {
    try {
      setEdittrue(blnEdit);
      settextEdittrue(blnEdit);
      if(blnEdit)
      {
        setFormtitle("Captain Registration");
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
      else
      {
        setFormtitle("Captain Details");
        await profileDetails();
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  const profileDetails = async () => 
  {
   
    setAnimating(true);
    try 
    {
     
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
      setAnimating(false);
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
        setFirstname(fetData.firstname)
        setLastname(fetData.lastname);
      }
      else {
        setAddress(user);
        setEmail(user)
        setUserid(user);
        setMobile(user);
        setPassword(user);
        setFirstname(user);
      }
      console.log("fetData====>" + fetData.statusCode);

    } 
    catch (error) 
    {
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
  const displayData = async () => {
    try {
      let url = domain + 'hcblifestyle/getCustomerId.php';
      console.log("urlcu" + url);
      let response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      var jsonResponce = await response.json();
      console.log("json==>" + JSON.stringify(jsonResponce));
      setdbUserid(jsonResponce.customerids[0].customerid);
      setUserid(Ctype + jsonResponce.customerids[0].customerid);

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
          setStatus(roleName+' Saved Successfully');
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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: Colors.bgColor,
    }}>
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
        <View style={[styles.topClss,{ flexDirection: 'row' }]}>
          <View style={{alignSelf:'flex-start'}}>
            <TouchableOpacity onPress={() => { navigation.goBack();}}>
              <View style={{
                padding: screenWidth * 0.02,
              }}>
                  <Icon name="arrow-back" size={scale(26)} color="#1D355E" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf:'center'}}>
            <Text style={[styles.headTitle,{textAlign:'center'}]}>
            {formTitle}
            </Text>
          </View>
        </View>
        <View style={styles.wholeBorder}>
          <View style={{alignItems:'center',display:route.params.curRole =='Captain' ?'flex':'none'}}>
            <View style={[styles.centerAlign, styles.topClss, 
              { flexDirection: 'row', justifyContent: 'space-evenly',}]}>
              <TouchableOpacity
                onPress={() => { EdittrueFalse(false);}}
                style={[stylesOver.twoBtn, { backgroundColor: Edittrue ? Colors.textBorderColor : Colors.primaryThemecolor }]}
              >
                <Text style={[styles.twoBtntext, { color: Edittrue ? Colors.headingColor : Colors.fontColor2 }]}>
                  Captain Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { EdittrueFalse(true);}}
                style={[stylesOver.twoBtn, { backgroundColor: Edittrue ? Colors.primaryThemecolor : Colors.textBorderColor }]}
              >
                <Text style={[styles.twoBtntext, { color: Edittrue ? Colors.fontColor2 : Colors.headingColor }]}>
                  Appoint New Captain
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                placeholder="Hin No"
                placeholderTextColor={Colors.placeHoldercolor}
                value={Hinno}
                editable={false}
                style={[styles.input, { backgroundColor:Colors.bgColor}]} 
                label="Hin No"
                activeUnderlineColor={Colors.primaryThemecolor}
                onChangeText={text => { setHinno(text); setStatus('') }}
              />
            </View>
          </View>
          <View>
            <TextInput
              placeholder="First Name"
              label="First Name"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              value={firstName}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              onChangeText={text => { setFirstname(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="Last Name"
              label="Last Name"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              value={lastName}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              onChangeText={text => { setLastname(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="Email"
              label="Email"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              value={Email}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              onChangeText={text => { setEmail(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="Mobile No"
              label="Mobile No"
              activeUnderlineColor={Colors.primaryThemecolor}
              // keyboardType='numeric'
              //maxLength={10}
              placeholderTextColor={Colors.placeHoldercolor}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              onChangeText={text => { setMobile(text); setStatus('') }}
              value={Mobile}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="Street"
              label="Street"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              value={Address}
              onChangeText={text => {
                setAddress(text)
              }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="City"
              label="City"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              value={City}
              onChangeText={text => { setCity(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="State"
              label="State"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              value={State}
              onChangeText={text => { setState(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="Zipcode"
              label="Zipcode"
              activeUnderlineColor={Colors.primaryThemecolor}
              placeholderTextColor={Colors.placeHoldercolor}
              keyboardType='numeric'
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              value={Zipcode}
              onChangeText={text => { setZipcode(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <Dropdown
              style={[styles.input, styles.dropinputpadding]}
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
              placeholderTextColor={Colors.placeHoldercolor}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              value={userId}
              onChangeText={text => { setUserid(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>
          <View>
            <TextInput
              placeholder="Password"
              activeUnderlineColor={Colors.primaryThemecolor}
              label="Password"
              placeholderTextColor={Colors.placeHoldercolor}
              style={[styles.input, { backgroundColor: Colors.bgColor }]}
              value={password}
              secureTextEntry
              onChangeText={text => { setPassword(text); setStatus('') }}
              editable={textEdittrue?true:false} />
          </View>

          <View style={[styles.buttonContainer, { display: Edittrue ? 'flex' : 'none' }]}>
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
    </SafeAreaView>
  );
};


const stylesOver = StyleSheet.create({
  input: {
    color: 'gray',
    fontSize: moderateScale(14, 0.4),
  },
  twoBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.45,
    marginHorizontal:screenWidth*0.01,
    height: verticalScale(50)
  },
  twoBtntext: {
    fontSize: moderateScale(14, 0.4),
    textAlign: 'center'
  }
});
export default AdminuCappdate;
