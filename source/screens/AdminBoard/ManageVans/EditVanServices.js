import {Text, TouchableOpacity, View, Platform, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import {endPoint, imageUrl, messages} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {generateRandomNumber} from '../../../functions/AppFunctions';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import ChooseImage from '../../../components/molecules/ChooseImage';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';

const EditVanservices = ({route, navigation}) => {
  const {vanDetails, userDetails} = route.params || {};
  const refRBSheet = useRef();
  const [profileImage, setProfileImage] = useState(`${vanDetails?.vanPhotos}`);
  const [changedImage, setChangedImage] = useState('');

  console.log('--------------------', vanDetails);

  const handleImageCaptured = image => {
    setChangedImage(image);
    refRBSheet.current.close();
  };

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
    formData.append('VanId', vanDetails?.vanId);
    formData.append('Operations', 2);
    formData.append('CreatedBy', userDetails?.userId);
    formData.append('UserIP', '::1');
    if (changedImage == '') {
      console.log('img: ', profileImage);
      formData.append('VanPhotos', profileImage);
    } else {
      formData.append('VanPhoto', {
        uri: changedImage?.path,
        name: `${generateRandomNumber()}.jpg`,
        type: changedImage?.mime,
      });
    }

    console.log('formData sdsfsdf', formData);

    PostRequest(endPoint.VAN_CU, formData)
      .then(res => {
        if (res?.data?.code === 200) {
          console.log('Success');
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.data?.message);
          console.log('Error', res?.data.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        console.log('Error', err);
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
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Van'}
          logIn={'success'}
        />
      </View>
      <Formik
        initialValues={{
          VanName: vanDetails.vanName,
          VanRegistrationNo: vanDetails.vanRegistrationNo,
          VanModel: vanDetails.vanModel,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
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
                    {console.log('changedImage:', changedImage)}
                    {console.log('profileImage:', profileImage)}
                    {changedImage != '' ? (
                      <Image
                        source={{uri: changedImage?.path}}
                        style={styles.imageStyle}
                      />
                    ) : (
                      <Image
                        source={{uri: `${imageUrl}${profileImage}`}}
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

              <View style={{flex: 0.66}}>
                <View style={styles.textFieldView}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      marginHorizontal: 10,
                      paddingBottom: 1,
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
                title={'Save Vans'}
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

export default EditVanservices;
