import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
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
import {useDispatch, useSelector} from 'react-redux';

const MyLocationBottomSheet = ({selectedLocation, route}) => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('');
  const [colorChange, setColorChange] = useState(true);
  const [userDetails, setUserDetails] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [operationType, setOperationType] = useState('setup');
  // default is 'setup'
  // const route = useRoute();
  // Extract params
  const {item} = route?.params || {};

  useEffect(() => {
    getUserDetails();
    setIsButtonDisabled(!selectedLocation); // Update isButtonDisabled based on selectedLocation

    if (item?.id) {
      setOperationType('update');
    } else {
      setOperationType('setup');
    }
  }, [selectedLocation, item?.id]);

  const handleLocationAction = values => {
    if (operationType === 'setup') {
      locatioDetails(values);
    } else if (operationType === 'update') {
      console.log('location update', values);
      locationUpdate(values);
    }
  };

  const getUserDetails = async () => {
    const userDetail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetail);
  };

  const handleClickLocation = item => {
    console.log('handleClickLocation', item);

    setSelectedItem(item);
    setValues({
      locationName: item.locationName,
      nearstLandmark: item.nearstLandmark,
    });
    setOperationType('update');
  };

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

  const locationUpdate = values => {
    const payload = {
      ...values,
      locationId: item?.id,
      locationLatitude: selectedLocation[0][0]?.latitude,
      locationLongitude: selectedLocation[0][0]?.longitude,
      mobileNo: userDetails?.userPhone,
      customerId: userDetails?.userId,
      address: values.locationName,
      operations: 2, // assuming 2 means update operation
      createdBy: userDetails?.userId,
      userIP: '::1',
    };
    console.log('location update payload', payload);

    PostRequest(endPoint.AUTH_CUSTOMER_LOCATION_UPDATED, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        SimpleSnackBar(message?.Catch, appColors.Red);
      });
  };

  //   location details save function
  const locatioDetails = values => {
    const payload = {
      ...values,
      id: userDetails?.userId,
      locationLatitude: selectedLocation[0][0]?.latitude,
      locationLongitude: selectedLocation[0][0]?.longitude,
      mobileNo: userDetails?.userPhone,
      userId: userDetails?.userId,
      address: values.locationName,
      operations: 1,
      createdBy: userDetails?.userId,
      userIP: '::1',
    };
    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        console.log('response', payload);
        if (res?.data?.code == 200) {
          console.log('Responseeeeeeeeeeeeeeeee', payload);
          SimpleSnackBar(res?.data?.message);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        SimpleSnackBar(message?.Catch, appColors.Red);
      });
  };

  return (
    <View style={lbStyle.mainContainer}>
      {userDetails ? (
        <Formik
          initialValues={{
            locationName: item?.id
              ? item?.locationName
              : selectedItem.locationName,
            nearstLandmark: item?.id
              ? item?.nearstLandmark
              : selectedItem.nearstLandmark,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleLocationAction(values);
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
                  editable={!item?.id}
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
                  placeholder={'Nearest Landmark'}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('nearstLandmark')}
                  onBlur={handleBlur('nearstLandmark')}
                  value={values.nearstLandmark}
                  editable={!item?.id}
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
                {!isButtonDisabled && (
                  <ButtonComponent
                    title={
                      operationType === 'setup'
                        ? 'Add address details'
                        : 'Update address details'
                    }
                    onPress={handleSubmit}
                    disable={
                      !selectedLocation ||
                      !values.locationName ||
                      !values.nearstLandmark
                    }
                    style={{
                      opacity:
                        !selectedLocation ||
                        !values.locationName ||
                        !values.nearstLandmark
                          ? 0.5
                          : 1,
                    }}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color= {appColors.Goldcolor} />
        </View>
      )}
    </View>
  );
};

const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
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
