import React from 'react';
import {Text, View, Image} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';
import checkEmailImage from '../../../assets/check-email.png';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const ForgotCheckEmail = ({navigation}) => {
  return (
    <Screen viewStyle={{ flex: 1, backgroundColor: appColors.Black}} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1, backgroundColor:'blue', justifyContent:'center'}}>
      <AuthHeader
      isForgetCheckEmail={true}
        style={{
          flex: 1,
          justifyContent:'center',
          backgroundColor: appColors.Black,
          // paddingTop: 10,
        }}
        logIn={'Forgot'}
        onPress={() => navigation.goBack()}
      />
      </View>
      
      <View style={{ flex: 0.5, justifyContent:'center', alignItems:'center'}}>
        <Image
          source={checkEmailImage}
          style={{
            marginHorizontal: 50,
            height: "75%",
            width: "60%",
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 0.1}}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Check Your Email
        </Text>
      </View>
      <View style={{flex: 0.1}}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 10,
            marginHorizontal: 30,
          }}>
          We have sent a password recover instructions to your email.
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 0.3,
          backgroundColor: appColors.Black,
        }}>
        <View
          style={{
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            fontSize: 16,
          }}>
          <ButtonComponent
            title={'Continue'}
            onPress={() => navigation.navigate(constants.AuthScreen.OTP_Verification)}
          />
        </View>

        <View style={{flex: 0.6}}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 20,
              marginHorizontal: 30,
            }}>
            Did not receive the email? Check your spam folder, or try another
            email address{' '}
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default ForgotCheckEmail;
