import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../AppConstants/appColors';
import { Icons } from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import { endPoint, messages } from '../../AppConstants/urlConstants';
import { PostRequest } from '../../services/apiCall';
import { SimpleSnackBar } from '../../components/atom/Snakbar/Snakbar';
import { screenSize } from '../../components/atom/ScreenSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateAccount = ({ navigation }) => {
  const [isEye, setIsEye] = useState(false);

  const validationSchema = Yup.object().shape({
    FullName: Yup.string().required('Name is required'),
    UserEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    UserPhone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        'Invalid phone number format. Use (555) 555-7439',
      ),
    UserPassword: Yup.string()
      .min(8, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Password is required'),
  });

  const registerUser = values => {
    console.log(values);
    PostRequest(endPoint.SIGNUP, values)
      .then(res => {
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
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
      viewStyle={{ flex: 1, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Goldcolor}
      translucent={false}
      barStyle="light-content">
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} 
      style={{
        backgroundColor: appColors.Goldcolor
      }}>
        <View style={{ flex: 0.25 }}>
          <AuthHeader
            logIn={'Sign Up'}
            heading={'Create Account'}
            subheading={'Please Login your account, Enter your details.'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 0.75,
            padding: 15,
            backgroundColor: appColors.Black,
          }}>
          <Formik
            initialValues={{
              FullName: '',
              UserEmail: '',
              UserPassword: '',
              UserPhone: '',
              loginWith: 0 /* Login With RevX */,
              AuthId: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log('values', values);
              registerUser(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={{ flex: 0.5, justifyContent: 'space-evenly' }}>
                  <View style={{ flex: 0.25, justifyContent: 'center' }}>
                    <SimpleTextField
                      placeholder={'Enter Full Name'}
                      placeholderTextColor={appColors.LightGray}
                      onChangeText={handleChange('FullName')}
                      onBlur={handleBlur('FullName')}
                      value={values.FullName}
                    />
                    {touched.FullName && errors.FullName && (
                      <View style={{ marginLeft: 10, margin: 5 }}>
                        <Text
                          style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                          {errors.FullName}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={{ flex: 0.25, justifyContent: 'center' }}>
                    <SimpleTextField
                      placeholder={'Enter Email Address'}
                      placeholderTextColor={appColors.LightGray}
                      onChangeText={handleChange('UserEmail')}
                      onBlur={handleBlur('UserEmail')}
                      value={values.UserEmail}
                    />
                    {touched.UserEmail && errors.UserEmail && (
                      <View style={{ marginLeft: 10, margin: 5 }}>
                        <Text
                          style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                          {errors.UserEmail}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      flex: 0.25,
                      justifyContent: 'center',
                      // borderStartColor: 'red',
                    }}>
                    <SimpleTextField
                      placeholder={'Enter Your Password'}
                      eyeOpen={isEye}
                      onPressIcon={() => setIsEye(!isEye)}
                      secureTextEntry={true}
                      placeholderTextColor={appColors.LightGray}
                      onChangeText={handleChange('UserPassword')}
                      onBlur={handleBlur('UserPassword')}
                      value={values.UserPassword}
                    />
                    {touched.UserPassword && errors.UserPassword && (
                      <View style={{ marginLeft: 10, margin: 5 }}>
                        <Text
                          style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                          {errors.UserPassword}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={{ flex: 0.25, justifyContent: 'center' }}>
                    <SimpleTextField
                      placeholder={'Contact Number'}
                      placeholderTextColor={appColors.LightGray}
                      onChangeText={handleChange('UserPhone')}
                      onBlur={handleBlur('UserPhone')}
                      value={values.UserPhone}
                    />
                    {touched.UserPhone && errors.UserPhone && (
                      <View style={{ marginLeft: 10, margin: 5 }}>
                        <Text
                          style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                          {errors.UserPhone}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={{ flex: 0.15, justifyContent: 'center' }}>
                  <ButtonComponent
                    title={'Create Account'}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
          <View
            style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Text style={{ color: appColors.GrayColor }}>
                Already have an Account?{` `}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(constants.AuthScreen.Login)}>
              <Text style={{ color: appColors.Goldcolor }}> Login</Text>
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
      </KeyboardAwareScrollView>
    </Screen>
  );
};
export default CreateAccount;
