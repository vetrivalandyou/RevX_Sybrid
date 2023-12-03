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

const Login = ({ navigation }) => {
    const [eyeOpen, setEyeOpen] = React.useState(false);

    return (
        <Screen statusBarColor={appColors.Goldcolor}
            translucent={true}
            barStyle="light-content"

        >
            {/* <View style={{ flex: 0.35, backgroundColor: 'green' }}> */}
            <AuthHeader
                title={"Log In"}
                heading={"Welcome Back!"}
                subheading={"Please Login your account, Enter your details."}
                onPress={() => navigation.navigate(constants.screen.ScreenSlider)}
            />
            {/* </View>    */}

            <View style={{ backgroundColor: "white", flex: 0.70, padding: 15, backgroundColor: appColors.Black }}>
                
                 <View style={{flex:0.29}}>

                    <View style={{flex:0.5,justifyContent:'center'}}>
                    <SimpleTextField placeholder={"Enter Email Address"}
                    onPressIcon={() => setEyeOpen(!eyeOpen)}
                    secureTextEntry={true}
                />
                
                    </View> 
                    <View style={{flex:0.5,justifyContent:'center'}}>
                    <SimpleTextField placeholder={"Enter Your Password"}
                    onPressIcon={() => setEyeOpen(!eyeOpen)}
                    secureTextEntry={true}
                />
                
                    </View> 
              

                </View> 
                <View style={{ flex: 0.1, justifyContent: 'center'}}>
                    <RememberMe
                       RememberTex={"Remember me"}
                     ForgetPasswordText={"Forget Password"}
                     />

                </View>
                <View style={{flex:0.2}}>
                    <ButtonComponent/>
                    </View>
                   
                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{ color: appColors.GrayColor }}>
                            Not register yet?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={{ color: appColors.Goldcolor }}>
                            Create an account
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{justifyContent:"center ",flexDirection:'row',alignItems:'center',flex:0.1,}}>
                    <View style={{backgroundColor:appColors.White,height:1,flex:0.5,marginHorizontal:10}}>

                    </View>
                    <Text style={{color:appColors.White}}> 
                        or Login Using
                    </Text>
                    <View style={{backgroundColor:appColors.White,height:1,flex:0.5,marginHorizontal:10}}>

                    </View>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                </View>
                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}>
                    <CustomIcon type={Icons.AntDesign} name={"twitter"} color={AppColors.White} style={{}} size={30} />
                    <CustomIcon type={Icons.AntDesign} name={"google"} color={AppColors.White} style={{}} size={30} />
                    <CustomIcon type={Icons.FontAwesome} name={"facebook"} color={AppColors.White} style={{}} size={30} />

                </View>

            </View>


        </Screen>
    )
}
export default Login;

