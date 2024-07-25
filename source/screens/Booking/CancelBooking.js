import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../AppConstants/appColors';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import SignalRService from '../../services/SignalRService';

const CancelBooking = ({refRBSheet, selectedBooking, getPreBookings}) => {
  const timeoutRef = useRef();

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);
  const handleClickCancelBooking = () => {
    console.log('Clicked', selectedBooking);
    const payload = {
      operationID: 11,
      durationMinutes: 0,
      barberID: selectedBooking?.BarbarID,
      barberName: '',
      slotID: 0,
      slotName: '',
      customerID: selectedBooking?.CustomerID,
      customerName: '',
      bookingDate: selectedBooking?.BookingDate,
      transactionID: '',
      isPaid: 0,
      services: '',
      isActive: true,
      userID: 0,
      userIP: '',
      longitude: 0,
      latitude: 0,
      locationName: '',
      remarks: 'Accepted',
      barbarBookedSlotID: selectedBooking?.BarbarBookedSlotID,
    };
    console.log('payload handleClickCancelBooking', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.Table?.[0]?.HassError == 0) {
          getPreBookings();
          SignalRService.sendNotification(parseInt(res?.data?.Table?.[0]?.NotificationID))
          SimpleSnackBar(res?.data?.Table?.[0]?.Message);
          timeoutRef.current = setTimeout(
            () => refRBSheet.current.close(),
            3000,
          );
        } else {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View style={{flex: 1, marginVertical: 15}}>
      <View style={{flex: 0.8}}>
        <View
          style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: appColors.Red, fontSize: 20, fontWeight: '500'}}>
            Cancel Booking
          </Text>
        </View>
        <View style={{flex: 0.35, paddingHorizontal: '7%'}}>
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
            Are you sure want to cancel your Barber Booking?
          </Text>
        </View>
        <View style={{flex: 0.35, paddingHorizontal: '10%'}}>
          <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
            Only 80% of the money you can refund from your payment according to
            our policy.
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'flex-end'}}>
          <ButtonComponent
            style={{
              backgroundColor: '#424242',
              paddingVertical: 13,
              width: '90%',
              color: 'white',
            }}
            btnTextColor={{color: appColors.White}}
            title={'Cancel'}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <ButtonComponent
            style={{
              paddingVertical: 13,
              width: '85%',
            }}
            onPress={handleClickCancelBooking}
            btnColor={appColors.Red}
            btnTextColor={{color: appColors.White}}
            title={'Yes, Cancel Booking'}
          />
        </View>
      </View>
    </View>
  );
};

export default CancelBooking;
