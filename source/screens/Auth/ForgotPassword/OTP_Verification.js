import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import constants from '../../../AppConstants/Constants.json';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { PostRequest } from '../../../services/apiCall';
import { endPoint } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';

const OTP_Verification = ({navigation, route}) => {

  const {Email} = route.params;

  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(['','','','','',''])
  const otpInputRefs = Array.from({length: 6}, () => useRef(0));
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    otpInputRefs[0].current.focus();
  }, []);

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

  useEffect(() => {
    if(otp[otp.length - 1] != ''){
      console.log("inside")
      otpVerification()
    }
  },[otp])

  const handleOTPInputChange = (index, value) => {
    const otpValues = Array.from(value);
    const updatedOtp = [...otp]
    updatedOtp[index] = value.charAt(value.length - 1);
    setOtp(updatedOtp)

    otpValues[index] = value.charAt(value.length - 1);
    if (index < otpInputRefs.length - 1 && value !== '') {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleInputFocus = index => {
    setFocusedIndex(index);
  };

  const otpVerification = () => {
    const payload = {
      Email: Email,
      OTP: otp.join('')
    }
    console.log("payload",payload)
    PostRequest(endPoint.OTP_VERIFICATION, payload)
    .then((res) => {
      console.log("res", res?.data)
      if(res?.data?.code == 200){
        navigation.navigate(constants.AuthScreen.NewPassword, {Email: Email})
      }else{
        SimpleSnackBar(res?.data?.message)
      }
    })
    .catch((err) => {
      SimpleSnackBar(res?.data?.message)
    })
  }

  const handlePressResendOTP = () => {
    PostRequest(endPoint.OPT_SEDING, Email)
  .then((res) => {
    console.log("res", res?.data)
    if(res?.data?.code == 200){
      console.log("successfull")
      SimpleSnackBar(res?.data?.message)
    } else{
      SimpleSnackBar(res?.data?.message)
    }
    setSubmitting(false)
  })
  .catch((err) => {
    SimpleSnackBar(res?.data?.message)
  })
  }

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
      <View style={OTP_Verification_Style.subContainer}>
        <View style={{flex: 0.1}}>
          <Text style={OTP_Verification_Style.headingStyle}>
            Verification Code
          </Text>
        </View>
        <View style={{flex: 0.1}}>
          <Text style={OTP_Verification_Style.headingDescription}>
            Enter 6 digit verification code sent to your mobile number
          </Text>
        </View>
        <View style={OTP_Verification_Style.textBoxView}>
          {Array.from({length: 6}).map((digit, index) => (
            <TextInput
              key={index}
              style={[
                OTP_Verification_Style.textInputStyle,
                {
                  borderColor:
                    focusedIndex === index
                      ? appColors.White
                      : appColors.GrayColor,
                },
              ]}
              placeholder={''}
              placeholderTextColor={appColors.LightGray}
              keyboardType="numeric"
              maxLength={1}
              onFocus={() => handleInputFocus(index)}
              onChangeText={text => handleOTPInputChange(index, text)}
              ref={otpInputRefs[index]}
            />
          ))}
        </View>
        <View style={OTP_Verification_Style.resendTimerView}>
          <Text style={{color: 'white', fontSize: 16}}>
            Resend Code in {formatTime(timer)} seconds
          </Text>
        </View>
        <View style={OTP_Verification_Style.dontReceiveCodeView}>
          <Text style={OTP_Verification_Style.dontReceiveCodeText}>
            If you don't recieve OTP with in 60 seconds please resend again.
          </Text>
        </View>

        <View style={OTP_Verification_Style.buttonView}>
          <ButtonComponent
            title={'Resend OTP'}
            disable={formatTime(timer) == '00:00' ? false : true}
            btnColor={
              formatTime(timer) == '00:00'
                ? appColors.Goldcolor
                : appColors.disableGrayColor
            }
            onPress={handlePressResendOTP}
          />
        </View>
      </View>
    </Screen>
  );
};

const OTP_Verification_Style = StyleSheet.create({
  subContainer: {
    backgroundColor: 'white',
    flex: 0.8,
    padding: 15,
    backgroundColor: appColors.Black,
  },
  headingStyle: {
    color: 'white',
    fontSize: 26,
    textAlign: 'left',
    marginTop: 20,
  },
  headingDescription: {
    color: 'white',
    fontSize: 15,
    textAlign: 'left',
    marginTop: 12,
    lineHeight: 22,
  },
  textBoxView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
  textInputStyle: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    color: appColors.White,
    fontSize: 22,
    width: 50,
    borderRadius: 12,
    textAlign: 'center',
  },
  resendTimerView: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  dontReceiveCodeView: {flex: 0.1, justifyContent: 'center'},
  dontReceiveCodeText: {
    color: appColors.White,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  buttonView: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});

export default OTP_Verification;
