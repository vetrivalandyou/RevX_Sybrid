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
}) => {
  const {colors} = useTheme();

  const appMode = Appearance.getColorScheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: statusBarColor}}>
      <StatusBar
        // hidden={hidden}
        barStyle={'light-content'}
        backgroundColor={statusBarColor ? statusBarColor : colors.screenTab}
        // animated={animated}
        translucent={false}
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
