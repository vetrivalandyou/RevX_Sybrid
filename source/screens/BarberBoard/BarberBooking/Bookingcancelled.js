import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useEffect, useRef} from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import CancelBooking from './CancelBooking';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {endPoint} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';

const Bookingcancelled = ({data, userDetails}) => {
  const refRBSheet = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getCancelledBooking();
  }, [isFocused]);

  const getCancelledBooking = () => {
    const payload = {
      operationID: 3,
      roleID: userDetails?._RoleId,
      customerID: userDetails?.userId,
      userID: 0,
      userIP: 'string',
    };
    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('getCancelledBooking Response', res?.data);
        // setPreBookingList(res?.data?.Table);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const ListBookingCanceled = item => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View style={styles.ContainerInnerview}>
            <View style={styles.Dateview}>
              <Text style={styles.dateTextstyle}>{item.item.date}</Text>
            </View>

            <View style={styles.CancelbuttonView}>
              <Completedbutton
                onPress={() => refRBSheet.current.open()}
                title={'Canceled'}
                style={{backgroundColor: '#e81f1c'}}
                textstyle={{color: 'white'}}
              />

              <BottomSheet ref={refRBSheet} Height={300}>
                <CancelBooking refRBSheet={refRBSheet} />
              </BottomSheet>
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>
          <View style={styles.containerSecondview}>
            <View style={styles.imageView}>
              <Image source={item.item.Imagesource} style={styles.imageStyle} />
            </View>
            <View style={styles.Textview}>
              <Text style={styles.nameStyle}>{item.item.name}</Text>
              <View>
                <Text style={styles.titleStyle}>{item.item.title}</Text>
              </View>
              <View>
                <Text style={styles.labelStyle}>{item.item.label}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => <ListBookingCanceled item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default Bookingcancelled;
