import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Bookingbutton from '../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../components/atom/ScreenSize';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appColors from '../../AppConstants/appColors';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {PostRequest} from '../../services/apiCall';
import {endPoint, imageUrl} from '../../AppConstants/urlConstants';
import Completedbutton from '../../components/atom/BookingButtons/Completedbutton';
import BoxLottie from '../../components/atom/BoxLottie/BoxLottie';
import {debounce} from '../../functions/AppFunctions';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import CancelBooking from './CancelBooking';
import constants from '../../AppConstants/Constants.json';

const PreBooking = ({
  data,
  userDetails,
  preBookingList,
  setPreBookingList,
  // isLoading,
  // setIsLoading,
  hasMore,
  setHasMore,
  pageNumber,
  setPageNumber,
}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [selectedBooking, setSelectedBooking] = useState({});
  const [isLoading, setIsLoading] = useState();

  const getPreBookings = () => {
    if (hasMore == false) return;
    const payload = {
      operationID: 1,
      roleID: userDetails?._RoleId,
      customerID: userDetails?.userId,
      userID: 0,
      userIP: 'string',
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    };
    console.log('payload payload payload rol id', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        if (res?.data?.Table?.length > 0) {
          setPreBookingList(preBookingList => [
            ...preBookingList,
            ...res?.data?.Table,
          ]);
          setPageNumber(pageNumber + 1); // Increment the page number
          setIsLoading(false);
        } else {
          setHasMore(false);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const reCallPreBookings = () => {
    const payload = {
      operationID: 1,
      roleID: userDetails?._RoleId,
      customerID: userDetails?.userId,
      userID: 0,
      userIP: 'string',
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    };
    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        if (res?.data?.Table?.length > 0) {
          setPreBookingList(preBookingList => [
            ...preBookingList,
            ...res?.data?.Table,
          ]);
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

  const ListPrebooking = ({item}) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6}}>
              <Text style={{color: 'white', fontSize: 11}}>
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'center'}}>
              <View style={styles.Ratingbox}>
                <View
                  style={{
                    color: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={{color: '#c79647', fontSize: 11}}>
                    {item?.Rating}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.35, justifyContent: 'center'}}>
              <Completedbutton
                style={{
                  backgroundColor:
                    item?.StatusID == 8 ? appColors.Gray : appColors.Accepted,
                }}
                textstyle={{color: appColors.White}}
                title={
                  item?.StatusID == 8
                    ? 'Pending by barber'
                    : 'Accepted by barber'
                }
              />
            </View>
          </View>

          <View style={{position: 'relative', marginHorizontal: 15}}>
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

          <View
            style={{
              flexDirection: 'row',
              flex: 0.58,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.35, alignItems: 'center'}}>
              <Image
                // source={require('../../assets/rectangle2.png')}
                source={{uri: `${imageUrl}/${item?.BarberProfileImage}`}}
                style={{
                  height: '80%',
                  width: '82%',
                  borderRadius: 7,
                  marginTop: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.63,
                paddingHorizontal: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                {item?.BarberName}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: 'white',
                    marginVertical: 9,
                  }}>
                  {item?.LocationName}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 10, fontWeight: '400', color: '#c79647'}}>
                  {item.serviceNames}
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
              onPress={() => handleCancelBooking(item)}
              title={'Cancel Booking'}
            />
            <Bookingbutton
              onPress={() =>
                navigation.navigate(constants.screen.UserEReceipt, {
                  bookingSlot: item,
                })
              }
              style={{backgroundColor: '#c79647'}}
              title={'View E-Receipt'}
            />
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
      getPreBookings();
    }
  }, 300);

  const handleCancelBooking = item => {
    console.log('item', item);
    setSelectedBooking(item);
    refRBSheet.current.open();
  };

  console.log('preBookingListpreBookingList', preBookingList);

  return (
    <>
      <BottomSheet ref={refRBSheet} Height={screenSize.height / 2.8}>
        <CancelBooking
          refRBSheet={refRBSheet}
          selectedBooking={selectedBooking}
          getPreBookings={reCallPreBookings}
        />
      </BottomSheet>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : preBookingList?.length > 0 ? (
        <FlatList
          data={preBookingList}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => <ListPrebooking item={item} />}
          keyExtractor={(item, index) => index?.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BoxLottie
            animationPath={require('../../LottieAnimation/NoPostFoundAnimation.json')}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Containerstyle: {
    height: screenSize.height / 2.8,
    width: screenSize.width / 1.13,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    // marginHorizontal: 2,
  },
  Ratingbox: {
    height: screenSize.height / 28,
    width: screenSize.width / 7.1,
    justifyContent: 'center',

    borderWidth: 0.75,
    borderRadius: 7,
    borderColor: '#c79647',
  },
});

export default PreBooking;
