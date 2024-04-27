import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';
import MarkerImage from '../../../assets/mapMarker.png';
import appColors from '../../../AppConstants/appColors';
import {imageUrl} from '../../../AppConstants/urlConstants';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomDarkMapStyle from '../../../utils/CustomMapStyle.json';
import MapViewDirections from 'react-native-maps-directions';

const GoogleMap = ({
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
        return (
          <Marker
            onPress={() => handleMultiMarkerPress(x)}
            key={`marker-${x?.longitude}-${x?.latitude}`}
            coordinate={{
              latitude: x?.latitude ? x.latitude : 0,
              longitude: x.longitude ? x.longitude : 0,
            }}>
            <Image
              // source={CustomMarkerImage ? CustomMarkerImage : MarkerImage}
              source={{uri: `${imageUrl}${x.profileImage}`}}
              style={style.barberStyle}
            />
          </Marker>
        );
      }),
    [selectedLocation],
  );
  return (
    <MapView
      style={{flex: 1}}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      loadingEnabled={true}
      initialRegion={region}
      onRegionChangeComplete={setRegion}
      customMapStyle={CustomDarkMapStyle}
      userLocationCalloutEnabled={true}
      zoomEnabled={true}
      scrollEnabled={true}
      rotateEnabled={true}
      pitchEnabled={true}
      onPress={handleMapPress}>
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
            latitude: selectedBarberLongLat?.latitude,
            longitude: selectedBarberLongLat?.longitude,
          }}
          apikey={'AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE'}
          strokeWidth={5} // Set the width of the route line
          strokeColor="#FFD700"
        />
      )}
    </MapView>
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
