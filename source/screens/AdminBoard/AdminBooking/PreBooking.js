import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import { ScreenSize, screenSize } from '../../../components/atom/ScreenSize';
import React, { useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { endPoint, imageUrl } from '../../../AppConstants/urlConstants';
import { PostRequest } from '../../../services/apiCall';
import moment from 'moment';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import constants from '../../../AppConstants/Constants.json';
import { debounce } from '../../../functions/AppFunctions';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import appColors from '../../../AppConstants/appColors';

const PreBooking = ({
  data,
  userDetails,
  preBookingList,
  setPreBookingList,
  isLoading,
  setIsLoading,
  hasMore,
  setHasMore,
  pageNumber,
  setPageNumber,
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getPreBookings = () => {
    if (hasMore == false) return;

    const payload = {
      operationID: 4,
      roleID: userDetails?._RoleId,
      customerID: 0,
      userID: userDetails?.userId,
      userIP: 'string',
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    };

    console.log('payload Pre Boking', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('getPreBookings Pre Booking Response', res?.data);
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

  const ListPrebooking = ({ item }) => {
    return (
      <View style={styles.bookingContainerstyle}>
        <View style={{ flex: 1 }}>
          <View style={styles.bookingInnercontainerView}>
            <View style={styles.bookingDateview}>
              <Text style={styles.dateTextstyle}>
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={{ flex: 0.25, alignItems: 'center' }}>
              <View style={styles.Ratingstyle}>
                <View
                  style={{
                    color: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={{ color: '#c79647', fontSize: 11 }}>
                    4.5
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.25, justifyContent: 'center' }}>
              <Completedbutton
                style={{
                  backgroundColor:
                    item?.StatusID == 13  ? appColors.Gray : appColors.Accepted,
                }}
                textstyle={{ color: appColors.White }}
                title={item?.StatusID == 13  ? 'Pending' : 'Accepted'}
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

          <View style={styles.containerSecondview}>
            <View style={styles.bookingImageview}>
              <Image
                source={{ uri: `${imageUrl}/${item?.BarberProfileImage}` }}
                style={styles.bookingImagestyle}
              />
            </View>
            <View style={styles.bookingTextview}>
              <Text style={styles.Nametext}> {item?.BarberName}</Text>
              <View>
                <Text style={styles.Titletext}> {item?.CustomerName}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}> {item.serviceNames}</Text>
              </View>
            </View>
          </View>
          <View style={styles.Buttosview}>
            <Bookingbutton
              onPress={() =>
                navigation.navigate(constants.AdminScreens.AdminEReceipt, {
                  bookingSlot: item,
                })
              }
              style={{ backgroundColor: '#c79647', width: "80%" }}
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
      <View style={{ margin: 10 }}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    );
  };

  const handleLoadMore = debounce(() => {
    if (hasMore == true) {
      getPreBookings();
    }
  }, 300);

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : preBookingList?.length > 0 ? (
        <FlatList
          data={preBookingList}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={({ item, index }) => <ListPrebooking item={item} />}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BoxLottie
            animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
          />
        </View>
      )}</>

  );
};

export default PreBooking;
