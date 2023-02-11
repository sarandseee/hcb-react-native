import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

export default function Fileopen() {

  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  function getFile() {
  //  const url = "http://192.168.10.79:7777/ME_REST_API/mediaerpapi/getreceiptdetails";
    const url ="https://birainfosystem.com/hcblifestyle/uploads/hcb-privacy.pdf";
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/Receipt.pdf`;
    console.log("localFile===>" + localFile)
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
        console.log("sucsess");
      })
      .catch((error) => {
        alert(error)
        console.log("failure");
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{marginTop:150,alignItems:'center'}}>
        <Text style={{color:'blue'}}>
          Open Pdf Files
        </Text>
        <TouchableOpacity onPress={getFile} style={{ borderWidth: 2, 
          backgroundColor: 'green', borderStyle: 'solid', borderRadius: 7, height: 40, width: 120,
          alignItems: 'center', padding: 4,margin:80 }}>
          <Text style={{ color: 'white' }}>Fetch File</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

