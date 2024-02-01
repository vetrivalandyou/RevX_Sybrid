import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const OTP_Verification = ({navigation}) => {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleVerificationCodeChange = (text, index) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text) && text.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = text;
      setVerificationCode(newVerificationCode);
    }
  };

  return (
    <Screen
      authStyle={{flex: 1, backgroundColor: appColors.Goldcolor}}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}>
      <View style={{flex: 0.2}}>
        <AuthHeader
          logIn={'Verification'}
          heading={'OTP Verification'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 0.8,
          padding: 15,
          backgroundColor: appColors.Black,
        }}>
        <View style={{flex: 0.1}}>
          <Text
            style={{
              color: 'white',
              fontSize: 26,
              textAlign: 'left',
              marginTop: 20,
            }}>
            Verification Code
          </Text>
        </View>
        <View style={{flex: 0.1}}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              textAlign: 'left',
              marginTop: 12,
              lineHeight: 22,
            }}>
            Enter 6 digit verification code sent to your mobile number (555)
            555-7549
          </Text>
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 50,
          }}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              style={{
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: 1,
                borderBottomColor: 'white',
                color: 'white',
                fontSize: 22,
                width: 50,
                borderRadius: 12,
                textAlign: 'center',
                borderColor: 'white',
              }}
              placeholder={'0'}
              placeholderTextColor={appColors.LightGray}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleVerificationCodeChange(text, index)}
            />
          ))}
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>
            Resend Code in {formatTime(timer)} minutes
          </Text>
        </View>
        <View style={{flex: 0.1}}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              textAlign: 'center',
              marginTop: 12,
              lineHeight: 22,
            }}>
            If you don't recieve OTP with in 60 seconds please resend again.
          </Text>
        </View>

        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <ButtonComponent
            title={'Resend OTP'}
            onPress={() =>
              navigation.navigate(constants.AuthScreen.ForgotCheckEmail)
            }
          />
        </View>
      </View>
    </Screen>
  );
};

export default OTP_Verification;
