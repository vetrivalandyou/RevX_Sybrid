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

import Assignments from '../../screens/BarberBoard/ManageAssignments/Assignment';

import ServiceList from '../../screens/BarberBoard/BarberServices/ServiceList';
import EditAssignment from '../../screens/BarberBoard/ManageAssignments/EditAssignment';
import DeleteAssignment from '../../screens/BarberBoard/ManageAssignments/DeleteAssignment';

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
          name={constants.BarberScreen.ServiceList}
          component={ServiceList}
          options={{headerShown: false}}
        />
         
        <Stack.Screen
          name={constants.BarberScreen.Assignments}
          component={Assignments}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name={constants.BarberScreen.AddAssignment}
          component={AddAssignment}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name={constants.BarberScreen.EditAssignment}
          component={EditAssignment}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={constants.BarberScreen.DeleteAssignment}
          component={DeleteAssignment}
          options={{headerShown: false}}
        />
       



      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default BarberStack;
