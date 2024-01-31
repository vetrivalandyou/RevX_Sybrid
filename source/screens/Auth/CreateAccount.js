import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../AppConstants/appColors';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import {endPoint} from '../../services/urlConstants';
import {PostRequest} from '../../services/apiCall';

const intialSignupFields = {
  FullName: 'James Choler',
  UserPhone: '(555) 555-7439',
  UserEmail: 'abdul.hameed@sybrid.com',
  UserPassword: 'J@mesF1nn143',
};

const CreateAccount = ({navigation}) => {
  const [isEye, setIsEye] = React.useState(false);
  const [signupFields, setSignupFields] = useState(intialSignupFields);

  const registerUser = () => {
    console.log(signupFields);

    PostRequest(endPoint.SIGNUP, signupFields)
      .then(res => {
        console.log(res?.data);
        if (res?.data?.code == 201) {
          console.log('registered successfully');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Screen
      authStyle={{flex: 1, backgroundColor: appColors.Goldcolor}}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}
      translucent={false}
      barStyle="light-content">
      <View style={{flex: 0.25}}>
        <AuthHeader
          logIn={'Log In'}
          heading={'Create Account'}
          subheading={'Please Login your account, Enter your details.'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 0.75,
          padding: 15,
          backgroundColor: appColors.Black,
        }}>
        <View style={{flex: 0.5, justifyContent: 'space-evenly'}}>
          <View style={{flex: 0.4, justifyContent: 'center'}}>
            <SimpleTextField
              placeholder={'Enter Full Name'}
              placeholderTextColor={appColors.White}
              value={signupFields.FullName}
              onChangeText={e => {
                setSignupFields({
                  ...signupFields,
                  FullName: e,
                });
              }}
            />
          </View>
          <View style={{flex: 0.4, justifyContent: 'center'}}>
            <SimpleTextField
              placeholder={'Enter Email Address'}
              placeholderTextColor={appColors.White}
              value={signupFields.UserEmail}
              onChangeText={e => {
                setSignupFields({
                  ...signupFields,
                  UserEmail: e,
                });
              }}
            />
          </View>

          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              borderStartColor: 'red',
            }}>
            <SimpleTextField
              placeholder={'Enter Your Password'}
              eyeOpen={isEye}
              onPressIcon={() => setIsEye(!isEye)}
              secureTextEntry={true}
              placeholderTextColor={appColors.White}
              value={signupFields.UserPassword}
              onChangeText={e => {
                setSignupFields({
                  ...signupFields,
                  UserPassword: e,
                });
              }}
            />
          </View>
          <View style={{flex: 0.4, justifyContent: 'center'}}>
            <SimpleTextField
              placeholder={'Contact Number'}
              placeholderTextColor={appColors.White}
              value={signupFields.UserPhone}
              onChangeText={e => {
                setSignupFields({
                  ...signupFields,
                  UserPhone: e,
                });
              }}
            />
          </View>
        </View>
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <RememberMe
            RememberTex={'Remember me'}
            ForgetPasswordText={'Terms & Conditions'}
          />
        </View>
        <View style={{flex: 0.2}}>
          <ButtonComponent title={'Create Account'} onPress={registerUser} />
        </View>

        <View
          style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Text style={{color: appColors.GrayColor}}>
              Already have an Account ?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(constants.AuthScreen.Login)}>
            <Text style={{color: appColors.Goldcolor}}> Login</Text>
          </TouchableOpacity>
        </View>
        <View></View>

        <SocailLogin
          SocailLogin={'or Login Using'}
          iconName={'facebook'}
          iconType={Icons.FontAwesome}
          color={appColors.White}
        />
      </View>
    </Screen>
  );
};
export default CreateAccount;
