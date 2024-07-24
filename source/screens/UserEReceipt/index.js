import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import moment from 'moment';
import {PostRequest} from '../../services/apiCall';
import Header from '../../components/molecules/Header';
import {endPoint} from '../../AppConstants/urlConstants';
import constants from '../../AppConstants/Constants.json';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../AppConstants/appColors';

const UserEReceipt = ({route, navigation}) => {
  const {bookingSlot} = route.params || 0;
  console.log('itemitemitem', bookingSlot);

  const [eReceiptData, setEReceiptData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getbarberEReceipt();
  }, []);

  const getbarberEReceipt = () => {
    const payload = {
      operationID: 10,
      durationMinutes: 0,
      barberID: 0,
      barberName: '',
      slotID: 0,
      slotName: '',
      customerID: 0,
      customerName: '',
      bookingDate: '2024-06-11T10:44:52.617Z',
      transactionID: '',
      isPaid: 0,
      services: '',
      isActive: true,
      userID: 0,
      userIP: '',
      longitude: 0,
      latitude: 0,
      locationName: '',
      remarks: '',
      barbarBookedSlotID: bookingSlot?.BarbarBookedSlotID,
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        setEReceiptData(res?.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'E-Receipt'}
          rightIcoName={'bell'}
          onPressRightIcon={() =>
            navigation.navigate(constants.BarberScreen.NotificationScreen)
          }
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>

      {isLoading ? (
        <View
          style={{flex: 0.9, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : (
        <View style={{flex: 0.9}}>
          <View style={styles.barberDetailsContainer}>
            {/* {data.map(item => ( */}
            <Barberdetails
              name={'Barber Saloon'}
              value={eReceiptData?.Table?.[0]?.SalonName}
            />
            <Barberdetails
              name={'Address'}
              // value={eReceiptData?.Table?.[0]?.LocationName}
              value={
                eReceiptData?.Table?.[0]?.LocationName
                  ? eReceiptData?.Table?.[0]?.LocationName.length > 45
                    ? eReceiptData?.Table?.[0]?.LocationName.substring(0, 45) +
                      '...'
                    : eReceiptData?.Table[0]?.LocationName
                  : ''
              }
            />
            <Barberdetails
              name={'Name'}
              value={eReceiptData?.Table?.[0]?.CustomerName}
            />
            <Barberdetails
              name={'Phone'}
              value={eReceiptData?.Table?.[0]?.PhoneNo}
            />
            <Barberdetails
              name={'Booking Date'}
              value={eReceiptData?.Table?.[0]?.BookingDate}
            />
            <Barberdetails
              name={'Booking Hours'}
              value={eReceiptData?.Table?.[0]?.Slot}
            />
            <Barberdetails
              name={'Specialist'}
              value={eReceiptData?.Table?.[0]?.BarberName}
            />
            {/* ))} */}
          </View>

          <View style={styles.barberSevicesContainer}>
            {eReceiptData?.Table1?.map(item => (
              <Pricedetails key={item.serviceId} item={item} />
            ))}

            <View
              style={{
                height: 1,
                position: 'relative',
                marginHorizontal: 15,
                margin: 10,
              }}>
              <View style={styles.DashLinestyle}></View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 5,
              }}>
              <Text style={{color: 'white', fontWeight: '700'}}>Total</Text>
              <Text style={{color: '#c79647', fontWeight: '700'}}>
                ${eReceiptData?.Table2?.[0]?.Column1}.00
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.Button}>
            <Text style={{fontWeight: '700', fontSize: 13, color: 'white'}}>
              {' '}
              Download E-Receipt
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
};

const Barberdetails = ({name, value}) => {
  return (
    <View>
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 5,
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {name}
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {name == 'Booking Date'
              ? moment(value).format('MMMM DD, YYYY')
              : value}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Pricedetails = ({item}) => {
  return (
    <View>
      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 5,
          }}>
          <Text style={{color: 'white', fontSize: 13.5, fontWeight: '400'}}>
            {item.serviceName}
          </Text>
          <Text style={{color: 'white', fontSize: 13.5, fontWeight: 'bold'}}>
            ${item.ServicePrice}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserEReceipt;
