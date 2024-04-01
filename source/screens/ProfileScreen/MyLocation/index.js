import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import {screenSize} from '../../../components/atom/ScreenSize';
import LocationBottomSheet from './LocationBottomSheet';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import GoogleMap from '../../../components/molecules/MapView/MapView';

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

  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 0}}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height / 2}>
        <LocationBottomSheet
          refRBSheet={refRBSheet}
          handleUseMyCurrentLoc={handleLocationSelect}
        />
      </BottomSheet>
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
          onPress={() => refRBSheet.current.open()}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: appColors.Black,
            padding: 10,
            borderRadius: 100,
          }}>
          <CustomIcon
            type={Icons.Ionicons}
            name={'paper-plane-sharp'}
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
