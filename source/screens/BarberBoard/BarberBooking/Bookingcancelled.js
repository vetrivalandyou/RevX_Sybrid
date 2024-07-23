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
import { debounce } from '../../../functions/AppFunctions';

const Bookingcancelled = ({data, userDetails}) => {
  const isFocused = useIsFocused();

  const refRBSheet = useRef();
  const timeoutRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [cancelledBooking, setCancelledBooking] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getCancelledBooking();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isFocused]);

  const getCancelledBooking = () => {
    if (hasMore == false) return;
    const payload = {
      operationID: 3,
      roleID: userDetails?._RoleId,
      customerID: 0,
      userID: userDetails?.userId,
      userIP: 'string',
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
        setIsLoading(false)
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

  const renderFooter = () => {
    if (hasMore == false) return null;
    return (
      <View style={{ margin: 10 }}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    );
  };

  const handleLoadMore = debounce(() => {
    if (hasMore == true) {
      getCancelledBooking();
    }
  }, 300);

  return (
    <>
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
