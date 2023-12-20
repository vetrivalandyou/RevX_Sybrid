import React from 'react';
import {
  BarberSpecialist,
  Booking,
  HomeScreen,
  InboxScreen,
  ProfileScreen,
  Successfull,
} from '../screens';
import appColors from '../AppConstants/appColors';
import CustomIcon, {Icons} from '../components/molecules/CustomIcon/CustomIcon';
import constants from '../AppConstants/Constants.json';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LocationScreen from '../screens/Location';
import MyBooking from '../screens/Booking/MyBooking';

const Tab = createBottomTabNavigator();

// const screenOptions = {
//   tabBarShowLabel: false,
//   headerShown: false,
//   tabBarHideOnKeyboard: true,
//   tabBarStyle: { styles.BottomBarContainer, backgroundColor: colors.BottomTab },
// };
const BottomTabNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {...styles.BottomBarContainer},
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name={constants.screen.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              //style={{backgroundColor:'red'}}
              type={Icons.Feather}
              name="home"
              color={focused ? appColors.Black : appColors.White}
              backgroundColor={focused ? 'white' : 'transparent'}
              style={{
                padding: 14,
                borderRadius: 20,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
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
      />
      <Tab.Screen
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
      />

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
      />
      <Tab.Screen
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
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  BottomBarContainer: {
    backgroundColor: appColors.Goldcolor,
    borderRadius: 50,
    borderColor: 'transparent',
    position: 'absolute',
    bottom: 2,
    height: 70,
    margin: 10,

    // shadowColor: appColors.AppBlue,
    // botton: 0,
    // elevation: 0,
    // right: 0,
    //left: 0,
    //elevation: 0,
    // height: 70,
  },
});
