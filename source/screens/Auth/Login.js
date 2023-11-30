import React from "react";
import {Text, View} from "react-native"
import AuthHeader from "../../components/molecules/AuthHeader";
import Screen from "../../components/atom/ScreenContainer/Screen";
import constants from "../../AppConstants/Constants.json"
import SimpleTextField from "../../components/molecules/TextFeilds/SimpleTextField";
import { SafeAreaView } from "react-native-safe-area-context";

const Login =({navigation})=>{

return(
    <SafeAreaView>
        <AuthHeader
        title={"Log In"}
        heading={"Welcome Back!"}
        subheading={"Please Login your account, Enter your details."}
        onPress={()=>navigation.navigate(constants.screen.ScreenSlider)}
    />
     <SimpleTextField/>

    </SafeAreaView>
    
       
   
    
)
}
export default Login;