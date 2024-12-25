import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import {AppImages} from '../../AppConstants/AppImages';
import constants from '../../AppConstants/Constants.json';
import appColors from '../../AppConstants/appColors';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(constants.AuthScreen.ScreenSlider);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.viewStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={appColors.White}></StatusBar>

      <Image style={styles.imageStyle} source={AppImages.splash} />
    </SafeAreaView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.White,
    flex: 1,
  },
  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
});
