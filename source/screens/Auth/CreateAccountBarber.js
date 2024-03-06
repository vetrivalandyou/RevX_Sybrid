import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import { endPoint, messages } from '../../AppConstants/urlConstants';
import { PostRequest } from '../../services/apiCall';
import { SimpleSnackBar } from '../../components/atom/Snakbar/Snakbar';
import Dropdown from '../../components/molecules/Dropdown/Dropdown';
import { screenSize } from '../../components/atom/ScreenSize';
import CustomDropdownPicker from '../../components/molecules/Dropdown/Dropdown';

const CreateAccountBarber = ({ navigation }) => {
  const [isEye, setIsEye] = useState(false);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  const [selectedValues, setSelectedValues] = useState([]); // State for storing selected values

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [services, setServices] = useState([]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemPress = item => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

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
    Description: Yup.string().required('Description is required'),
    Barber_Specialties: Yup.string().required(
      'Barber Specialties are required',
    ),
  });

  const barberRegisterUser = (values, setSubmitting) => {
    console.log('Values==>>..', values);

    const payload = {
      ...values,
      Barber_Specialties: [values.Barber_Specialties],
    };

    console.log('payload', payload);

    PostRequest(endPoint.REGISTERAS_BARBER, payload)
      .then(res => {
        console.log('RESPONSEDATA', res?.data);
        if (res?.data?.code == 200) {
          console.log(res?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
      });
  };

  const DropdownData = (values, setSubmitting) => {
    console.log('test', values);

    const payload = {
      MasterId: 2,
    };

    console.log('payload', payload);

    PostRequest(endPoint.DROPDOWN_DATA, payload)
      .then(res => {
        console.log('RESPONSEDATA', res?.data);
        if (res?.data?.code == 200) {
          setSelectedItems(res?.data?.data);
          console.log('test>>>>', res?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
      });
  };

  console.log("services", services)

  useEffect(() => {
    DropdownData();
  }, []);
  console.log(selectedItems);
  return (
    <Screen
      authStyle={{ flex: 1, backgroundColor: appColors.Goldcolor }}
      viewStyle={{ flex: 1, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Goldcolor}
      translucent={false}
      barStyle="light-content">
      <View style={{ flex: 0.2 }}>
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
            Description: '',
            Barber_Specialties: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            barberRegisterUser(values, setSubmitting);
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
              <View style={{ flex: 0.8, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 0.15, justifyContent: 'center' }}>
                  <SimpleTextField
                    placeholder={'Enter Full Name'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('FullName')}
                    onBlur={handleBlur('FullName')}
                    value={values.FullName}
                  />
                  {touched.FullName && errors.FullName && (
                    <View
                      style={{ marginLeft: 10, marginTop: 2, marginBottom: 15 }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.FullName}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ flex: 0.15, justifyContent: 'center' }}>
                  <SimpleTextField
                    placeholder={'Enter Email Address'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('UserEmail')}
                    onBlur={handleBlur('UserEmail')}
                    value={values.UserEmail}
                  />
                  {touched.UserEmail && errors.UserEmail && (
                    <View
                      style={{ marginLeft: 10, marginTop: 2, marginBottom: 15 }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.UserEmail}
                      </Text>
                    </View>
                  )}
                </View>

                <View
                  style={{
                    flex: 0.15,
                    justifyContent: 'center',
                    // borderStartColor: 'red',
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
                      style={{ marginLeft: 10, marginTop: 2, marginBottom: 15 }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.UserPassword}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ flex: 0.15, justifyContent: 'center' }}>
                  <SimpleTextField
                    placeholder={'Contact Number'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('UserPhone')}
                    onBlur={handleBlur('UserPhone')}
                    value={values.UserPhone}
                  />
                  {touched.UserPhone && errors.UserPhone && (
                    <View style={{ marginLeft: 10, margin: 5 }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.UserPhone}
                      </Text>
                    </View>
                  )}
                </View>

                {/* <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <SimpleTextField
                    placeholder={'Add Bio'}
                    placeholderTextColor={appColors.AppLightGray}
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

                <View style={{ flex: 0.15, justifyContent: 'center' }}>
                  <SimpleTextField
                    placeholder={'Add Description'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('Description')}
                    onBlur={handleBlur('Description')}
                    value={values.Description}
                  />
                  {touched.Description && errors.Description && (
                    <View style={{ marginLeft: 10, margin: 5 }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.Description}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ flex: 0.15 }}>
                  <CustomDropdownPicker
                    items={selectedItems}
                    values={services}
                    setValues={setServices}
                  />


                </View>
              </View>

              {/* <View style={{ flex: 0.1, justifyContent: 'center' }}>
                <RememberMe
                  RememberTex={'Remember me'}
                  ForgetPasswordText={'Terms & Conditions'}
                />
              </View> */}

              <View style={{ flex: 0.1 }}>
                <ButtonComponent
                  title={'Create Account'}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />
              </View>
            </>
          )}
        </Formik>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity>
            <Text style={{ color: appColors.GrayColor }}>
              Already have an Account ?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(constants.AuthScreen.Login)}>
            <Text style={{ color: appColors.Goldcolor }}> Login</Text>
          </TouchableOpacity>
        </View>

        {/* <SocailLogin
          SocailLogin={'or Login Using'}
          iconName={'facebook'}
          iconType={Icons.FontAwesome}
          color={appColors.White}
        /> */}
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
});