import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomDarkMapStyle from '../../../utils/CustomMapStyle.json';
import MarkerImage from '../../../assets/mapMarker.png';
import appColors from '../../../AppConstants/appColors';

const GoogleMap = ({
  mapRef,
  region,
  setRegion,
  title,
  description,
  selectedLocation,
  handleMapPress,
  CustomMarkerImage,
}) => {
  console.log('GoogleMapGoogleMap', selectedLocation);

  // const Markers = useMemo(
  //   () =>
  //     selectedLocation?.map(marker => {
  //       return (
  //         <Marker
  //           key={`marker-${marker?.longitude}-${marker?.longitude}`}
  //           tracksViewChanges={false}
  //           coordinate={{
  //             latitude: marker?.latitude ? marker?.latitude : 0,
  //             longitude: marker.longitude ? marker?.longitude : 0,
  //           }}
  //           onPress={() => onMarkerPress(marker)}
  //           title={title}
  //           description={description}>
  //           <Image
  //             source={CustomMarkerImage ? CustomMarkerImage : MarkerImage}
  //             style={CustomMarkerImage ? style.barberStyle : style.markerStyle}
  //           />
  //         </Marker>
  //       );
  //     }),
  //   [selectedLocation],
  // );
  return (
    // <MapView
    //   style={{ flex: 1 }}
    //   ref={mapRef}
    //   provider={PROVIDER_GOOGLE}
    //   loadingEnabled={true}
    //   initialRegion={region}
    //   onRegionChange={setRegion}
    //   customMapStyle={CustomDarkMapStyle}
    //   userLocationCalloutEnabled={true}
    //   zoomEnabled={true}
    //   scrollEnabled={true}
    //   rotateEnabled={true}
    //   pitchEnabled={true}
    //   onPress={handleMapPress}>
    //   {selectedLocation && (
    //     selectedLocation?.map((x) => (
    //       <Marker
    //       key={`marker-${x?.longitude}-${x?.longitude}`}
    //         coordinate={{
    //           latitude: x?.latitude
    //             ? x.latitude
    //             : 0,
    //           longitude: x.longitude
    //             ? x.longitude
    //             : 0,
    //         }}
    //         title={title ? title : x?.barberName}
    //         description={description ? description : x?.description}>
    //         <Image
    //           source={CustomMarkerImage ? CustomMarkerImage : MarkerImage}
    //           style={CustomMarkerImage ? style.barberStyle : style.markerStyle}
    //         />
    //       </Marker>
    //     ))
    //   )}
    // </MapView>

    <MapView
      style={{flex: 1}}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      loadingEnabled={true}
      initialRegion={region}
      onRegionChange={setRegion}
      customMapStyle={CustomDarkMapStyle}
      userLocationCalloutEnabled={true}
      zoomEnabled={true}
      scrollEnabled={true}
      rotateEnabled={true}
      pitchEnabled={true}
      onPress={handleMapPress}>
      {Array.isArray(selectedLocation) &&
        selectedLocation.map(x => (
          <Marker
            key={`marker-${x?.longitude}-${x?.longitude}`}
            coordinate={{
              latitude: x?.latitude ? x.latitude : 0,
              longitude: x.longitude ? x.longitude : 0,
            }}>
            <Image
              source={CustomMarkerImage ? CustomMarkerImage : MarkerImage}
              style={CustomMarkerImage ? style.barberStyle : style.markerStyle}
            />
          </Marker>
        ))}
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
