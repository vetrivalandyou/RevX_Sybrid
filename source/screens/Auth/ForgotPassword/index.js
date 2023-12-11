import React from "react";
import { Text, View } from "react-native";
import appColors from "../../../AppConstants/appColors";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import AuthHeader from "../../../components/molecules/AuthHeader";



const ForgotPassword = () => {

    return (

        <Screen>
            <AuthHeader
                logIn={"Log In"}
                heading={"Welcome Back!"}
                subheading={"Please Login your account, Enter your details."}
                onPress={() => navigation.navigate(constants.screen.ScreenSlider)}
            />
           
        </Screen>







    )
}
export default ForgotPassword;