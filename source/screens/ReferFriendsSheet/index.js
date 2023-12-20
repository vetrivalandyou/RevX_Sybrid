// import React from "react";
// import {Text,View} from "react-native";

// const LocationBottom =()=>{
//     return(
//      <Text>
//         LocationBottom
//      </Text>
//     )
// }
// export default LocationBottom;

import React from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import { screenSize } from "../../components/atom/ScreenSize"
import appColors from '../../AppConstants/appColors';
import { AppImages } from '../../AppConstants/AppImages';
import CustomIcon, { Icons } from '../../components/molecules/CustomIcon/CustomIcon';

const ReferFriendsSheet = ({ refRBSheet }) => {

    const onLogOut = () => {
        refRBSheet?.current?.close();
    };

    return (
        <View style={[logoutStyle.container]}>
            
        </View>
    )
}

const logoutStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.darkgrey,
        borderTopEndRadius: 15,
        borderTopLeftRadius: 15,
        padding: 15
        // width:"100%"

    },
    titleView: {
        //  height: screenSize.height / 20,
        justifyContent: 'flex-end',
        flex: 0.5,
        backgroundColor: 'red'
    },
    titleText: {
        // fontSize: sizes.large,
        marginLeft: 20,
        fontWeight: '500',
        // fontWeight: fontWeight.bold,
        color: appColors.White,
    },
    descriptionView: {
        height: screenSize.height / 20,
        justifyContent: 'center',
    },
    descriptionText: {
        // fontSize: sizes.medium,
        marginLeft: 20,
        color: appColors.White,
    },
    buttonsMainView: {
        height: screenSize.height / 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    buttonLeftView: {
        width: screenSize.width / 2,
        height: screenSize.height / 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonStyle: {
        height: screenSize.height / 22,
        margin: 22,
        width: screenSize.width / 4,
        backgroundColor: 'transparent',
        borderColor: appColors.AppGreen,
        borderWidth: 1,
    },
    buttonRightView: {
        width: screenSize.width / 2,
        height: screenSize.height / 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonStyle: {
        height: screenSize.height / 22,
        margin: 22,
        width: screenSize.width / 4,
    },
});

export default ReferFriendsSheet;