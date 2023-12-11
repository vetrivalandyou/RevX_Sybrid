import React from "react";
import { Text, View } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import appColors from "../../AppConstants/appColors";
import styles from "./styles";


const HomeScreen = () => {

    return (

        <Screen statusBarColor={appColors.Black}
            // translucent={true}
            barStyle="light-content">
            <View style={styles.headerComponent}>

            </View>



        </Screen>


    )
}

export default HomeScreen;