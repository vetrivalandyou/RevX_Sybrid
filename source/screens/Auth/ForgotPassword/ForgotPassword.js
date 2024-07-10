import React from 'react';
import {Text, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {screenSize} from '../../../components/atom/ScreenSize';

const ForgotPassword = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const getOtp = (values, setSubmitting) => {
    PostRequest(endPoint.OPT_SEDING, values)
      .then(res => {
        console.log('res', res?.data);
        if (res?.data?.code == 200) {
          console.log('successfull');
          navigation.navigate(constants.AuthScreen.ForgotCheckEmail, {
            Email: res?.data?.data?.email,
          });
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(res?.data?.message);
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
      statusBarColor={appColors.Goldcolor}>
      <View style={{flex: 0.3}}>
        <AuthHeader
          logIn={'Forgot'}
          heading={'Forgot Password'}
          subheading={
            'Enter your email address and we will send a reset password.'
          }
          onPress={() => navigation.goBack()}
        />
      </View>
      <Formik
        initialValues={{
          Email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          console.log(values);
          getOtp(values, setSubmitting);
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
          <View
            style={{
              backgroundColor: 'white',
              flex: 0.8,
              padding: 15,
              backgroundColor: appColors.Black,
            }}>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'space-evenly',
              }}>
              <SimpleTextField
                placeholder={'Johannaemma@gmail.com'}
                placeholderTextColor={appColors.LightGray}
                eyeOpen={false}
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
                value={values.Email}
              />
              {touched.Email && errors.Email && (
                <View style={{marginLeft: 10, margin: 5}}>
                  <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                    {errors.Email}
                  </Text>
                </View>
              )}
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
                disabled={isSubmitting}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </Screen>
  );
};
export default ForgotPassword;
