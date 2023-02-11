import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './pages/SplashScreen';
import Topnavigation from './pages/Topnavigation';
import Login from './pages/Login';
import YachtServiceImage from './pages/YachtServiceImage';
import YachtCategoryBasedService from './pages/YachtCategoryBasedService';
import Notification from './pages/Notification';
import Errormsg from './pages/Errormsg';
import Forgotpass from './pages/Forgotpass';
import Resetpass from './pages/ResetPass';
import AdminCap from './pages/AdminCaptainupdate';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Topnavigation}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Yacht Service"
          component={YachtServiceImage}
          options={{headerTitleAlign:'center',headerBackTitleVisible:false}}
        />
        <Stack.Screen
          name="SCHEDULE SERVICE"
          component={YachtCategoryBasedService}
          options={{headerTitleAlign:'center'}}
        />
          <Stack.Screen
          name="NOTIFICATIONS"
          component={Notification}
          options={{headerTitleAlign:'center'}}
        />
         <Stack.Screen
          name="FORGET PASSWORD"
          component={Forgotpass}
          options={{headerTitleAlign:'center'}}
        />
         <Stack.Screen
          name="RESET PASSWORD"
          component={Resetpass}
          options={{headerTitleAlign:'center'}}
        />
         <Stack.Screen
          name="Errormsg"
          component={Errormsg}
          options={{headerTitleAlign:'center'}}
        />
        <Stack.Screen
          name="AdminCap"
          component={AdminCap}
          options={{headerShown: false}}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;





