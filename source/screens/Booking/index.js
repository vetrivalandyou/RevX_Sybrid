import React from "react";
import { Text, View } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import appColors from "../../AppConstants/appColors";
import Header from "../../components/molecules/Header";
import { Icons } from "../../components/molecules/CustomIcon/CustomIcon";


const Booking = () => {
  return (

    <Screen
    statusBarColor={appColors.Black}
    barStyle="light-content"
    viewStyle={{backgroundColor:appColors.Black}}

>
    <Header
        lefttIcoType={Icons.Ionicons}
        leftIcoName={"chevron-back"}
        headerText={"Succeddfull"}
        rightIcoName={"bell"}
        rightIcoType={Icons.SimpleLineIcons}
        logIn={"success"}
        rightIcoSize={20}
        leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
    />
       <View style={{ flex: 0.9, padding: 10 ,backgroundColor:appColors.Black}}>
                <Text>nkjfik</Text>
            </View>
    </Screen>
    
    
 )
}

export default Booking;