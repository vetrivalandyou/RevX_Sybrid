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
    <Screen statusBarColor={appColors.Black}>
      <AuthHeader
        style={{
          backgroundColor: 'black',
          flex: 0.3,
          paddingTop: 10,
        }}
        logIn={'Forgot'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Image
          source={checkEmailImage}
          style={{
            marginHorizontal: 50,
            height: 315,
            width: 292,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 0.3}}>
        <Text
          style={{
            color: 'white',
            fontSize: 44,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Check Your Email
        </Text>
      </View>
      <View style={{flex: 0.3}}>
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
          flex: 1,
          // padding: 15,
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
            title={'Sign In Again'}
            onPress={() => navigation.navigate(constants.screen.NewPassword)}
          />
        </View>

        <View style={{flex: 0.6}}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              marginTop: 40,
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
