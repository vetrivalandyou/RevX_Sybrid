import React from 'react';
import { ScrollView, View, SafeAreaView, StatusBar, Appearance } from 'react-native';
import styles from './styles';
import { useTheme } from '@react-navigation/native';
import appColors from '../../../AppConstants/appColors';


const Screen = ({ scrollable, animated,hidden, translucent, statusBarColor, scrollViewContentStyle, children, viewStyle, style }) => {
  const { colors } = useTheme();

  const appMode = Appearance.getColorScheme()

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:appColors.Black}}>
      <StatusBar
        hidden={hidden}
        barStyle={appMode == "dark" ? "dark-content" : "content"}
        // translucent={translucent}
        backgroundColor={statusBarColor ? statusBarColor : colors.screenTab}
        animated={animated}
      />
      {
        scrollable ?
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollViewContent, scrollViewContentStyle]}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
          :
          <View style={[styles.view, viewStyle]}>
            {children}
          </View>
      }
    </SafeAreaView>
  )
}


export default Screen;