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
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import moment from 'moment';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';

const Bookingcancelled = ({data, userDetails}) => {
  const isFocused = useIsFocused();

  const refRBSheet = useRef();
  const timeoutRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
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
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
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
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>
          <View style={[styles.containerSecondview, {flex: 0.68}]}>
            <View style={styles.imageView}>
              <Image
                source={{uri: `${imageUrl}${item?.BarberProfileImage}`}}
                style={styles.completedImagestyle}
              />
            </View>
            <View style={styles.Textview}>
              <Text style={styles.Nametext}>{item.CustomerName}</Text>
              <View>
                <Text style={styles.Titletext}>{item.LocationName}</Text>
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
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : cancelledBooking?.length > 0 ? (
        <FlatList
          data={cancelledBooking}
          keyExtractor={item => item.BarbarBookedSlotID}
          showsVerticalScrollIndicator={false}
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
