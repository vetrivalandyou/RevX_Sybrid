import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import constants from '../../AppConstants/Constants.json';
import {
  SplashScreen,
  ScreenSlider,
  Login,
  Successfull,
  CreateAccount,
  ForgotPassword,
  ForgotCheckEmail,
  NewPassword,
} from '../../screens/AuthIndex';

import Main from '../../../source/navigation/index';
import BarberStack from '../../../source/navigation/BarberBoardNavigation/index';
import AdminStack from '../../../source/navigation/AdminBoardNavigation/index';
import CreateAccountBarber from '../../screens/Auth/CreateAccountBarber';
import OTP_Verification from '../../screens/Auth/ForgotPassword/OTP_Verification';
import DeepLinking from '../../utils/DeepLinking';

const AuthIndex = () => {
  const Stack = createNativeStackNavigator();
  const {loggedIn} = useSelector(state => state.AuthReducer);
  if (loggedIn == 4) {
    return <Main />;
  } else if (loggedIn == 3) {
    return <BarberStack />;
  } else if (loggedIn == 1) {
    return <AdminStack />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
          <Stack.Screen
            name={constants.AuthScreen.SplashScreen}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={constants.AuthScreen.ScreenSlider}
            component={ScreenSlider}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={constants.AuthScreen.Login}
            component={Login}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={constants.AuthScreen.CreateAccount}
            component={CreateAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={constants.AuthScreen.Successfull}
            component={Successfull}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={constants.AuthScreen.ForgotPassword}
            component={ForgotPassword}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={constants.AuthScreen.ForgotCheckEmail}
            component={ForgotCheckEmail}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={constants.AuthScreen.OTP_Verification}
            component={OTP_Verification}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={constants.AuthScreen.NewPassword}
            component={NewPassword}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={constants.AuthScreen.CreateAccountBarber}
            component={CreateAccountBarber}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default AuthIndex;
