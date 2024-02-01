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

const CreateAccountBarber = ({navigation}) => {
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
    // AddBio: Yup.string().required('Add Bio is required'),
  });

  const barberRegisterUser = values => {
    PostRequest(endPoint.SIGNUP, values)
      .then(res => {
        if (res?.data?.code == 201) {
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
      authStyle={{flex: 1, backgroundColor: appColors.Goldcolor}}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}
      translucent={false}
      barStyle="light-content">
      <View style={{flex: 0.2}}>
        <AuthHeader
          logIn={'Log In'}
          heading={'Create Account'}
          subheading={'Please Login your account, Enter your details.'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          flex: 0.8,
          padding: 15,
          backgroundColor: appColors.Black,
        }}>
        <Formik
          initialValues={{
            FullName: '',
            UserEmail: '',
            UserPassword: '',
            UserPhone: '',
            // AddBio: '',
            AddSpecialties: '',
            AddSkills: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            barberRegisterUser(values);
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
              <View style={{flex: 0.9, justifyContent: 'space-evenly'}}>
                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Enter Full Name'}
                    placeholderTextColor={appColors.White}
                    onChangeText={handleChange('FullName')}
                    onBlur={handleBlur('FullName')}
                    value={values.FullName}
                  />
                  {touched.FullName && errors.FullName && (
                    <View
                      style={{marginLeft: 10, marginTop: 2, marginBottom: 15}}>
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
                    <View
                      style={{marginLeft: 10, marginTop: 2, marginBottom: 15}}>
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
                    <View
                      style={{marginLeft: 10, marginTop: 2, marginBottom: 15}}>
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

                {/* <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Add Bio'}
                    placeholderTextColor={appColors.White}
                    onChangeText={handleChange('AddBio')}
                    onBlur={handleBlur('AddBio')}
                    value={values.AddBio}
                  />
                  {touched.AddBio && errors.AddBio && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.AddBio}
                      </Text>
                    </View>
                  )}
                </View> */}

                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Add Specialties'}
                    placeholderTextColor={appColors.White}
                    onChangeText={handleChange('AddSpecialties')}
                    onBlur={handleBlur('AddSpecialties')}
                    value={values.AddSpecialties}
                  />
                  {touched.AddSpecialties && errors.AddSpecialties && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.AddSpecialties}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Add Skills'}
                    placeholderTextColor={appColors.White}
                    onChangeText={handleChange('AddSkills')}
                    onBlur={handleBlur('AddSkills')}
                    value={values.AddSkills}
                  />
                  {touched.AddSkills && errors.AddSkills && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.AddSkills}
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
              <View style={{flex: 0.1}}>
                <ButtonComponent
                  title={'Create Account'}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            // backgroundColor: 'red',
          }}>
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
export default CreateAccountBarber;
