import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Screen from '../../components/atom/ScreenContainer/Screen';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import { AppImages } from '../../AppConstants/AppImages';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../AppConstants/appColors';
import { screenSize } from '../../components/atom/ScreenSize';
import { endPoint, imageUrl, messages } from '../../AppConstants/urlConstants';
import { PostRequest } from '../../services/apiCall';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAsyncItem, setAsyncItem } from '../../utils/SettingAsyncStorage';
import constants from '../../AppConstants/Constants.json';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import { SimpleSnackBar } from '../../components/atom/Snakbar/Snakbar';
import ChooseImage from '../../components/molecules/ChooseImage';
import { generateRandomNumber } from '../../functions/AppFunctions';
import { SUCCESS_CODE } from '../../AppConstants/appConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfile = ({ navigation }) => {
  const refRBSheet = useRef();
  const [isEye, setIsEye] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [profileImage, setProfileImage] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const checkDetails = async values => {
    let userUpdatedDetails = {
      _RoleId: values?._RoleId,
      employeeId: 0,
      loginEmailId: values?.loginEmailId,
      userId: values?.userId,
      userName: values?.userName,
      userPhone: values?.userPhone,
      profileImage: values?.profileImage,
      userTypeId: values?.userTypeId,
    };
    await setAsyncItem(
      constants.AsyncStorageKeys.userDetails,
      userUpdatedDetails,
    );
    getUserDetails();
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userDetail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetail);
    setProfileImage(userDetail?.profileImage);
    console.log('userDetail', userDetail);
  };

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required('Name is required'),
    UserEmail: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    PhoneNo: Yup.string()
      .required('Phone number is required')
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        'Invalid phone number format. Use (555) 555-7439',
      ),
  });

  const editProfileUser = (values, setSubmitting) => {
    const formData = new FormData();
    formData.append('UserId', userDetails.userId);
    formData.append('UserName', values.UserName);
    formData.append('UserEmail', values.UserEmail);
    formData.append('UserPhone', values.PhoneNo);
    formData.append('Operation', 2);
    if (isUpdated == true) {
      formData.append('UserProfile', {
        uri: profileImage?.path,
        name: `${generateRandomNumber()}.jpg`,
        type: profileImage?.mime,
      });
    } else {
      formData.append('UserProfilePath', profileImage);
    }

    console.log('data', formData);
    console.log('isYpdate', isUpdated);
    console.log('ProfilePath', profileImage);
    console.log('Profiletype', profileImage?.mime);
    console.log('ProfileURI', profileImage?.path);
    console.log('generateRandomNumber()', generateRandomNumber());

    PostRequest(endPoint.EDIT_PROFILE_USER, formData)
      .then(res => {
        console.log('RESPONSEDATA', res?.data);
        if (res?.data?.[0]?.HasError == 0) {
          setIsUpdated(false);
          checkDetails(res?.data?.[0]);
          SimpleSnackBar(res?.data?.[0]?.Message);
        } else {
          SimpleSnackBar(res?.data?.[0]?.Message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
      });
  };

  const handleImagepress = image => {
    setProfileImage(image);
    setIsUpdated(true);
    refRBSheet.current.close();
  };

  return (
    <Screen
      viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Profile'}
          logIn={'success'}
        />
      </View>

      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', }}>
        <View style={{ flex: 1 }}>
          {userDetails ? (
            <Formik
              initialValues={{
                UserName: userDetails?.userName,
                UserEmail: userDetails?.loginEmailId,
                PhoneNo: userDetails?.userPhone,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log('values', values);
                editProfileUser(values, setSubmitting);
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
                  <View style={{ flex: 0.3 }}>
                    <View
                      style={{
                        flex: 0.7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}
                        style={{
                          width: 100,
                          height: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {isUpdated == false ? (
                          <Image
                            source={{ uri: `${imageUrl}${profileImage}` }}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 80,
                              borderWidth: 3,
                              borderColor: appColors.Goldcolor,
                            }}
                          />
                        ) : (
                          <Image
                            source={{ uri: profileImage?.path }}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 80,
                              borderWidth: 3,
                              borderColor: appColors.Goldcolor,
                            }}
                          />
                        )}
                        <CustomIcon
                          type={Icons.AntDesign}
                          size={20}
                          name={'pluscircle'}
                          color={appColors.Goldcolor}
                          style={{
                            position: 'absolute',
                            left: Platform?.OS == 'android' ? screenSize.width / 5 : screenSize.width / 6,
                            top: Platform?.OS == 'android' ? screenSize.height / 10 : screenSize.height / 12,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 0.1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: appColors.White,
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {userDetails?.userName}
                      </Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Text style={{ color: appColors.White, fontSize: 15 }}>
                        {userDetails?.loginEmailId}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flex: 0.15 }}>
                    <View
                      style={{
                        flex: 0.3,
                        // backgroundColor: 'pink',
                        marginLeft: 12,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: appColors.White,
                        }}>
                        Name
                      </Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                      <SimpleTextField
                        textUpperView={{ borderRadius: 20 }}
                        placeholder={'Enter Name'}
                        placeholderTextColor={appColors.LightGray}
                        onChangeText={handleChange('UserName')}
                        onBlur={handleBlur('UserName')}
                        value={values.UserName}
                      />
                      {touched.UserName && errors.UserName && (
                        <View
                          style={{
                            marginLeft: 10,
                            marginTop: 2,
                            marginBottom: 15,
                          }}>
                          <Text
                            style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                            {errors.UserName}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={{ flex: 0.15 }}>
                    <View
                      style={{
                        flex: 0.3,
                        // backgroundColor: 'pink',
                        marginLeft: 12,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: appColors.White,
                        }}>
                        Email
                      </Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                      <SimpleTextField
                        textUpperView={{ borderRadius: 20 }}
                        placeholder={'Enter Email'}
                        placeholderTextColor={appColors.LightGray}
                        onChangeText={handleChange('UserEmail')}
                        onBlur={handleBlur('UserEmail')}
                        value={values.UserEmail}
                      />
                      {touched.UserEmail && errors.UserEmail && (
                        <View
                          style={{
                            marginLeft: 10,
                            marginTop: 2,
                            marginBottom: 15,
                          }}>
                          <Text
                            style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                            {errors.UserEmail}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={{ flex: 0.15 }}>
                    <View
                      style={{
                        flex: 0.3,
                        marginLeft: 12,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: appColors.White,
                        }}>
                        Phone Number
                      </Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                      <SimpleTextField
                        textUpperView={{ borderRadius: 20 }}
                        placeholder={'Enter Phone no'}
                        placeholderTextColor={appColors.LightGray}
                        onChangeText={handleChange('PhoneNo')}
                        onBlur={handleBlur('PhoneNo')}
                        value={values.PhoneNo}
                      />
                      {touched.PhoneNo && errors.PhoneNo && (
                        <View style={{ marginLeft: 10, margin: 5 }}>
                          <Text
                            style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                            {errors.PhoneNo}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={{ flex: 0.26, justifyContent: 'flex-end' }}>
                    <View style={styles.buttonView}>
                      <ButtonComponent
                        style={{
                          backgroundColor: '#C79646',
                          paddingVertical: Platform.OS == 'ios' ? 17 : 13,
                          bottom: 1,
                          position: 'absolute',
                        }}
                        btnTextColor={{ color: 'white' }}
                        title={'Save'}
                        disabled={isSubmitting}
                        onPress={handleSubmit}
                        isLoading={isSubmitting}
                      />
                    </View>
                  </View>
                </>
              )}
            </Formik>
          ) : (
            <ActivityIndicator size="small" color="#C79646" />
          )}
        </View>
      </KeyboardAwareScrollView>
      <BottomSheet ref={refRBSheet} Height={120}>
        <ChooseImage
          setProfileImage={handleImagepress}
          refRBSheet={refRBSheet}
        />
      </BottomSheet>
    </Screen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  buttonView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
