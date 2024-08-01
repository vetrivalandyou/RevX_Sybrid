import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../ScreenSize';
import {GetRequest, PostRequest} from '../../../services/apiCall';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import {
  LATEST_INSERT,
  LATEST_SELECT,
  LATEST_UPDATE,
  SUCCESS_CODE,
} from '../../../AppConstants/appConstants';
import constants from '../../../AppConstants/Constants.json';
import {ActivityIndicator} from 'react-native'; // Import the ActivityIndicator
import {useNavigation} from '@react-navigation/native';
import {requestLocationPermissionAndGetLocation} from '../../../utils/GetLocation';
import {SimpleSnackBar} from '../Snakbar/Snakbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const LocationBottomSheet = ({refRBSheet, setHomeScreenLocation}) => {
  const navigation = useNavigation();
  const [locationList, setLocationList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [makingAsyncData, setMakingAsyncData] = useState();

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const userDetailsData = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetailsData);
    fetchLocations(userDetailsData);
  };

  const fetchLocations = userDetailsData => {
    const payload = {
      id: 0,
      locationName: '',
      locationLatitude: 0.0,
      locationLongitude: 0.0,
      address: '',
      nearestLandmark: '', // Corrected property name
      mobileNo: userDetailsData.userPhone,
      userId: userDetailsData.userId,
      operations: LATEST_SELECT,
      createdBy: userDetailsData.userId,
      userIP: '::1',
    };
    PostRequest(endPoint.BARBER_GET_SET_UP_LOCATION, payload)
      .then(res => {
        console.log('Response Fetch Location', res?.data);
        if (res?.data?.code === SUCCESS_CODE) {
          setLocationList(res?.data?.data);
        } else {
          // SimpleSnackBar(res?.data?.message, appColors.Red);
          console.log(res?.data?.message);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log('Error while fetching locations', err);
      });
  };

  useEffect(() => {
    const loadSelectedLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem(
          constants?.AsyncStorageKeys?.selected_Location,
        );
        if (storedLocation) {
          setSelectedLocation(JSON.parse(storedLocation));
        }
      } catch (error) {
        console.error('Error loading selected location:', error);
      }
    };
    loadSelectedLocation();
  }, []);

  const handleUseMyCurrentLoc = async () => {
    var userCurrentLocation;
    if (Platform.OS == 'android') {
      userCurrentLocation = await requestLocationPermissionAndGetLocation();
    } else {
      await Geolocation.requestAuthorization('whenInUse');
      // return new Promise((resolve, reject) => {
      await Geolocation.getCurrentPosition(
        position => {
          console.log('Inside', position);
          userCurrentLocation = position;
          fetchAddress(userCurrentLocation);
          AsyncStorage.setItem(
            constants?.AsyncStorageKeys?.longLat,
            JSON.stringify(userCurrentLocation),
          );
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      // });
      // });
    }
    if (userCurrentLocation) {
      fetchAddress(userCurrentLocation);
      await AsyncStorage.setItem(
        constants?.AsyncStorageKeys?.longLat,
        JSON.stringify(userCurrentLocation),
      );
    }
  };

  const fetchAddress = userCurrentLocation => {
    console.log('Fw=ecth');
    GetRequest(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userCurrentLocation?.coords?.latitude},${userCurrentLocation?.coords?.longitude}&key=AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0`,
    )
      .then(res => {
        console.log(
          'Hello sjhkjahkjah',
          res?.data?.results?.[0]?.address_components?.[3]?.long_name,
        );
        AsyncStorage.setItem(
          constants?.AsyncStorageKeys?.address,
          JSON.stringify(res?.data?.results?.[0]?.formatted_address),
        );
        AsyncStorage.setItem(
          constants?.AsyncStorageKeys?.nearest_landmark,
          JSON.stringify(
            res?.data?.results?.[0]?.address_components?.[3]?.long_name,
          ),
        );
        setHomeScreenLocation(res?.data?.results?.[0]?.address_components?.[3]?.long_name)
        locatioDetails(userCurrentLocation, res?.data?.results?.[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClickLocation = item => {
    console.log("Item", item)
    const makingData = {
      coords: {
        latitude: item?.locationLatitude,
        longitude: item?.locationLongitude,
      },
    };
    console.log('makingData', makingData);
    setMakingAsyncData(makingData);
    setSelectedLocation(item);
  };

  const locatioDetails = (location, address) => {
    const payload = {
      id: 0,
      locationName: address?.address_components?.[3]?.long_name,
      locationLatitude: location?.coords?.longitude,
      locationLongitude: location?.coords?.latitude,
      address: address?.formatted_address,
      nearstLandmark: address?.address_components?.[3]?.long_name,
      mobileNo: 'string',
      userId: userDetails?.userId,
      operations: LATEST_INSERT,
      createdBy: userDetails?.userId,
      userIP: '',
    };
    console.log('payloadpayloadpayload????????????', payload);
    PostRequest(endPoint.BARBER_SET_UP_LOCATION_SERVICES, payload)
      .then(res => {
        if (res?.data?.code == SUCCESS_CODE) {
          SimpleSnackBar(res?.data?.message);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        refRBSheet.current.close();
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(messages?.Catch, appColors.Red);
      });
  };

  const handleClickEdit = item => {
    console.log(item);
    refRBSheet.current.close();
    navigation.navigate(constants.screen.MyLocation, {
      item: item,
    });
  };

  const AddNewLocation = () => {
    refRBSheet.current.close();
    navigation.navigate(constants.screen.MyLocation, {
      newLocation: true,
    });
  };

  const handleConfirmLocation = async () => {
    console.log('makingAsyncData', makingAsyncData);
    console.log('selectedLocation', selectedLocation);
    try {
      if (makingAsyncData) {
        await AsyncStorage.setItem(
          constants?.AsyncStorageKeys?.longLat,
          JSON.stringify(makingAsyncData),
        );
        await AsyncStorage.setItem(
          constants?.AsyncStorageKeys?.selected_Location,
          JSON.stringify(selectedLocation),
        );
        await AsyncStorage.setItem(
          constants?.AsyncStorageKeys?.nearest_landmark,
          JSON.stringify(selectedLocation?.nearstLandmark),
        );
        setHomeScreenLocation(selectedLocation?.nearstLandmark)
        refRBSheet.current.close();
      } else {
        console.log('No location selected');
      }
    } catch (error) {
      console.error('Error storing selected location:', error);
    }
  };

  const LocationList = ({item}) => {
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
              backgroundColor:
                selectedLocation?.id === item.id ? '#202020' : appColors.Black,
            },
          ]}>
          <View style={lbStyle.clIconView}>
            <View style={lbStyle.OuterCircle}>
              {selectedLocation?.id === item.id && (
                <View style={lbStyle.innerCircle}></View>
              )}
            </View>
          </View>
          <View style={[lbStyle.clTextView, {flex: 0.7}]}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              {item.locationName}
            </Text>
          </View>
          {/* {selectedLocation?.id === item.id && (
            <View style={[lbStyle.clTextView, {flex: 0.1}]}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'edit-location-alt'}
                size={20}
                color={appColors.White}
                onPress={() => handleClickEdit(item)}
              />
            </View>
          )} */}
        </TouchableOpacity>
      </View>
    );
  };

  console.log('locationListlocationListlocationListlocationList', locationList);
  console.log('isLoadingisLoadingisLoadingisLoading', isLoading);

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
      <View style={{flex: 0.6}}>
        {isLoading ? (
          <ActivityIndicator size="large" color={appColors.Goldcolor} />
        ) : locationList?.length > 0 ? (
          <FlatList
            data={locationList}
            keyExtractor={item => item.id.toString()} // Ensure key is a string
            renderItem={({item, index}) => {
              return <LocationList item={item} index={index} />;
            }}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                color: appColors.Goldcolor,
              }}>
              No saved location available
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={AddNewLocation} style={lbStyle.clContainer}>
        <View style={lbStyle.clIconView}>
          <CustomIcon
            type={Icons.Entypo}
            name={'plus'}
            size={18}
            color={appColors.White}
            // style={{}}
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
          {justifyContent: 'center', alignItems: 'flex-end'},
        ]}>
        <View style={lbStyle.clButotnView}>
          <Text style={[lbStyle.clTextStyle, {textAlign: 'center'}]}>
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
  clContainer: {flex: 0.13, flexDirection: 'row'},
  clIconView: {flex: 0.15, justifyContent: 'center', alignItems: 'center'},
  clTextView: {flex: 0.8, justifyContent: 'center'},
  clTextStyle: {fontSize: 13, fontWeight: '500', color: appColors.White},
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
