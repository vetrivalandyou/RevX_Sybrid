import React from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  Appearance,
} from 'react-native';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import appColors from '../../../AppConstants/appColors';

const Screen = ({
  scrollable,
  animated,
  hidden,
  statusBarColor,
  scrollViewContentStyle,
  children,
  viewStyle,
  style,
  authStyle,
  translucent,
}) => {
  const {colors} = useTheme();

  const appMode = Appearance.getColorScheme();

  return (
    <SafeAreaView
      style={[
        authStyle ? authStyle : {flex: 1, backgroundColor: appColors.Black},
      ]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={statusBarColor ? statusBarColor : colors.screenTab}
        translucent={translucent ? translucent : false}
      />
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContent,
            scrollViewContentStyle,
          ]}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.view, viewStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Screen;
