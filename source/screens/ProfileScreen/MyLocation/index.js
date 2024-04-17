import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import GoogleMap from '../../../components/atom/GoogleMap';
import LocationBottomSheet from '../../../components/atom/LocationButtomSheet';
import MyLocationBottomSheet from '../../../components/atom/MyLocationBottomSheet';

const MyLocation = ({navigation}) => {
  const {coords} = useSelector(state => state.LocationReducer);
  const mapRef = useRef();

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLocationSelect = () => {
    setSelectedLocation({
      latitude: coords?.coords?.latitude,
      longitude: coords?.coords?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

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
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={
        {
          // backgroundColor: appColors.Red,
          // borderTopRightRadius: 30,
          // borderTopLeftRadius: 30,
          // padding: 0,
        }
      }>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
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
              description={'Marker Description'}>
              <Image
                source={CustomMarkerImage}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'transparent',
                  // borderColor: '#FFD700',
                }}
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
            bottom: 270,
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

        <MyLocationBottomSheet />
      </View>
    </Screen>
  );
};

export default MyLocation;
