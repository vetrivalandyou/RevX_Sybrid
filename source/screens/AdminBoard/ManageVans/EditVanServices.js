
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import { endPoint } from '../../../AppConstants/urlConstants';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import { PostRequest } from '../../../services/apiCall';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import { AppImages } from '../../../AppConstants/AppImages';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import ChooseImage from '../../../components/molecules/ChooseImage';

const EditVanservices = ({ route, navigation }) => {
  const refRBSheet = useRef();
  const [profileImage, setProfileImage] = useState(null);

  const handleImageCaptured = image => {
   
    setProfileImage(image);
    // Update the profile image state with the captured image URI
    refRBSheet.current.close();
  };
  const {vanDetil} = route.params;

  const validationSchema = Yup.object().shape({
    VanName: Yup.string().required(' Van name is required'),
    VanRegistrationNo: Yup.string()
      .required('Van Registration no is required'),
    VanModel: Yup.string().required('Van Model is required'),
    VanRegistrationId: Yup.string().required('Van Registration Id'),
  });


  const VanInfo = (values, setSubmitting) => {
    const formData = new FormData();

    // Add key-value pairs from the payload to the FormData object
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('VanId', '5');
    formData.append('Operation', '2');
    formData.append('CreatedBy', '2');

    console.log('formData', formData);


    PostRequest(endPoint.Edit_VANS, formData)
      .then(res => {
        console.log('response', res.data);
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
      viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Services'}
          logIn={'success'}
        />
      </View>

      <Formik
        initialValues={{
          VanName: vanDetil.vanName,
          VanRegistrationNo: vanDetil.vanRegistrationNo,
          VanRegistrationId: vanDetil.vanRegistrationId,
          VanModel: vanDetil.vanModel,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
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
            <View style={{ flex: 0.8, }}>
              <View style={styles.ProfileMainView}>
                <View style={styles.ProfileouterView}>
                  <TouchableOpacity onPress={()=> refRBSheet.current.open()} style={styles.profileView} >
                    {profileImage ? (
                      <Image
                        source={{ uri: profileImage }}
                        style={styles.imageStyle}
                      />
                    ) : (
                      <Image
                        source={AppImages.ProfileSlider}
                        style={styles.imageStyle}
                      />
                    )}
                    <CustomIcon type={Icons.AntDesign} size={20} name={'pluscircle'} color={'white'} style={styles.Iconstyle} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flex: 0.65, }}>
                <View style={{ flex: 0.19, justifyContent: 'space-evenly', }}>
                  <SimpleTextField
                    placeholder={'Enter Van Name'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanName')}
                    onBlur={handleBlur('VanName')}
                    value={values.VanName}
                  />

                  <View>
                    {touched.VanName && errors.VanName && (
                      <View style={{ marginLeft: 12, }}>
                        <Text
                          style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                          {errors.VanName}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={{ flex: 0.19, justifyContent: 'space-evenly', }}>
                  <SimpleTextField
                    placeholder={'Enter Van Registration No'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanRegistrationNo')}
                    onBlur={handleBlur('VanRegistrationNo')}
                    value={values.VanRegistrationNo}
                  />

                  <View>
                    {touched.VanRegistrationNo &&
                      errors.VanRegistrationNo && (
                        <View style={{ marginLeft: 12, }}>
                          <Text
                            style={{
                              color: appColors.Goldcolor,
                              fontSize: 12,
                            }}>
                            {errors.VanRegistrationNo}
                          </Text>
                        </View>
                      )}
                  </View>
                </View>

                <View style={{ flex: 0.19, justifyContent: 'space-evenly', }}>
                  <SimpleTextField
                    placeholder={'Enter Van Registration Id'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanRegistrationId')}
                    onBlur={handleBlur('VanRegistrationId')}
                    value={values.VanRegistrationId}
                  />

                  <View style={{ justifyContent: 'center', }}>
                    {touched.VanRegistrationId &&
                      errors.VanRegistrationId && (
                        <View style={{ marginLeft: 12, }}>
                          <Text
                            style={{
                              color: appColors.Goldcolor,
                              fontSize: 12,
                            }}>
                            {errors.VanRegistrationId}
                          </Text>
                        </View>
                      )}
                  </View>
                </View>
                <View style={{ flex: 0.19, justifyContent: 'space-evenly', }}>
                  <SimpleTextField
                    placeholder={'Enter Van Model'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanModel')}
                    onBlur={handleBlur('VanModel')}
                    value={values.VanModel}
                  />


                  {touched.VanModel && errors.VanModel && (
                    <View
                      style={{
                        marginLeft: 12,

                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanModel}
                      </Text>
                    </View>
                  )}

                </View>

              </View>
            </View>

            <View style={styles.buttonView}>
              <ButtonComponent
                style={{
                  backgroundColor: '#C79646',
                  paddingVertical: Platform.OS == 'ios' ? 17 : 13,
                  bottom: 1,
                  position: 'absolute',
                }}
                btnTextColor={{ color: 'white' }}
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
      <ChooseImage refRBSheet={refRBSheet} setProfileImage={handleImageCaptured} />
      </BottomSheet>
    </Screen>
  );
};

export default EditVanservices;