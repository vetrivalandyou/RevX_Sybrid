import React from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';

const AboutUs = ({navigation}) => {
  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 10}}>
      <Header
        lefttIcoType={Icons.Ionicons}
        onPressLeftIcon={() => navigation.goBack()}
        leftIcoName={'chevron-back'}
        headerText={'About Us'}
        rightIcoName={'bell'}
        rightIcoType={Icons.SimpleLineIcons}
        logIn={'success'}
        rightIcoSize={20}
        leftIcoStyle={{
          backgroundColor: appColors.lightBlack,
          borderRadius: 50,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      <View
        style={{
          flex: 0.3,
          // backgroundColor: appColors.Black,
          flexDirection: 'column',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            flex: 0.9,
            backgroundColor: appColors.AppGray,
            borderRadius: 16,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.navigate(constants.screen.TermsOfService)}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 400}}>
            Terms of Services
          </Text>
          <CustomIcon
            type={Icons.AntDesign}
            name={'caretright'}
            color={appColors.Goldcolor}
            size={18}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.9,
            backgroundColor: appColors.AppGray,
            borderRadius: 16,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.navigate(constants.screen.PrivacyPolicy)}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 400}}>
            Privacy Policy
          </Text>
          <CustomIcon
            type={Icons.AntDesign}
            name={'caretright'}
            color={appColors.Goldcolor}
            size={18}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.9,
            backgroundColor: appColors.AppGray,
            borderRadius: 16,
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => navigation.navigate(constants.screen.License)}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 400}}>
            License
          </Text>
          <CustomIcon
            type={Icons.AntDesign}
            name={'caretright'}
            color={appColors.Goldcolor}
            size={18}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default AboutUs;
