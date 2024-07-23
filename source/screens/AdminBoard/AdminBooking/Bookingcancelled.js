import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useEffect, useRef, useState} from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
import {useIsFocused} from '@react-navigation/native';
import {endPoint} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import moment from 'moment';
import appColors from '../../../AppConstants/appColors';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import CustomModal from '../../../components/molecules/CustomModal/CustomModal';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import {debounce} from '../../../functions/AppFunctions';

const initialAdminBookingCancelFieds = {
  operationID: 6,
  roleID: 0,
  customerID: 0,
  userID: 0,
  userIP: 'string',
  _PageNumber: 0,
  _RowsOfPage: 10,
};

const Bookingcancelled = ({userDetails}) => {
  const isFocused = useIsFocused();

  const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelledBooking, setCancelledBooking] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cancelledItem, setCancelledItem] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isFocused) getCancelledBooking();
    return () => clearTimeout(timeoutRef.current);
  }, [isFocused]);

  const getCancelledBooking = () => {
    if (hasMore == false) return;
    const payload = {
      ...initialAdminBookingCancelFieds,
      operationID: 6,
      roleID: userDetails?._RoleId,
      userID: userDetails?.userId,
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    };
    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('getPreBookings Response', res?.data);
        if (res?.data?.Table?.length > 0) {
          setCancelledBooking(res?.data?.Table);
          setPageNumber(pageNumber + 1); // Increment the page number
          setIsLoading(false);
        } else {
          setHasMore(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const ListBookingCanceled = ({item}) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1}}>
          <View style={styles.ContainerInnerview}>
            <View style={styles.Dateview}>
              <Text style={styles.DateTextstyle}>
                {moment(item?.BookingDate).format('DD-MM-YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>

            <View style={{flex: item?.StatusID == 12 ? 0.25 : 0.4}}>
              <Completedbutton
                title={
                  item?.StatusID == 12 ? 'Cancel' : 'Request for Cancellation'
                }
                style={{backgroundColor: '#e81f1c'}}
                textstyle={{color: 'white'}}
                onPress={() => {
                  console.log('item', item);
                  if (item?.StatusID == 13) {
                    setCancelledItem(item);
                    setVisible(true);
                  }
                }}
              />
            </View>
          </View>

          <View style={styles.DashedrowView}>
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

          <View style={[styles.ContainerSecondview]}>
            <View style={styles.imageView}>
              <Image
                source={item.BarberProfileImage}
                style={styles.imageStyle}
              />
            </View>
            <View style={[styles.Textview]}>
              <Text style={styles.nameStyle}>{item?.BarberName}</Text>
              <View>
                <Text style={styles.titleStyle}>{item.CustomerName}</Text>
              </View>
              <View>
                <Text style={styles.labelStyle}>{item.serviceNames}</Text>
              </View>
              <View
                style={{
                  height: 'auto',
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: appColors.AppLightGray,
                    marginRight: 5,
                  }}>
                  Reason:
                </Text>
                <Text style={styles.labelStyle}>
                  {item.IsBarberRejectRequestRemarks == null
                    ? 'No Reason'
                    : item.IsBarberRejectRequestRemarks}
                  {/* Hello My name is anas and i am not feeling well thats why i
                  dont want to complete */}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (hasMore == false) return null;
    return (
      <View style={{margin: 10}}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    );
  };

  const handleLoadMore = debounce(() => {
    if (hasMore == true) {
      getCancelledBooking();
    }
  }, 300);

  const onPressReject = () => {
    console.log('Rejected');
    getAcceptRejectAppointment(5);
  };

  const onPressAccept = () => {
    console.log('Accept');
    getAcceptRejectAppointment(4);
  };

  const getAcceptRejectAppointment = operation => {
    const payload = {
      ...initialAdminBookingCancelFieds,
      operationID: operation,
      bookingDate: cancelledItem?.BookingDate,
      barbarBookedSlotID: cancelledItem?.BarbarBookedSlotID,
    };
    console.log('payload', payload);

    PostRequest(endPoint.ADMIN_APPOINTMENT_UAR, payload)
      .then(res => {
        console.log('Booking Accept Or Reject', res?.data);
        if (res?.data?.[0]?.Haserror == 0) {
          SimpleSnackBar(res?.data?.[0]?.Message);
          timeoutRef.current = setTimeout(() => setVisible(false), 3000);
        } else {
          SimpleSnackBar(res?.data?.[0]?.Message);
        }
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(res?.data?.[0]?.Message, appColors.Red);
      });
  };

  const CustomModalView = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.55,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: appColors.Goldcolor,
          }}>
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: appColors.White,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Are you sure?
            </Text>
          </View>
          <View
            style={{
              flex: 0.55,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: appColors.White,
                fontWeight: '400',
                fontSize: 15,
                textAlign: 'center',
              }}>
              You want to Accept Barber Cancellation request?
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
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
              btnTextColor={{color: appColors.Goldcolor}}
              style={{
                width: '75%',
                borderWidth: 1,
                borderColor: appColors.Goldcolor,
              }}
              title={'Reject'}
              onPress={onPressReject}
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
              title={'Accept'}
              onPress={onPressAccept}
            />
          </View>
        </View>
      </View>
    );
  };

  const onRequestClose = () => {
    setVisible(false);
  };

  return (
    <>
      <CustomModal
        visible={visible}
        onRequestClose={onRequestClose}
        modalHeight={{height: screenSize.height / 4}}
        CustomModalView={CustomModalView}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : cancelledBooking?.length > 0 ? (
        <FlatList
          data={cancelledBooking}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={({item, index}) => <ListBookingCanceled item={item} />}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BoxLottie
            animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
          />
        </View>
      )}
    </>
  );
};

export default Bookingcancelled;
