import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import GoogleMap from '../../../components/atom/GoogleMap';
import LocationBottomSheet from '../../../components/atom/LocationButtomSheet';
import MyLocationBottomSheet from '../../../components/atom/MyLocationBottomSheet';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { screenSize } from '../../../components/atom/ScreenSize';

const MyLocation = ({ navigation }) => {
  const { coords } = useSelector(state => state.LocationReducer);

  console.log("coords....", coords)
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
    // console.log('Live Cordinates', e.nativeEvent.coordinate);
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

    // console.log(selectedLocation?.latitude);
  };

  return (
    <Screen statusBarColor={appColors.Black} barStyle="light-content">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} extraScrollHeight={0} extraHeight={0} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1 }}>
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
                top: 20,
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
          <View style={{ height: screenSize.height / 3.5, width: screenSize.width, position: 'absolute', bottom: 0, backgroundColor: appColors.Black }}>
            <MyLocationBottomSheet selectedLocation={selectedLocation} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default MyLocation;
