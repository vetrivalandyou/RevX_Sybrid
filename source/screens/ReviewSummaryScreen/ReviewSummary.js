import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {screenSize} from '../../components/atom/ScreenSize';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import PaymentModal from '../../components/molecules/PaymentModal/PaymentModal';
import constants from '../../AppConstants/Constants.json';
import appColors from '../../AppConstants/appColors';
import {useSelector} from 'react-redux';
import {getAsyncItem} from '../../utils/SettingAsyncStorage';
import {returnTotal} from '../../functions/AppFunctions';
import moment from 'moment';
import {APPOINTMENT_ID, LATEST_SELECT} from '../../AppConstants/appConstants';
import {endPoint} from '../../AppConstants/urlConstants';
import {PostRequest} from '../../services/apiCall';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';

const ReviewSummary = ({route}) => {
  const {selectedSlotId, seelectedDate, barberDetails, specialistDetails} =
    route?.params || 0;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {SelectedChildServices} = useSelector(
    state => state.AppointmentReducer,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userLongLat, setUserLongLat] = useState();
  const [address, setAddress] = useState();

  console.log('specialistDetails', specialistDetails);

  useEffect(() => {
    if (isFocused) {
      getUserDetail();
    }
  }, [isFocused]);

  const getUserDetail = async () => {
    const userAsyncDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    const userAsyncAddress = await getAsyncItem(
      constants.AsyncStorageKeys.nearest_landmark,
    );
    const userAsyncLongLat = await getAsyncItem(
      constants.AsyncStorageKeys.longLat,
    );
    setUserLongLat(userAsyncLongLat);
    setUserDetails(userAsyncDetails);
    setAddress(userAsyncAddress);
  };

  // const handleConfirmPayment = () => {
  //   // Open the modal when the button is pressed
  //   setModalVisible(true);
  // };

  const handleModalClose = () => {
    // Close the modal
    setModalVisible(false);
  };

  const returnTotalDuration = () => {
    if (SelectedChildServices?.length == 0) {
      return 0;
    } else {
      const totalDuration = SelectedChildServices?.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.ServiceDuration,
        0,
      );
      return totalDuration;
    }
  };

  console.log('userlong lat', userLongLat);

  const handleConfirmPayment = () => {
    const makingServicesData = SelectedChildServices?.map(x => ({
      serviceId: x.ChildServiceID,
      serviceName: x.ChildService,
    }));

    const payload = {
      operationID: APPOINTMENT_ID,
      durationMinutes: returnTotalDuration(),
      bookingDate: seelectedDate,
      barberID: barberDetails?.UserId,
      barberName: specialistDetails?.userName,
      slotID: selectedSlotId?.SlotID,
      slotName: selectedSlotId?.Slot,
      customerID: userDetails?.userId,
      customerName: userDetails?.userName,
      transactionID: 'ABC-123',
      longitude: userLongLat?.coords?.longitude,
      latitude: userLongLat?.coords?.latitude,
      locationName: address,
      isPaid: 1,
      services: JSON.stringify(makingServicesData),
      isActive: true,
      userID: 0,
      userIP: 'string',
      remarks: 'string',
      barbarBookedSlotID: 0,
    };
    console.log('fetchSelectedTimeSlot Payload', payload);
    PostRequest(endPoint?.BARBER_APPOINTMENTBOOKING, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.Table?.[0]?.HasError == 0) {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message);
          navigation.navigate(constants.screen.HomeScreen);
        } else {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <Screen viewStyle={{flex: 1, padding: 15}} statusBarColor={appColors.Black}>
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
          {/* {data.map(item => ( */}
          <Barberdetails
            userDetails={userDetails}
            seelectedDate={seelectedDate}
            selectedSlotId={selectedSlotId}
            barberDetails={barberDetails}
            address={address}
            specialistDetails={specialistDetails}
          />
          {/* ))} */}
        </View>
        <View style={styles.Containerstyle2}>
          {SelectedChildServices.map((item, index) => (
            <Pricedetails
              key={item?.ChildServiceID || index}
              item={item}
              index={index}
            />
          ))}
          <View
            style={{
              height: 1,
              position: 'relative',
              marginHorizontal: 15,
              margin: 10,
            }}>
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
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 5,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>Total</Text>
            <Text style={{color: '#c79647', fontWeight: '700'}}>
              ${returnTotal(SelectedChildServices)}.00
            </Text>
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
      />
    </Screen>
  );
};

const Barberdetails = ({
  userDetails,
  seelectedDate,
  selectedSlotId,
  barberDetails,
  specialistDetails,
  address,
}) => {
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
            Barber Salon
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            RevX Barber
          </Text>
        </View>
      </View>

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
            Address
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {address}
          </Text>
        </View>
      </View>

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
            Name
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {userDetails?.userName}
          </Text>
        </View>
      </View>

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
            Phone
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {userDetails?.userPhone}
          </Text>
        </View>
      </View>

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
            Booking Date
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {moment(seelectedDate).format('DD-MMM-YYYY').toUpperCase()}
          </Text>
        </View>
      </View>

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
            Booking Hours
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {selectedSlotId?.Slot}
          </Text>
        </View>
      </View>

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
            Specialist
          </Text>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {specialistDetails?.userName}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Pricedetails = ({item, index}) => {
  console.log('item', item);
  return (
    <View>
      <View
        key={item?.ChildServiceID}
        style={{flexDirection: 'column', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 5,
          }}>
          <Text style={{color: 'white', fontSize: 13.5, fontWeight: '400'}}>
            {item.ChildService}
          </Text>
          <Text style={{color: 'white', fontSize: 13.5, fontWeight: '400'}}>
            ${item.ServicePrice}
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
