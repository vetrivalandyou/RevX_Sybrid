import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { ScreenSize, screenSize } from '../../../components/atom/ScreenSize';
import React, { useEffect, useRef, useState } from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
import { useIsFocused } from '@react-navigation/native';
import { endPoint } from '../../../AppConstants/urlConstants';
import { PostRequest } from '../../../services/apiCall';
import moment from 'moment';
import appColors from '../../../AppConstants/appColors';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import CustomModal from '../../../components/molecules/CustomModal/CustomModal';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';

const Bookingcancelled = ({ data, userDetails, initialBookingFields }) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [cancelledBooking, setCancelledBooking] = useState();

  useEffect(() => {
    if (isFocused) getCancelledBooking();
  }, [isFocused]);

  const getCancelledBooking = () => {
    const payload = {
      operationID: 6,
      roleID: userDetails?._RoleId,
      customerID: 0,
      userID: userDetails?.userId,
      userIP: 'string',
    };
    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('getPreBookings Response', res?.data);
        setCancelledBooking(res?.data?.Table);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const ListBookingCanceled = ({ item }) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{ flex: 1 }}>
          <View style={styles.ContainerInnerview}>
            <View style={styles.Dateview}>
              <Text style={styles.DateTextstyle}>
                {' '}
                {moment(item?.BookingDate).format('DD-MM-YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>

            <View style={{ flex: item?.StatusID == 12 ? 0.25 : 0.4 }}>
              <Completedbutton
                title={
                  item?.StatusID == 12 ? 'Cancel' : 'Request for Cancellation'
                }
                style={{ backgroundColor: '#e81f1c' }}
                textstyle={{ color: 'white' }}
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

  return (
    <>
      <>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color={appColors.Goldcolor} />
          </View>
        ) : cancelledBooking?.length > 0 ? (
          <FlatList
            data={cancelledBooking}
            keyExtractor={item => item.BarbarBookedSlotID}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <ListBookingCanceled item={item} />}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BoxLottie
              animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
            />
          </View>
        )}
      </>
    </>
  );
};

export default Bookingcancelled;
