import React, { useEffect, useState } from "react";
import { View, Image, Dimensions, Text, ActivityIndicator } from "react-native";
import Styles from "../styles/Styles";
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from "../styles/Colors";
import { scale,moderateScale} from "react-native-size-matters";
const Footer = (props) => {
    return (
            <View style={[Styles.footerStyle]}>
                <View>
                    <Text style={[Styles.topClss2,{textAlign: 'center', color:Colors.primaryThemecolor,fontSize:scale(20)}]}>{props.Status}</Text>
                </View>
                <View style={Styles.topClss2}>
                    <ActivityIndicator
                        animating={props.Animating}
                        color={Colors.primaryThemecolor}
                        size="large"
                    />
                </View>
                <View>
                    <Text style={[Styles.topClss,Styles.normalText2]}>Copyrights <Text><Icon name="copyright" size={moderateScale(14,0.4)} color="#1D355E"/></Text> HCB Yacht</Text>
                </View>

            </View>
    );
};

export default Footer;
