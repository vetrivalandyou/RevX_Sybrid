import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../ScreenSize';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import SimpleTextField from '../../molecules/TextFeilds/SimpleTextField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';
import ButtonComponent from '../CustomButtons/ButtonComponent';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import {SimpleSnackBar} from '../Snakbar/Snakbar';

const MyLocationBottomSheet = ({selectedLocation}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [colorChange, setColorChange] = useState(true);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    getUserDetails();
    setIsButtonDisabled(!selectedLocation);
  }, [selectedLocation]);

  const getUserDetails = async () => {
    const userDetail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetail);
  };

  const handleClickLocation = item => {
    console.log('handleClickLocation');
    setColorChange(!colorChange);
    setSelectedItem(item);
  };

  const data = [
    {
      LocationId: 1,
      locationName: 'Lakson Group of Companies',
    },
    {
      LocationId: 2,
      locationName: 'My Home',
    },
    {
      LocationId: 3,
      locationName: 'Ayesha Manzil',
    },
    {
      LocationId: 4,
      locationName: 'Karimabad',
    },
    {
      LocationId: 5,
      locationName: 'Machar Colony',
    },
    {
      LocationId: 6,
      locationName: 'Dehli Colony',
    },
  ];

  const handleLocation = () => {
    handleUseMyCurrentLoc();
    // refRBSheet.current.close();
  };

  const openLocationScreen = () => {
    navigation.navigate(constants.screen.MyLocation),
      refRBSheet.current.close();
  };

  const LocationList = ({item}) => {
    return (
      <View
        style={{
          height: screenSize.height / 15,
          width: 'auto',
          margin: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          key={item?.LocationId}
          onPress={() => {
            handleClickLocation(item);
          }}
          style={[
            lbStyle.clSelectLocation,
            {
              backgroundColor:
                selectedItem?.LocationId == item.LocationId
                  ? '#202020'
                  : appColors.Black,
            },
          ]}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                selectedItem?.LocationId == item.LocationId && {
                  backgroundColor: appColors.White,
                },
              ]}>
              {selectedItem?.LocationId == item.LocationId && (
                <View style={lbStyle.innerCircle}></View>
              )}
            </View>
          </View>
          <View style={[lbStyle.clTextView, {flex: 0.7}]}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              {item.locationName}
            </Text>
          </View>
          {selectedItem?.LocationId == item.LocationId && (
            <View style={[lbStyle.clTextView, {flex: 0.1}]}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'edit-location-alt'}
                size={20}
                color={appColors.White}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  //   Input adress fields validation fuction
  const validationSchema = Yup.object().shape({
    locationName: Yup.string().required('Please enter your location name'),
    nearstLandmark: Yup.string().required('Please enter your Nearest Mark'),
  });

  //   location details save function
  const locatioDetails = values => {
    const payload = {
      ...values,
      id: userDetails?.userId,
      locationLatitude: selectedLocation?.latitude,
      locationLongitude: selectedLocation?.longitude,
      mobileNo: userDetails?.userPhone,
      userId: userDetails?.userId,
      address: values.locationName,
      operations: 1,
      createdBy: userDetails?.userId,
      userIP: '::1',
    };

    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          //   navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages?.Catch, appColors.Red);
      });
  };

  return (
    <View style={lbStyle.mainContainer}>
      {userDetails ? (
        <Formik
          initialValues={{
            locationName: '',
            nearstLandmark: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            locatioDetails(values);
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
                  flex: 0.5,
                  borderRadius: 3,
                }}>
                <SimpleTextField
                  placeholder={'Location Name'}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('locationName')}
                  onBlur={handleBlur('locationName')}
                  value={values.locationName}
                />
                {touched.locationName && errors.locationName && (
                  <View style={{marginLeft: 10, margin: 1}}>
                    <Text style={{color: appColors.Red, fontSize: 12}}>
                      {errors.locationName}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 0.5,
                }}>
                <SimpleTextField
                  placeholder={'Nearst Landmark'}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('nearstLandmark')}
                  onBlur={handleBlur('nearstLandmark')}
                  value={values.nearstLandmark}
                />
                {touched.nearstLandmark && errors.nearstLandmark && (
                  <View style={{marginLeft: 10, margin: 1}}>
                    <Text style={{color: appColors.Red, fontSize: 12}}>
                      {errors.nearstLandmark}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{flex: 0.32}}>
                {/* <TouchableOpacity
                onPress={() => refRBSheet.current.close()}
                style={[
                  lbStyle.clContainer,
                  {justifyContent: 'center', alignItems: 'center'},
                  (disabled = {isButtonDisabled}),
                ]}>
                <View style={lbStyle.clButotnView}>
                  <Text style={[lbStyle.clTextStyle, {textAlign: 'center'}]}>
                    Add address details
                  </Text>
                </View>
              </TouchableOpacity> */}

                <ButtonComponent
                  title={'Add address details'}
                  onPress={handleSubmit}
                  disable={!selectedLocation}
                  style={{opacity: selectedLocation ? 1 : 0.5}}
                  //   disabled={isButtonDisabled}
                  //   isLoading={isSubmitting}
                />
              </View>
            </>
          )}
        </Formik>
      ) : (
        <ActivityIndicator size="large" color="#C79646" />
      )}
    </View>
  );
};

const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    // backgroundColor: appColors.AppBlue,
  },

  clTextStyle: {fontSize: 13, fontWeight: '500', color: appColors.White},
  clSelectLocation: {
    borderRadius: 20,
    flexDirection: 'row',
  },

  OuterCircle: {
    height: 25,
    width: 25,
    borderRadius: 40,
    borderColor: appColors.Goldcolor,
    borderWidth: 2,
    backgroundColor: appColors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 40,
    backgroundColor: appColors.Goldcolor,
    position: 'absolute',
  },

  clButotnView: {
    backgroundColor: appColors.Goldcolor,
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default MyLocationBottomSheet;
