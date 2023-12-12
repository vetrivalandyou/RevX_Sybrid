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
  AboutUs,
  TermsOfService,
} from '../screens';
import BottomTabNavigation from './BottomTabNavigation';
import PrivacyPolicy from '../screens/ProfileScreen/Aboutus/PrivacyPolicy';
import License from '../screens/ProfileScreen/Aboutus/License';

const Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <Stack.Screen
          name={constants.screen.SplashScreen}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.ScreenSlider}
          component={ScreenSlider}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.Login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.BottomTabNavigation}
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.screen.CreateAccount}
          component={CreateAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.screen.Successfull}
          component={Successfull}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.screen.ForgotPassword}
          component={ForgotPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.screen.ForgotCheckEmail}
          component={ForgotCheckEmail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.screen.NewPassword}
          component={NewPassword}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
