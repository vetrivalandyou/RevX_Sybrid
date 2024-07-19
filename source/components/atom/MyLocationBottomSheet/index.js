import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
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
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import ButtonComponent from '../CustomButtons/ButtonComponent';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import {SimpleSnackBar} from '../Snakbar/Snakbar';
import {useDispatch, useSelector} from 'react-redux';
import {
  LATEST_INSERT,
  LATEST_UPDATE,
  SUCCESS_CODE,
} from '../../../AppConstants/appConstants';

const MyLocationBottomSheet = ({
  keyboardFocusRef,
  selectedLocation,
  newLocation,
  item,
  refRBSheet,
}) => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState('');
  const [locationAddress, setLocationAddress] = useState(item?.locationName);
  const [sselectedLocation, setSselectedLocation] = useState(null);

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
    locationName: Yup.string().required('Please enter your location name'),
  });

  const LocationUpdate = () => {
    const payload = {
      locationId: item?.id,
      locationName: locationAddress,
      nearstLandmark: locationAddress,
      locationLatitude: selectedLocation?.coords?.latitude,
      locationLongitude: selectedLocation?.coords?.longitude,
      mobileNo: userDetails?.userPhone,
      customerId: userDetails?.userId,
      address: locationAddress,
      operations: LATEST_UPDATE, // assuming 2 means update operation
      createdBy: userDetails?.userId,
      userIP: '::1',
    };
    console.log('payload>>>>', payload);
    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        if (res?.data?.code == SUCCESS_CODE) {
          SimpleSnackBar(res?.data?.message);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages?.Catch, appColors.Red);
      });
  };

  const AddNewLocation = () => {
    const payload = {
      id: 0,
      locationName: locationAddress,
      nearstLandmark: locationAddress,
      locationLatitude: selectedLocation?.coords?.latitude,
      locationLongitude: selectedLocation?.coords?.longitude,
      mobileNo: userDetails?.userPhone,
      userId: userDetails?.userId,
      address: locationAddress,
      operations: LATEST_INSERT,
      createdBy: userDetails?.userId,
      userIP: '::1',
    };
    console.log('payloadpayloadpayload?????', payload);
    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        if (res?.data?.code == SUCCESS_CODE) {
          SimpleSnackBar(res?.data?.message);
          navigation.navigate(constants?.screen?.HomeScreen);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(messages?.Catch, appColors.Red);
      });
  };

  const handlePlaceSelect = (data, details) => {
    console.log('inside handlePlaceSelect', data);
    console.log('inside handlePlaceSelect details', details);
    setSselectedLocation({data, details});
    setLocationAddress(data.description); // Set the text input value manually
  };

  return (
    <View style={lbStyle.mainContainer}>
      {userDetails ? (
        // <Formik
        //   initialValues={{
        //     LocationAddress: newLocation != undefined ? '' : item?.locationName,
        //     // locationName: newLocation != true ? item?.locationName : '',
        //     // nearstLandmark: newLocation != true ? item?.nearstLandmark : '',
        //   }}
        //   validationSchema={validationSchema}
        //   onSubmit={values => {
        //     if (newLocation == true) {
        //       AddNewLocation(values);
        //     } else {
        //       LocationUpdate(values);
        //     }
        //   }}>
        //   {({
        //     handleChange,
        //     handleBlur,
        //     handleSubmit,
        //     values,
        //     errors,
        //     touched,
        //     isSubmitting,
        //   }) => (
        //     <>
        //       {/* <View
        //         style={{
        //           flex: 0.5,
        //           borderRadius: 3,
        //         }}>
        //         <SimpleTextField
        //           placeholder={'Location Name'}
        //           placeholderTextColor={appColors.LightGray}
        //           onChangeText={handleChange('locationName')}
        //           onBlur={handleBlur('locationName')}
        //           value={values.locationName}
        //         />
        //         {touched.locationName && errors.locationName && (
        //           <View style={{marginLeft: 10, margin: 1}}>
        //             <Text style={{color: appColors.Red, fontSize: 12}}>
        //               {errors.locationName}
        //             </Text>
        //           </View>
        //         )}
        //       </View>
        //       <View
        //         style={{
        //           flex: 0.5,
        //         }}>
        //         <SimpleTextField
        //           placeholder={'Nearest Landmark'}
        //           placeholderTextColor={appColors.LightGray}
        //           onChangeText={handleChange('nearstLandmark')}
        //           onBlur={handleBlur('nearstLandmark')}
        //           value={values.nearstLandmark}
        //         />
        //         {touched.nearstLandmark && errors.nearstLandmark && (
        //           <View style={{marginLeft: 10, margin: 1}}>
        //             <Text style={{color: appColors.Red, fontSize: 12}}>
        //               {errors.nearstLandmark}
        //             </Text>
        //           </View>
        //         )}
        //       </View> */}

        //       <View style={{ flex: 0.6, }}>
        //         <GooglePlacesAutocomplete
        //           returnKeyType={'default'}
        //           textInputProps={{
        //             value: values?.LocationAddress,
        //             placeholderTextColor: '#808080',
        //             returnKeyType: "search",
        //             onChangeText: handleChange('LocationAddress')
        //           }}
        //           ref={keyboardFocusRef}
        //           placeholder='Search'
        //           onPress={(data, details = null) => {
        //             console.log("dataaaa", data?.description);
        //             handleChange('LocationAddress');
        //             setLocationAddress(data?.description);
        //           }}
        //           query={{
        //             key: 'AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0',
        //             language: 'en',
        //           }}
        //           enablePoweredByContainer={false}
        //         />
        //         {/* <TextInput
        //           value={LocationAddress}
        //           onChangeText={handleChangeText}
        //           placeholder="Edit your location"
        //           placeholderTextColor="#808080"
        //           style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10, color: appColors.White }}
        //         /> */}
        //       </View>

        //       <View style={{ flex: 0.6 }}>
        //         <ButtonComponent
        //           title={
        //             newLocation == true ? 'Add Lcoation' : 'Update Location'
        //           }
        //           onPress={handleSubmit}
        //           disable={
        //             !selectedLocation ||
        //             !values.locationName
        //           }
        //           style={{
        //             opacity:
        //               !selectedLocation ||
        //                 !values.locationName
        //                 ? 0.5
        //                 : 1,
        //           }}
        //         />
        //       </View>
        //     </>
        //   )}
        // </Formik>
        <>
          <View style={{flex: 0.6}}>
            <GooglePlacesAutocomplete
              ref={keyboardFocusRef}
              placeholder="Search"
              onPress={(data, details) => handlePlaceSelect(data, details)}
              query={{
                key: 'AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0',
                language: 'en',
              }}
              value={locationAddress}
              textInputProps={{
                value: locationAddress,
                // onChangeText: (text) => { setLocationAddress(text)},
                returnKeyType: 'search',
                placeholderTextColor: '#808080',
              }}
            />
            {/* <GooglePlacesAutocomplete
            returnKeyType={'default'}
            textInputProps={{
              value: values?.LocationAddress,
              placeholderTextColor: '#808080',
              returnKeyType: "search",
              // onChangeText: handleChange('LocationAddress')
            }}
            ref={keyboardFocusRef}
            placeholder='Search'
            onPress={(data, details = null) => {
              console.log("dataaaa", data?.description);
              // handleChange('LocationAddress');
              setLocationAddress(data?.description);
            }}
            query={{
              key: 'AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0',
              language: 'en',
            }}
            enablePoweredByContainer={false}
          /> */}
          </View>
          <View style={{flex: 0.6}}>
            <ButtonComponent
              title={newLocation == true ? 'Add Location' : 'Update Location'}
              onPress={newLocation == true ? AddNewLocation : LocationUpdate}
              // disable={
              //   !selectedLocation ||
              //   !values.locationName
              // }
              // style={{
              //   opacity:
              //     !selectedLocation ||
              //       !values.locationName
              //       ? 0.5
              //       : 1,
              // }}
            />
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
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
