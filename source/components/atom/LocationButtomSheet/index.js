import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import { screenSize } from '../ScreenSize';
import { PostRequest } from '../../../services/apiCall';
import { endPoint } from '../../../AppConstants/urlConstants';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import { LATEST_SELECT } from '../../../AppConstants/appConstants';
import constants from '../../../AppConstants/Constants.json';
import { ActivityIndicator } from 'react-native'; // Import the ActivityIndicator
import { Geolocation } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { requestLocationPermissionAndGetLocation } from '../../../utils/GetLocation';
import { SimpleSnackBar } from '../Snakbar/Snakbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationBottomSheet = ({ refRBSheet }) => {
  const navigation = useNavigation();

  const [locations, setLocations] = useState([]);
  const [id, setId] = useState(null);
  const [address, setAddress] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [locationName, setLocationName] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [locationLongitude, setLocationLongitude] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
  const [colorChange, setColorChange] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialGetLocationFields = {
    id: 0,
    locationName: '',
    locationLatitude: 0.0,
    locationLongitude: 0.0,
    address: '',
    nearestLandmark: '', // Corrected property name
    mobileNo: userDetails.userPhone,
    userId: userDetails.userId,
    operations: LATEST_SELECT,
    createdBy: userDetails.userId,
    userIP: '::1',
  };

  const handleUseMyCurrentLoc = async () => {
    var userCurrentLocation;
    if (Platform.OS == 'android') {
      userCurrentLocation = await requestLocationPermissionAndGetLocation();
      setCurrentLocation(userCurrentLocation);
    } else {
      Geolocation.requestAuthorization('whenInUse').then(res => {
        return new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              console.log('Inside', position);
              resolve(setCurrentLocation(position));
            },
            error => {
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        });
      });
    }
    console.log('currentLocation', currentLocation);
    if (currentLocation) {
      locatioDetails(currentLocation);
    }
  };

  // const locatioDetails = location => {
  //   const payload = {
  //     locationName: 'My Location',
  //     nearstLandmark: 'Nearst LandMark',
  //     id: userDetails?.userId,
  //     locationLatitude: location?.coords?.latitude,
  //     locationLongitude: location?.coords?.longitude,
  //     mobileNo: userDetails?.userPhone,
  //     userId: userDetails?.userId,
  //     address: 'Address',
  //     operations: 1,
  //     createdBy: userDetails?.userId,
  //     userIP: '::1',
  //   };
  //   console.log('payload.........', payload);
  //   PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
  //     .then(res => {
  //       if (res?.data?.code == 200) {
  //         console.log('api respob=nse.....', res.data);
  //         SimpleSnackBar(res?.data?.message);
  //       } else {
  //         SimpleSnackBar(res?.data?.message);
  //       }
  //     })
  //     .catch(err => {
  //       console.log("Hello", err)
  //       SimpleSnackBar(messages?.Catch, appColors.Red);
  //     });
  // };
  // useEffect(() => {
  //   const loadSelectedLocation = async () => {
  //     try {
  //       const storedLocation = await AsyncStorage.getItem('selectedLocation');
  //       if (storedLocation) {
  //         setSelectedLocation(JSON.parse(storedLocation));
  //       }
  //     } catch (error) {
  //       console.error('Error loading selected location:', error);
  //     }
  //   };
  //   loadSelectedLocation();
  // }, []);
  useEffect(() => {
    const loadSelectedLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('selectedLocation');
        if (storedLocation) {
          setSelectedLocation(JSON.parse(storedLocation));
        }
      } catch (error) {
        console.error('Error loading selected location:', error);
      }
    };
    loadSelectedLocation();
  }, []);

  const handleClickLocation = item => {
    setSelectedLocation(item);
    AsyncStorage.setItem('selectedLocation', JSON.stringify(item));
    setSelectedLocation(item); // Update selected location
    setSelectedItem(item);
    setId(item?.id);
    setLocationName(item?.locationName);
    setLocationLatitude(item?.locationLatitude);
    setLocationLongitude(item?.locationLongitude);
    setAddress(item?.address);
    setNearestLandmark(item?.nearestLandmark);
  };

  const locatioDetails = location => {
    const payload = {
      locationName: 'Location New',
      nearstLandmark: 'Nearst LandMark New',
      id: userDetails?.userId,
      locationLatitude: location?.coords?.latitude,
      locationLongitude: location?.coords?.longitude,
      mobileNo: userDetails?.userPhone,
      userId: userDetails?.userId,
      address: 'Address',
      operations: 1,
      createdBy: userDetails?.userId,
      userIP: '::1',
    };
    console.log('payload.........', payload);

    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          console.log('api respob=nse.....', res.data);
          SimpleSnackBar(res?.data?.message);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages?.Catch, appColors.Red);
      });
  };

  const getAsyncData = async () => {
    const userDetailsData = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetailsData);
  };

  useEffect(() => {
    getAsyncData();
    fetchLocations();
    handleConfirmLocation()
  }, []);

  const fetchLocations = () => {
    PostRequest(endPoint.BARBER_GET_SET_UP_LOCATION, initialGetLocationFields)
      .then(res => {
        if (res?.data?.code === 200) {
          setIsLoading(false);
          setLocationList(res?.data?.data);
        } else {
        }
      })
      .catch(err => {
        // console.log('Error while fetching locations', err);
      });
  };

  // const handleLocation = () => {
  //   handleUseMyCurrentLoc();
  //   // refRBSheet.current.close();
  // };
  const handleClickEdit = item => {
    console.log(item);
    navigation.navigate(constants.screen.MyLocation, {
      item: item,
    });
  };
  const openLocationScreen = () => {
    navigation.navigate(constants.screen.MyLocation);
  };

 const handleConfirmLocation = async () => {
  try {
    if (selectedLocation) {
      await AsyncStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
      console.log('Selected location stored successfully:', selectedLocation);
      // Optionally, you can close the bottom sheet here if needed
      // refRBSheet.current.close();
    } else {
      console.log('No location selected');
    }
  } catch (error) {
    console.error('Error storing selected location:', error);
  }
};
  const LocationList = ({ item }) => {
    return (
      <View
        style={{
          height: screenSize.height / 15,
          width: 'auto',
          margin: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            handleClickLocation(item);
          }}
          style={[
            lbStyle.clSelectLocation,
            {
              backgroundColor: selectedLocation?.id === item.id ? '#202020' : appColors.Black,
            },
          ]}>
          <View style={lbStyle.clIconView}>
            <View style={lbStyle.OuterCircle}>
              {selectedLocation?.id === item.id && (
                <View style={lbStyle.innerCircle}></View>
              )}
            </View>
          </View>
          <View style={[lbStyle.clTextView, { flex: 0.7 }]}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              {item.locationName}
            </Text>
          </View>
          {selectedLocation?.id === item.id && (
            <View style={[lbStyle.clTextView, { flex: 0.1 }]}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'edit-location-alt'}
                size={20}
                color={appColors.White}
                onPress={() => handleClickEdit(item)}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={lbStyle.mainContainer}>
      <TouchableOpacity
        onPress={handleUseMyCurrentLoc}
        style={[lbStyle.clContainer]}>
        <View style={lbStyle.clIconView}>
          <CustomIcon
            // onPress={locatioDetails}
            type={Icons.Ionicons}
            name={'paper-plane-sharp'}
            size={20}
            color={appColors.White}
          />
        </View>
        <View style={lbStyle.clTextView}>
          <Text style={lbStyle.clTextStyle}>Use Current Location</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 0.6 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color={appColors.Goldcolor} /> // Render the loader
        ) : (
          <FlatList
            data={locationList}
            keyExtractor={item => item.id.toString()} // Ensure key is a string
            renderItem={({ item, index }) => {
              // console.log('Current item:', item);
              return <LocationList item={item} index={index} />;
            }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={openLocationScreen}
        style={lbStyle.clContainer}>
        <View style={lbStyle.clIconView}>
          <CustomIcon
            type={Icons.Entypo}
            name={'plus'}
            size={20}
            color={appColors.White}
          />
        </View>
        <View style={lbStyle.clTextView}>
          <Text style={lbStyle.clTextStyle}>Add New Location</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleConfirmLocation} // Update onPress event
        style={[
          lbStyle.clContainer,
          { justifyContent: 'center', alignItems: 'flex-end' },
        ]}>
        <View style={lbStyle.clButotnView}>
          <Text style={[lbStyle.clTextStyle, { textAlign: 'center' }]}>
            Confirm Location
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColors.Black,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  clContainer: { flex: 0.13, flexDirection: 'row' },
  clIconView: { flex: 0.15, justifyContent: 'center', alignItems: 'center' },
  clTextView: { flex: 0.8, justifyContent: 'center' },
  clTextStyle: { fontSize: 13, fontWeight: '500', color: appColors.White },
  clSelectLocation: {
    flex: 1,
    borderRadius: 20,
    flexDirection: 'row',
  },
  OuterCircle: {
    height: 25,
    width: 25,
    borderRadius: 40,
    borderColor: appColors.Goldcolor,
    borderWidth: 2,
    backgroundColor: appColors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 40,
    backgroundColor: appColors.Goldcolor,
    position: 'absolute',
  },
  clButotnView: {
    backgroundColor: appColors.Goldcolor,
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default LocationBottomSheet;
