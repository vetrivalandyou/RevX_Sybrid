import React from 'react';
import appColors from '../../AppConstants/appColors';
import constants from '../../AppConstants/Constants.json';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  AdminBarberEarnings,
  BarberEarnReport,
  HomeSuperAdmin,
  AdminInbox,
  AdminBooking,
  AdminProfile,
} from '../../screens';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';

const Tab = createBottomTabNavigator();

// const screenOptions = {
//   tabBarShowLabel: false,
//   headerShown: false,
//   tabBarHideOnKeyboard: true,
//   tabBarStyle: { styles.BottomBarContainer, backgroundColor: colors.BottomTab },
// };
const AdminBottomTabNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        lazy:true,
        // unmountOnBlur: true,
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
            <View style={{ padding: 14, borderRadius: 20, backgroundColor: focused ? 'white' : 'transparent'}}>
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
            <View style={{ padding: 14, borderRadius: 20, backgroundColor: focused ? 'white' : 'transparent'}}>
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

      {/* <Tab.Screen
        name={constants.AdminScreens.AdminInbox}
        component={AdminInbox}
      /> */}
      <Tab.Screen
        name={constants.AdminScreens.AdminInbox}
        component={AdminInbox}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{ padding: 14, borderRadius: 20, backgroundColor: focused ? 'white' : 'transparent'}}>
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
            <View style={{ padding: 14, borderRadius: 20, backgroundColor: focused ? 'white' : 'transparent'}}>
            <CustomIcon
              name={'person-outline'}
              type={Icons.Ionicons}
              color={focused ? appColors.Black : appColors.White}
            />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name={constants.screen.MyBooking}
        component={MyBooking}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              //style={{backgroundColor:'red'}}
              type={Icons.SimpleLineIcons}
              name="notebook"
              color={focused ? appColors.Black : appColors.White}
              backgroundColor={focused ? 'white' : 'transparent'}
              style={{
                padding: 14,
                borderRadius: 20,
              }}
            />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name={constants.screen.LocationScreen}
        component={LocationScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            <CustomIcon
              name={'map-marker-circle'}
              type={Icons.MaterialCommunityIcons}
              color={focused ? appColors.Black : appColors.White}
              backgroundColor={focused ? 'white' : 'transparent'}
              style={{
                padding: 14,
                borderRadius: 20,
              }}
            />
          ),
        }}
      /> */}
      {/* 
      <Tab.Screen
        name={constants.screen.InboxScreen}
        component={InboxScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            <CustomIcon
              name={'message1'}
              type={Icons.AntDesign}
              color={focused ? appColors.Black : appColors.White}
              backgroundColor={focused ? 'white' : 'transparent'}
              style={{
                padding: 14,
                borderRadius: 20,
              }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name={constants.screen.ProfileScreen}
        component={ProfileScreen}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            //   <MaterialCommunityIcons name="home" color={color} size={size} />
            <CustomIcon
              name={'person-outline'}
              type={Icons.Ionicons}
              color={focused ? appColors.Black : appColors.White}
              backgroundColor={focused ? 'white' : 'transparent'}
              style={{
                padding: 14,
                borderRadius: 20,
              }}
            />
          ),
        }}
      /> */}
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
    paddingBottom:0,

    // shadowColor: appColors.AppBlue,
    // botton: 0,
    // elevation: 0,
    // right: 0,
    //left: 0,
    //elevation: 0,
    // height: 70,
  },
});
