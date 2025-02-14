import React, {useState} from 'react';
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

const NewPassword = ({navigation, route}) => {
  const {Email} = route.params;
  const [passwordValue, setPasswordValue] = useState('');
  const [isEye, setIsEye] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  console.log('EmailEmailEmail', Email);
  const validationSchema = Yup.object().shape({
    NewPassword: Yup.string()
      .min(7)
      .required('Password is required')
      .min(8, 'Username must be at least 8 characters'),
    ConfirmPassword: Yup.string()
      .required('Confirm Password is required')
      .min(8, 'Username must be at least 8 characters'),
  });

  const ResetPassword = (values, setSubmitting) => {
    setSubmitting(false);
    const payload = {
      ...values,
      Email: Email,
    };
    console.log(payload, 'payload');
    PostRequest(endPoint.RESET_PASSWORD, payload)
      .then(res => {
        console.log(res.data, 'password');
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          navigation.navigate(constants.AuthScreen.Login);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  return (
    <Screen
      authStyle={{flex: 1, backgroundColor: appColors.Goldcolor}}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}>
      <View style={{flex: 0.3}}>
        <AuthHeader
          logIn={'New Password'}
          heading={'Create New Password'}
          subheading={'Please Login your account, Enter your details.'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Formik
        initialValues={{
          NewPassword: '',
          ConfirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          ResetPassword(values, setSubmitting);
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
            <View
              style={{
                backgroundColor: 'white',
                flex: 0.7,
                padding: 15,
                backgroundColor: appColors.Black,
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'space-evenly',
                }}>
                <SimpleTextField
                  placeholder={'Enter Your Password'}
                  // value={passwordValue}
                  // onChangeText={setPasswordValue}
                  onPressIcon={() => setIsEye(!isEye)}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('NewPassword')}
                  onBlur={handleBlur('NewPassword')}
                  value={values.NewPassword}
                />
                {touched.NewPassword && errors.NewPassword && (
                  <View style={{marginLeft: 10, margin: 5}}>
                    <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                      {errors.NewPassword}
                    </Text>
                  </View>
                )}

                <SimpleTextField
                  placeholder={'Enter Your Confirm Password'}
                  // value={passwordValue}
                  // onChangeText={setPasswordValue}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('ConfirmPassword')}
                  onBlur={handleBlur('ConfirmPassword')}
                  value={values.ConfirmPassword}
                />
                {touched.ConfirmPassword && errors.ConfirmPassword && (
                  <View style={{marginLeft: 10, margin: 5}}>
                    <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                      {errors.ConfirmPassword}
                    </Text>
                  </View>
                )}
              </View>

              <View style={{flex: 0.1}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                  }}>
                  Password must be atleast 8 Character{' '}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                  marginHorizontal: 20,
                }}>
                <ButtonComponent
                  title={'Reset Password'}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </Screen>
  );
};
export default NewPassword;
