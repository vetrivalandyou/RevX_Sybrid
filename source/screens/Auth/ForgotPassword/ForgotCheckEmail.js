import React from 'react';
import {Text, View, Image} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';
import checkEmailImage from '../../../assets/check-email.png';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const ForgotCheckEmail = ({navigation, route}) => {
  const {Email} = route.params;

  return (
    <Screen
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View
        style={{flex: 0.1, backgroundColor: 'blue', justifyContent: 'center'}}>
        <AuthHeader
          isForgetCheckEmail={true}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: appColors.Black,
            // paddingTop: 10,
          }}
          logIn={'Forgot'}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={checkEmailImage}
          style={{
            marginHorizontal: 50,
            height: '75%',
            width: '67%',
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{flex: 0.06}}>
        <Text
          style={{
            color: 'white',
            fontSize: 33,
            textAlign: 'center',
          }}>
          Check Your Email
        </Text>
      </View>
      <View style={{flex: 0.07}}>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            textAlign: 'center',

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
            flex: 0.35,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            fontSize: 16,
            // backgroundColor:'yellow'
          }}>
          <ButtonComponent
            title={'Continue'}
            onPress={() =>
              navigation.navigate(constants.AuthScreen.OTP_Verification, {
                Email: Email,
              })
            }
          />
        </View>

        {/* <View style={{flex: 0.45,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              marginHorizontal: 30,
              
            
            }}>
            Did not receive the email? Check your spam folder, or try another
            email address{' '}
          </Text>
        </View> */}

        <View
          style={{
            flex: 0.6,
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginHorizontal: 30,
              color: appColors.White,
              marginVertical: 25,
            }}>
            Did not receive the email? Check your spam folder, or
            <Text style={{color: 'gold'}}> try another email address</Text>
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default ForgotCheckEmail;
