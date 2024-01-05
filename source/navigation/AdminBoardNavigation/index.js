import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AdminBarberEarnings,
  AdminChat,
  AdminInbox,
  AdminNotification,
  AdminPaymentMethod,
  BarberEarnReport,
  HomeSuperAdmin,
  PaymentCheckOut,
  RecentTransactions,
  RecentTransactionsMain,
  Report,
} from '../../screens';
import {NavigationContainer} from '@react-navigation/native';
import constants from '../../AppConstants/Constants.json';
import AdminBottomTabNavigation from './AdminBottomTabNavigation';

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <Stack.Screen
          name={constants.AdminScreens.AdminBottomTabNavigation}
          component={AdminBottomTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.Report}
          component={Report}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminPaymentMethod}
          component={AdminPaymentMethod}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminInbox}
          component={AdminInbox}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminChat}
          component={AdminChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.RecentTransactionsMain}
          component={RecentTransactionsMain}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.RecentTransactions}
          component={RecentTransactions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminBarberEarnings}
          component={AdminBarberEarnings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.BarberEarnReport}
          component={BarberEarnReport}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.AdminNotification}
          component={AdminNotification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.PaymentCheckOut}
          component={PaymentCheckOut}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AdminStack;
