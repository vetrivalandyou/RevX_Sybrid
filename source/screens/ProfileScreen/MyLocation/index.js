import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import GoogleMap from '../../../components/atom/GoogleMap';
import MyLocationBottomSheet from '../../../components/atom/MyLocationBottomSheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {screenSize} from '../../../components/atom/ScreenSize';
import {useRoute} from '@react-navigation/native';

const MyLocation = ({route, navigation}) => {
  const mapRef = useRef();
  const {newLocation, item} = route?.params;
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    if (newLocation != true) {
      handleLocationSelect();
    }
  }, []);

  const [region, setRegion] = useState({
    latitude: 31.5203696,
    longitude: 74.35874729999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLocationSelect = () => {
    const latitude = item?.locationLatitude;
    const longitude = item?.locationLongitude;
    setSelectedLocation({
      coords: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
    });
    mapRef?.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      3000, // Animation duration in milliseconds
    );
  };

  const handleMapPress = e => {
    console.log('Live Cordinates>>>>....', e.nativeEvent.coordinate);
    setSelectedLocation({
      coords: {
        latitude: e.nativeEvent.coordinate?.latitude,
        longitude: e.nativeEvent.coordinate?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
    });
    mapRef.current.animateToRegion(
      {
        latitude: e.nativeEvent.coordinate?.latitude,
        longitude: e.nativeEvent.coordinate?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      3000, // Animation duration in milliseconds
    );
  };

  return (
    <Screen statusBarColor={appColors.Black} barStyle="light-content">
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent:'center'}}>
      <View
        style={{
          flex: 0.8,
          flexDirection: 'column',
        }}>
        <GoogleMap
          mapRef={mapRef}
          region={region}
          setRegion={setRegion}
          title={'Marker Title'}
          description={'Marker Description'}
          userLocation={true}
          userCoordinates={selectedLocation}
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
        <MyLocationBottomSheet
          selectedLocation={selectedLocation}
          newLocation={newLocation}
          item={item}
        />
      </View>
      </KeyboardAwareScrollView>
     
    </Screen>
  );
};

export default MyLocation;
