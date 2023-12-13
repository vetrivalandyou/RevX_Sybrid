import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { AppImages } from "../../AppConstants/AppImages";
import Screen from "../../components/atom/ScreenContainer/Screen";
import ScreenSlider from "../ScreenSlider";
import constants from "../../AppConstants/Constants.json"
import { useNavigation } from "@react-navigation/native";
import appColors from "../../AppConstants/appColors";


const SplashScreen = ({ navigation }) => {
  // const navigation =useNavigation();


  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(constants.screen.Login)
    }, 1000);
  }, [])

  return (

    <Screen
      viewStyle={{ justifyContent: 'center', alignItems: 'center',backgroundColor:appColors.White }}
     // translucent={true}
      statusBarColor="transparent"
      style={styles.container}>
      <Image style={styles.imageStyle} source={AppImages.splash} />

    </Screen>
  )
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    // flex:1,    
  },
  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  }
})