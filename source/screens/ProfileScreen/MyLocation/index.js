import React, {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import GoogleMap from '../../../components/atom/GoogleMap';
import MyLocationBottomSheet from '../../../components/atom/MyLocationBottomSheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {screenSize} from '../../../components/atom/ScreenSize';
import {useNavigation, useRoute} from '@react-navigation/native';
// import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {endPoint} from '../../../AppConstants/urlConstants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {
  LATEST_INSERT,
  LATEST_UPDATE,
  SUCCESS_CODE,
} from '../../../AppConstants/appConstants';
import {PostRequest} from '../../../services/apiCall';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import constants from '../../../AppConstants/Constants.json';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';

const MyLocation = ({route, navigation}) => {
  const mapRef = useRef();
  const keyboardFocusRef = useRef();
  const snapPoints = useMemo(() => ['12%', '60%', '60%'], []);
  const keyboardSnapPoint = useMemo(() => ['60%', '60%'], []);

  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const {newLocation, item} = route?.params;
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    if (newLocation != true) {
      handleLocationSelect();
    }
  }, []);

  useEffect(() => {
    // Initialize location address if it's an update scenario
    if (!newLocation) {
      setLocationAddress(item?.locationName || '');
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardFocused(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardFocused(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [region, setRegion] = useState({
    latitude: 35.481918,
    longitude: -97.508469,
    latitudeDelta: 22,
    longitudeDelta: -0.099,
  });

  const handleLocationSelect = () => {
    const latitude = item?.locationLatitude;
    const longitude = item?.locationLongitude;
    setSelectedLocation({
      coords: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 22,
        longitudeDelta: -0.099,
      },
    });
    setTimeout(
      () =>
        mapRef?.current?.animateToRegion(
          {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 22,
            longitudeDelta: -0.099,
          },
          2000,
        ),
      3000,
    );
  };

  const handleMapPress = e => {
    console.log('Live Cordinates>>>>....', e.nativeEvent.coordinate);
    setSelectedLocation({
      coords: {
        latitude: e.nativeEvent.coordinate?.latitude,
        longitude: e.nativeEvent.coordinate?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
    });
    mapRef.current.animateToRegion(
      {
        latitude: e.nativeEvent.coordinate?.latitude,
        longitude: e.nativeEvent.coordinate?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      3000, // Animation duration in milliseconds
    );
  };

  //bottom sheet insert map sheet
  const [userDetails, setUserDetails] = useState('');
  const [locationAddress, setLocationAddress] = useState(item?.locationName);
  // const [sselectedLocation, setSselectedLocation] = useState(null);
  const [manualLocationAddress, setManualLocationAddress] = useState('');

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userDetail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetail);
  };

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
    console.log('payload ?????>>>>>', payload);
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
    const {description} = data;
    const {lat, lng} = details.geometry.location;

    console.log('Selected Place:', description);
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);

    setSelectedLocation({
      coords: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
    });
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000, // Animation duration in milliseconds
    );

    setLocationAddress(description); // Update the input field with selected location
    setManualLocationAddress('');
  };

  const handleManualLocationEdit = () => {
    setLocationAddress(manualLocationAddress);
    // Clear manual input field if needed
    setManualLocationAddress('');
  };

  const mapAnimation = () => {
    mapRef.current.animateToRegion(
      {
        latitude: selectedLocation?.coords?.latitude,
        longitude: selectedLocation?.coords?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      3000, // Animation duration in milliseconds
    );
  };

  return (
    <GestureHandlerRootView>
      <Screen statusBarColor={appColors.Black} barStyle="dark-content">
        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: appColors.Black}}>
          <View style={{flex: 1, backgroundColor: appColors.Black}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: appColors.Black,
              }}>
              <GoogleMap
                mapRef={mapRef}
                region={region}
                setRegion={setRegion}
                title={'Marker Title'}
                description={'Marker Description'}
                userLocation={true}
                userCoordinates={selectedLocation}
                // handleMapPress={handleMapPress}
              />
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  backgroundColor: appColors.Black,
                  padding: 10,
                  borderRadius: 100,
                }}>
                <CustomIcon
                  type={Icons.Entypo}
                  name={'cross'}
                  size={25}
                  color={appColors.Goldcolor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLocationSelect}
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  backgroundColor: appColors.Black,
                  padding: 12,
                  borderRadius: 100,
                }}>
                <CustomIcon
                  type={Icons.MaterialCommunityIcons}
                  name={'crosshairs-gps'}
                  size={30}
                  color={appColors.Goldcolor}
                />
              </TouchableOpacity>
            </View>

            <BottomSheet
              index={0}
              snapPoints={
                keyboardFocusRef?.current?.isFocused()
                  ? keyboardSnapPoint
                  : snapPoints
              }
              handleIndicatorStyle={{backgroundColor: appColors.Goldcolor}}
              backgroundStyle={{backgroundColor: appColors.Black}}
              dragEnabled={true}>
              <BottomSheetView style={{flex: 1}}>
                <View style={lbStyle.mainContainer}>
                  <View style={{flex: 0.9}}>
                    <GooglePlacesAutocomplete
                      ref={keyboardFocusRef}
                      placeholder="Search your location"
                      onPress={(data, details) =>
                        handlePlaceSelect(data, details)
                      }
                      query={{
                        key: 'AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0',
                        language: 'en',
                      }}
                      fetchDetails={true}
                      enablePoweredByContainer={false}
                      clearButtonMode={'always'}
                      value={locationAddress}
                      textInputProps={{
                        // value: locationAddress,
                        returnKeyType: 'search',
                        placeholderTextColor: '#808080',
                        borderRadius: 20,
                        color: '#000',
                      }}
                      styles={{
                        description: {
                          color: '#000', // Change this to your desired color
                        },
                        listView: {
                          maxHeight: 300, // Set the maximum height for the list
                        },
                      }}
                    />
                  </View>
                  <View style={{flex: 0.2}}>
                    <ButtonComponent
                      title={
                        newLocation == true ? 'Add Location' : 'Update Location'
                      }
                      onPress={
                        newLocation == true ? AddNewLocation : LocationUpdate
                      }
                    />
                  </View>
                </View>
              </BottomSheetView>
            </BottomSheet>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </GestureHandlerRootView>
  );
};

export default MyLocation;
const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
