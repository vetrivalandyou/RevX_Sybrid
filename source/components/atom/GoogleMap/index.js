import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MarkerImage from '../../../assets/mapMarker.png';
import appColors from '../../../AppConstants/appColors';
import { imageUrl } from '../../../AppConstants/urlConstants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomDarkMapStyle from '../../../utils/CustomMapStyle.json';
import MapViewDirections from 'react-native-maps-directions';
import { SafeAreaView } from 'react-native-safe-area-context';

const GoogleMap = ({
  onRegionChangeComplete,
  mapRef,
  region,
  setRegion,
  title,
  description,
  selectedLocation,
  handleMapPress,
  CustomMarkerImage,
  userLocation,
  userCoordinates,
  handleMultiMarkerPress,
  calculateDirection,
  selectedBarberLongLat,
}) => {
  const Markers = useMemo(
    () =>
      selectedLocation?.map(x => {
        console.log('------------------------------------', x);
        return (
          <Marker
            onPress={() => handleMultiMarkerPress(x)}
            key={`marker-${x?.Longitude}-${x?.Latitude}`}
            coordinate={{
              latitude: x?.Latitude ? x.Latitude : 0,
              longitude: x.Longitude ? x.Longitude : 0,
            }}>
            <Image
              // source={CustomMarkerImage ? CustomMarkerImage : MarkerImage}
              source={{ uri: `${imageUrl}${x.ProfileImage}` }}
              style={style.barberStyle}
            />
          </Marker>
        );
      }),
    [selectedLocation],
  );

  console.log('SELECTED LOCATION', selectedLocation);
  console.log('SELECTED userLocation', userCoordinates);

  return (
    <View style={StyleSheet.absoluteFillObject}>
        <MapView
          style={{ flex: 1 }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          pitchEnabled={true}
          scrollEnabled={true}
          rotateEnabled={false}
          loadingEnabled={true}
          initialRegion={region}
          onPress={handleMapPress}
          customMapStyle={CustomDarkMapStyle}
          // userLocationCalloutEnabled={true}
          loadingIndicatorColor={appColors.Black}
          loadingBackgroundColor={appColors.Black}>
          {userLocation && (
            <Marker
              key={`marker-${userCoordinates?.coords?.latitude}-${userCoordinates?.coords?.longitude}`}
              coordinate={{
                latitude: userCoordinates?.coords?.latitude
                  ? userCoordinates?.coords?.latitude
                  : 0,
                longitude: userCoordinates?.coords?.longitude
                  ? userCoordinates?.coords?.longitude
                  : 0,
              }}></Marker>
          )}
          {Markers}
          {calculateDirection == true && (
            <MapViewDirections
              origin={{
                latitude: userCoordinates?.coords?.latitude,
                longitude: userCoordinates?.coords?.longitude,
              }}
              destination={{
                latitude: selectedBarberLongLat?.Latitude,
                longitude: selectedBarberLongLat?.Longitude,
              }}
              // apikey={'AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE'}
              apikey={'AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0'}
              strokeWidth={5} // Set the width of the route line
              strokeColor="#FFD700"
            />
          )}
        </MapView>
    </View>

  );
};

const style = StyleSheet.create({
  markerStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  barberStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: appColors.Goldcolor,
  },
});

export default GoogleMap;
