import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenSize} from '../../../components/atom/ScreenSize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import styles from './styles';

const BarberEReceipt = ({navigation}) => {
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
        {data.map(item => (
          <Barberdetails key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.barberSevicesContainer}>
        {data2.map(item => (
          <Pricedetails key={item.id} item={item} />
        ))}

<View style={{ height: 1, position:'relative', marginHorizontal: 15, margin: 10 }}>
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
          <Text style={{color: '#c79647', fontWeight: '700'}}>$120.00</Text>
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

const Barberdetails = ({item}) => {
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
            {item.title}
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {item.label}
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
            {item.title}
          </Text>
          <Text style={{color: 'white', fontSize: 13.5, fontWeight: '400'}}>
            {item.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BarberEReceipt;

// const styles = StyleSheet.create({
 
 
