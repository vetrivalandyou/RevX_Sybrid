import React, { useEffect, useRef, useState } from 'react';

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
  ActivityIndicator,
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
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import { INCREMENT_NOTIFICATION_COUNT, RESET_NOTIFICATION_COUNT } from '../../../redux/ActionType/NotificationActionTypes';
import moment from 'moment';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';

const initialOperationFields = {
  operationID: 0,
  durationMinutes: 0,
  barberID: 0,
  barberName: '',
  slotID: 0,
  slotName: '',
  customerID: 0,
  customerName: '',
  bookingDate: '2024-06-20T11:40:48.693Z',
  transactionID: '',
  isPaid: 0,
  services: '',
  isActive: true,
  userID: 0,
  userIP: '',
  longitude: 0,
  latitude: 0,
  locationName: '',
  remarks: '',
  barbarBookedSlotID: 0,
}

const HomeBarber = ({ navigation }) => {
  const { coords } = useSelector(state => state.LocationReducer);
  const { Notification } = useSelector(state => state.NotificationReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const barberRemarksRef = useRef(null);
  const [userDetails, setUserDetails] = useState();
  const [visible, setVisible] = useState(false);
  const [todaysBooking, setTodaysBookingList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rejectedBookingData, setRejectedBookingData] = useState({});

  console.log("NotificationCount", Notification)

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
    getTodaysBooking(userAsyncDetails)
    if (SignalRService?.isConnected()) {
      console.log('SignalR is in Connected State');
    } else {
      console.log("Inside Else")
      connectToSignalR(userAsyncDetails);
    }
  };

  const connectToSignalR = async userDetails => {
    SignalRService.startConnection(
      parseInt(userDetails?._RoleId),
      userDetails?.userId.toString(),
      dispatch
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

    SignalRService.onGetChatList_CC(json => {
      let parsedData = JSON.parse(json);
      console.log('onGetChatList_CC', parsedData);
    });
  };

  // const handleLocationChange = newCoords => {
  //   console.log('newCoordsnewCoordsnewCoordsnewCoordsnewCoords', newCoords);
  //   handleSaveBarberLocation(userDetails, newCoords?.coords);
  //   setLogLatAsync(constants.AsyncStorageKeys.longLat, newCoords);
  // };

  // const handleSaveBarberLocation = (userAsyncDetails, newCoords) => {
  //   const payload = {
  //     barberId: userAsyncDetails?.userId,
  //     userLocationLatitude: newCoords?.latitude,
  //     userLocationLongitude: newCoords?.longitude,
  //     operations: LATEST_UPDATE,
  //     createdBy: userAsyncDetails?.userId,
  //   };
  //   console.log("Payload", payload)
  //   PostRequest(endPoint.BARBER_LOCATION_UPDATE, payload)
  //     .then(res => {
  //       console.log('RESPONSE BARBER LOCATION UPDATE', res?.data);
  //     })
  //     .catch(err => {
  //       console.log('Err'.err);
  //     });
  // };

  // useLocationWatcher(handleLocationChange);

  const handleClickReject = (item) => {
    console.log('Reject Clicked');
    setRejectedBookingData(item);
    setVisible(true);
  };

  const onPresssCancel = () => {
    setVisible(false);
  };

  const onPressSubmit = () => {
    console.log('Submited', barberRemarksRef.current);
    handleReject();
  };

  const handleReject = () => {
    const payload = {
      ...initialOperationFields,
      operationID: 9,
      remarks: barberRemarksRef.current,
      barberID: rejectedBookingData?.BarbarID,
      customerID: rejectedBookingData?.CustomerID,
      bookingDate: rejectedBookingData?.BookingDate,
      barbarBookedSlotID: rejectedBookingData?.BarbarBookedSlotID,
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.Table?.[0]?.HassError == 0) {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message);
          SignalRService.sendNotification(parseInt(res?.data?.Table?.[0]?.NotificationID))
          timeoutRef.current = setTimeout(() => setVisible(false), 3000);
          reCallPreBooking();
        } else {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
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
            onChangeText={newText => (barberRemarksRef.current = newText)}
            value={barberRemarksRef.current}
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
              disable={barberRemarksRef?.current == '' ? true : false}
            />
          </View>
        </View>
      </View>
    );
  };

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
                onPress={() => {
                  console.log("onPress")
                  navigation.navigate(
                    constants.BarberScreen.NotificationScreen,
                  )
                }}
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
                  type={Icons.FontAwesome5}
                  name={'bell'}
                  color={appColors.White}
                  size={20}
                />
                {
                  Notification?.length > 0 && (
                    <View style={{ position: 'absolute', top: -10, left: 30, width: 25, height: 25, borderRadius: 50, backgroundColor: appColors.Goldcolor, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: appColors.White, fontSize: 12 }}>{Notification?.length}</Text>
                    </View>
                  )
                }

              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => {
                //   SignalRService.sendNotification(50)
                // }}
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

  const handleClickAccept = item => {
    const payload = {
      ...initialOperationFields,
      operationID: 8,
      remarks: 'Accepted',
      barberID: item?.BarbarID,
      customerID: item?.CustomerID,
      bookingDate: item?.BookingDate,
      barbarBookedSlotID: item?.BarbarBookedSlotID,
    };
    console.log('reCallPreBooking payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        const { Table } = res?.data
        if (Table?.[0]?.HassError == 0) {
          getTodaysBooking();
          SimpleSnackBar(Table?.[0]?.Message);
          console.log("Table?.[0]?.NotificationID.toString()", Table?.[0]?.NotificationID.toString())
          SignalRService.sendNotification(parseInt(Table?.[0]?.NotificationID))
        } else {
          SimpleSnackBar(Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleMarkAsCompleted = (item) => {
    const payload = {
      ...initialOperationFields,
      operationID: 12,
      remarks: '',
      barberID: item?.BarbarID,
      customerID: item?.CustomerID,
      bookingDate: item?.BookingDate,
      barbarBookedSlotID: item?.BarbarBookedSlotID,
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        const { Table } = res?.data;
        if (Table?.[0]?.HassError == 0) {
          SimpleSnackBar(Table?.[0]?.Message);
          SignalRService.sendNotification(parseInt(Table?.[0]?.NotificationID))
          getTodaysBooking();
        } else {
          SimpleSnackBar(Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  const ListPrebooking = ({ item, index, }) => (
    <View key={index} style={styles.bookingContainerstyle}>
      <View style={{ flex: 1, borderRadius: 20 }}>
        <View style={styles.bookingInnercontainerView}>
          <View style={styles.bookingTextview}>
            <Text style={styles.dateTextstyle}>
              {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
              {item?.SlotName}
            </Text>
          </View>
          <View style={styles.EreciptButtonView}>
            <View style={styles.EreciptInnerView}>
              <Bookingbutton
                style={styles.EreciptButtonstyle}
                stylebtn={{ color: appColors.White, fontSize: 11 }}
                onPress={() =>
                  navigation.navigate(constants.BarberScreen.BarberEReceipt, {
                    bookingSlot: item,
                  })
                }
                title={'View E-Recipt'}
              />
            </View>
          </View>
        </View>

        <View style={styles.DashLineView}>
          <View style={styles.DashLinestyle}></View>
        </View>

        <View
          style={[styles.imagetextContainerView, { paddingHorizontal: 15 }]}>
          <View style={styles.bookingImageview}>
            <Image
              source={{ uri: `${imageUrl}${item.CustomerProfileImage}` }}
              style={styles.bookingImagestyle}
            />
          </View>
          <View style={styles.bookingTextview}>
            <Text style={styles.Nametext}>{item.CustomerName}</Text>
            <View>
              <Text style={styles.Titletext}>{item.LocationName}</Text>
            </View>
            <View>
              <Text style={styles.Labeltext}>{item?.serviceNames}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ButtonsView}>
          {
            item?.StatusID == 9 || item?.StatusID == 13 ?
              (
                <Bookingbutton
                  onPress={() => {
                    if (item?.IsPaid == true) handleMarkAsCompleted(item)
                  }}
                  style={{ width: "80%", backgroundColor: item?.StatusID == 13 ? appColors.Red : appColors.Accepted, borderColor: item?.StatusID == 13 ? appColors.Red : appColors.Accepted }}
                  stylebtn={{ color: 'white' }}
                  title={item?.StatusID == 13 ? "Request for Rejection" : 'Mark as Completed'}
                />
              ) :
              (
                <>
                  <Bookingbutton
                    onPress={() => handleClickAccept(item)}
                    style={{ backgroundColor: '#c79647' }}
                    stylebtn={{ color: 'white' }}
                    title={'Accept'}
                  />
                  <Bookingbutton
                    onPress={() => handleClickReject(item)}
                    style={{ backgroundColor: '#E81F1C', borderColor: 'red' }}
                    stylebtn={{ color: 'white' }}
                    title={'Reject'}
                  /></>
              )
          }
        </View>
      </View>
    </View>
  )

  const getTodaysBooking = () => {
    const payload = {
      operationID: 7,
      roleID: userDetails?._RoleId,
      customerID: 0,
      userID: userDetails?.userId,
      userIP: 'string',
      _PageNumber: 1,
      _RowsOfPage: 20,
    };

    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('Todays Pre Booking Response', res?.data);
        setTodaysBookingList(res?.data?.Table);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>
      <View style={{
        minHeight: screenSize.height / 1.2,
        maxHeight: 'auto',
      }}>
        <View style={{ flex: 1 }}>
          <CustomModal
            visible={visible}
            modalHeight={{ height: screenSize.height / 3 }}
            CustomModalView={CustomModalView}
          />
          <View style={{ flex: 0.1 }}>
            <HomeHeader
              heading={userDetails?.userName}
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
            <TouchableOpacity onPress={() => navigation.navigate(constants.BarberScreen.AllBookings)}>
              <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0.7 }}>
            {
              isLoading ?
                (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='small' color={appColors.Goldcolor} />
                  </View>
                ) :
                (
                  todaysBooking?.length > 0 ?
                    (
                      <FlatList
                        data={todaysBooking}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={({ item, index }) => <ListPrebooking item={item} />}
                      />
                    ) :
                    (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <BoxLottie
                          animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
                        />
                        <Text style={{ color: appColors.White, fontSize: 15, marginTop: 5 }}>No Current Appointment</Text>
                      </View>
                    )
                )
            }
          </View>
        </View>
      </View>
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
