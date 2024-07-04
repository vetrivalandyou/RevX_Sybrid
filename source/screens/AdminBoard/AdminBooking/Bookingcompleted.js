import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
import {useIsFocused} from '@react-navigation/native';
import {endPoint} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import moment from 'moment';
const Bookingcompleted = ({
  data,
  userDetails,
  initialBookingFields,
}) => {
  const isFocused = useIsFocused();
  const [userCompletedBooking, setUserCompletedBooking] = useState([]);

  useEffect(() => {
    if (isFocused) getCompletedBooking();
  }, [isFocused]);

  const getCompletedBooking = () => {
    const payload = {
      ...initialBookingFields,
      operationID: 2,
    };
    console.log('payload', payload);
    PostRequest(endPoint.ADMIN_APPOINTMENT_UAR, payload)
      .then(res => {
        console.log('Bookingcompleted Response', res?.data);
        setUserCompletedBooking(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ListBookingCompleted = ({item}) => {
    return (
      <View style={styles.completedContaierstyle}>
        <View style={{flex: 1}}>
          <View style={styles.ContainerInnerView}>
            <View style={styles.CompletedDateview}>
              <Text style={styles.completedDatestyle}>
                {' '}
                {moment(item?.BookingDate).format('DD-MM-YYYY')} -{' '}
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
              style={{width: '90%', height: '55%'}}
              title={'View E-Receipt'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={userCompletedBooking}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <ListBookingCompleted item={item} />}
      keyExtractor={item => item.BarbarBookedSlotID}
    />
  );
};
export default Bookingcompleted;
