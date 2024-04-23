import React, {useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import {PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';

const LocationScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState([]);
  // const origin = {latitude: 24.86146, longitude: 74.329376};
  // const destination = {latitude: 31.582045, longitude: 74.329376};
  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // const distance = calculateDistance(
  //   origin.latitude,
  //   origin.longitude,
  //   destination.latitude,
  //   destination.longitude,
  // ).toFixed(2);

  // console.log('distance', distance);

  const handleMapPress = event => {
    // Handle map press action
    const {coordinate} = event.nativeEvent;
    setSelectedLocation([{
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }]);
    // setSelectedLocation({
    //   latitude: coordinate.latitude,
    //   longitude: coordinate.longitude,
    //   name: 'Custom Location',
    // });
  };
  const handleLocationSelect = (data, details) => {
    // 'details' contains additional information about the selected place
    setSelectedLocation([{
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }]);

    mapRef.current.animateToRegion(
      {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000, // Animation duration in milliseconds
    );
  };
  const handleAnimateToLocation = () => {
    if (selectedLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000, // Animation duration in milliseconds
      );
    }
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 10, flex: 0.9}}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height - 500}>
        <LocationBottom refRBSheet={refRBSheet} />
      </BottomSheet>

      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
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
          // handleMapPress={handleMapPress}
          selectedLocation={selectedLocation}
          CustomMarkerImage={CustomMarkerImage}
        />
      </View>
    </Screen>
  );
};

export default LocationScreen;

{
  /* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={'AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE'}
            strokeWidth={5} // Set the width of the route line
            strokeColor="#FFD700"
          /> */
}
{
  /* </MapView> */
}

// const distance = calculateDistance(
//   origin.latitude,
//   origin.longitude,
//   destination.latitude,
//   destination.longitude,
// ).toFixed(2);
