import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, LogBox, Image, Dimensions, SafeAreaView, TouchableOpacity,Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from './Profile';
import More from './More'
import Account from './Account'
//import YachtService from './YachtService'
import CustomerRegistration from './CustomerRegistration'
import UpdateSchdule from './UpdateSchdule'
import BoatRegistration from './BoatRegistration'
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors';
import { scale,moderateScale,verticalScale} from 'react-native-size-matters';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Tab = createMaterialTopTabNavigator();
const Topnavigation = ({ navigation, route }) => {
    const [shouldShow, setAdmin] = useState();
    const[swipeenabled,setswipeenabled]= useState(true);

    useEffect(() => {
        displayData();
    }, []);
    const displayData = async () => {
        try {
            console.log("role->"+route.params.curRole);
            route.params.curRole === "0" ? setAdmin(true) : setAdmin(false);
            if((Platform.OS === 'ios') && (route.params.curRole === "0"))
                setswipeenabled(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:Colors.bgColor}}>
            <View style={{
                alignItems: 'center',
                borderBottomColor: 'lightgray',
                borderWidth: 1,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <View>
                   <TouchableOpacity onPress={()=>{navigation.navigate("Login");}}><View style={{ padding: screenWidth * 0.02, 
                    //alignSelf: 'flex-end' 
                    }}><Icon name="arrow-back" size={scale(26)} color="#1D355E" /></View></TouchableOpacity>
                </View>
                <View>
                    <Image
                        source={require('../Image/logo.jpg')}
                        //style={{ width: screenWidth * .4, height: screenHeight * .05, }}
                        style={{ width: scale(90), height: verticalScale(40), }}
                        resizeMode='contain'
                    />
                </View>
            </View>
            <Tab.Navigator
               // keyboardDismissMode='on-drag'
                screenOptions=
                {{
                    tabBarLabelStyle: {fontSize:moderateScale(12,0.7)},
                    swipeEnabled:swipeenabled,
                    // tabBarStyle: { backgroundColor: 'powderblue' },
                }}
            >
                    {shouldShow ? (<>
                                    <Tab.Screen name='CREG' component={CustomerRegistration} />
                                    <Tab.Screen name='BREG' component={BoatRegistration} />
                                    <Tab.Screen name='Services' component={UpdateSchdule} />
                                    <Tab.Screen name='Profile' component={Profile} />
                                </>) : null}
                    {!shouldShow ?(<><Tab.Screen name='Account' component={Account} />
                                    <Tab.Screen name='Profile' component={Profile} />
                                    <Tab.Screen name='CRUCERO' component={More} />
                    {/* <Tab.Screen name='Yacht Serviceing' component={YachtService} /> */}
                    </>):null}
                    
            </Tab.Navigator>
            {/* <View style={{
                justifyContent: 'flex-end',
                //marginTop: 20, 
                padding: 20, alignItems: 'center'
            }}>
                <Text style={{ fontSize: 20, color: 'gray' }}>Copyright</Text>
                <Text style={{ fontSize: 20, color: 'gray'}}>American Yacht Group</Text>
            </View> */}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Topnavigation;

