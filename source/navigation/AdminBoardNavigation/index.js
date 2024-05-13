import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AdminBarberEarnings,
  AdminChat,
  AdminEditLicense,
  AdminEditPrivacypolicy,
  AdminInbox,
  AdminLicensee,
  AdminManageContent,
  AdminNotification,
  AdminPaymentMethod,
  AdminPrivacypolicy,
  AdminTermsofServices,
  AdminUserDetails,
  AdminViewUsers,
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
import AdminEditTermsOfServices from '../../screens/AdminBoard/AdminEditTermsOfServices/AdminEditTermsOfServices';
import ManageVans from '../../screens/AdminBoard/ManageVans/ManageVans';
import AddVanservices from '../../screens/AdminBoard/ManageVans/AddVanServices';
import DeleteVanServices from '../../screens/AdminBoard/ManageVans/DeleteVanServices';
import EditVanservices from '../../screens/AdminBoard/ManageVans/EditVanServices';
import AdminApproveBarber from '../../screens/AdminBoard/AdminApproveBarber';
import AdminBlockUsers from '../../screens/AdminBoard/AdminBlockUsers';
import Assignments from '../../screens/AdminBoard/ManageAssignments/Assignment';
import EditAssignment from '../../screens/AdminBoard/ManageAssignments/EditAssignment';
import DeleteAssignment from '../../screens/AdminBoard/ManageAssignments/DeleteAssignment';
import DeepLinking from '../../utils/DeepLinking';
import ServiceList from '../../screens/AdminBoard/AdminServices/ServiceList';
import Editservices from '../../screens/AdminBoard/AdminServices/Editservices';
import DeleteServices from '../../screens/AdminBoard/AdminServices/DeleteServices';
import Addservices from '../../screens/AdminBoard/AdminServices/Addservices';
import OurServices from '../../screens/AdminBoard/AdminServices/OurServices';
import AddSubService from '../../screens/AdminBoard/AdminServices/SubService';
import SubService from '../../screens/AdminBoard/AdminServices/SubService';
import AddSubServices from '../../screens/AdminBoard/AdminServices/AddSubServices';
import SubServiceList from '../../screens/AdminBoard/AdminServices/SubServiceList';
import EditSubServices from '../../screens/AdminBoard/AdminServices/EditSubServices';
import BarberListApprove from '../../screens/AdminBoard/BarberListApprove';
import AdminBarberDetails from '../../screens/AdminBoard/AdminBarberDetails';
import AdminSetupSlots from '../../screens/AdminBoard/AdminSetupSlots';
import CreateSlot from '../../screens/AdminBoard/AdminSetupSlots/CreateSlot';
import AdminViewBarber from '../../screens/AdminBoard/AdminViewBarber';
import ApproveBarberSubService from '../../screens/AdminBoard/ApproveBarberSubService';

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
        <Stack.Screen
          name={constants.AdminScreens.AdminManageContent}
          component={AdminManageContent}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.AdminTermsofServices}
          component={AdminTermsofServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminEditTermsOfServices}
          component={AdminEditTermsOfServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminPrivacypolicy}
          component={AdminPrivacypolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminEditPrivacypolicy}
          component={AdminEditPrivacypolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminLicensee}
          component={AdminLicensee}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminEditLicense}
          component={AdminEditLicense}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminUserDetails}
          component={AdminUserDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminBarberDetails}
          component={AdminBarberDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminViewUsers}
          component={AdminViewUsers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminViewBarber}
          component={AdminViewBarber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminBlockUsers}
          component={AdminBlockUsers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.ManageVans}
          component={ManageVans}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.AddVanservices}
          component={AddVanservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.DeleteVanServices}
          component={DeleteVanServices}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.EditVanservices}
          component={EditVanservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminApproveBarber}
          component={AdminApproveBarber}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.Assignments}
          component={Assignments}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.EditAssignment}
          component={EditAssignment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.DeleteAssignment}
          component={DeleteAssignment}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.OurServices}
          component={OurServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.Addservices}
          component={Addservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.DeleteServices}
          component={DeleteServices}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={constants.AdminScreens.Editservices}
          component={Editservices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.ServiceList}
          component={ServiceList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.SubService}
          component={SubService}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name={constants.AdminScreens.SubServiceList}
          component={SubServiceList}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={constants.AdminScreens.AddSubServices}
          component={AddSubServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.EditSubServices}
          component={EditSubServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.BarberListApprove}
          component={BarberListApprove}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.AdminSetupSlots}
          component={AdminSetupSlots}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={constants.AdminScreens.CreateSlot}
          component={CreateSlot}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name={constants.AdminScreens.ApproveSubServices}
          component={ApproveBarberSubService}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <DeepLinking />
    </NavigationContainer>
  );
};
export default AdminStack;
