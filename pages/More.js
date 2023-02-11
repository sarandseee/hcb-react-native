import React, { useCallback, useState } from 'react'
import { Text, Alert, Button, Linking, StyleSheet, Dimensions, View, ScrollView, SafeAreaView } from 'react-native'
import Footer from './Footer';
const supportedURL = "https://hcbyachts.com/crucero-experience/";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function More() {
  const [showLoad, setShouldShow] = useState(false);
  const [status, setStatus] = useState('');
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      await Linking.openURL(url);
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
        </View>
      </View>
      <Footer Animating={showLoad} Status={status} />
    </SafeAreaView>
  )
}
