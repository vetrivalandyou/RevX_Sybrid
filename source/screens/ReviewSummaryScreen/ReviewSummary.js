import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {screenSize} from '../../components/atom/ScreenSize';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {useNavigation} from '@react-navigation/native';
import PaymentModal from '../../components/molecules/PaymentModal/PaymentModal';
import constants from '../../AppConstants/Constants.json';
import appColors from '../../AppConstants/appColors';

const ReviewSummary = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmPayment = () => {
    // Open the modal when the button is pressed
    setModalVisible(true);
  };

  const handleModalClose = () => {
    // Close the modal
    setModalVisible(false);
  };
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
    <Screen viewStyle={{ flex: 1, padding: 15}} statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Review Summary'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
          }
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
      <View style={{flex: 0.8}}>
        <View style={styles.Containerstyle}>
          {data.map(item => (
            <Barberdetails key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.Containerstyle2}>
          {data2.map(item => (
            <Pricedetails key={item.id} item={item} />
          ))}
          <View style={{ height: 1, position:'relative', marginHorizontal: 15, margin: 10 }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor:'transparent'  }}></View>
          </View>
          {/* <View
            style={{
              backgroundColor: '#c79647',
              fontSize: 25,
              marginHorizontal: 14,
              borderBottomWidth: 2,
              borderStyle: 'dotted',
              marginTop: 10,
              marginBottom: 5,
            }}></View> */}

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
      </View>

      <TouchableOpacity
        onPress={handleConfirmPayment} //notification
        style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13, color: 'white'}}>
          {' '}
          Confirm Payment
        </Text>
      </TouchableOpacity>
      <PaymentModal
        visible={modalVisible}
        showImage={true}
        showLable={true}
        showLable1={true}
        showViewEReciptButton={true}
        onRequestClose={handleModalClose}
        title={'Payment Successful!'}
        lable1={'Your booking has been successfully done'}
        onPress={() => navigation.goBack()}
        // showLable1={'sadad'}
      />
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

export default ReviewSummary;

const styles = StyleSheet.create({
  NoticationContainer: {
    height: screenSize.height / 18.5,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },
  Containerstyle: {
    height: screenSize.height / 2.95,
    width: screenSize.width / 1.1,
    paddingVertical: 17,

    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
  },
  Containerstyle2: {
    height: screenSize.height / 4.1,
    width: screenSize.width / 1.1,
    justifyContent: 'center',
    // alignItems:'center',
    marginTop: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
  },
  Button: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: Platform.OS == 'ios' ? 18 : 15,
    marginHorizontal: 13,
    borderRadius: 40,
    position: 'absolute',
    bottom: 5,
    width: screenSize.width / 1.07,
  },
});
