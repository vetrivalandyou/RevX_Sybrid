// const urlConstants = {
//   // UAT URL
//   baseUrl: 'http://124.29.235.8:8786/api/',

//   endPoint: {
//     BARBER_SERVICES: 'Barber/Barber_Services',
//   },

//   methods: {
//     GET: 'GET',
//     POST: 'POST',
//     PUT: 'PUT',
//   },

//   response: {
//     success: true,
//     failure: false,
//   },

//   responseCode: {
//     OK: 200,
//     NOTFOUND: 400,
//   },

//   messages: {
//     WentWrong: 'Something went wrong, please try again later.',
//     Catch:
//       'May be your internet is not connected or there is something went wrong on server.',
//     SeesionExpire: 'Your app session has been expired, please login again.',
//   },
// };

// export default urlConstants;

export const baseUrl = 'http://124.29.235.8:8786/api/';

export const endPoint = {
  //   AUTH END POINTS
  SIGNUP: 'Auth/Signup',
  LOGIN: 'Auth/Login',
  OPT_SEDING: 'Auth/OTP_Sending',
  OTP_VERIFICATION: 'Auth/OTP_Verification',
  RESET_PASSWORD: 'Auth/Reset_Password',
  OTP_SENDING: 'Auth/OTP_Sending',
  OTP_VERIFICATION: 'Auth/OTP_Verification',

  //Barbers End Points
  BARBER_SERVICES: 'Barber/Barber_Services',

  //Admin End Points
  BARBER_LIST: 'Admin/Barber_List',

  // Customer End Points
  SERVICE_CATEGORIES: 'Customer/Service_Categories',
};

export const messages = {
  WentWrong: 'Something went wrong, please try again later.',
  Catch:
    'May be your internet is not connected or there is something went wrong on server.',
  SeesionExpire: 'Your app session has been expired, please login again.',
};
