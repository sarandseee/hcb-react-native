import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import DateTimePicker from '@react-native-community/datetimepicker';
export default function YachtService() {
  useEffect(() => {
    fetchBoatdetails();
  }, []);
  const [data, setData] = useState();
  const [shouldShow, setShouldShow] = useState(false);
  const [showLoad, setshowLoad] = useState(false);
  const [curDate, setcurDate] = useState(new Date());
  const [Dates, setDates] = useState();
  const [Months, setMonths] = useState();
  const [Years, setYears] = useState();
  const [thisRow, setThisrow] = useState();
  const [datePicker, setDatePicker] = useState(false);
  const [userId, setUserid] = useState('')
  const [schduleDate, setschduleDate] = useState();
  const [status, setStatus] = useState('');
  const [columns, setColumns] = useState([
    "Yacht Make",
    "Model",
    "Year",
    "HIN No",
    "Service Date"
  ]);
  const fetchBoatdetails = async () => {
    let user = await AsyncStorage.getItem('userId');
    // user=1;
    setUserid(user);
    setshowLoad(true);
    try {
      let url = 'http://birademo.live/hcblifestyle/getboatdetails.php';
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
      var fetData = json.boatdetails;
      if (fetData[0].statusCode == "notfound") {
        //navigation.navigate("Register")
        setStatus('No Boats Available')
      }
      else {
        setData(fetData);
        setShouldShow(true);
        setStatus('')
      }
      setshowLoad(false);
      console.log("fetData====>" + fetData);

    } catch (error) {
      alert(error);
    }
  }
 async function showDatePicker(listData) {
    try {
      setThisrow(listData);
      var date = new Date();
      date = date.setDate(date.getDate() + 30);
      setschduleDate(date);
      setStatus('');
      if(listData.servicedetails == "" || listData.servicedetails == null)
      {
        setDatePicker(true);
      }
      else{
          setStatus('Already Service Booked for this Boat '+listData.boatid);
       }
      } catch (error) {
        alert(error);
    }
  }
  
  async function onDateSelected(event, date) {
    try {
      setStatus('');
      console.log(event.type + "  " + date)
     // console.log("LIstthis=>" + JSON.stringify(thisRow))
      setDatePicker(false);
      if (event.type == 'set' && thisRow !="") {
        //setDate(date);
        // if(thisRow.servicedetails == "" || thisRow.servicedetails == null)
        // {
          let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let date1 = date.getDate();
        month = month < 10 ? "0" + month : month;
        date1 = date1 < 10 ? "0" + date1 : date1;

        let schduleDate = year + '/' + month + '/' + date1;
        let ShowDate=date1+ '/' + month + '/' + year;
        console.log(schduleDate + "=====" + year + '/' + month + '/' + date1)
        let url = 'http://birademo.live/hcblifestyle/boatserviceregistration.php';
        console.log(url);
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'boatid': thisRow.boatid, 'customerid': thisRow.customerid, 'scheduledate': schduleDate })
        });
        var json = await response.json();
        if(json.statusCode == 200)
        {
          await fetchBoatdetails();
          setStatus('Thank You for Scheduling Your Yacht Service for '+ShowDate+' Our Service Manager Will Contact you at Earliest');
        } 
        else
          setStatus('Failure to Save');
        //  var fetData = json.boatdetails;
        console.log("fetData====>" + JSON.stringify(json));
      // }
      // else{
      //   setStatus('Already Service Booked for this Boat '+thisRow.boatid);
      // }
        
      }
    } catch (error) {
      alert(error);
    }

  };
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={[column == "Yacht Make" ? styles.clsMake : column == "Model" ? styles.clsModal : column == "Year" ? styles.clsYear : column == "HIN No" ? styles.clsHineno : column == "Service Date" ? styles.clsDate : null,
                {
                  justifyContent: "center",
                  alignItems: "center"
                }]}
              //onPress={()=> sortTable(column)}
              >
                <Text style={styles.columnHeaderTxt}>{column + " "}
                  {/* { selectedColumn === column && <MaterialCommunityIcons 
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  } */}
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )
 

  return (
    <View style={styles.container}>
      <View style={{ marginTop: screenHeight * 0.01, alignItems: 'center', }}>
        <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>
          YachtServicing
        </Text>
      </View>
      <View style={{marginTop: screenHeight * 0.01}}>
        <Text style={{color: '#1F51FF',}}>
            Touch the below listed Yacht for shedule your Yacht Service 
        </Text>
      </View>
      {/* <View style={{ marginTop: screenHeight * 0.04, flexDirection: 'row', fontWeight: "bold", alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.clsMake, styles.clsTitle]}>Make</Text>
        <Text style={[styles.clsModal, styles.clsTitle]}>Modal</Text>
        <Text style={[styles.clsYear, styles.clsTitle]}>Year</Text>
        <Text style={[styles.clsHineno, styles.clsTitle]}>Hin No</Text>
      </View> */}
      {shouldShow ? (<View style={{ height: screenHeight * 0.55, marginTop: screenHeight * 0.01, }}>
        <FlatList
          data={data}
          scrollEnabled={true}
          zoomScale={true}
          ListHeaderComponent={tableHeader}
          stickyHeaderIndices={[0]}
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => index + ""}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row', width: screenWidth * 0.95,
                  backgroundColor: item.servicedetails == "" || item.servicedetails == null ? "#F0FBFC" : "#FCF3CF",
                  height: screenHeight * 0.07, alignItems: "center",justifyContent: "space-evenly",
                }}
                onPress={(event) => showDatePicker(item)}
              // onPress={()=>{showDatePicker}}
              >
                {/* <ScrollView > */}
                <Text style={styles.clsMake}>{item.make}</Text>
                <Text style={styles.clsModal}>{item.model}</Text>
                <Text style={styles.clsYear}>{item.modelyear}</Text>
                <Text style={styles.clsHineno}>{item.boatid}</Text>
                <Text style={styles.clsDate}>{item.scheduledate}</Text>
              </TouchableOpacity>
              <View style={styles.hairline} />
              {/* <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              /> */}
            </View>

          )}
        //ItemSeparatorComponent={() => <View style={{ width: screenWidth, height:1, marginVertical: -1, backgroundColor: 'black' }}></View>}
        />
        {/* <Text style={styles.text}>Date = {date.toDateString()}</Text> */}
        <View style={{marginTop: screenHeight * 0.02,}}>
          <View style={{ flexDirection: 'row', alignItems:'center',padding:screenWidth*0.01}}>
            <View style={[styles.box, { backgroundColor: '#FCF3CF' }]}></View>
            <View style={{paddingLeft:screenWidth*0.03}}><Text style={{color:'gray'}}>Service Scheduled Boats</Text></View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center',padding:screenWidth*0.01}}>
            <View style={[styles.box, { backgroundColor: '#F0FBFC' }]}></View>
            <View style={{paddingLeft:screenWidth*0.03,color:'gray'}}><Text style={{color:'gray'}}>Service Available Boats</Text></View>
          </View>
        </View>
      </View>) : null}
      {datePicker && (
        <DateTimePicker
          value={curDate}
          mode={'date'}
          minimumDate={schduleDate}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}
      {/* <Text style={styles.text}>Date = {date.toDateString()}</Text> */}
      <ActivityIndicator size="large" color={'#1F51FF'} animating={showLoad} />
      <Text style={{ textAlign: 'center', color: '#D70040', fontSize:16 }}>{status}</Text>
      <View style={{
        justifyContent: 'flex-end',
        marginTop: screenHeight * 0.05,
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 20, color: 'gray' }}>Copyright</Text>
        <Text style={{ fontSize: 20, color: 'gray' }}>American Yacht Group</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: screenHeight * 0.01,
    alignItems: 'center'
  },
  box: {
    width: 20,
    height: 20,
  },
  boxtext: {
    marginLeft: 8,
    marginTop: 8,
    marginRight: 30,
    marginBottom: 10,
    height: 40,
    fontSize: 14
  },
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: '#D70040',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: screenHeight * 0.070,
    width: screenWidth * 0.95
    // padding: screenHeight * 0.02,
  },// Style for iOS ONLY...
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  clsTitle: {
    color: '#ffffff',backgroundColor: '#D70040'
  },
  // clsMake: {
  //   color: '#0abab5', width: screenWidth * 0.2
  // },
  // clsModal:
  // {
  //   color: '#0abab5', width: screenWidth * 0.15
  // },
  // clsHineno:
  // {
  //   color: '#0abab5', width: screenWidth * 0.3
  // },
  // clsYear:
  // {
  //   color: '#0abab5', width: screenWidth * 0.12
  // },
  clsMake: {
    textAlign: "center", color: 'gray', width: screenWidth * 0.2,
  },
  clsModal:
  {
    textAlign: "center", color: 'gray', width: screenWidth * 0.12
  },
  clsHineno:
  {
    textAlign: "center", color: 'gray', width: screenWidth * 0.24
  },
  clsYear:
  {
    textAlign: "center", color: 'gray', width: screenWidth * 0.09
  },
  clsDate:
  {
    textAlign: "center", color: 'gray', width: screenWidth * 0.19
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 1,
    width: screenWidth * 0.95
  },
});
