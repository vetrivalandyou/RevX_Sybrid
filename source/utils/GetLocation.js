import {Platform} from 'react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermissionAndGetLocation = async roleId => {
  try {
    let permission;
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const permissionStatus = await check(permission);
      if (permissionStatus === RESULTS.GRANTED) {
        if (roleId == 3) {
          return watchUserLocation();
        } else {
          return getCurrentLocation();
        }
      } else if (permissionStatus === RESULTS.DENIED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          if (roleId == 3) {
            return watchUserLocation();
          } else {
            return getCurrentLocation();
          }
        } else {
          throw new Error('Location permission not granted');
        }
      } else {
        throw new Error('Location permission denied by user');
      }
    } else {
      Geolocation.requestAuthorization('whenInUse').then(res => {
        return new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position;
              console.log('Inside', position);
              resolve(position);
            },
            error => {
              reject(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position;
        console.log('Inside', position);
        resolve(position);
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
};

export const watchUserLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve(position);
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  });
};
