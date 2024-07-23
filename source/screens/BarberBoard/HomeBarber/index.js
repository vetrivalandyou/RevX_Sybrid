import React, { useEffect, useState } from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import { screenSize } from '../../../components/atom/ScreenSize';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import constants from '../../../AppConstants/Constants.json';

import Header from '../../../components/molecules/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Search from '../../../components/atom/Search/Search';
import { AppImages } from '../../../AppConstants/AppImages';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {
  getAsyncItem,
  getLogLatAsync,
  setLogLatAsync,
} from '../../../utils/SettingAsyncStorage';
import { endPoint, imageUrl } from '../../../AppConstants/urlConstants';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { UpdateLocation } from '../../../redux/Action/LocationAction/UpdateLocationAction';
import { PostRequest } from '../../../services/apiCall';
import { LATEST_UPDATE } from '../../../AppConstants/appConstants';
import useLocationWatcher from '../../../services/useLocationWatcher';
import { requestLocationPermissionAndGetLocation } from '../../../utils/GetLocation';
import CustomModal from '../../../components/molecules/CustomModal/CustomModal';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import SignalRService from '../../../services/SignalRService';
import { SET_INITIAL_DROPDOWN_FORM_STATE } from '../../../redux/ActionType/CrudActionTypes';

const HomeBarber = ({ navigation }) => {
  const { coords } = useSelector(state => state.LocationReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getAsyncData();
    }
  }, [isFocused]);

  const getAsyncData = async () => {
    const userAsyncDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userAsyncDetails);
    if (SignalRService?.isConnected()) {
      console.log('SignalR is in Connected State');
    } else {
      connectToSignalR(userAsyncDetails);
    }
  };

  const connectToSignalR = async userDetails => {
    SignalRService.startConnection(
      // parseInt(userDetails?.userId),
      // 0,
      parseInt(userDetails?._RoleId),
      userDetails?.userId.toString(),
    );
    SignalRService.onGetChatList_BB(json => {
      let parsedData = JSON.parse(json);
      console.log('Get Chat BB', parsedData);
      let data = {
        name: 'BarberInboxList',
        value: parsedData,
      };
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
    });
  };

  const handleLocationChange = newCoords => {
    console.log('newCoordsnewCoordsnewCoordsnewCoordsnewCoords', newCoords);
    handleSaveBarberLocation(userDetails, newCoords?.coords);
    setLogLatAsync(constants.AsyncStorageKeys.longLat, newCoords);
  };

  const handleSaveBarberLocation = (userAsyncDetails, newCoords) => {
    const payload = {
      barberId: userAsyncDetails?.userId,
      userLocationLatitude: newCoords?.latitude,
      userLocationLongitude: newCoords?.longitude,
      operations: LATEST_UPDATE,
      createdBy: userAsyncDetails?.userId,
    };
    PostRequest(endPoint.BARBER_LOCATION_UPDATE, payload)
      .then(res => {
        console.log('RESPONSE BARBER LOCATION UPDATE', res?.data);
      })
      .catch(err => {
        console.log('Err'.err);
      });
  };

  const handleClickReject = () => {
    console.log('Reject Clicked');
    setVisible(true);
  };

  const onPresssCancel = () => {
    setVisible(false);
  };

  const onPressSubmit = () => {
    console.log('Submited');
  };

  const CustomModalView = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.2,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: appColors.Goldcolor,
          }}>
          <Text
            style={{
              color: appColors.White,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Enter Reason your Reason
          </Text>
        </View>
        <View style={{ flex: 0.5, backgroundColor: appColors.White }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#F5F5F5',
              margin: 10,
              borderColor: appColors.AppLightGray,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              color: appColors.Black,
            }}
            multiline={true}
            textAlignVertical="top"
          />
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonComponent
              btnColor={appColors.White}
              btnTextColor={{ color: appColors.Goldcolor }}
              style={{
                width: '75%',
                borderWidth: 1,
                borderColor: appColors.Goldcolor,
              }}
              title={'Cancel'}
              onPress={onPresssCancel}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonComponent
              style={{
                backgroundColor: appColors.Goldcolor,
                width: '75%',
              }}
              title={'Submit'}
              onPress={onPressSubmit}
            />
          </View>
        </View>
      </View>
    );
  };

  useLocationWatcher(handleLocationChange);

  const data = [
    {
      id: 1,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
  ];

  const HomeHeader = ({ heading, sunHeading, source }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            {source == null ? (
              <Image
                source={AppImages?.slider1}
                style={{ width: 55, height: 55, borderRadius: 100 }}
              />
            ) : (
              <Image
                source={{ uri: `${imageUrl}${source}` }}
                style={{ width: 55, height: 55, borderRadius: 100 }}
              />
            )}
          </View>

          <View
            style={{
              flex: 0.8,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{ flex: 0.6 }}>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ fontSize: 20, color: appColors.White }}>
                  {heading}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 0.4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.darkgrey,
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <CustomIcon
                  onPress={() =>
                    navigation.navigate(
                      constants.BarberScreen.NotificationScreen,
                    )
                  }
                  type={Icons.FontAwesome5}
                  name={'bell'}
                  color={appColors.White}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  SignalRService.sendNotification(2)
                }}
                style={{
                  backgroundColor: appColors.darkgrey,
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  type={Icons.Feather}
                  name={'filter'}
                  color={appColors.White}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ListPrebooking = item => {
    return (
      <View
        style={{
          height: screenSize.height / 2.8,
          width: screenSize.width / 1.1,
          marginBottom: 10,
          backgroundColor: '#252525',
          borderWidth: 1,
          borderRadius: 20,
          borderColor: 'black',
          marginHorizontal: 3,
        }}>
        <View style={{ flex: 1, borderRadius: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{ flex: 0.6 }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  color: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Bookingbutton
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    height: 27,
                    flex: 0.8,
                  }}
                  stylebtn={{ color: 'white', fontSize: 13 }}
                  onPress={() =>
                    navigation.navigate(constants.BarberScreen.EReceipt)
                  }
                  title={'View E-Recipt'}
                />
              </View>
            </View>
          </View>

          <View style={{ height: 1, position: 'relative', marginHorizontal: 15 }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                borderWidth: 1,
                borderColor: appColors.Goldcolor,
                borderStyle: 'dashed',
                backgroundColor: 'transparent',
              }}></View>
          </View>

          {/* <View
            style={{
              fontSize: 25,
              marginHorizontal: 14,
              borderBottomWidth: 2,
              borderStyle: 'dashed',
              borderBottomColor: '#c79647',
            }}></View> */}

          <View
            style={{
              flexDirection: 'row',
              flex: 0.58,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ flex: 0.35, alignItems: 'center' }}>
              <Image
                source={item.item.Imagesource}
                style={{
                  height: '80%',
                  width: '82%',
                  borderRadius: 7,
                  marginTop: 5,
                }}
              />
            </View>
            <View style={{ flexDirection: 'column', flex: 0.63 }}>
              <Text style={{ fontSize: 22, fontWeight: '600', color: 'white' }}>
                {item.item.name}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#9E9E9E',
                    marginVertical: 9,
                  }}>
                  {item.item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 12, fontWeight: '400', color: '#c79647' }}>
                  {item.item.label}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Bookingbutton
              style={{ backgroundColor: '#c79647' }}
              stylebtn={{ color: 'white' }}
              title={'Accept'}
            />
            <Bookingbutton
              onPress={handleClickReject}
              style={{ backgroundColor: '#E81F1C', borderColor: 'red' }}
              stylebtn={{ color: 'white' }}
              title={'Reject'}
            />
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    SignalRService.onGetNotification((json) => {
      console.log("json", json)
    });
  }, [])

  return (
    <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 55}>
        <CustomModal
          visible={visible}
          modalHeight={{ height: screenSize.height / 3 }}
          CustomModalView={CustomModalView}
        />
        <View style={{ flex: 0.1 }}>
          <HomeHeader
            heading={userDetails?.userName}
            // sunHeading={'Washington DC'}
            source={userDetails?.profileImage}
          />
        </View>

        <View style={styles.searchBarContainer}>
          <Search />
        </View>

        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text style={{ fontSize: 22, color: appColors.White }}>
            Appointment
          </Text>
          <TouchableOpacity>
            <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.7 }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => <ListPrebooking item={item} />}
            // renderItem={({item}) => <listBookingCompleted item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default HomeBarber;

const styless = StyleSheet.create({
  container: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: appColors.darkgrey,
    borderColor: '#ccc',
    marginBottom: 10,
    overflow: 'hidden', // Ensures that the border radius is applied correctly
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width/height to create a circular image
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column', // Change to 'row' for horizontal arrangement
    //  backgroundColor:'red'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Add margin for spacing between name and earnings
    color: appColors.White,
  },
  earnings: {
    color: appColors.White,
    fontSize: 12,
    flexWrap: 'wrap',
  },
  Containerstyle: {
    height: screenSize.height / 2.8,
    width: screenSize.width / 1.13,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    marginHorizontal: 10,
  },
});
