import React, { useCallback } from 'react'
import { Text, Alert, Button, Linking, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
const supportedURL = "https://americanyachtgroup.com/services/#request";
export default function Errormsg() {


  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      //const supported = await Linking.canOpenURL(url);

      //if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
      //} else {
      //Alert.alert('Request Failed');
      //}
    }, [url]);

    return <Button title="Other Services" onPress={handlePress} color='#1d355e' />;
  };
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', }}>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', padding: "10%" }}>
        <Text style={{ color: 'gray' }}>For More Information Click the Below Link</Text>
        <OpenURLButton url={supportedURL}></OpenURLButton>
        <View style={{
          justifyContent: 'flex-end',
          //marginTop: 20, 
          padding: 20, alignItems: 'center'
        }}>
          <Text style={{ fontSize: 20, color: 'gray' }}>Copyright</Text>
          <Text style={{ fontSize: 20, color: 'gray' }}>HCB Yachts</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
