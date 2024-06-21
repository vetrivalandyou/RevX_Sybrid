import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import constants from '../../../AppConstants/Constants.json';

const PreBooking = ({
  data,
  userDetails,
  preBookingList,
  setPreBookingList,
  initialBookingFields,
}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      getPreBookings();
    }
  }, [isFocused]);

  const getPreBookings = () => {
    const payload = {
      ...initialBookingFields,
      operationID: 1,
    };
    console.log('payload', payload);
    PostRequest(endPoint.ADMIN_APPOINTMENT_UAR, payload)
      .then(res => {
        console.log('getPreBookings Response', res?.data);
        setPreBookingList(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ListPrebooking = ({item}) => {
    return (
      <View style={styles.bookingContainerstyle}>
        <View style={{flex: 1}}>
          <View style={styles.bookingInnercontainerView}>
            <View style={styles.bookingDateview}>
              <Text style={styles.dateTextstyle}>
                {moment(item?.BookingDate).format('DD-MM-YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={{flex: 0.25, alignItems: 'center'}}>
              <View style={styles.Ratingstyle}>
                <View
                  style={{
                    color: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={{color: '#c79647', fontSize: 11}}>
                    {/* {item.item.rating} */}
                    4.5
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.25, justifyContent: 'center'}}>
              <Completedbutton
                style={{
                  backgroundColor:
                    item?.StatusID == 9 ? appColors.Gray : '#6be521',
                }}
                textstyle={{color: appColors.White}}
                title={item?.StatusID == 9 ? 'Pending' : 'Accepted'}
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
                source={{uri: `${imageUrl}/${item?.BarberProfileImage}`}}
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
            <Bookingbutton title={'Cancel Booking'} />
            <Bookingbutton
              // onPress={() =>
              //   navigation.navigate(constants.AdminScreens.BarberEReceipt, {
              //     bookingSlot: item,
              //   })
              // }
              style={{backgroundColor: '#c79647'}}
              title={'View E-Receipt'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={preBookingList}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <ListPrebooking item={item} />}
      keyExtractor={item => item.BarbarBookedSlotID}
    />
  );
};

export default PreBooking;
