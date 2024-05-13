import React, {useRef, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {View, Animated, Easing, StyleSheet} from 'react-native';
import {screenSize} from '../ScreenSize';
import appColors from '../../../AppConstants/appColors';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const BoxLottie = ({animationPath}) => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={[styles.container]}>
      <AnimatedLottieView
        source={animationPath}
        style={styles.lottieStyle}
        autoPlay
        loop
        speed={0.5}
        progress={animationProgress.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: screenSize.height,
    width: screenSize.width / 3.5,
    // backgroundColor: appColors.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   imageStyle: {
  //     width: screenSize.width / 3,
  //     height: screenSize.height / 4,
  //   },
  spinnerTextStyle: {
    color: appColors.appcolor,
    fontSize: 14,
    textAlign: 'center',
  },
  lottieStyle: {
    width: screenSize.width,
    height: screenSize.height / 5,
    // backgroundColor: 'transparent',
  },
});

export default BoxLottie;
