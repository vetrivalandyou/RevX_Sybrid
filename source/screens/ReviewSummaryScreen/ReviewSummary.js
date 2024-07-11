import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {PostRequest} from '../../services/apiCall';
import appColors from '../../AppConstants/appColors';
import Header from '../../components/molecules/Header';
import {returnTotal} from '../../functions/AppFunctions';
import {endPoint} from '../../AppConstants/urlConstants';
import constants from '../../AppConstants/Constants.json';
import {screenSize} from '../../components/atom/ScreenSize';
import {getAsyncItem} from '../../utils/SettingAsyncStorage';
import Screen from '../../components/atom/ScreenContainer/Screen';
import LoadingModal from '../../components/molecules/LoadingModal';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';

const initialBuyServiceFields = {
  operationID: 2,
  amount: 0,
  currency: 'usd',
  description: '',
  qty: 0,
  profileID: 0,
  userIP: 'string',
  transactionID: '',
  barbarBookedSlotID: 0,
};

const ReviewSummary = ({route}) => {
  const {SelectedChildServices} = useSelector(
    state => state.AppointmentReducer,
  );
  const {selectedSlotId, seelectedDate, barberDetails, specialistDetails} =
    route?.params || 0;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userLongLat, setUserLongLat] = useState();
  const [address, setAddress] = useState();

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
    setIsLoading(false);
  };

  const handleConfirmPayment = () => {
    setPaymentLoading(true);
    // const makingServicesData = SelectedChildServices?.map(x => ({
    //   serviceId: x.ChildServiceID,
    //   serviceName: x.ChildService,
    // }));

    // const payload = {
    //   operationID: APPOINTMENT_ID,
    //   durationMinutes: returnTotalDuration(),
    //   bookingDate: seelectedDate,
    //   barberID: barberDetails?.UserId,
    //   barberName: specialistDetails?.userName,
    //   slotID: selectedSlotId?.SlotID,
    //   slotName: selectedSlotId?.Slot,
    //   customerID: userDetails?.userId,
    //   customerName: userDetails?.userName,
    //   transactionID: 'ABC-123',
    //   longitude: userLongLat?.coords?.longitude,
    //   latitude: userLongLat?.coords?.latitude,
    //   locationName: address,
    //   isPaid: 1,
    //   services: JSON.stringify(makingServicesData),
    //   isActive: true,
    //   userID: 0,
    //   userIP: 'string',
    //   remarks: 'string',
    //   barbarBookedSlotID: 0,
    // };
    const payload = {
      ...initialBuyServiceFields,
      amount: returnTotal(SelectedChildServices),
      barbarBookedSlotID: 12,
    };
    console.log('fetchSelectedTimeSlot Payload', payload);
    PostRequest(endPoint?.BUY_SERVICES, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        handleOpenStripeURL(res?.data?.sessionUrl);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleOpenStripeURL = async paymentURL => {
    try {
      const stripePaymentURL = paymentURL;

      const result = await InAppBrowser.open(stripePaymentURL, {
        // iOS options
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: appColors.Goldcolor,
        preferredControlTintColor: appColors.Black,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullscreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android options
        showTitle: true,
        toolbarColor: appColors.Goldcolor,
        secondaryToolbarColor: appColors.Black,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      });
      if (result.type === 'closed') {
      } else {
        setPaymentLoading(false);
      }
    } catch (error) {
      console.log('Error opening in-app browser:', error);
      Linking.openURL(stripePaymentURL);
      setPaymentLoading(false);
    }
  };

  return (
    <Screen viewStyle={{flex: 1, padding: 15}} statusBarColor={appColors.Black}>
      <LoadingModal
        visible={paymentLoading}
        modalHeight={{height: screenSize.height}}
      />
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
          <Barberdetails
            userDetails={userDetails}
            seelectedDate={seelectedDate}
            selectedSlotId={selectedSlotId}
            barberDetails={barberDetails}
            address={address}
            specialistDetails={specialistDetails}
          />
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
              marginBottom: 5,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>Total</Text>
            <Text style={{color: '#c79647', fontWeight: '700'}}>
              ${returnTotal(SelectedChildServices)}.00
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleConfirmPayment} style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13, color: 'white'}}>
          {' '}
          Confirm Payment
        </Text>
      </TouchableOpacity>
      {/* <PaymentModal
        visible={modalVisible}
        showImage={true}
        showLable={true}
        showLable1={true}
        showViewEReciptButton={true}
        onRequestClose={handleModalClose}
        title={'Payment Successful!'}
        lable1={'Your booking has been successfully done'}
        onPress={() => navigation.goBack()}
      /> */}
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
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Barber Salon
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            RevX Barber
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Address
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            numberOfLines={1}
            style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {address}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Name
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {userDetails?.userName}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Phone
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {userDetails?.userPhone}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Booking Date
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {moment(seelectedDate).format('MMMM-DD-YYYY').toUpperCase()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Booking Hours
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {selectedSlotId?.Slot}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Specialist
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
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
    <View style={{height: screenSize.height / 25}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            {item.ChildService}
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
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
    minHeight: screenSize.height / 8,
    height: 'auto',
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    paddingHorizontal: 2,
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
