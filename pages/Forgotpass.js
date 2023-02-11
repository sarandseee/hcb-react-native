import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, TextInput, TouchableOpacity,
  Text, ActivityIndicator,
  useColorScheme, ImageBackground, Image, KeyboardAvoidingView,
  View, Dimensions, Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Footer from './Footer';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Forgotpass = ({ navigation, route }) => {
  const [Label, setLabelValue] = useState('');
  const [status, setStatus] = useState('');
  const [Description, setDescription] = useState('');
  const [animating, setAnimating] = useState(false);
  const [CusName, setCusName] = useState('')
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [bookDate, setBookdate] = useState('');
  const [curBoat, setCurBoat] = useState('');
  const [schduleDate, setschduleDate] = useState();
  const [data, setData] = useState();
  const [selected, setSelected] = useState('');
  const [domain, setdomain] = useState('');
  const [categoryDays,setcategoryDays] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
   // displayData();
  }, []);
  const displayData = async () => {
    try {
      let letDomain = await AsyncStorage.getItem('domain');
      console.log("letDomain==>" + letDomain);
      setdomain(letDomain);
      let url = letDomain + 'hcblifestyle/servicecategory.php';//192.168.1.102
      console.log(url);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'categoryid': 'ALL' })
      });
      var json = await response.json();
      console.log("fetData====>" + JSON.stringify(json));
      var fetData = json.categorydetails;
      setcategoryDays(json.categorydays);
      console.log("Arraylabel===>" + JSON.stringify(fetData));
      setData(fetData);
    } catch (error) {
      alert(error)
    }
  }
  const ValidateEmail = async () => {
    Keyboard.dismiss();
    var clrText = false;
    setAnimating(true);
    //const url = 'http://birademo.live/hcblifestyle/createboatdetails.php';
    //console.log(url);
    try {
      //alert("Service Booked,");
      console.log("sel==>" + selected);
      var arrString = selected.join() + "";
      var strArray = arrString + "";
      console.log(strArray + "" + arrString);
      let url = domain + 'hcblifestyle/boatserviceregistration.php';
      console.log(url);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'boatid': curBoat.boatid,
          'customerid': curBoat.customerid,
          'scheduledate': bookDate,
          'categoryid': strArray,
        })
      });
      console.log(JSON.stringify({ 'boatid': curBoat.boatid, 'customerid': curBoat.customerid, 'scheduledate': bookDate, 'categoryid': strArray }));
      var json = await response.json();
      if (json.statusCode == 200) {
        // await fetchBoatdetails();
        setStatus('Thank you for scheduling your yacht service for ' + bookDate + ' our service manager will contact you at the earliest');
      }
      else
        setStatus('Failure to Save');
      //  var fetData = json.boatdetails;
      console.log("fetData====>" + JSON.stringify(json));
      //   setStatus('Thank You for Scheduling Your Yacht Service for '+bookDate+' Our Service Manager Will Contact you at Earliest');
      clrText = true;
    } catch (error) {
      clrText = true;
      alert(error)
    }
    finally {
      setAnimating(false);
      if (clrText == true) {
        setDescription('');
        setBookdate('');
        setLabelValue('');
        setSelected('');
      }

    }
  }
  

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled' style={[styles.container, { paddingHorizontal: screenHeight * 0.01 }]}>
        <View style={{
          marginTop: screenHeight * 0.04, alignItems: 'center',
          borderWidth: 1, borderColor: 'lightgray', padding: screenWidth * 0.02
        }}>
          <View>
            <TextInput
              placeholder="Enter the User Id or Mobile No or Email Id"
              placeholderTextColor={'gray'}
              value={curBoat.boatid}
              style={styles.input}
              editable={false}
            //onChangeText={text => { setHinno(text); setStatus('') }}
            />
          </View>
          {/* <View>
            <TextInput
              placeholder="Customer Name"
              placeholderTextColor={'gray'}
              editable={false}
              style={styles.input}
              value={Label}
              onChangeText={text => { setCusName(text); setStatus('') }}
            />
          </View> */}
         

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginbtn}
             // onPress={ValidateEmail}
            >
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end', marginTop: screenHeight * 0.001, padding: screenWidth * 0.02, alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#1d355e', fontSize: 20 }}>{status}</Text>
          <ActivityIndicator
            animating={animating}
            color="#1F51FF"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
        <Footer  Animating={false} Status={''}/>
        {/* <View style={{
          justifyContent: 'flex-end',
          //marginTop: 20, 
          padding: 20, alignItems: 'center'
        }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>Copyright</Text>
          <Text style={{ fontSize: 20, color: 'gray' }}>HCB Yachts</Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //paddingHorizontal: screenHeight * 0.01
  },
  input: {
    width: screenWidth * .87,
    paddingVertical: 0,
    height: screenHeight * 0.07,
    marginTop: screenHeight * 0.02,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray',
    color: 'gray'
  },
  buttonContainer: {
    width: screenWidth * .87,
    // justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 30,
    marginVertical: screenHeight * 0.02,
  },
  loginbtn: {
    backgroundColor: '#1d355e',
    width: '100%',
    padding: screenHeight * 0.02,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default Forgotpass;
