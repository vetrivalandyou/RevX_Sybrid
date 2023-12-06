import React from "react";
import { Text, View, StatusBar, TouchableOpacity, Image } from "react-native"
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
import { AppImages } from "../../AppConstants/AppImages";
import Header from "../../components/molecules/Header";

const Successfull = ({ navigation }) => {
    const [isEye, setIsEye] = React.useState(false);

    return (
        <Screen
            statusBarColor={appColors.Black}
            barStyle="light-content"
            viewStyle={{ backgroundColor: appColors.Black, }}
        >

            <Header
                lefttIcoType={Icons.Ionicons}
                leftIcoName={"chevron-back"}
                headerText={"Succeddfull"}
                // rightIcoName={"bell"}
                // rightIcoType={Icons.SimpleLineIcons}
                // logIn={"success"}
                // rightIcoSize={20}
             //   leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
            />
            <View style={{  flex: 0.9, backgroundColor: appColors.Black, justifyContent: 'center' }}>
                <View style={{ flex: 0.34, alignItems: "center", justifyContent: 'center',}}>
                    <Image
                        style={{ height: 300, width: 300 }}
                        source={AppImages.success}
                    />
                </View>


                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: appColors.White }}>
                        Successful!
                    </Text>

                    <Text style={{ color: appColors.White, fontSize: 15 }}>
                        You have successfully registered in our App
                    </Text>


                </View>
                <View style={{  alignItems: 'center', flex: 0.14, justifyContent: 'center' }}>
                    <ButtonComponent
                        style={{ width: '50%' }}
                        title={"Srart Booking"}

                    />
                </View>

            </View>
        </Screen>
    )
}
export default Successfull;

