import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../AppConstants/appColors';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import {endPoint, messages} from '../../AppConstants/urlConstants';
import {PostRequest} from '../../services/apiCall';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';

const CreateAccount = ({navigation}) => {
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
    UserPassword: Yup.string().required('Password is required'),
  });

  const registerUser = values => {
    PostRequest(endPoint.SIGNUP, values)
      .then(res => {
        if (res?.data?.code == 201) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message);
          console.log("asasdasd ")
        }
      })
      .catch(err => {
        SimpleSnackBar( messages.Catch, appColors.Red);
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
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
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
              <View style={{flex: 0.6, justifyContent: 'space-evenly'}}>
                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Enter Full Name'}
                    placeholderTextColor={appColors.White}
                    onChangeText={handleChange('FullName')}
                    onBlur={handleBlur('FullName')}
                    value={values.FullName}
                  />
                  {touched.FullName && errors.FullName && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.FullName}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Enter Email Address'}
                    placeholderTextColor={appColors.White}
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
                </View>

                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    // borderStartColor: 'red',
                  }}>
                  <SimpleTextField
                    placeholder={'Enter Your Password'}
                    eyeOpen={isEye}
                    onPressIcon={() => setIsEye(!isEye)}
                    secureTextEntry={true}
                    placeholderTextColor={appColors.White}
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
                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Contact Number'}
                    placeholderTextColor={appColors.White}
                    onChangeText={handleChange('UserPhone')}
                    onBlur={handleBlur('UserPhone')}
                    value={values.UserPhone}
                  />
                  {touched.UserPhone && errors.UserPhone && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.UserPhone}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={{flex: 0.1, justifyContent: 'center'}}>
                <RememberMe
                  RememberTex={'Remember me'}
                  ForgetPasswordText={'Terms & Conditions'}
                />
              </View>
              <View style={{flex: 0.15}}>
                <ButtonComponent
                  title={'Create Account'}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
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
