import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from "react-native-geolocation-service"

const GetLocation = async () => {
  // var result;
  if (Platform.OS == 'android') {
    const result = requestLocationPermission();
    result.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log('Android Position', position);
          },
          error => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    })
  } else {
    Geolocation.requestAuthorization("whenInUse").then((res) => {
      console.log("asas", res)
      Geolocation.getCurrentPosition(
        position => {
          console.log('IOS Position', position);
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    })
  }

};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default GetLocation;