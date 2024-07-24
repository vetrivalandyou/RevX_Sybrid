import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PostRequest} from '../../services/apiCall';
import {useIsFocused} from '@react-navigation/native';
import {endPoint, imageUrl} from '../../AppConstants/urlConstants';
import {ScreenSize, screenSize} from '../../components/atom/ScreenSize';
import Completedbutton from '../../components/atom/BookingButtons/Completedbutton';
import moment from 'moment';
import appColors from '../../AppConstants/appColors';
import BoxLottie from '../../components/atom/BoxLottie/BoxLottie';
import {debounce} from '../../functions/AppFunctions';

const Bookingcancelled = ({data, userDetails}) => {
  const isFocused = useIsFocused();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [userCancelledBooking, setUserCancelledBooking] = useState([]);
  useEffect(() => {
    if (isFocused) getBookingCancelled();
  }, [isFocused]);

  const getBookingCancelled = () => {
    const payload = {
      operationID: 3,
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
          console.log('res?.data?.Tableres?.data?.Table', res?.data?.Table),
            setUserCancelledBooking(userCancelledBooking => [
              ...userCancelledBooking,
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

  const ListBookingCanceled = ({item}) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.25,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6}}>
              <Text style={{color: 'white', fontSize: 14}}>
                {moment(item?.BookingDate).format('MMMM-DD-YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>

            <View style={{flex: 0.25}}>
              <Completedbutton
                title={'Cancel'}
                style={{backgroundColor: '#e81f1c'}}
                textstyle={{color: 'white'}}
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
              flex: 0.72,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.35, alignItems: 'center'}}>
              <Image
                source={{uri: `${imageUrl}${item.BarberProfileImage}`}}
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
                  {item.LocationName}
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
      getBookingCancelled();
    }
  }, 300);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : (
        <>
          {userCancelledBooking?.length > 0 ? (
            <FlatList
              onEndReachedThreshold={0.5}
              data={userCancelledBooking}
              onEndReached={handleLoadMore}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({item, index}) => (
                <ListBookingCanceled item={item} />
              )}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <BoxLottie
                animationPath={require('../../LottieAnimation/NoPostFoundAnimation.json')}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Containerstyle: {
    height: screenSize.height / 3.7,
    width: screenSize.width / 1.11,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    // marginHorizontal: 10,
  },
});

export default Bookingcancelled;
