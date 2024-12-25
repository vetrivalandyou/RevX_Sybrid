import React from 'react';
import appColors from '../../AppConstants/appColors';
import constants from '../../AppConstants/Constants.json';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  HomeSuperAdmin,
  AdminInbox,
  AdminBooking,
  AdminProfile,
} from '../../screens';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';

const Tab = createBottomTabNavigator();
const AdminBottomTabNavigation = () => {
  const {colors} = useTheme();
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
        name={constants.AdminScreens.HomeSuperAdmin}
        component={HomeSuperAdmin}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                //style={{backgroundColor:'red'}}
                type={Icons.Feather}
                name="home"
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={constants.AdminScreens.MyBooking}
        component={AdminBooking}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                //style={{backgroundColor:'red'}}
                type={Icons.SimpleLineIcons}
                name="notebook"
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={constants.AdminScreens.AdminInbox}
        component={AdminInbox}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                padding: 14,
                borderRadius: 20,
                backgroundColor: focused ? 'white' : 'transparent',
              }}>
              <CustomIcon
                //style={{backgroundColor:'red'}}
                name={'message1'}
                type={Icons.AntDesign}
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={constants.AdminScreens.AdminProfile}
        component={AdminProfile}
        options={{
          // tabBarLabel: 'Home',
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

export default AdminBottomTabNavigation;

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
