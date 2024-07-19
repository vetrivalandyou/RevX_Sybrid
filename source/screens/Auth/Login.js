import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';

import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../AppConstants/appColors';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import {useNavigation} from '@react-navigation/native';
import {endPoint, messages} from '../../AppConstants/urlConstants';
import {PostRequest} from '../../services/apiCall';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {setAsyncItem} from '../../utils/SettingAsyncStorage';
import {screenSize} from '../../components/atom/ScreenSize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isEye, setIsEye] = useState(false);

  const validationSchema = Yup.object().shape({
    UserEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    UserPassword: Yup.string().required('Password is required'),
  });

  const LoginUser = (values, setSubmitting) => {
    console.log('values', values);
    PostRequest(endPoint.LOGIN, values)
      .then(res => {
        console.log('res', res?.data);

        if (res?.data?.code == 200) {
          setAsyncItem(
            constants.AsyncStorageKeys.token,
            res?.data?.data?.token,
          );
          setAsyncItem(
            constants.AsyncStorageKeys.userDetails,
            res?.data?.data?.user,
          );
          navigation?.navigate(constants.AuthScreen.Successfull, {
            userDetails: res?.data?.data,
          });
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
        console.log('fail');
      });
  };

  return (
    <Screen
      authStyle={{
        flex: 1,
        backgroundColor: appColors.Goldcolor,
        minHeight: screenSize.height,
        maxHeight: 'auto',
      }}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}
      translucent={false}
      style={{}}
      barStyle="light-content">
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 0.3, minHeight: 200, maxHeight: 200}}>
          <AuthHeader
            logIn={'Log In'}
            heading={'Welcome Back!'}
            subheading={'Please Login your account, Enter your details.'}
            onPress={() => {
              return navigation.navigate(constants.AuthScreen.ScreenSlider);
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: 'white',
            flex: 0.7,
            padding: 15,
            backgroundColor: appColors.Black,
            minHeight: 550,
            maxHeight: 'auto',
          }}>
          <Formik
            initialValues={{
              UserEmail: '',
              UserPassword: '',
              loginWith: 0 /* Login With RevX */,
              AuthId:  '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
              LoginUser(values, setSubmitting);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <View style={{flex: 0.3, justifyContent: 'space-evenly'}}>
                  <SimpleTextField
                    placeholder={'Enter Your Email'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('UserEmail')}
                    onBlur={handleBlur('UserEmail')}
                    value={values.UserEmail}
                  />
                  {touched.UserEmail && errors.UserEmail && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.UserEmail}
                      </Text>
                    </View>
                  )}

                  <SimpleTextField
                    placeholder={'Enter Your Password'}
                    onPressIcon={() => setIsEye(!isEye)}
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('UserPassword')}
                    onBlur={handleBlur('UserPassword')}
                    value={values.UserPassword}
                  />
                  {touched.UserPassword && errors.UserPassword && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.UserPassword}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{flex: 0.05, justifyContent: 'flex-end'}}>
                  <RememberMe
                    RememberTex={'Remember me'}
                    ForgetPasswordText={'Forget Password'}
                    onPressFP={() =>
                      navigation.navigate(constants.AuthScreen.ForgotPassword)
                    }
                  />
                </View>
                <View
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ButtonComponent
                    title={'Sign In'}
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                  />
                </View>
              </>
            )}
          </Formik>

          <View
            style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{color: appColors.GrayColor}}>
                Not register yet?{` `}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.AuthScreen.CreateAccount)
              }>
              <Text style={{color: appColors.Goldcolor}}>
                Create an account
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text style={{color: appColors.GrayColor}}>
                Register yourself as a Barber! {` `}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.AuthScreen.CreateAccountBarber)
              }>
              <Text style={{color: appColors.Goldcolor}}>Register</Text>
            </TouchableOpacity>
          </View>

          <SocailLogin
            SocailLogin={'or Login Using'}
            iconName={'facebook'}
            iconType={Icons.FontAwesome}
            color={appColors.White}
          />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
export default Login;
