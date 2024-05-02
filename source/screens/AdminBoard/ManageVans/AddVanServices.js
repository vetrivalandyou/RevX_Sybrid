import {Image, Text, TouchableOpacity, View, Platform} from 'react-native';
import React, {useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../../AppConstants/appColors';
import {PostRequest} from '../../../services/apiCall';
import {AppImages} from '../../../AppConstants/AppImages';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import ChooseImage from '../../../components/molecules/ChooseImage';
import {generateRandomNumber} from '../../../functions/AppFunctions';

const AddVanservices = ({navigation, route}) => {
  const {userDetails} = route?.params || {};
  const refRBSheet = useRef();
  const [profileImage, setProfileImage] = useState(null);

  const validationSchema = Yup.object().shape({
    VanName: Yup.string().required(' Van name is required'),
    VanRegistrationNo: Yup.string().required('Van Registration no is required'),
    VanModel: Yup.string().required('Van Model is required'),
  });

  const VanInfo = (values, setSubmitting) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });
    formData.append('VanId', 0);
    formData.append('Operations', 1);
    formData.append('CreatedBy', userDetails?.userId);
    formData.append('UserIP', '::1');
    formData.append('VanPhotos', {
      uri: profileImage?.path,
      name: `${generateRandomNumber()}.jpg`,
      type: profileImage?.mime,
    });
    console.log('formData', formData);
    PostRequest(endPoint.VAN_CU, formData)
      .then(res => {
        console.log('response', res?.data);
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
      });
  };

  const handleImageCaptured = image => {
    setProfileImage(image);
    refRBSheet.current.close();
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
          headerText={'Add Vans'}
          logIn={'success'}
        />
      </View>
      <Formik
        initialValues={{
          VanName: '',
          VanRegistrationNo: '',
          VanModel: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          if (!profileImage) {
            SimpleSnackBar('Please select an image');
            setSubmitting(false);
            return;
          }
          VanInfo(values, setSubmitting);
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
            <View style={{flex: 0.8}}>
              <View style={styles.ProfileMainView}>
                <View style={styles.ProfileouterView}>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current.open()}
                    style={styles.profileView}>
                    {profileImage?.path ? (
                      <Image
                        source={{uri: profileImage?.path}}
                        style={styles.imageStyle}
                      />
                    ) : (
                      <Image
                        source={AppImages.dummyVan}
                        style={styles.imageStyle}
                      />
                    )}

                    <CustomIcon
                      type={Icons.AntDesign}
                      size={20}
                      name={'pluscircle'}
                      color={'white'}
                      style={styles.Iconstyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 0.65}}>
                <View style={styles.textFieldView}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      marginHorizontal: 10,
                      paddingBottom: 5,
                    }}>
                    {'Van Name :'}
                  </Text>
                  <SimpleTextField
                    placeholder={'Enter Van Name'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanName')}
                    onBlur={handleBlur('VanName')}
                    value={values.VanName}
                  />

                  <View>
                    {touched.VanName && errors.VanName && (
                      <View style={styles.validationTextview}>
                        <Text style={styles.validationTextStyle}>
                          {errors.VanName}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.textFieldView}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      marginHorizontal: 10,
                      paddingBottom: 10,
                    }}>
                    {'Registration Number :'}
                  </Text>
                  <SimpleTextField
                    placeholder={'Enter Van Registration No'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanRegistrationNo')}
                    onBlur={handleBlur('VanRegistrationNo')}
                    value={values.VanRegistrationNo}
                  />

                  <View>
                    {touched.VanRegistrationNo && errors.VanRegistrationNo && (
                      <View style={styles.validationTextview}>
                        <Text style={styles.validationTextStyle}>
                          {errors.VanRegistrationNo}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.textFieldView}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      marginHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    {'Van Model :'}
                  </Text>
                  <SimpleTextField
                    placeholder={'Enter Van Model'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanModel')}
                    onBlur={handleBlur('VanModel')}
                    value={values.VanModel}
                  />

                  {touched.VanModel && errors.VanModel && (
                    <View style={styles.validationTextview}>
                      <Text style={styles.validationTextStyle}>
                        {errors.VanModel}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.buttonView}>
              <ButtonComponent
                style={styles.buttonStyle}
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

      <BottomSheet ref={refRBSheet} Height={120}>
        <ChooseImage
          refRBSheet={refRBSheet}
          setProfileImage={handleImageCaptured}
        />
      </BottomSheet>
    </Screen>
  );
};

export default AddVanservices;
