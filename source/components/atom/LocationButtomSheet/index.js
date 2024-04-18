import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../ScreenSize';
import {PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import {LATEST_SELECT} from '../../../AppConstants/appConstants';
import constants from '../../../AppConstants/Constants.json';
import {ActivityIndicator} from 'react-native'; // Import the ActivityIndicator
import {Geolocation} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LocationBottomSheet = ({handleUseMyCurrentLoc, refRBSheet}) => {
  const [locations, setLocations] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [id, setId] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [locationLongitude, setLocationLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
  const [colorChange, setColorChange] = useState(true);
  const navigation = useNavigation();

  const handleClickLocation = item => {
    setSelectedItem(item);
    setId(item?.id);
    setLocationName(item?.locationName);
    setLocationLatitude(item?.locationLatitude);
    setLocationLongitude(item?.locationLongitude);
    setAddress(item?.address);
    setNearestLandmark(item?.nearestLandmark);
  };

  const handleClickEdit = () => {
    navigation.navigate(constants.screen.MyLocation);
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
  }, []);

  const payload = {
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

  const fetchLocations = () => {
    PostRequest(endPoint.BARBER_GET_SET_UP_LOCATION, payload)
      .then(res => {
        if (res?.data?.code === 200) {
          setIsLoading(false);
          setLocations(res?.data?.data);
        } else {
          // console.log('Error fetching locations:', res?.data?.message);
        }
      })
      .catch(err => {
        // console.log('Error while fetching locations', err);
      });
  };

  const handleLocation = () => {
    handleUseMyCurrentLoc();
    // refRBSheet.current.close();
  };

  const openLocationScreen = () => {
    navigation.navigate(constants.screen.MyLocation),
      refRBSheet.current.close();
  };
  console.log('location id ///////////', selectedItem?.id);

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
          key={item?.id}
          onPress={() => {
            handleClickLocation(item);
          }}
          style={[
            lbStyle.clSelectLocation,
            {
              backgroundColor:
                selectedItem?.id == item.id ? '#202020' : appColors.Black,
            },
          ]}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                selectedItem?.LocationId == item.LocationId && {
                  backgroundColor: appColors.White,
                },
              ]}>
              {selectedItem?.id == item.id && (
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
          {selectedItem?.id == item.id && (
            <View style={[lbStyle.clTextView, {flex: 0.1}]}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'edit-location-alt'}
                size={20}
                color={appColors.White}
                onPress={handleClickEdit}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={lbStyle.mainContainer}>
      <TouchableOpacity onPress={handleLocation} style={[lbStyle.clContainer]}>
        <View style={lbStyle.clIconView}>
          <CustomIcon
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
          <ActivityIndicator size="large" color={appColors.Goldcolor} /> // Render the loader
        ) : (
          <FlatList
            data={locations}
            keyExtractor={item => item.id.toString()} // Ensure key is a string
            renderItem={({item, index}) => {
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
        onPress={() => refRBSheet.current.close()}
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
