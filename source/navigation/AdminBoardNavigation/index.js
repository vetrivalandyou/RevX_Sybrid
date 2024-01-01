import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminBarberEarnings, AdminChat, AdminInbox, AdminPaymentMethod, BarberEarnReport, HomeSuperAdmin,  RecentTransactionsMain,  Report } from '../../screens';
import constants from "../../AppConstants/Constants.json"
import AdminBottomTabNavigation from './AdminBottomTabNavigation';

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }} initialRouteName={constants.screen.HomeSuperAdmin}>

        <Stack.Screen
          name={constants.screen.AdminBottomTabNavigation}
          component={AdminBottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={constants.AdminScreens.Report}
          component={Report}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name={constants.AdminScreens.AdminPaymentMethod}
          component={AdminPaymentMethod}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={constants.screen.AdminInbox}
          component={AdminInbox}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name={constants.screen.AdminChat}
          component={AdminChat}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name={constants.screen.RecentTransactionsMain}
          component={RecentTransactionsMain}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name={constants.AdminScreens.AdminBarberEarnings}
          component={AdminBarberEarnings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={constants.AdminScreens.BarberEarnReport}
          component={BarberEarnReport}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AdminStack;
