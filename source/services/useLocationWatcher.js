import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const useLocationWatcher = callback => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  useEffect(() => {
    const requestPermission = async () => {
      try {
        let permission;
        if (Platform.OS === 'android') {
          permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          const permissionStatus = await check(permission);
          if (permissionStatus === RESULTS.GRANTED) {
            setPermissionGranted(true);
          } else if (permissionStatus === RESULTS.DENIED) {
            const requestResult = await request(permission);
            if (requestResult === RESULTS.GRANTED) {
              setPermissionGranted(true);
            } else {
              throw new Error('Location permission not granted');
            }
          } else {
            throw new Error('Location permission denied by user');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
      }
    };

    requestLocationPermission();
  }, []);


  useEffect(() => {
    if (Platform.OS == 'ios') {
      Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse' });
    }
    const watchId = Geolocation.watchPosition(
      position => {
        console.log("asdasdasdasdsadasdasdasdasdadssdaasd----------------------------")
        callback(position);
      },
      error => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }, // Adjust distanceFilter as needed
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [callback, permissionGranted]);
};

export default useLocationWatcher;
