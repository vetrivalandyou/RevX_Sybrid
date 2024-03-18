import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Screen from '../../components/atom/ScreenContainer/Screen';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../AppConstants/AppImages';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../AppConstants/appColors';
import {screenSize} from '../../components/atom/ScreenSize';
import {endPoint, messages} from '../../AppConstants/urlConstants';
import {PostRequest} from '../../services/apiCall';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getAsyncItem, setAsyncItem} from '../../utils/SettingAsyncStorage';
import constants from '../../AppConstants/Constants.json';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import ChooseImage from '../../components/molecules/ChooseImage';
import {generateRandomNumber} from '../../functions/AppFunctions';

const EditProfile = ({navigation}) => {
  const refRBSheet = useRef();
  const [isEye, setIsEye] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [profileImage, setProfileImage] = useState(null);

  const checkDetails = async values => {
    let userUpdatedDetails = {
      _RoleId: userDetails?._RoleId,
      employeeId: 0,
      loginEmailId: values?.loginEmailId,
      userId: userDetails?.userId,
      userName: values?.userName,
      userPhone: values?.userPhone,
      profileImage: values?.profileImage,
      userTypeId: userDetails?.userTypeId,
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
    formData.append('PhoneNo', values.PhoneNo);
    formData.append('Operation', 2);
    formData.append('profileImage', {
      uri: profileImage?.path,
      name: `${generateRandomNumber()}.${profileImage?.mime}`,
      type: profileImage?.mime,
    });

    console.log('data', formData);
    PostRequest(endPoint.EDIT_PROFILE_USER, formData)
      .then(res => {
        console.log('RESPONSEDATA', res?.data);
        if (res?.data?.code == 200) {
          console.log(res?.data);
          SimpleSnackBar(res?.data?.message);
          checkDetails(values);
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


  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Profile'}
          logIn={'success'}
        />
      </View>

      <View style={{flex: 0.8}}>
        {userDetails ? (
          <Formik
            initialValues={{
              UserName: userDetails?.userName,
              UserEmail: userDetails?.loginEmailId,
              PhoneNo: userDetails?.userPhone,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
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
                <View style={{flex: 0.34}}>
                  <View
                    style={{
                      flex: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Image
                      source={AppImages.ProfileSlider}
                      style={{
                        width: '22%',
                        height: '82%',
                        borderRadius: 80,
                        borderWidth: 3,
                        borderColor: appColors.Goldcolor,
                      }}
                    />
                    <CustomIcon
                      type={Icons.AntDesign}
                      size={20}
                      name={'pluscircle'}
                      color={'white'}
                      style={{
                        position: 'absolute',
                        top: screenSize.height / 11.1,
                        left: screenSize.width / 1.96,
                      }}
                    /> */}
                    <TouchableOpacity
                      onPress={() => refRBSheet.current.open()}
                      style={{
                        width: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90%',
                      }}>
                      {profileImage ? (
                        <Image
                          source={{uri: profileImage?.path}}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 80,
                            borderWidth: 3,
                            borderColor: appColors.Goldcolor,
                          }}
                        />
                      ) : (
                        <Image
                          source={AppImages.ProfileSlider}
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
                        color={'white'}
                        style={{
                          position: 'absolute',
                          left: screenSize.width / 5.5,
                          top: screenSize.height / 11.5,
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
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {userDetails?.userName}
                    </Text>
                  </View>
                  <View style={{flex: 0.4, alignItems: 'center'}}>
                    <Text style={{color: appColors.White}}>
                      {userDetails?.loginEmailId}
                    </Text>
                  </View>
                </View>

                <View style={{flex: 0.11}}>
                  <SimpleTextField
                    placeholder={'Enter Name'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('UserName')}
                    onBlur={handleBlur('UserName')}
                    value={values.UserName}
                  />
                  {touched.UserName && errors.UserName && (
                    <View
                      style={{marginLeft: 10, marginTop: 2, marginBottom: 15}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.UserName}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{flex: 0.11, marginTop: 6}}>
                  <SimpleTextField
                    placeholder={'Enter Email'}
                    placeholderTextColor={appColors.LightGray}
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

                <View style={{flex: 0.11, marginTop: 6}}>
                  <SimpleTextField
                    placeholder={'Enter Phone no'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('PhoneNo')}
                    onBlur={handleBlur('PhoneNo')}
                    value={values.PhoneNo}
                  />
                  {touched.PhoneNo && errors.PhoneNo && (
                    <View style={{marginLeft: 10, margin: 5}}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.PhoneNo}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.buttonView}>
                  <ButtonComponent
                    style={{
                      backgroundColor: '#C79646',
                      paddingVertical: Platform.OS == 'ios' ? 17 : 13,
                      bottom: 1,
                      position: 'absolute',
                    }}
                    btnTextColor={{color: 'white'}}
                    title={'Save'}
                    disabled={isSubmitting}
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                  />
                </View>
              </>
            )}
          </Formik>
        ) : (
          <ActivityIndicator size="large" color="#C79646" />
        )}
      </View>
      <BottomSheet ref={refRBSheet} Height={120}>
        <ChooseImage
          setProfileImage={setProfileImage}
          refRBSheet={refRBSheet}
        />
      </BottomSheet>
    </Screen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
