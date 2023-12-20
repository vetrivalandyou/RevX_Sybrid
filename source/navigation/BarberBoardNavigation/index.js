import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeSuperAdmin} from '../../screens';
import constants from '../../AppConstants/Constants.json';
import BarberBottomTabNavigation from './BarberBottomTabNavigation';

const BarberStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <Stack.Screen
          name={constants.screen.BarberBottomTabNavigation}
          component={BarberBottomTabNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default BarberStack;
