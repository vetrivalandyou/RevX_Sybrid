import React from "react";
import { ImageBackground, Text, View } from "react-native";
import Search from "../../components/atom/Search/Search";
import Header from "../../components/molecules/Header";
import { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import Screen from "../../components/atom/ScreenContainer/Screen";
import appColors from "../../AppConstants/appColors";
import { AppImages } from "../../AppConstants/AppImages";


const LocationScreen= () => {
    
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
                rightIcoName={"bell"}
                rightIcoType={Icons.SimpleLineIcons}
                logIn={"success"}
                rightIcoSize={20}
               leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
            />
            <View style={{flex:0.9,backgroundColor:appColors.Black,padding:10}}>
            <Search/>
            {/* <View style={{flex:1}}> */}
            <ImageBackground 
            style={{height:"100%",width:"100%"}}
            source={AppImages.slider1}
            >

            </ImageBackground>
            </View>
{/*            
        </View> */}
</Screen>

    )
}

export default LocationScreen;