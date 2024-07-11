import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import constants from '../AppConstants/Constants.json';
import {
  Login,
  ScreenSlider,
  SplashScreen,
  Successfull,
  AppointmentDate,
  BarberEarnings,
  BarberSpecialist,
  CreateAccount,
  ForgotPassword,
  ForgotCheckEmail,
  NewPassword,
  Services,
  ServicesDetails,
  AboutUs,
  TermsOfService,
  PaymentMethod,
  PaymentDetails,
  Notification,
  ReviewSummary,
  LocationBottom,
  LogoutBottom,
  ReferFriendsSheet,
  ServiceSpecialist,
  UserChat,
  UserEReceipt
} from '../screens';
import BottomTabNavigation from './BottomTabNavigation';
import PrivacyPolicy from '../screens/ProfileScreen/Aboutus/PrivacyPolicy';
import License from '../screens/ProfileScreen/Aboutus/License';
import BarberProfile from '../screens/BarberProfie';
import MyLocation from '../screens/ProfileScreen/MyLocation';
import EditProfile from '../screens/ProfileScreen/EditProfile';
import DeepLinking from '../utils/DeepLinking';

const Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={constants.screen.SplashScreen}
        screenOptions={{animation: 'slide_from_right'}}>
        <Stack.Screen
          name={constants.screen.BottomTabNavigation}
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.AppointmentDate}
          component={AppointmentDate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.BarberEarnings}
          component={BarberEarnings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.BarberSpecialist}
          component={BarberSpecialist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.BarberProfile}
          component={BarberProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.MyLocation}
          component={MyLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.EditProfile}
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.AboutUs}
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.TermsOfService}
          component={TermsOfService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.PrivacyPolicy}
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.License}
          component={License}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.Services}
          component={Services}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.ServicesDetails}
          component={ServicesDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.PaymentMethod}
          component={PaymentMethod}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.PaymentDetails}
          component={PaymentDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.Notification}
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.ReviewSummary}
          component={ReviewSummary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.LogoutBottom}
          component={LogoutBottom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.LocationBottom}
          component={LocationBottom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.ReferFriendsSheet}
          component={ReferFriendsSheet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.ServiceSpecialist}
          component={ServiceSpecialist}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name={constants.screen.UserChat}
          component={UserChat}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name={constants.screen.UserEReceipt}
          component={UserEReceipt}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <DeepLinking />
    </NavigationContainer>
  );
};
export default Main;
