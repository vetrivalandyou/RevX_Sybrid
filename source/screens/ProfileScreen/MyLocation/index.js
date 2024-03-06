import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, Touchable, TouchableOpacity, View} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomDarkMapStyle from '../../Location/CustomMapStyle.json';
import CustomMarkerImage from '../../../assets/mapMarker.png';
import {screenSize} from '../../../components/atom/ScreenSize';
import LocationBottomSheet from './LocationBottomSheet';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';

const MyLocation = ({navigation}) => {
  const mapRef = useRef();
  const refRBSheet = useRef();

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLocationSelect = (data, details) => {
    // 'details' contains additional information about the selected place
    setSelectedLocation({
      latitude: 38.8951,
      longitude: -77.0364,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    mapRef.current.animateToRegion(
      {
        latitude: 38.8951,
        longitude: -77.0364,
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
      viewStyle={{backgroundColor: appColors.Black, padding: 0}}>
      {/* <View style={{flex: 0.1}}>
        <Header
        headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'About Us'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
          }
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View> */}

      <BottomSheet ref={refRBSheet} Height={screenSize.height / 3}>
        <LocationBottomSheet refRBSheet={refRBSheet} />
      </BottomSheet>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          
        <MapView
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
                  backgroundColor:'transparent'
                  // borderColor: '#FFD700',
                }}
              />
            </Marker>
          )}
        </MapView>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: appColors.Black,
            padding: 8,
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
          onPress={() => refRBSheet.current.open()}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: appColors.Black,
            padding: 8,
            borderRadius: 100,
          }}>
          <CustomIcon
            type={Icons.Ionicons}
            name={'search'}
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
    </Screen>
  );
};

export default MyLocation;
