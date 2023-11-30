import React from 'react';
import { ScrollView, View, SafeAreaView, StatusBar, Appearance } from 'react-native';
import styles from './styles';
import { useTheme } from '@react-navigation/native';
import appColors from '../../../AppConstants/appColors';


const Screen = (props) => {
  const { colors } = useTheme();

  const appMode = Appearance.getColorScheme()

  return (
    <SafeAreaView style={[styles.safeAreaView, props.style]}>

      <StatusBar
        hidden={props.hidden}
        // barStyle="default"
        barStyle={appMode == "dark" ? "light-content" : "dark-content"}
        translucent={props.translucent}
        backgroundColor={props.statusBarColor ? props.statusBarColor : colors.screenTab}
      />


      {
        props.scrollable ?
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollViewContent, props.scrollViewContentStyle]}
            keyboardShouldPersistTaps="handled"
          >
            {props.children}
          </ScrollView>
          :

          <View style={[styles.view, props.viewStyle]}>
            {props.children}
          </View>
      }

    </SafeAreaView>

  )
}


export default Screen;