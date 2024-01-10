import React from 'react';
import {Text, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const ForgotPassword = ({navigation}) => {
  return (
    <Screen>
      <AuthHeader
        logIn={'Forgot'}
        heading={'Forgot Password'}
        subheading={
          'Enter your email address and we will send a reset password.'
        }
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: 'white',
          flex: 0.8,
          padding: 15,
          backgroundColor: appColors.Black,
        }}>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'space-evenly',
          }}>
          <SimpleTextField
            placeholder={'Johannaemma@gmail.com'}
            placeholderTextColor={appColors.White}
            // name={eyeOpen ? 'eye-outline' : 'eye-off-outline'}
            eyeOpen={false}
          />
        </View>

        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <ButtonComponent
            title={'Reset Password'}
            onPress={() =>
              navigation.navigate(constants.AuthScreen.ForgotCheckEmail)
            }
          />
        </View>
      </View>
    </Screen>
  );
};
export default ForgotPassword;
