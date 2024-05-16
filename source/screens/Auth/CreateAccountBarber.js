import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import {endPoint, messages} from '../../AppConstants/urlConstants';
import {PostRequest} from '../../services/apiCall';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {screenSize} from '../../components/atom/ScreenSize';
import CustomDropdownPicker from '../../components/molecules/CustomDropdownPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateAccountBarber = ({navigation}) => {
  const [isEye, setIsEye] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

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
    Description: Yup.string().required('Description is required'),
    BarberCategories: Yup.array()
      .min(1, 'Select at least one option')
      .required('Select at least one option'),
  });

  const barberRegisterUser = (values, setSubmitting) => {
    const categoryArray = [];
    services?.map(obj => {
      categoryArray.push(obj.setupDetailId);
    });
    const payload = {
      ...values,
      BarberCategories: categoryArray,
    };
    console.log('BarberSignup Payload', payload);

    PostRequest(endPoint.REGISTERAS_BARBER, payload)
      .then(res => {
        console.log('BarberSignup Response', res?.data);
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
          setSubmitting(false);
        }
      })
      .catch(err => {
        console.log('error', err);
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
      });
  };

  const getServices = () => {
    const payload = {
      MasterId: 2,
      IsActive: true,
      ParentId: null,
      Name: null,
      masterDetaildId: null,
    };

    PostRequest(endPoint.MASTER_DETAIL, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          setSelectedItems(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
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
      <View style={styles.fieldsMainView}>
        <Formik
          initialValues={{
            FullName: '',
            UserEmail: '',
            UserPassword: '',
            UserPhone: '',
            Description: '',
            BarberCategories: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting}) => {
            barberRegisterUser(values, setSubmitting);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <KeyboardAwareScrollView
              contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
              <View style={{flex: 0.9, justifyContent: 'space-evenly'}}>
                <View style={{flex: 0.15, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Enter Full Name'}
                    placeholderTextColor={appColors.AppLightGray}
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
                <View style={{flex: 0.15, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Enter Email Address'}
                    placeholderTextColor={appColors.AppLightGray}
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
                    flex: 0.15,
                    justifyContent: 'center',
                  }}>
                  <SimpleTextField
                    placeholder={'Enter Your Password'}
                    eyeOpen={isEye}
                    onPressIcon={() => setIsEye(!isEye)}
                    secureTextEntry={true}
                    placeholderTextColor={appColors.AppLightGray}
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
                <View style={{flex: 0.15, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Contact Number'}
                    placeholderTextColor={appColors.AppLightGray}
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
                <View style={{flex: 0.15, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Add Description'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('Description')}
                    onBlur={handleBlur('Description')}
                    value={values.Description}
                  />
                  {touched.Description && errors.Description && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.Description}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{flex: 0.15}}>
                  <CustomDropdownPicker
                    items={selectedItems}
                    values={services}
                    setValues={setServices}
                    onChange={newValues => {
                      const isSelected = values?.BarberCategories?.some(
                        selected => selected == newValues.setupDetailId,
                      );
                      if (isSelected) {
                        setFieldValue(
                          'BarberCategories',
                          values?.BarberCategories?.filter(
                            selected => selected !== newValues.setupDetailId,
                          ),
                        );
                      } else {
                        setFieldValue('BarberCategories', [
                          ...values?.BarberCategories,
                          newValues?.setupDetailId,
                        ]);
                      }
                    }}
                    onBlur={() => handleBlur('BarberCategories')}
                  />
                  {touched.BarberCategories && errors.BarberCategories && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.BarberCategories}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{flex: 0.1}}>
                <ButtonComponent
                  title={'Create Account'}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
        </Formik>
        <View style={styles.buttonView}>
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
      </View>
    </Screen>
  );
};
export default CreateAccountBarber;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  fieldsMainView: {
    flex: 0.8,
    padding: 15,
    backgroundColor: appColors.Black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 25,
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    bottom: 50,
    width: screenSize.width / 1.1,
    backgroundColor: appColors.AppBlue,
  },
  item: {
    padding: 5,
    color: appColors.White,
  },
  selectedItem: {
    padding: 5,
    backgroundColor: '#DDDDDD',
  },
  selectedContainer: {
    marginTop: 10,
  },
  buttonView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});
