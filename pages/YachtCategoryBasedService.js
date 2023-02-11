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
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Footer from './Footer';
import styles from '../styles/Styles';
import Colors from '../styles/Colors';
import { scale,moderateScale } from 'react-native-size-matters';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const YachtCategoryBasedService = ({ navigation, route }) => {
  const [Label, setLabelValue] = useState('');
  const [status, setStatus] = useState('');
  const [Description, setDescription] = useState('');
  const [animating, setAnimating] = useState(false);
  const [CusName, setCusName] = useState('')
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [bookDate, setBookdate] = useState('');
  const [curBoat, setCurBoat] = useState('');
  const [schduleDate, setschduleDate] = useState(new Date());
  const [data, setData] = useState();
  const [selected, setSelected] = useState('');
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [categoryDays, setcategoryDays] = useState('');
  const[ddplacholder,setddplacholder]= useState('Select Service Categories');
  const[ddIcon,setddIcon]=useState('chevron-down-sharp');

  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    displayData();
  }, []);
  const displayData = async () => {
    try {
      // let letDomain = await AsyncStorage.getItem('domain');
      // console.log("letDomain==>" + letDomain);
      // setdomain(letDomain);
      console.log(JSON.stringify(route.params.curBoat));
      setCurBoat(route.params.curBoat);
      let url = domain + 'hcblifestyle/servicecategory.php';//192.168.1.102
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
      console.log(error);
      if(error == "TypeError: Network request failed")
      {
          alert("please check your internet connection");
      }
      else
      {
        console.log(error);
      }
    }
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     displayData();
  //     console.log("focus");
  //     // Do something when the screen is focused
  //     return () => {
  //       // alert('Screen was unfocused');
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup 
  //       console.log("Unfocus");
  //     };
  //   }, [])
  // );
  const Bookservice = async () => {
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
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          'boatid': curBoat.boatid,
          'customerid': curBoat.customerid,
          'scheduledate': bookDate,
          'categoryid': strArray,
          'servicenotes': Description,
        })
      });
      console.log(JSON.stringify({ 'boatid': curBoat.boatid, 'customerid': curBoat.customerid, 'scheduledate': bookDate, 'categoryid': strArray }));
      var json = await response.json();
      if (json.statusCode == 200) {
        // await fetchBoatdetails();
        //setStatus('Thank you for scheduling your yacht service for ' + bookDate + ' our service manager will contact you at the earliest');
        setStatus('Thank you for scheduling your boat service. A Service engineer will call to coordinate and reschedule your service based on Service Technician and Dock availability.')

      }
      else
        setStatus('Failure to Save');
      //  var fetData = json.boatdetails;
      console.log("fetData====>" + JSON.stringify(json));
      //   setStatus('Thank You for Scheduling Your Yacht Service for '+bookDate+' Our Service Manager Will Contact you at Earliest');
      clrText = true;
    } catch (error) {
      clrText = true;
      console.log(error);
      if(error == "TypeError: Network request failed")
      {
          alert("please check your internet connection");
      }
      else
      {
        console.log(error);
      }
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
  // async function onDropchange(item) {
  //   try {
  //     setLabelValue(item.value);
  //     var dateDrop = new Date();
  //     console.log("Log--"+ item.value);
  //     dateDrop = dateDrop.setDate(date.getDate() + parseInt(item.value));
  //     setschduleDate(dateDrop);
  //     var dateDropset = new Date(dateDrop);
  //     let year = dateDropset.getFullYear();
  //     let month = dateDropset.getMonth() + 1;
  //     let date1 = dateDropset.getDate();
  //     month = month < 10 ? "0" + month : month;
  //     date1 = date1 < 10 ? "0" + date1 : date1;
  //     console.log(year + '/' + month + '/' + date1);
  //     setBookdate(month + "/" + date1+ "/" +year);
  //   }
  //   catch (error) {
  //       alert(error)
  //   }
  // }
  async function onDropchange(item) {
    try {
      setSelected(item);
      setddplacholder('Click to Confirm Categroies');
      setddIcon('checkmark');
      var intminDate = 0;
      var dateDrop = new Date();
      console.log("itesm==>" + item);
      for (let listvalues of categoryDays) {
        if (item.includes(listvalues.catgoryid)) {
          console.log("listdays=>" + listvalues.days);
          intminDate = intminDate + parseInt(listvalues.days);
        }
      }  //"("+notiCount+")"
      dateDrop = dateDrop.setDate(dateDrop.getDate() + parseInt(intminDate));
      //dateDrop= dateDrop.replace("/", "-");
      // var dateFormated = dateDrop.toISOString();
      console.log(dateDrop);
      //  setschduleDate(dateDrop);
      var dateDropset = new Date(dateDrop);
      setschduleDate(dateDropset);
      let year = dateDropset.getFullYear();
      let month = dateDropset.getMonth() + 1;
      let date1 = dateDropset.getDate();
      month = month < 10 ? "0" + month : month;
      date1 = date1 < 10 ? "0" + date1 : date1;
      console.log(year + '/' + month + '/' + date1);
      setBookdate(month + "/" + date1 + "/" + year);
    }
    catch (error) {
      console.log(error);
      if(error == "TypeError: Network request failed")
      {
          alert("please check your internet connection");
      }
      else
      {
        console.log(error);
      }
    }
  }
  function showCal() {
    if (selected == "")
      alert("Pleace Choose the Categories First")
    else
      setDatePicker(true);
  }
  const hideDatePicker = () => {
    setDatePicker(false);
  };

  const handleConfirm = async (date) => {
    try {
      hideDatePicker();
      setDate(date)
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let date1 = date.getDate();
      month = month < 10 ? "0" + month : month;
      date1 = date1 < 10 ? "0" + date1 : date1;
      console.log(year + '/' + month + '/' + date1)
      setBookdate(month + "/" + date1 + "/" + year);
    } catch (error) {
      alert(error);
    }
    //setSelectedDate(date);

  };
  async function onDateSelected(event, date) {
    try {
      console.log(event.type + "  " + date)
      setDatePicker(false);
      if (event.type == 'set') {
        setDate(date)
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let date1 = date.getDate();
        month = month < 10 ? "0" + month : month;
        date1 = date1 < 10 ? "0" + date1 : date1;
        console.log(year + '/' + month + '/' + date1)
        setBookdate(month + "/" + date1 + "/" + year);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'
      style={styles.container}>
        <View style={styles.wholeBorder}>
          <View>
            <TextInput
              placeholder="Hin No"
              placeholderTextColor={Colors.placeHoldercolor}
              value={curBoat.boatid}
              style={[styles.input, { width:scale(320)}]}
              editable={false}
            //onChangeText={text => { setHinno(text); setStatus('') }}
            />
          </View>
          <View>
            <MultiSelect
              style={[styles.input,{width:scale(320)}]}
              placeholderStyle={[styles.placeholderStyle,{}]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{ color:Colors.placeHoldercolor,fontSize:moderateScale(14,0.4),}}
              itemContainerStyle={{ color: Colors.placeHoldercolor}}
              containerStyle={{ color:Colors.placeHoldercolor}}
              search
              data={data}
              labelField="label"
              valueField="value"
              placeholder={ddplacholder}
              keyboardAvoiding={true}
              dropdownPosition={"auto"}
              searchPlaceholder="Search..."
              value={selected}
              onChange={item => { onDropchange(item) }}
              //onFocus={()=>{setddIcon('checkmark')}}
              onBlur={()=>{setddIcon('chevron-down-sharp');setddplacholder('Select Service Categories');}}
              renderRightIcon={() => (
              <Icon name={ddIcon} size={scale(16)} style={styles.inputIcon} color={Colors.primaryThemecolor}/>
            )}
            //  selectedStyle={styles.selectedStyle}
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
          <TouchableOpacity onPress={() => { showCal() }}
            style={[styles.input, {
              flexDirection: 'row', width:scale(320),
              alignItems: 'center', justifyContent: 'space-between'
            }]}>
            <TextInput
              placeholder="Schedule date"
              placeholderTextColor={Colors.placeHoldercolor}
              editable={false}
              style={{ color: Colors.placeHoldercolor,fontSize:moderateScale(14,0.4),}}
              value={bookDate}
            />
            <View style={styles.inputIcon}><Icon name="today-outline" size={moderateScale(19)} color={Colors.primaryThemecolor} /></View>
          </TouchableOpacity>
          <View>
            <DateTimePickerModal
              date={date}
              isVisible={datePicker}
              minimumDate={schduleDate}
              mode="date"
              locale="en_GB"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View>
            <TextInput
              style={[styles.TextInputStyleClass, { width:scale(320) }]}
              placeholderTextColor={Colors.placeHoldercolor}
              placeholder="Service Description"
              value={Description}
              alignItems='stretch'
              numberOfLines={10}
              multiline={true}
              onChangeText={text => {
                setDescription(text)
              }}
            />
          </View>

          <View style={[styles.buttonContainer, { width: scale(320) }]}>
            <TouchableOpacity
              style={styles.btn}
              onPress={Bookservice}
            >
              <Text style={styles.buttonText}>SCHEDULE YOUR SERVICE</Text>
            </TouchableOpacity>
          </View>
        </View>
      <Footer Animating={animating} Status={status} />
    </ScrollView>
  );
};

export default YachtCategoryBasedService;
