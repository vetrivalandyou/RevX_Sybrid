import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import GoogleMap from '../../../components/atom/GoogleMap';
import MyLocationBottomSheet from '../../../components/atom/MyLocationBottomSheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenSize } from '../../../components/atom/ScreenSize';
import { useRoute } from '@react-navigation/native';

const MyLocation = ({navigation}) => {
  const route = useRoute();
  
  // Extract params
  const { item } = route.params;
  console.log("item.............", item)

  const {coords} = useSelector(state => state.LocationReducer);

  console.log("coords....",coords)
  const mapRef = useRef();

  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLocationSelect = () => {
    setSelectedLocation([{
      latitude: coords?.coords?.latitude,
      longitude: coords?.coords?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }]);

    mapRef?.current?.animateToRegion(
      {
        latitude: coords?.coords?.latitude,
        longitude: coords?.coords?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000, // Animation duration in milliseconds
    );
  };

  const handleMapPress = e => {
    console.log('Live Cordinates>>>>....', e.nativeEvent.coordinate);
    setSelectedLocation({
      latitude: e.nativeEvent.coordinate?.latitude,
      longitude: e.nativeEvent.coordinate?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    mapRef.current.animateToRegion(
      {
        latitude: e.nativeEvent.coordinate?.latitude,
        longitude: e.nativeEvent.coordinate?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000, // Animation duration in milliseconds
    );
  };

  return (
    <Screen statusBarColor={appColors.Black} barStyle="light-content">
      <View
        style={{
          flex: 0.8,
          flexDirection: 'column',
          backgroundColor:'pink'
        }}>
        <GoogleMap
          mapRef={mapRef}
          region={region}
          setRegion={setRegion}
          title={'Marker Title'}
          description={'Marker Description'}
          selectedLocation={selectedLocation}
          handleMapPress={handleMapPress}
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
          // onPress={handleMapPress}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={'Marker Title'}
              description={'Marker Description'}
              selectedLocation={selectedLocation}
              handleMapPress={handleMapPress}
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
            </Marker>
          )}
        </MapView> */}
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
      <View style={{flex: 0.3}}>
      <MyLocationBottomSheet route={route} selectedLocation={selectedLocation} />
      </View>
      {/* {selectedLocation && (
     
      )} */}
    </Screen>
  );
};

export default MyLocation;