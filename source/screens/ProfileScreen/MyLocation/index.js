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

const MyLocation = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();

  console.log('route', route);

  // Extract params
  // const {item} = route.params;
  // console.log('item.............', item);

  const {coords} = useSelector(state => state.LocationReducer);

  const mapRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    handleLocationSelect();
  }, []);

  const [region, setRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLocationSelect = () => {
    const latitude = route?.params?.item?.locationLatitude;
    const longitude = route?.params?.item?.locationLongitude;
    setSelectedLocation({
      coords: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
    mapRef?.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      300, // Animation duration in milliseconds
    );
  };

  const handleMapPress = e => {
    console.log('Live Cordinates>>>>....', e.nativeEvent.coordinate);
    setSelectedLocation({
      coords: {
        latitude: e.nativeEvent.coordinate?.latitude,
        longitude: e.nativeEvent.coordinate?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
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
          selectedLocation={[selectedLocation]}
          route={route}
        />
      </View>
    </Screen>
  );
};

export default MyLocation;
