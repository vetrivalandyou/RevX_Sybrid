import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import constants from '../../AppConstants/Constants.json';
import {
  EReceipt,
  BarberEReceipt,
  BarberChatScreen,
  BaberProfileScreen,
  NotificationScreen,
  Servicesboard,
  Addservices,
  Editservices,
} from '../../screens';

import BarberBottomTabNavigation from './BarberBottomTabNavigation';
import DeleteServices from '../../screens/BarberBoard/BarberServices/DeleteServices';
import ServiceList from '../../screens/BarberBoard/BarberServices/ServiceList';
import Profile from '../../screens/BarberBoard/BarberProfile/Profile/Profile';
import DeepLinking from '../../utils/DeepLinking';
import EditProfile from '../../screens/ProfileScreen/EditProfile';
import AddSubservices from '../../screens/BarberBoard/BarberServices/AddSubservices';
import {requestLocationPermissionAndGetLocation} from '../../utils/GetLocation';
import {PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {getAsyncItem, setLogLatAsync} from '../../utils/SettingAsyncStorage';
import {LATEST_UPDATE} from '../../AppConstants/appConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import appColors from '../../AppConstants/appColors';

const BarberStack = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const userAsyncDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    console.log('Inside getAsyncData');
    getCurrentLocation(userAsyncDetails);
  };

  const getCurrentLocation = async userAsyncDetails => {
    try {
      const userCurrentLocation =
        await requestLocationPermissionAndGetLocation();
      handleLocationChange(userAsyncDetails, userCurrentLocation);
    } catch (error) {
      console.log("getCurrentLocation",error);
    }
  };

  const handleLocationChange = (userAsyncDetails, newCoords) => {
    try {
      handleSaveBarberLocation(userAsyncDetails, newCoords?.coords);
      setLogLatAsync(constants.AsyncStorageKeys.longLat, newCoords);
    } catch (error) {
      console.log("handleLocationChange",error);
    }
  };

  const handleSaveBarberLocation = (userAsyncDetails, newCoords) => {
    const payload = {
      barberId: userAsyncDetails?.userId,
      userLocationLatitude: newCoords?.latitude,
      userLocationLongitude: newCoords?.longitude,
      operations: LATEST_UPDATE,
      createdBy: userAsyncDetails?.userId,
    };
    PostRequest(endPoint.BARBER_LOCATION_UPDATE, payload)
      .then(res => {
        console.log('RESPONSE BARBER LOCATION UPDATE', res?.data);
      })
      .catch(err => {
        console.log('Err'.err);
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <Stack.Screen
          name={constants.BarberScreen.BarberBottomTabNavigation}
          component={BarberBottomTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.EReceipt}
          component={EReceipt}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.BarberEReceipt}
          component={BarberEReceipt}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.BaberProfileScreen}
          component={BaberProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.BarberChatScreen}
          component={BarberChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.NotificationScreen}
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.Servicesboard}
          component={Servicesboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.BarberScreen.Addservices}
          component={Addservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.DeleteServices}
          component={DeleteServices}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.BarberScreen.Editservices}
          component={Editservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.ServiceList}
          component={ServiceList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.Profile}
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.AddSubservices}
          component={AddSubservices}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <DeepLinking />
    </NavigationContainer>
  );
};
export default BarberStack;
