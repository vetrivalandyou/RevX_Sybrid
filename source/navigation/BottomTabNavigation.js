import React, {useEffect} from 'react';
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
import {Linking, Platform, StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import LocationScreen from '../screens/Location';
import MyBooking from '../screens/Booking/MyBooking';
import DynamicLinks from '@react-native-firebase/dynamic-links';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDynamicLink = async link => {
      if (link) {
        const {url} = link;
        console.log('URI', url);

        const parts = url.split('?');
        if (parts.length > 1) {
          const queryString = parts[1];
          console.log(queryString);
          const index = queryString.indexOf('=');
          const key = queryString.substring(0, index);
          if (key == 'barberProfileId') {
            let barbeProfileID = queryString.split('=').pop();
            console.log('barbeProfileID', barbeProfileID);
            navigation.navigate(constants.screen.BarberProfile, {
              barberId: barbeProfileID,
            });
          } else if (key == 'paymentStatus') {
            let paymentStatus = queryString.split('=').pop();
            console.log('paymentStatus', paymentStatus);
            navigation.navigate(constants.screen.PaymentStatus, {
              paymentStatus: paymentStatus,
            });
          } else if (key == 'referFriend') {
            let referFriend = queryString.split('=').pop();
            console.log('referFriend', referFriend);
            navigation.navigate(constants.screen.HomeScreen);
          }
        } else {
          console.log('No query string found');
        }
      }
    };
    DynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });

    const unsubscribe = DynamicLinks().onLink(handleDynamicLink);

    return () => {
      unsubscribe();
    };
  }, []);

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
        name={constants.screen.HomeScreen}
        component={HomeScreen}
        options={{
          // tabBarStyle: {position:},
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
                style={
                  {
                    // padding: 14,
                    // borderRadius: 20,
                  }
                }
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={constants.screen.MyBooking}
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
        name={constants.screen.LocationScreen}
        component={LocationScreen}
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
                name={'map-marker-circle'}
                type={Icons.MaterialCommunityIcons}
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={constants.screen.InboxScreen}
        component={InboxScreen}
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
                name={'message1'}
                type={Icons.AntDesign}
                color={focused ? appColors.Black : appColors.White}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={constants.screen.ProfileScreen}
        component={ProfileScreen}
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

export default BottomTabNavigation;

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

    // shadowColor: appColors.AppBlue,
    // botton: 0,
    // elevation: 0,
    // right: 0,
    //left: 0,
    //elevation: 0,
    // height: 70,
  },
});
