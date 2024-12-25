import React, {useEffect} from 'react';
import appColors from '../../AppConstants/appColors';
import constants from '../../AppConstants/Constants.json';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';

import {
  HomeBarber,
  MyBooking,
  BaberProfileScreen,
  BarberChatScreen,
} from '../../screens';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';

const Tab = createBottomTabNavigator();

const BarberBottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarShowLabel: false,
        tabBarStyle: {...styles.BottomBarContainer},
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name={constants.BarberScreen.HomeBarber}
        component={HomeBarber}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                type={Icons.Feather}
                name="home"
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={constants.BarberScreen.MyBooking}
        component={MyBooking}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                type={Icons.AntDesign}
                name="calendar"
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={constants.BarberScreen.BarberChatScreen}
        component={BarberChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                name={'message1'}
                type={Icons.AntDesign}
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={constants.BarberScreen.BaberProfileScreen}
        component={BaberProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                name={'person-outline'}
                type={Icons.Ionicons}
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BarberBottomTabNavigation;

const styles = StyleSheet.create({
  BottomBarContainer: {
    backgroundColor: appColors.Goldcolor,
    borderRadius: 50,
    borderColor: 'transparent',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 30 : 2,
    height: 70,
    margin: 10,
    paddingBottom: 0,
  },
});
