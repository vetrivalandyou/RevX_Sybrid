import React, {useEffect} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
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
import {useDispatch} from 'react-redux';
import {UpdateLocation} from '../../redux/Action/LocationAction/UpdateLocationAction';

const BarberStack = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  // const isFocused = useIsFocused();

  useEffect(() => {
    // if (isFocused) {
      handleBarberLocation();
    // }
  }, []);

  const handleBarberLocation = async () => {
    const userCurrentLocation = await requestLocationPermissionAndGetLocation(3);
    console.log('userCurrentLocation', userCurrentLocation);
    dispatch(UpdateLocation(userCurrentLocation));
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
