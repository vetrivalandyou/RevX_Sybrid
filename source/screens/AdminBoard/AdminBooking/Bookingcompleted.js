import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { ScreenSize, screenSize } from '../../../components/atom/ScreenSize';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
import { useIsFocused } from '@react-navigation/native';
import { endPoint } from '../../../AppConstants/urlConstants';
import { PostRequest } from '../../../services/apiCall';
import moment from 'moment';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
const Bookingcompleted = ({
  data,
  userDetails,
  initialBookingFields,
}) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [completedBooking, setCompletedBooking] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (isFocused) getCompletedBooking();
  }, [isFocused]);

  const getCompletedBooking = () => {
    const payload = {
      operationID: 5,
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
        setCompletedBooking(res?.data?.Table);
        setPageNumber(pageNumber + 1); // Increment the page number
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const ListBookingCompleted = ({ item }) => {
    return (
      <View style={styles.completedContaierstyle}>
        <View style={{ flex: 1 }}>
          <View style={styles.ContainerInnerView}>
            <View style={styles.CompletedDateview}>
              <Text style={styles.completedDatestyle}>
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={styles.Ratingview}>
              <View style={styles.Ratingstyle}>
                <View style={styles.RatinginnerView}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={styles.ratingTextstyle}>4.5</Text>
                </View>
              </View>
            </View>
            <View style={styles.CompletedbuttonView}>
              <Completedbutton title={'Completed'} />
            </View>
          </View>

          <View style={styles.CompletedDashineView}>
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
            <View style={styles.completedImageview}>
              <Image
                source={item.BarberProfileImage}
                style={styles.completedImagestyle}
              />
            </View>
            <View style={styles.completedTextview}>
              <Text style={styles.Nametext}> {item?.BarberName}</Text>
              <View>
                <Text style={styles.Titletext}> {item.CustomerName}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}> {item.serviceNames}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ReceiptbuttonView}>
            <Bookingbutton
              style={{ width: '90%', height: '55%' }}
              title={'View E-Receipt'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : completedBooking?.length > 0 ? (
        <FlatList
          data={completedBooking}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <ListBookingCompleted item={item} />}
          keyExtractor={item => item.BarbarBookedSlotID}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BoxLottie
            animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
          />
        </View>
      )}</>
    // <FlatList
    //   data={userCompletedBooking}
    //   showsVerticalScrollIndicator={false}
    //   renderItem={({ item, index }) => <ListBookingCompleted item={item} />}
    //   keyExtractor={item => item.BarbarBookedSlotID}
    // />
  );
};
export default Bookingcompleted;
