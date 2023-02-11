import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, TouchableOpacity,
  Text, ActivityIndicator,
  useColorScheme, ImageBackground, Image, KeyboardAvoidingView, FlatList, Animated,
  View, Dimensions, Keyboard,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import styles from '../styles/Styles';
import Footer from './Footer';
import Colors from '../styles/Colors';
import { moderateScale, scale,verticalScale} from 'react-native-size-matters';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const dataCondition = [
  { label: 'PENDING SERIVCES', value: 'PENDING' },
  { label: 'SCHEDULED SERIVCES', value: 'SCHEDULED' },
  { label: 'COMPLETED SERIVCES', value: 'COMPLETED' },
];

const UpdateSchdule = () => {
  const [Label, setLabelValue] = useState('');
  const [status, setStatus] = useState('');
  const [Description, setDescription] = useState('');
  const [animating, setAnimating] = useState(false);
  const [CusName, setCusName] = useState('')
  const [date, setDate] = useState(new Date());
  const [Mindate, setMindate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [bookDate, setBookdate] = useState('');
  const [curBoat, setCurBoat] = useState('');
  const [schduleDate, setschduleDate] = useState();
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);
  const [Condition, setCondition] = useState('PENDING');
  const [isVisible, setPopup] = useState(false)
  const [checked, setChecked] = React.useState('first');
  const [columns, setColumns] = useState([
    "HIN#",
    "CUSID",
    "SER-DATE",
  ]);
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [shouldShow, setShouldShow] = useState(false);
  const [Showcategory, setShowcategory] = useState(true);
  const[ddDisable,setddDisable]=useState(false);


  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    fetchBoatdetails(Condition);
  }, []);
  const fetchBoatdetails = async (serivceCondtions) => {
    setStatus('');
    setAnimating(true);
    setShouldShow(false);
    setddDisable(true);
    try {
    //  let letDomain = await AsyncStorage.getItem('domain');
      console.log("letDomain==>" + JSON.stringify({ 'customerid': 'ALL', 'conditions': serivceCondtions }));
      //setdomain(letDomain);
      let url = domain + 'hcblifestyle/getServiceRegistrationDetails.php';
      console.log(url);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'customerid': 'ALL', 'conditions': serivceCondtions })
      });
      var json = await response.json();
      console.log("fetData====>" + JSON.stringify(json));
      var fetData = json.serviceregistrationdetails;
      if (fetData[0].statusCode == "notfound") {
        setStatus('No Services Available')
      }
      else {
        setData(fetData);
        setShouldShow(true);
        setStatus('')
      }

      setAnimating(false);
      console.log("fetData====>" + fetData);

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
    finally{
      setddDisable(false);
    }
  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={[column == "CUSID" ? Styles.clsMake : column == "SER-DATE" ? Styles.clsModal : column == "HIN#" ? Styles.clsHineno : null,
                styles.centerPage]}
              >
                <Text style={styles.columnHeaderTxt}>{column + " "}
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  const Bookservice = async () => {

    setPopup(false);
    setShouldShow(true);
    var clrText = false;
    setAnimating(true);

    try {
      let url = domain + '/hcblifestyle/UpdateServiceRequest.php';
      if (Condition == 'PENDING') {
        var ServiceStatus = 'SCHEDULED';
        var checkStaus = checked === 'first' ? 'confirm' : 'reschedule';
      }
      else {
        var ServiceStatus = checked === 'first' ? 'COMPLETED' : 'SCHEDULED';
        var checkStaus = checked === 'first' ? 'complete' : 'reschedule';
      }

      console.log(url + "--" + JSON.stringify({ 'serviceregistrationid': selected.serviceid, 'schedueldate': bookDate, 'servicestatus': ServiceStatus, 'servicetype': checkStaus }));
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'serviceregistrationid': selected.serviceid, 'schedueldate': bookDate, 'servicestatus': ServiceStatus, 'servicetype': checkStaus })//'servicetype':'confirm'
      });
      var json = await response.json();
      if (json.statusCode == 200) {
        await fetchBoatdetails(Condition);
        setStatus('Service (' + selected.serviceid + ') Status Changed Successfully');
        console.log(JSON.stringify(json));
      }
      else
        setStatus('Failure to Save');
      console.log("fetData====>" + JSON.stringify(json));
      clrText = true;
    } catch (error) {
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
      setAnimating(false);
      if (clrText == true) {
        setDescription('');
        setBookdate('');
        setLabelValue('');
      }

    }
  }
  const reService = async (thatrow) => {
    try {
      console.log(JSON.stringify(thatrow));
      setBookdate(thatrow.scheduladate);
      var arrDate = thatrow.scheduladate.split("/");
      // if (arrDate)
      //   setMindate(new Date(arrDate[2], parseInt(arrDate[0]) - 1, arrDate[1]));
      setSelected(thatrow);
      if (Condition != 'COMPLETED') {
        setShouldShow(false);
        setPopup(true);
      }
    } catch (error) {
      alert(error)
    }
  }
  const hideDatePicker = () => {
    setDatePicker(false);
  };

  const showDatepic = () => {
    try {


      if (checked === 'first')
        alert("Date change only allowed for reschedule");
      else {
        setDatePicker(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

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
  };
  async function onDropchange(item) {
    setShowcategory(false);

    if (item.value === 'PENDING')
      setShowcategory(true);

    setCondition(item.value)
    await fetchBoatdetails(item.value);
  }
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
    <View style={styles.container}>
      <View style={{flex: .8}}>
        <View style={[styles.topClss, styles.centerAlign]}>
          <Text style={styles.headTitle}>OPEN SERVICE REQUESTS</Text>
        </View>
        <View style={[styles.topClss, styles.centerAlign]}>
          <Dropdown
            style={styles.input}
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
            selectedTextStyle={{ color: Condition === 'PENDING' ? 'red' : Condition === 'SCHEDULED' ? '#a69e6e' : 'green',fontSize:moderateScale(14,0.4),}}
            numberOfLines={10}
            multiline={true}
            value={Condition}
            keyboardAvoiding={true}
            dropdownPosition={"auto"}
            onChange={onDropchange}
            renderRightIcon={() => (
              <Icon name="chevron-down-sharp" size={scale(18)} style={{marginRight:scale(4)}} color={Colors.primaryThemecolor}/>
            )}
          />
        </View>
        <View style={[styles.topClss,{flex:1}]}>
          {shouldShow ? (<View style={[styles.centerAlign]}>
            <FlatList
              data={data}
              //style={{ width: "90%" }}
              keyExtractor={(item, index) => index + ""}
              ListHeaderComponent={tableHeader}
              stickyHeaderIndices={[0]}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={(event) => reService(item)}
                  >
                    <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ?Colors.tabDetailbgcolor1:Colors.tabDetailbgcolor2}}>
                      <Text style={Styles.clsHineno}>{item.HINNO}</Text>
                      <Text style={Styles.clsMake}>{item.customerid}</Text>
                      <Text style={Styles.clsModal}>{item.scheduladate}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>) : null}
        </View>
      <Modal
        animationIn={'slideInUp'} animationInTiming={500}
        animationOutTiming={300}
        isVisible={isVisible}
        onBackdropPress={() => { setPopup(false); setShouldShow(true); }} onBackButtonPress={() => { setPopup(false); setShouldShow(true); }}
      >
        <View style={styles.modelview}>
          <Icon name="chevron-down-sharp" size={scale(30)} color={Colors.primaryThemecolor}
            onPress={() => { setPopup(false); setShouldShow(true) }} />
          <View style={[styles.topClss, styles.centerAlign]}>
            <Text style={{ fontSize: moderateScale(18), color:Colors.headingColor, }}>{Condition == 'PENDING' ? 'Confirm/Reschedule Service' : 'Complete/Reschedule Service'}</Text>
          </View>
          <View style={[styles.wholeBorder,{padding:0}]}>
            <View>
              <TextInput
                label="Service No"
                placeholder="Service No"
                placeholderTextColor={Colors.placeHoldercolor}
                value={selected.serviceid}
                style={[styles.input, { backgroundColor:Colors.bgColor}]}
                editable={false}
                onChangeText={text => { setHinno(text); setStatus('') }}
              />
            </View>
            <View>
              <TextInput
                label="Hin No"
                placeholder="Hin No"
                placeholderTextColor={Colors.placeHoldercolor}
                value={selected.HINNO}
                style={[styles.input, { backgroundColor:Colors.bgColor }]}
                editable={false}
              //onChangeText={text => { setHinno(text); setStatus('') }}
              />
            </View>
            <View>
              <TextInput
                placeholder="Customer Name"
                label="Customer Name"
                placeholderTextColor={Colors.placeHoldercolor}
                editable={false}
                style={[styles.input, {backgroundColor:Colors.bgColor}]}
                value={selected.customername}
              // onChangeText={text => { setCusName(text); setStatus('') }}
              />
            </View>
            <View style={[styles.input, {paddingLeft:moderateScale(18,0.4), height:verticalScale(53), }]}>
              <Text style={{ color:Colors.textFontcolor}}>Choose Service Staus</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={[styles.normalText,{ color:Colors.headingColor}]}>{Condition == 'PENDING' ? 'Confirm' : 'Completed'}</Text>
                  <RadioButton.Android
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    color={Colors.primaryThemecolor}
                    onPress={() => setChecked('first')}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.normalText,{ color:Colors.headingColor}]}>Reschedule</Text>
                  <RadioButton.Android
                    value="second"
                    color={Colors.primaryThemecolor}
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={showDatepic}>
              <TextInput
                label="Reschedule date"
                placeholder="Reschedule date"
                placeholderTextColor={Colors.placeHoldercolor}
                editable={false}
                style={[styles.input, { backgroundColor:Colors.bgColor }]}
                value={bookDate}
                right={<TextInput.Icon icon="calendar-month-outline" 
                        color={Colors.primaryThemecolor} 
                        onPress={() => { showDatepic(); }} />
                      }
              />
            </TouchableOpacity>
            <View>
              <DateTimePickerModal
                date={date}
                isVisible={datePicker}
                minimumDate={Mindate}
                mode="date"
                locale="en_GB"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            {Showcategory ? (
              <View><View>
                <TextInput
                  label="Service Descriptions"
                  placeholder="Notes"
                  placeholderTextColor={Colors.placeHoldercolor}
                  value={selected.servicenotes == "" || selected.servicenotes == null ? '' : selected.servicenotes}
                  style={[styles.input, { backgroundColor:Colors.bgColor}]}
                  editable={false}
                />
              </View>
                <View>
                  <TextInput
                    label="Service Categories"
                    style={styles.TextInputStyleClass}
                    placeholderTextColor={Colors.placeHoldercolor}
                    placeholder="Service Description"
                    value={selected.categoryname}
                    alignItems='stretch'
                    numberOfLines={10}
                    multiline={true}
                    editable={false}
                  />
                </View></View>) : null}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={Bookservice}
              >
                <Text style={styles.buttonText}>{checked === 'first' ? Condition === 'PENDING' ? 'CONFIRM' : 'COMPLETE SERVICE' : 'RESCHEDULE SERVICE'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
      <Footer Animating={animating} Status={status} />
    </View>
  );
};

const Styles = StyleSheet.create({
  clsMake: {
    textAlign: "center", color:Colors.tableFontcolor, width:moderateScale(130),fontSize:moderateScale(14),
  },
  clsModal:
  {
    textAlign: "center", color:Colors.tableFontcolor, width:moderateScale(110),fontSize:moderateScale(14),
  },
  clsHineno:
  {
    textAlign: "center", color:Colors.tableFontcolor, width:moderateScale(120),fontSize:moderateScale(14),
  },
});

export default UpdateSchdule;
