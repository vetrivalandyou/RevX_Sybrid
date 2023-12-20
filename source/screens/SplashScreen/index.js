import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import {AppImages} from '../../AppConstants/AppImages';
import Screen from '../../components/atom/ScreenContainer/Screen';
import ScreenSlider from '../ScreenSlider';
import constants from '../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import appColors from '../../AppConstants/appColors';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  // const navigation =useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(constants.screen.HomeBarber);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.viewStyle}>
      <StatusBar
        barStyle="dark-content"
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
