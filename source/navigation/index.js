import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import constants from '../AppConstants/Constants.json'
import { BarberSpecialist, CreateAccount, ForgotPassword, Login, ScreenSlider, SplashScreen, Successfull } from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";


const Main =()=>{

    const Stack = createNativeStackNavigator();
    return(

          <NavigationContainer >
           <Stack.Navigator>

             <Stack.Screen
            name={constants.screen.SplashScreen}
            component={SplashScreen}
            options={{headerShown:false}}
            />
             <Stack.Screen name={constants.screen.ScreenSlider}
               component={ScreenSlider} 
               options={{ headerShown: false }}
           />
          <Stack.Screen
            name={constants.screen.Login}
            component={Login}
            options={{headerShown:false}}
            />     
              <Stack.Screen
            name={constants.screen.BottomTabNavigation}
            component={BottomTabNavigation}
            options={{headerShown:false}}
            />    

            <Stack.Screen
            name={constants.screen.CreateAccount}
            component={CreateAccount}
            options={{headerShown:false}}
            />     
            <Stack.Screen
            name={constants.screen.Successfull}
            component={Successfull}
            options={{headerShown:false}}
            /> 
            
            <Stack.Screen
            name={constants.screen.ForgotPassword}
            component={ForgotPassword}
            options={{headerShown:false}}
            />    
            
              {/* <Stack.Screen
            name={constants.screen.BarberSpecialist}
            component={BarberSpecialist}
            options={{headerShown:false}}
            />             */}
            </Stack.Navigator>
          </NavigationContainer>
    )


}
export default Main;
