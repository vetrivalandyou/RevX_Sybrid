import React from 'react';
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
import {useSelector} from 'react-redux';
import Main from '../../../source/navigation/index';
import BarberStack from '../../../source/navigation/BarberBoardNavigation/index';
import AdminStack from '../../../source/navigation/AdminBoardNavigation/index';

const AuthIndex = () => {
  const Stack = createNativeStackNavigator();
  const {loggedIn} = useSelector(state => state.AuthReducer);

  console.log('loggedInloggedInloggedIn', loggedIn);

  if (loggedIn == 1) {
    return <Main />;
  } else if (loggedIn == 2) {
    return <BarberStack />;
  } 
  else if (loggedIn == 3) {
    return <AdminStack />;
  }else {
    console.log("")
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
            name={constants.AuthScreen.NewPassword}
            component={NewPassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default AuthIndex;
