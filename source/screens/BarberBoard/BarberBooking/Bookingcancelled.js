import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useEffect, useRef, useState} from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import CancelBooking from './CancelBooking';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import moment from 'moment';

const Bookingcancelled = ({data, userDetails}) => {
  const refRBSheet = useRef();
  const isFocused = useIsFocused();

  const timeoutRef = useRef();
  const [cancelledBooking, setCancelledBooking] = useState();

  useEffect(() => {
    if (isFocused) {
      getCancelledBooking();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isFocused]);

  const getCancelledBooking = () => {
    const payload = {
      operationID: 3,
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ListBookingCanceled = ({item}) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View style={[styles.ContainerInnerview]}>
            <View style={styles.Dateview}>
              <Text style={styles.dateTextstyle}>
                {' '}
                {moment(item?.BookingDate).format('DD-MM-YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>

            <View style={styles.CancelbuttonView}>
              <Completedbutton
                // onPress={() => refRBSheet.current.open()}
                title={'Canceled'}
                style={{backgroundColor: '#e81f1c'}}
                textstyle={{color: 'white'}}
              />

              {/* <BottomSheet ref={refRBSheet} Height={300}>
                <CancelBooking refRBSheet={refRBSheet} />
              </BottomSheet> */}
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>
          <View style={[styles.containerSecondview, { flex: 0.68,}]}>
            <View style={styles.imageView}>
              <Image
                source={{uri: `${imageUrl}${item?.BarberProfileImage}`}}
                style={styles.completedImagestyle}
              />
            </View>
            <View style={styles.Textview}>
              <Text style={styles.Nametext}>{item.CustomerName}</Text>
              <View>
                <Text style={styles.Titletext}>{item.BarberName}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}>{item.serviceNames}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={cancelledBooking}
      keyExtractor={item => item.BarbarBookedSlotID}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <ListBookingCanceled item={item} />}
    />
  );
};

export default Bookingcancelled;
