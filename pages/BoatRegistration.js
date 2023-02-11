import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  //StyleSheet, 
   TouchableOpacity,
  Text, ActivityIndicator,
  useColorScheme, Image, KeyboardAvoidingView,
  View, Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/Styles.js';
import Footer from './Footer.js';
import Colors from '../styles/Colors.js';
import { scale, moderateScale } from 'react-native-size-matters';
import { TextInput } from "react-native-paper";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const datas = [
  { label: 'NEW', value: 'New' },
  { label: 'PREOWNED', value: 'Pre-owned' },
  { label: 'CERTIFIED', value: 'Certified' },
];

const dataEngine = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
];

const dataModel = [
  { label: 'ESTRELLA', value: 'ESTRELLA' },
  { label: 'Sueños', value: 'Sueños' },
  { label: 'LUJO', value: 'LUJO' },
  { label: 'SPECIALE', value: 'SPECIALE' },
];

const dataMake = [
  { label: 'HCB', value: 'HCB' },
  { label: 'OTHERS', value: 'Others' },
];
const BoatRegister = ({ navigation, route }) => {
  const [Hinno, setHinno] = useState('')
  const [Make, setMake] = useState('')
  const [Label, setLabel] = useState(null);
  const [Label1, setLabel1] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [UniqueId, setUniId] = useState();
  const [status, setStatus] = useState('');
  const [Modal, setModal] = useState('');
  const [Year, setYear] = useState('');
  const [Description, setDescription] = useState('');
  const [animating, setAnimating] = useState(false);
  const [CustomerId, setCustomerid] = useState('')
  const [CusName, setCusName] = useState('')
  const [data, setData] = useState();
  const [capData, setcapData] = useState();
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [salesDate, setsalesDate] = useState('');
  const [singleFile, setSingleFile] = useState("");
  const [picFolder, setpicFolder] = useState();
  const [shouldShow, setShouldShow] = useState(false);
  const [Showcondition, setShowcondition] = useState('');
  const [warStart, setwarStart] = useState('');
  const [warEnd, setwarEnd] = useState('');
  const [Paramstype, setParamstype] = useState('');
  const [Engineno, setEngineno] = useState('');
  const [Noofengine, setNoofengine] = useState('');
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [countRender, setcountRender] = useState(1);


  const isDarkMode = useColorScheme() === 'dark';
  // useEffect(() => {
  //   DeviceInfo.getUniqueId().then((uniqueId) => {
  //     setUniId(uniqueId);
  //   });
  // }, []);

  useFocusEffect(
    useCallback(() => {
      displayData();
      console.log("focus");
      return () => {
        console.log("Unfocus");
      };
    }, [])
  );



  const displayData = async () => {
    let user = await AsyncStorage.getItem('userId');
    user = 'ALL';
    console.log(user);
    try {
      //let letDomain = await AsyncStorage.getItem('domain');
      //console.log("letDomain==>" + letDomain);
      if (countRender == 1) {
        setcountRender(countRender + 1);
        // setdomain(letDomain);
      }

      let url = domain+ 'hcblifestyle/getcustomerdetails.php';//domain 
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
      var fetData = json.customerdetails;
      var fetCapdata=json.captondetails;
      console.log("Arraylabel===>" + JSON.stringify(fetCapdata));
      setData(fetData);
      setcapData(fetCapdata);
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
  const registerValidate = async () => {
    var clrText = false;
    setAnimating(true);
    const url = domain + 'hcblifestyle/createboatdetails.php';
    console.log(url);
    try {
      if (Hinno != '' && Make != '' && Modal != '' != '' && salesDate != '' && CusName != '') {
        clrText = true;
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "boatid": Hinno,
            "description": "DESCRIPTION",
            "make": Make,
            "model": Modal,
            "modelyear": Year,
            "customerid": Label,
            "salesdate": salesDate,
            "condition": Showcondition,
            "engine": Engineno,
            "noofengine": Noofengine,
            "warrentystartdate": warStart,
            "warrentyenddate": warEnd,
            "captonid":Label1
          })
        });
         console.log("fetData====>" + JSON.stringify({
          "boatid": Hinno,
          "description": "DESCRIPTION",
          "make": Make,
          "model": Modal,
          "modelyear": Year,
          "customerid": Label,
          "salesdate": salesDate,
          "condition": Showcondition,
          "engine": Engineno,
          "noofengine": Noofengine,
          "warrentystartdate": warStart,
          "warrentyenddate": warEnd,
          "captonid":Label1
        }));
        var json = await response.json();
        console.log("fetData====>" + JSON.stringify(json));

        if (json.statusCode == 200) {
          await uploadImage();
          // setStatus('Boat Saved Successfully');
        }
        else
          setStatus('Failure to Save');
      }
      else {
        setAnimating(false);
        if (Hinno == '') {
          alert("Enter The Hinno");
          return false;
        }
        else if (Make == '') {
          alert("Enter The Make")
          return false;
        }
        else if (Modal == '') {
          alert("Enter The Modal")
          return false;
        }
        else if (salesDate == '') {
          alert("Enter The salesDate")
          return false;
        }
        else if (CusName == '') {
          alert("Enter The CustomerId")
          return false;
        }
      }
      //var fetData = json.boatdetails;
      setAnimating(false);
    } catch (error) {
      setAnimating(false);
      clrText = true;
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
        setCusName('');
        setHinno('');
        setMake('');
        setModal('');
        setYear('');
        setDescription('');
        setCustomerid('');
        setsalesDate('');
        setLabel('');
        setLabel1('');
        setShowcondition('');
        setEngineno('');
        setNoofengine('');
        setwarEnd('');
        setwarStart('');
      }

    }
  }
  const chooseFile = (type) => {
    try {
      if (Hinno != '') {
        let options = {
          mediaType: type,
          //maxWidth: 300,
          //maxHeight: 550,
          quality: 1,
          selectionLimit: 0,
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            //alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          if (response.assets.length <= 3) {
            setSingleFile(response.assets);
            console.log('fileName -> ', response.assets.length)
            setShouldShow(true);
            // setpicFolder(response.assets[0].uri);
          }
          else {
            alert("Maximum Three Images Only Upload, kindly reselect the Images");
          }
        });
      }
      else {
        alert("Enter The Hinno");
      }
    } catch (error) {
      console.log(error);
    }

  };
  const uploadImage = async () => {
    try {
      setAnimating(true);
      var typeofFile = '';
      var FileName = '';
      var Basename = '';
      if (singleFile != null || singleFile != "") {
        console.log(JSON.stringify(singleFile));

        let data = new FormData();
        data.append('Boatid', Hinno);
        singleFile.forEach((item, i) => {
          FileName = item.fileName;
          if (FileName) {
            let arrTypeoffile = FileName.split(".");
            typeofFile = arrTypeoffile[1];
            Basename = Hinno + "image" + i + "." + typeofFile;
          }
          //const photo = photos[i];
          // data.append('name',Basename);
          data.append('uploadFile[]', {
            uri: item.uri,
            type: item.type,
            name: Basename,
          });
        });
        console.log("devic===>" + JSON.stringify(data));
        let res = await fetch(
          domain + 'hcblifestyle/upload.php',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          }
        );
        console.log("responseJson.status====");
        let responseJson = await res.json();
        console.log("responseJson.status====>" + JSON.stringify(responseJson));
        if (responseJson.statusCode > 0)
          setStatus('Boat Saved Successfully');
        else
          setStatus('Image Upload Faliure');
      }
      else {
        //alert('Please Select Image first');
        setStatus('Boat Saved Successfully');
      }
    }
    catch (err) {
      console.log(err);
      setStatus('Boat Saved Successfully');
    }
    finally {
      setAnimating(false);
      setShouldShow(false);
      setSingleFile('');
    }
  };
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
      if (Paramstype == "Sales")
        setsalesDate(month + "/" + date1 + "/" + year);
      else if (Paramstype == "warStart")
        setwarStart(month + "/" + date1 + "/" + year);
      else
        setwarEnd(month + "/" + date1 + "/" + year);
    } catch (error) {
      alert(error);
    }

  };
  const TableHeader = () => (
    singleFile.map((Images, index) => {
      {
        return (
          <View key={index}
            style={[styles.imageStyle, styles.topClss]}>
            <TouchableOpacity key={index}>
              <Image
                source={{ uri: Images.uri }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )
      }
    })
  )

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
      <View style={[styles.topClss, styles.centerAlign]}>
        <Text style={styles.headTitle}>
          Boat Registration
        </Text>
      </View>
      <View style={styles.wholeBorder}>
        <View>
          <TextInput
            placeholder="Hin No"
            placeholderTextColor={Colors.placeHoldercolor}
            value={Hinno}
            style={[styles.input, { backgroundColor:Colors.bgColor}]} 
            label="Hin No"
            activeUnderlineColor={Colors.primaryThemecolor}
            onChangeText={text => { setHinno(text); setStatus('') }}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]} 
            data={dataMake}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            placeholder='Select Make'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            numberOfLines={10}
            multiline={true}
            value={Make}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            onChange={item => setMake(item.value)}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]}
            data={dataModel}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            placeholder='Select Modal'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            numberOfLines={10}
            multiline={true}
            value={Modal}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            onChange={item => setModal(item.value)}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />
        </View>
        <View>
          <TextInput
            placeholder="Year"
            keyboardType='numeric'
            maxLength={4}
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]} 
            label="Year"
            activeUnderlineColor={Colors.primaryThemecolor}
            onChangeText={text => { setYear(text); setStatus('') }}
            value={Year}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]}
            data={datas}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            placeholder='Select Condition'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            numberOfLines={10}
            multiline={true}
            value={Showcondition}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            onChange={item => setShowcondition(item.value)}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />
        </View>
        <View>
          <TextInput
            placeholder="Engine Name"
            placeholderTextColor={Colors.placeHoldercolor}
            style={[styles.input, { backgroundColor:Colors.bgColor}]} 
            label="Engine Name"
            activeUnderlineColor={Colors.primaryThemecolor}
            onChangeText={text => { setEngineno(text); setStatus('') }}
            value={Engineno}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]}
            data={dataEngine}
            labelField="label"
            valueField="value"
            searchPlaceholder="Search..."
            placeholder='No of Engine'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            numberOfLines={10}
            multiline={true}
            value={Noofengine}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            onChange={item => setNoofengine(item.value)}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />
        </View>
        <TouchableOpacity onPress={() => { setParamstype("Sales"); setDatePicker(true) }}>
          <TextInput
            placeholder="Salesdate"
            keyboardType='numeric'
            placeholderTextColor={Colors.placeHoldercolor}
            editable={false}
            activeUnderlineColor={Colors.primaryThemecolor}
            label="Saledate"
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={salesDate}
            right={<TextInput.Icon icon="calendar-month-outline" color={Colors.primaryThemecolor} 
                    onPress={() => { setParamstype("Sales"); setDatePicker(true) }}
                    />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setParamstype("warStart"); setDatePicker(true) }}>
          <TextInput
            placeholder="warranty Start Date"
            label="warranty Start Date"
            keyboardType='numeric'
            placeholderTextColor={Colors.placeHoldercolor}
            activeUnderlineColor={Colors.primaryThemecolor}
            editable={false}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={warStart}
            right={<TextInput.Icon icon="calendar-month-outline" color={Colors.primaryThemecolor} 
                    onPress={() => { setParamstype("warStart"); setDatePicker(true) }}
                    />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setParamstype("warEnd"); setDatePicker(true) }}>
          <TextInput
            placeholder="warranty End Date"
            label="warranty End Date"
            keyboardType='numeric'
            placeholderTextColor={Colors.placeHoldercolor}
            activeUnderlineColor={Colors.primaryThemecolor}
            editable={false}
            style={[styles.input, { backgroundColor:Colors.bgColor}]}
            value={warEnd}
            right={<TextInput.Icon icon="calendar-month-outline" color={Colors.primaryThemecolor} 
                    onPress={() => { setParamstype("warEnd"); setDatePicker(true) }}
                    />}
          />
        </TouchableOpacity>
        <View>
          <DateTimePickerModal
            date={date}
            isVisible={datePicker}
            mode="date"
            locale="en_GB"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]}
            data={data}
            labelField="label"
            valueField="value"
            search
            searchPlaceholder="Search..."
            placeholder='Select Customer'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            numberOfLines={10}
            multiline={true}
            value={Label}
            onChange={item => {
              setCusName(item.label);
              setLabel(item.value);
            }}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />

        </View>
        <View>
          <TextInput
            placeholder="Customer Id"
            placeholderTextColor={Colors.placeHoldercolor}
            editable={false}
            style={[styles.input, { backgroundColor:Colors.bgColor}]} 
            label="Customer Id"
            activeUnderlineColor={Colors.primaryThemecolor}
            value={Label}
            onChangeText={text => { setCusName(text); setStatus('') }}
          />
        </View>
        <View>
          <Dropdown
            style={[styles.input,styles.dropinputpadding]}
            data={capData}
            labelField="label"
            valueField="value"
            search
            searchPlaceholder="Search..."
            placeholder='Select Captain'
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{ color: Colors.placeHoldercolor, fontSize: moderateScale(14, 0.4) }}
            itemContainerStyle={{ color: Colors.placeHoldercolor }}
            containerStyle={{ color: Colors.placeHoldercolor }}
            selectedTextStyle={styles.selectedTextStyle}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            numberOfLines={10}
            multiline={true}
            value={Label1}
            onChange={item => {
              //setCusName(item.label);
              setLabel1(item.value);
            }}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={moderateScale(17)} style={styles.inputIcon} color={Colors.primaryThemecolor} />
            )}
          />

        </View>
        <View>
          <TextInput
            placeholder="Captain Id"
            placeholderTextColor={Colors.placeHoldercolor}
            editable={false}
            style={[styles.input, { backgroundColor:Colors.bgColor}]} 
            activeUnderlineColor={Colors.primaryThemecolor}
            label="Captain Id"
            value={Label1}
          />
        </View>
        {!shouldShow ? (<View
          style={[styles.imageStyle, styles.topClss2, { justifyContent: 'center' }]}>
          <TouchableOpacity style={styles.centerPage} onPress={() => chooseFile('photo')}>
            <View style={styles.topClss}>
              <Text style={{ textAlign: 'center', color: Colors.primaryThemecolor, fontSize: moderateScale(14, 0.4) }}>Upload Yacht Images</Text>
            </View>
            <View style={styles.topClss}>
              <Icon name="cloud-upload-outline" size={scale(70)} color={Colors.primaryThemecolor} />
            </View>
          </TouchableOpacity>
        </View>) : null}
        {shouldShow ? (<TableHeader />) : null}
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


export default BoatRegister;
