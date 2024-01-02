import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../../AppConstants/appColors';

const CancelBooking = ({refRBSheet}) => {
  //   const refRBSheet = useRef();

  return (
    <View style={{flex: 1, marginVertical: 15}}>
      <View style={{flex: 0.6}}>
        <View
          style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#E81F1C', fontSize: 20}}>Cancel Booking</Text>
        </View>
        <View style={{flex: 0.6, paddingHorizontal: '14%'}}>
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
            Are you sure want to cancell your barber/salon booking?
          </Text>
        </View>
        <View style={{flex: 0.4, paddingHorizontal: '12%'}}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            only 80% of the money you can refund from your payment according to
            our policy.
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{flex: 0.4, justifyContent: 'center', alignItems: 'flex-end'}}>
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
              backgroundColor: appColors.Goldcolor,
              paddingVertical: 13,
              width: '85%',
            }}
            btnTextColor={{color: appColors.White}}
            title={'Yes, cancel booking'}
          />
        </View>
      </View>
    </View>
  );
};

export default CancelBooking;
