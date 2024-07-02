import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {screenSize} from '../../../components/atom/ScreenSize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import styles from './styles';
import {endPoint} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';

const BarberEReceipt = ({route, navigation}) => {
  const {bookingSlot} = route.params || 0;

  const [eReceiptData, setEReceiptData] = useState();

  const data = [
    {
      id: '1',
      title: 'Barber Salon',
      label: 'Barbarella Inova',
    },
    {
      id: '2',
      title: 'Address',
      label: '8974 Meadow Valley Terrace',
    },
    {
      id: '3',
      title: 'Name',
      label: 'Danile Austin',
    },
    {
      id: '4',
      title: 'Phone',
      label: '+123 456 789 00',
    },
    {
      id: '5',
      title: 'Booking Date',
      label: 'December 24, 2024',
    },
    {
      id: '6',
      title: 'Booking Hours',
      label: '10:00 am',
    },
    {
      id: '7',
      title: 'Specialist',
      label: 'Nathan Alexender',
    },
  ];

  const data2 = [
    {
      id: '1',
      title: 'Haircut (Gulf)',
      price: '$40.00',
    },
    {
      id: '2',
      title: 'Hair wash (Aloevera Shampoo)',
      price: '$40.00',
    },
    {
      id: '3',
      title: 'Shaving (Thin Shaving)',
      price: '$40.00',
    },
  ];

  console.log('itemitemitem', bookingSlot);

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
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  console.log("eReceiptData?.Table?.[0]",eReceiptData?.Table?.[0])

  return (
    <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>
      <View style={{flex: 0.3}}>
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

      <View style={styles.barberDetailsContainer}>
        {/* {data.map(item => ( */}
          <Barberdetails name={"Barber Saloon"} value={eReceiptData?.Table?.[0]?.SalonName} />
          <Barberdetails name={"Address"} value={eReceiptData?.Table?.[0]?.LocationName} />
          <Barberdetails name={"Name"} value={eReceiptData?.Table?.[0]?.CustomerName} />
          <Barberdetails name={"Phone"} value={eReceiptData?.Table?.[0]?.CustomerName} />
          <Barberdetails name={"Booking Date"} value={eReceiptData?.Table?.[0]?.BookingDate} />
          <Barberdetails name={"Booking Hours"} value={eReceiptData?.Table?.[0]?.Slot} />
          <Barberdetails name={"Specialist"} value={eReceiptData?.Table?.[0]?.BarberName} />
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
          <Text style={{color: '#c79647', fontWeight: '700'}}>${eReceiptData?.Table2?.[0]?.Column1}.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13, color: 'white'}}>
          {' '}
          Download E-Receipt
        </Text>
      </TouchableOpacity>
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
            {value}
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

export default BarberEReceipt;

// const styles = StyleSheet.create({
