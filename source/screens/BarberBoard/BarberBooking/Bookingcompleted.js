import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import moment from 'moment';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import {debounce} from '../../../functions/AppFunctions';

const Bookingcompleted = ({data, userDetails}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const timeoutRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [completedBooking, setCompletedBooking] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getCompletedBooking();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isFocused]);

  const getCompletedBooking = () => {
    if (hasMore == false) return;
    const payload = {
      operationID: 2,
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
          setCompletedBooking(res?.data?.Table);
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

  const ListBookingCompleted = ({item}) => {
    return (
      <View style={styles.completedContaierstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View style={styles.ContainerInnerView}>
            <View style={styles.CompletedDateview}>
              <Text style={styles.completedDatestyle}>
                {' '}
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={styles.completedButtonview}>
              <Completedbutton
                textstyle={{color: appColors.White}}
                title={'Booking Completed'}
              />
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>

          <View style={styles.containerSecondview}>
            <View style={styles.completedImageview}>
              <Image
                source={{uri: `${imageUrl}${item?.BarberProfileImage}`}}
                style={styles.completedImagestyle}
              />
            </View>
            <View style={styles.completedTextview}>
              <Text style={styles.Nametext}>{item.CustomerName}</Text>
              <View>
                <Text style={styles.Titletext}>{item.LocationName}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}>{item.serviceNames}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Bookingbutton
              style={{
                borderColor: appColors.Goldcolor,
                color: 'white',
                height: 27,
                width: '90%',
                flex: 0.9,
              }}
              stylebtn={{fontSize: 12, color: 'white'}}
              onPress={() =>
                navigation.navigate(constants.BarberScreen.BarberEReceipt, {
                  bookingSlot: item,
                })
              }
              title={'View E-Recipt'}
            />
            {/* <Bookingbutton
              style={{backgroundColor: '#c79647'}}
              stylebtn={{color: 'white'}}
              title={'Accept'}
            />
            <Bookingbutton
              style={{backgroundColor: '#E81F1C', borderColor: 'red'}}
              stylebtn={{color: 'white'}}
              title={'Reject'}
            /> */}
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
      getCompletedBooking();
    }
  }, 300);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : completedBooking?.length > 0 ? (
        <FlatList
          data={completedBooking}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={({item, index}) => <ListBookingCompleted item={item} />}
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
export default Bookingcompleted;
