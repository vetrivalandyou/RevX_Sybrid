import {Platform} from 'react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermissionAndGetLocation = async () => {
  try {
    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    const permissionStatus = await check(permission);
    if (permissionStatus === RESULTS.GRANTED) {
      return getCurrentLocation();
    } else if (permissionStatus === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        return getCurrentLocation();
      } else {
        throw new Error('Location permission not granted');
      }
    } else {
      throw new Error('Location permission denied by user');
    }
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position;
        resolve(position);
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
};

// Geolocation.requestAuthorization('whenInUse').then(res => {
//   console.log('asas', res);
//   Geolocation.getCurrentPosition(
//     position => {
//       console.log('IOS Position', position);
//       // dispatch(UpdateLocation(position));
//     },
//     error => {
//       console.log(error.code, error.message);
//     },
//     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//   );
// });
