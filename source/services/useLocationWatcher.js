import {Platform} from 'react-native';
import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, check, request} from 'react-native-permissions';

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
        } else {
          Geolocation.requestAuthorization('whenInUse').then(res => {
            setPermissionGranted(true);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        // Call the callback function with the new position
        callback(position.coords);
      },
      error => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, distanceFilter: 10}, // Adjust distanceFilter as needed
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [callback, permissionGranted]);
};

export default useLocationWatcher;
