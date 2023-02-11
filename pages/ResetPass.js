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
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './Footer';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Resetpass = ({ navigation, route }) => {
  const [status, setStatus] = useState('');
  const [animating, setAnimating] = useState(false);
  const [domain, setdomain] = useState(global.glbDomainurl);
  const [userId, setUserid] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    displayData();
  }, []);
  
  const displayData = async ()=>
  {
    try {
      let user = await AsyncStorage.getItem('userId');
      setUserid(user);
    } catch (error) {
      console.log(error);
    }
  }

  const ValidateEmail = async () => {
    Keyboard.dismiss();
    setAnimating(true);
    try {
      let url = domain + 'hcblifestyle/UpdatePassword.php';
      console.log(url);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'customerid': userId,
          'password': password,
        })
      });
      var json = await response.json();
      if (json.statusCode == 200) {
        setStatus('Password Updated Successfully');
      }
      else
        setStatus('Failure to Update Password');
    } catch (error) {
      console.log(error);
    }
    finally {
      setAnimating(false);
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
              placeholder="Enter the New Password"
              placeholderTextColor={'gray'}
              style={styles.input}
              value={password}
              onChangeText={text => { setPassword(text); setStatus('') }}
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
              onPress={ValidateEmail}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default Resetpass;
