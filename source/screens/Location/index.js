import React, {useRef, useState} from 'react';
import {ImageBackground, Text, View, Image, Button} from 'react-native';
import Search from '../../components/atom/Search/Search';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import {AppImages} from '../../AppConstants/AppImages';
import AuthHeader from '../../components/molecules/AuthHeader';
import RBSheet from 'react-native-raw-bottom-sheet';
import {screenSize} from '../../components/atom/ScreenSize';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import LocationBottom from '../LocationBottom';

import ReferFriendsSheet from '../ReferFriendsSheet';
import LogoutBottom from '../LogoutBottom';
import {useNavigation} from '@react-navigation/native';
import constants from '../../AppConstants/Constants.json';
import {calculateDistance} from './CalculateDistance';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomDarkMapStyle from './CustomMapStyle.json';
import CustomMarkerImage from '../../assets/barberImage.jpg';
import MapViewDirections from 'react-native-maps-directions';

const LocationScreen = () => {
  const navigation = useNavigation();

  const refRBSheet = useRef();

  const origin = {latitude: 24.86146, longitude: 67.00994};
  const destination = {latitude: 31.582045, longitude: 74.329376};

  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 24.86146,
    longitude: 67.00994,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const distance = calculateDistance(
    origin.latitude,
    origin.longitude,
    destination.latitude,
    destination.longitude,
  ).toFixed(2);

  // console.log('distance', distance);

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 10, flex: 0.9}}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height - 500}>
        <LocationBottom refRBSheet={refRBSheet} />
      </BottomSheet>

      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Location'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          headerTextViewStyle={{alignItems: 'center'}}
        />
      </View>

      <View style={{flex: 0.1}}>
        <Search
          leaftIconType={Icons.Ionicons}
          leftIconName={'filter'}
          style={{marginVertical: 11}}
        />
      </View>

      <View style={{flex: 0.8, borderRadius: 20, overflow: 'hidden'}}>
        <MapView
          style={{flex: 1}}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          onRegionChange={setRegion}
          customMapStyle={CustomDarkMapStyle}
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={false}
          pitchEnabled={true}>
          <Marker
            coordinate={origin}
            title={'Marker Title'}
            description={'Marker Description'}>
            <Image
              source={CustomMarkerImage}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#FFD700',
              }}
            />
          </Marker>
          <Marker
            coordinate={destination}
            title={'Brber'}
            description={'Marker Description'}>
            <Image
              source={CustomMarkerImage}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#FFD700',
              }}
            />
          </Marker>

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={'AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE'}
            strokeWidth={5} // Set the width of the route line
            strokeColor="#FFD700"
          />
        </MapView>
      </View>
    </Screen>
  );
};

export default LocationScreen;
