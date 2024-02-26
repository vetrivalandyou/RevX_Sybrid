import React from 'react';
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
import EditVanservices from '../../screens/AdminBoard/ManageVans/EditVanServices';
import AddVanservices from '../../screens/AdminBoard/ManageVans/AddVanServices';
import DeleteVanServices from '../../screens/AdminBoard/ManageVans/DeleteVanServices';
import ManageVans from '../../screens/AdminBoard/ManageVans/ManageVans';

const BarberStack = () => {
  
  const Stack = createNativeStackNavigator();
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
          name={constants.BarberScreen.ManageVans}
          component={ManageVans}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.BarberScreen.AddVanservices}
          component={AddVanservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.BarberScreen.DeleteVanServices}
          component={DeleteVanServices}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.BarberScreen.EditVanservices}
          component={EditVanservices}
          options={{headerShown: false}}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default BarberStack;
