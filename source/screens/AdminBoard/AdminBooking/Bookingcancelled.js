import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
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

const Bookingcancelled = ({data, userDetails, initialBookingFields}) => {
  const isFocused = useIsFocused();

  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [userCancelledBooking, setUserCancelledBooking] = useState([]);
  const [cancelledItem, setCancelledItem] = useState({});

  useEffect(() => {
    if (isFocused) getBookingCancelled();
    return () => clearTimeout(timeoutRef.current);
  }, [isFocused]);

  const getBookingCancelled = () => {
    const payload = {
      ...initialBookingFields,
      operationID: 3,
    };
    PostRequest(endPoint.ADMIN_APPOINTMENT_UAR, payload)
      .then(res => {
        console.log('UserCancelledBooking Response', res?.data);
        setUserCancelledBooking(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ListBookingCanceled = ({item}) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1}}>
          <View style={styles.ContainerInnerview}>
            <View style={styles.Dateview}>
              <Text style={styles.DateTextstyle}>
                {' '}
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

  const onPressReject = () => {
    console.log('Rejected');
    getAcceptRejectAppointment(5);
  };

  const onPressAccept = () => {
    console.log('Accept');
    getAcceptRejectAppointment(4);
  };

  console.log('cancelledItem', cancelledItem);

  const getAcceptRejectAppointment = operation => {
    const payload = {
      ...initialBookingFields,
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

  return (
    <>
      <CustomModal
        visible={visible}
        modalHeight={{height: screenSize.height / 4}}
        CustomModalView={CustomModalView}
      />
      <FlatList
        data={userCancelledBooking}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.BarbarBookedSlotID}
        renderItem={({item, index}) => <ListBookingCanceled item={item} />}
      />
    </>
  );
};

export default Bookingcancelled;
