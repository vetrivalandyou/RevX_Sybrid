export const baseUrl = 'http://124.29.235.8:8786/api/';
export const imageUrl = 'http://124.29.235.8:8786';

export const endPoint = {
  //   AUTH END POINTS
  SIGNUP: 'Auth/Signup',
  LOGIN: 'Auth/Login',
  OPT_SEDING: 'Auth/OTP_Sending',
  OTP_VERIFICATION: 'Auth/OTP_Verification',
  RESET_PASSWORD: 'Auth/Reset_Password',
  OTP_SENDING: 'Auth/OTP_Sending',
  OTP_VERIFICATION: 'Auth/OTP_Verification',
  REGISTERAS_BARBER: 'Barber/Barber_Signup',

  //User End Points
  EDIT_PROFILE_USER: 'Auth/User_CU',

  //Barbers End Points
  BARBER_SERVICES: 'Admin/Barber_Detail?id=94',
  BARBER_APPROVE_SERVICES: 'Barber/GetBarberApproveService',
  SETUP_CATEGORIES_CU: 'Barber/SetupCategories_CU',
  GET_SETUP_CATEGORIES: 'Barber/GetSetupCategories',
  SETUP_CATEGORIES_DELETE: 'Barber/SetupCategories_Delete',
  CUSTOMER_SERVICES: 'Customer/Category_Services',
  BARBER_SERVICE_CATEGORY: 'Admin/BarberServiceCategry',
  REAPPLY_APPROVE_BARBER_SERVICE_CATEGORY:
    'Admin/ReApplyApproveBarberServiceCategry',
  APPROVE_BARBER_SERVICE: 'Barber/ApproveBarberService',
  BARBER_LOCATION_UPDATE: 'Auth/Barber_Location_Updated',
  BARBER_PARENTCHILD_SERVICES: 'Barber/Barber_ParentChildServices',
  BARBER_AVAILABLESLOTS: 'Barber/Barber_AvailableSlots',

  //Admin End Points
  BARBER_LIST: 'Admin/Barber_List', //done
  VAN_CU: 'Common/Van_CU',
  DELETE_VANS: 'Common/Van_Delete',
  CUSTOMER_SERVICES: 'Customer/Category_Services',
  BARBER_DETAIL: 'Admin/Barber_Detail',
  GET_VANS: 'Common/Get_Vans',
  BARBER_VANASSIGNMENT_CU: 'Barber/BarberVanAssignment_CU',
  GET_BARBER_VANASSIGNMENT: 'Barber/GetBarberVanAssignment',
  VAN_SERVICES: 'Common/Get_Vans',
  BARBER_APPROVE_SERVICE_POST: 'Barber/ApproveBarberService',
  BARBER_SERVICES_GET: 'Barber/Barber_Services_Get',
  BARBER_SERVICES_CU: 'Barber/Barber_Services_CU',
  GET_VANS_NEAR_CUSTOMER: 'Auth/Get_Vans_Near_Customer',
  ADMIN_USERDETAILS: 'Admin/Admin_UserDetails',
  BARBER_PC_SERVICES_APPROVAL: 'Admin/Admin_BarberPCServicesApproval',

  // Customer End Points
  SERVICE_CATEGORIES: 'Customer/Service_Categories',
  MASTER_DETAIL: 'Common/SetupMasterDetail',
  GET_ABOUT_US: 'Common/Get_AboutUs',

  // `Common/Get_AboutUsType?aboutUsTypeId=${BARBERID}`
  SAVE_ABOUTUS_TYPE: 'Common/SaveAboutUsTypeTitleDetail',
  BARBER_SET_UP_LOCATION_SERVICES: 'Barber/SetupLocation_CU',
  BARBER_GET_SET_UP_LOCATION: 'Barber/GetSetupLocation',
  AUTH_CUSTOMER_LOCATION_UPDATED: 'Auth/Customer_Location_Updated',

  // admin view get user details and barber details
  Get_USER_BARBER_DETAILS: 'Admin/Admin_UserDetails',

  //admin create slots for barber
  CREATE_SETUP_SLOTS: 'Admin/Admin_SetupSlots',
};

export const messages = {
  WentWrong: 'Something went wrong, please try again later.',
  Catch:
    'May be your internet is not connected or there is something went wrong on server.',
  SeesionExpire: 'Your app session has been expired, please login again.',
  Approve: 6,
  reject: 7,
};
