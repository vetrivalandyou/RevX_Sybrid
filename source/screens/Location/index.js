import React, {useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import Header from '../../components/molecules/Header';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import {screenSize} from '../../components/atom/ScreenSize';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import LocationBottom from '../LocationBottom';
import CustomDarkMapStyle from '../../utils/CustomMapStyle.json';
import CustomMarkerImage from '../../assets/barberImage.jpg';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import GoogleMap from '../../components/atom/GoogleMap';
import {GetRequest, PostRequest} from '../../services/apiCall';
import {endPoint, messages} from '../../AppConstants/urlConstants';
import {getAsyncItem, getLogLatAsync} from '../../utils/SettingAsyncStorage';
import constants from '../../AppConstants/Constants.json';
import {
  LATEST_SELECT,
  SUCCESS_CODE,
  approve,
} from '../../AppConstants/appConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';

const LocationScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState();
  const [selectedBarberDetails, setSelectedBarberDetails] = useState();
  const [calculateDirection, setCalculateDirection] = useState(false);
  const [selectedBarberLongLat, setSelectedBarberLongLat] = useState();
  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (isFocused) {
      getUserDetails();
    }
  }, [isFocused]);

  const getUserDetails = async () => {
    const asyncUserLongLat = await getLogLatAsync(
      constants.AsyncStorageKeys.longLat,
    );
    const userDetail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserCoordinates(asyncUserLongLat);
    setUserDetails(userDetail);
    getNearByBarber(asyncUserLongLat);
  };

  const getNearByBarber = asyncUserLongLat => {
    const payload = {
      latitude: asyncUserLongLat?.coords?.latitude,
      longitude: asyncUserLongLat?.coords?.longitude,
      distance: 25,
    };
    console.log('longitude', payload);
    PostRequest(endPoint.GET_VANS_NEAR_CUSTOMER, payload)
      .then(res => {
        if (res?.data?.code == SUCCESS_CODE) {
          setSelectedLocation(res?.data?.data);
        }
        mapAnimation(asyncUserLongLat);
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar('Please select location', appColors.PrimaryColor);
      });
  };

  const mapAnimation = asyncUserLongLat => {
    mapRef.current.animateToRegion(
      {
        latitude: asyncUserLongLat?.coords?.latitude,
        longitude: asyncUserLongLat?.coords?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      3000, // Animation duration in milliseconds
    );
  };

  const handleMultiMarkerPress = x => {
    setSelectedBarberLongLat(x);
    const payload = {
      operationID: LATEST_SELECT,
      roleID: 3,
      isActive: true,
      userID: x?.userId,
      userIP: '',
      pageSize: 1,
      pageNumber: 1,
    };
    PostRequest(endPoint.ADMIN_USERDETAILS, payload)
      .then(res => {
        if (res?.data?.length > 0) {
          setSelectedBarberDetails(res?.data?.[0]);
          refRBSheet.current.open();
        } else {
          SimpleSnackBar('Barber Details not Found', appColors.Red);
        }
      })
      .catch(err => {
        console.log('Error', err);
        SimpleSnackBar(messages.WentWrong, appColors.Red);
      });
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 10, flex: 0.9}}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height - 500}>
        <LocationBottom
          refRBSheet={refRBSheet}
          selectedBarberDetails={selectedBarberDetails}
          setCalculateDirection={setCalculateDirection}
        />
      </BottomSheet>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => navigation.navigate(constants.screen.Notification)}
          leftIcoName={'chevron-back'}
          headerText={'Location'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          headerTextViewStyle={{alignItems: 'center'}}
        />
      </View>
      <View style={{flex: 0.9, borderRadius: 20, overflow: 'hidden'}}>
        <GoogleMap
          mapRef={mapRef}
          region={region}
          setRegion={setRegion}
          userLocation={true}
          userCoordinates={userCoordinates}
          selectedLocation={selectedLocation}
          handleMultiMarkerPress={handleMultiMarkerPress}
          calculateDirection={calculateDirection}
          setCalculateDirection={setCalculateDirection}
          selectedBarberLongLat={selectedBarberLongLat}
        />
      </View>
    </Screen>
  );
};

export default LocationScreen;

// const distance = calculateDistance(
//   origin.latitude,
//   origin.longitude,
//   destination.latitude,
//   destination.longitude,
// ).toFixed(2);
