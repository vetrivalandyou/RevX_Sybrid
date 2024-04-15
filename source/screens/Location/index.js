import React, { useEffect, useRef, useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Header from '../../components/molecules/Header';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import { screenSize } from '../../components/atom/ScreenSize';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import LocationBottom from '../LocationBottom';
import CustomDarkMapStyle from '../../utils/CustomMapStyle.json';
import CustomMarkerImage from '../../assets/barberImage.jpg';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import GoogleMap from '../../components/atom/GoogleMap';

const LocationScreen = () => {
  const navigation = useNavigation();

  const refRBSheet = useRef();

  const origin = { latitude: 24.86146, longitude: 74.329376 };
  const destination = { latitude: 31.582045, longitude: 74.329376 };
  const [selectedLocation, setSelectedLocation] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => { }, [selectedLocation]);

  useEffect(() => {
  postSetupLocation();
  }, []);


  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const postSetupLocation= payload => {
    
    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        console.log('ressssssss>>>', res?.data);
        if (res?.data?.code === 200) {
          SimpleSnackBar(res?.data?.message);
          setIsLoading(false);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
          setIsLoading(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setIsLoading(false);
      });
  };

  // const distance = calculateDistance(
  //   origin.latitude,
  //   origin.longitude,
  //   destination.latitude,
  //   destination.longitude,
  // ).toFixed(2);

  // console.log('distance', distance);

  const handleLocationSelect = (data, details) => {
    // 'details' contains additional information about the selected place
    setSelectedLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

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

  console.log(selectedLocation);

  const handleMapPress = event => {
    // Handle map press action
    const { coordinate } = event.nativeEvent;
    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    // setSelectedLocation({
    //   latitude: coordinate.latitude,
    //   longitude: coordinate.longitude,
    //   name: 'Custom Location',
    // });
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
      viewStyle={{ backgroundColor: appColors.Black, padding: 10, flex: 0.9 }}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height - 500}>
        <LocationBottom refRBSheet={refRBSheet} />
      </BottomSheet>

      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
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
          headerTextViewStyle={{ alignItems: 'center' }}
        />
      </View>

      <View style={{ flex: 0.1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={handleLocationSelect}
          query={{
            key: 'AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE',
            language: 'en', // Optional: specify the language for results
          }}
          // fetchDetails
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            container: {
              position: 'absolute',
              zIndex: 1,
              top: 10,
              width: '100%',
            },

            // textInputContainer: {
            //   backgroundColor: 'grey',
            // },
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#000',
            },
          }}
        />
      </View>

      <View style={{ flex: 0.8, borderRadius: 20, overflow: 'hidden' }}>
        <GoogleMap
          mapRef={mapRef}
          region={region}
          setRegion={setRegion}
          title={'Marker Title'}
          description={'Marker Description'}
          handleMapPress={handleMapPress}
          selectedLocation={selectedLocation}
          CustomMarkerImage={CustomMarkerImage}

        />
        {/* <MapView
          style={{flex: 1}}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          onRegionChange={setRegion}
          customMapStyle={CustomDarkMapStyle}
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
          pitchEnabled={true}
          onPress={handleMapPress}>
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={'Marker Title'}
              description={'Marker Description'}>
              <Image
                source={CustomMarkerImage}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: '#FFD700',
                }}
              />
            </Marker>
          )} */}
        {/* <Marker
            coordinate={origin}
            title={'Marker Title'}
            description={'Marker Description'}>
            <Image
              source={CustomMarkerImage}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#FFD700',
              }}
            />
          </Marker>
          <Marker
            coordinate={destination}
            title={'Brber'}
            description={'Marker Description'}>
            <Image
              source={CustomMarkerImage}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#FFD700',
              }}
            />
          </Marker> */}

        {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={'AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE'}
            strokeWidth={5} // Set the width of the route line
            strokeColor="#FFD700"
          /> */}
        {/* </MapView> */}
      </View>
    </Screen>
  );
};

export default LocationScreen;
