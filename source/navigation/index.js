import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import constants from '../AppConstants/Constants.json'
import { Login, ScreenSlider, SplashScreen } from "../screens";


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
            </Stack.Navigator>
          </NavigationContainer>
    )


}
export default Main;
