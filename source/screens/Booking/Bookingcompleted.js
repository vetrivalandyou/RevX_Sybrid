import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Bookingbutton from '../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../components/atom/ScreenSize';
import React, {useEffect, useState} from 'react';
import Completedbutton from '../../components/atom/BookingButtons/Completedbutton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {PostRequest} from '../../services/apiCall';
import {endPoint, imageUrl} from '../../AppConstants/urlConstants';
import moment from 'moment';
import BoxLottie from '../../components/atom/BoxLottie/BoxLottie';
import constants from '../../AppConstants/Constants.json';

const Bookingcompleted = ({data, userDetails}) => {
  const isFocused = useIsFocused();
  const [userCompletedBooking, setUserCompletedBooking] = useState([]);
  const navigation = useNavigation();

  console.log(
    'setUserCompletedBookingsetUserCompletedBooking?',
    userCompletedBooking,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (isFocused) getCompletedBooking();
  }, [isFocused]);

  const getCompletedBooking = () => {
    const payload = {
      operationID: 2,
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
        console.log('Bookingcompleted Response', res?.data);
        setUserCompletedBooking(res?.data?.Table);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const ListBookingCompleted = ({item}) => {
    console.log('check barber id', item?.BarbarID);
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6, justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 14}}>
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={{flex: 0.25, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(constants.screen.RatingScreen, {
                    userDetails: userDetails,
                    userCompletedBooking: item,
                  })
                }>
                <View style={styles.Ratingbox}>
                  <View
                    style={{
                      color: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <AntDesign name={'staro'} size={12} color={'#c79647'} />
                    <Text style={{color: '#c79647', fontSize: 11}}>Rate</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.25, justifyContent: 'center'}}>
              <Completedbutton title={'Completed'} />
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
                source={{uri: `${imageUrl}${item?.BarberProfileImage}`}}
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
                  {item.CustomerName}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 10, fontWeight: '400', color: '#c79647'}}>
                  {item?.serviceNames}
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
              onPress={() =>
                navigation.navigate(constants.screen.UserEReceipt, {
                  bookingSlot: item,
                })
              }
              style={{width: '90%', height: '55%'}}
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : userCompletedBooking?.length > 0 ? (
        <FlatList
          data={userCompletedBooking}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => <ListBookingCompleted item={item} />}
          keyExtractor={item => item.BarbarBookedSlotID}
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
    width: screenSize.width / 1.11,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    // marginHorizontal: 10,
  },
  Ratingbox: {
    height: screenSize.height / 28,
    width: screenSize.width / 6,
    justifyContent: 'center',
    borderWidth: 0.75,
    borderRadius: 7,
    borderColor: '#c79647',
  },
});

export default Bookingcompleted;
