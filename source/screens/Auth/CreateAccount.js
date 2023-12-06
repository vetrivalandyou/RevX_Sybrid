import React from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native"
import AuthHeader from "../../components/molecules/AuthHeader";
import Screen from "../../components/atom/ScreenContainer/Screen";
import constants from "../../AppConstants/Constants.json"
import SimpleTextField from "../../components/molecules/TextFeilds/SimpleTextField";
import { SafeAreaView } from "react-native-safe-area-context";
import AppColors from "../../AppConstants/appColors";
import appColors from "../../AppConstants/appColors";
import CustomIcon, { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import ButtonComponent from "../../components/atom/CustomButtons/ButtonComponent";
import RememberMe from "../../components/molecules/RememberMe";
import SocailLogin from "../../components/molecules/SocailLogin";

const CreateAccount = ({ navigation }) => {
    const [isEye, setIsEye] = React.useState(false);

    return (
        <Screen statusBarColor={appColors.Goldcolor}
            translucent={true}
            barStyle="light-content"

        >
            <AuthHeader
                logIn={"Log In"}
                heading={"Create Account"}
                subheading={"Please Login your account, Enter your details."}
                onPress={() => navigation.navigate(constants.screen.ScreenSlider)}
            />

            <View style={{ backgroundColor: "white", flex: 0.70, padding: 15, backgroundColor: appColors.Black }}>

                <View style={{ flex: 0.5, justifyContent: 'center' }}>


                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                        <SimpleTextField
                            placeholder={"Enter Full Name"}
                            placeholderTextColor={appColors.White}
                        />

                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                        <SimpleTextField
                            placeholder={"Enter Email Address"}
                            placeholderTextColor={appColors.White}
                        />

                    </View>

                    <View style={{ flex: 0.4, justifyContent: 'center', borderStartColor: 'red' }}>
                        <SimpleTextField
                            placeholder={"Enter Your Password"}
                            eyeOpen={isEye}
                            onPressIcon={() => setIsEye(!isEye)}
                            secureTextEntry={true}
                            placeholderTextColor={appColors.White}

                        />

                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                        <SimpleTextField
                            placeholder={"Contact Number"}
                            placeholderTextColor={appColors.White}
                        />

                    </View>


                </View>
                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                    <RememberMe
                        RememberTex={"Remember me"}
                        ForgetPasswordText={"Terms & Conditions"}
                    />

                </View>
                <View style={{ flex: 0.2 }}>
                    <ButtonComponent title={"Create Account"} />
                </View>

                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{ color: appColors.GrayColor }}>
                            Already have an Account ?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate(constants.screen.Login)}
                    >
                        <Text style={{ color: appColors.Goldcolor }}>
                            Login
                        </Text>
                    </TouchableOpacity>

                </View>
                <View>

                </View>

                <SocailLogin
                    SocailLogin={"or Login Using"}
                    iconName={"facebook"}
                    iconType={Icons.FontAwesome}
                    color={appColors.White}
                />




            </View>


        </Screen>
    )
}
export default CreateAccount;

