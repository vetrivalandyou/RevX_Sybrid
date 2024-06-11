import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import {PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';
import {AppImages} from '../../../AppConstants/AppImages';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {LATEST_SEARCH, LATEST_SELECT} from '../../../AppConstants/appConstants';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import DeleteSlot from './DeleteSlot';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import moment from 'moment';
import {screenSize} from '../../../components/atom/ScreenSize';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';

const AdminSetupSlots = ({navigation}) => {
  const refRBSheet = useRef();

  const initialServiceFields = {
    categoryId: 0,
    categoryName: '',
    operations: LATEST_SELECT,
    createdBy: 0,
  };
  const isFocused = useIsFocused();
  const [slots, setSlots] = useState();

  useEffect(() => {
    if (isFocused) {
      fetchSelectedTimeSlot();
    }
  }, [isFocused]);

  const fetchSelectedTimeSlot = () => {
    const payload = {
      operationID: LATEST_SEARCH,
      durationMinutes: 0,
      barberID: 0,
      barberName: 'string',
      slotID: 0,
      slotName: 'string',
      customerID: 0,
      customerName: 'string',
      bookingDate: '2024-06-11T10:44:52.617Z',
      transactionID: 'string',
      isPaid: 0,
      services: 'string',
      isActive: true,
      userID: 0,
      userIP: 'string',
      longitude: 0,
      latitude: 0,
      locationName: 'string',
      remarks: 'string',
      barbarBookedSlotID: 0,
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        setSlots(res?.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleCreateSlot = () => {
    navigation.navigate(constants.AdminScreens.CreateSlot);
  };

  const convertedTime = time => {
    let stringTime = moment(time, 'HH:mm:ss');
    const formattedTime = stringTime.format('hh:mm A');
    return formattedTime;
  };

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Setup Slots'}
          logIn={'success'}
        />
      </View>
      {slots?.Table?.length > 0 ? (
        <View style={{flex: 0.8}}>
          <View
            style={{
              width: screenSize.width / 1.1,
              height: screenSize.height / 20,
              paddingHorizontal: 5,
            }}>
            <View style={styles.Subcontainer}>
              <View style={[styles.textView, {justifyContent: 'flex-end'}]}>
                <Text style={[styles.textStyle, {fontSize: 11}]}>{'Name'}</Text>
              </View>
              <View style={[styles.textView, {justifyContent: 'flex-end'}]}>
                <Text style={[styles.textStyle, {fontSize: 11}]}>
                  Start Time
                </Text>
              </View>
              <View style={[styles.textView, {justifyContent: 'flex-end'}]}>
                <Text style={[styles.textStyle, {fontSize: 11}]}>End Time</Text>
              </View>
              <View style={[styles.textView, {justifyContent: 'flex-end'}]}>
                <Text style={[styles.textStyle, {fontSize: 11}]}>Duration</Text>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.Subcontainer}>
              <View style={[styles.textView]}>
                <Text style={styles.textStyle}>{'Slot'}</Text>
              </View>
              <View style={[styles.textView, {alignItems: 'center'}]}>
                <Text style={styles.textStyle}>
                  {convertedTime(slots?.Table?.[0]?.TimeSlot1)}
                </Text>
              </View>
              <View style={[styles.textView, {alignItems: 'center'}]}>
                <Text style={styles.textStyle}>
                  {convertedTime(slots?.Table1?.[0]?.TimeSlot2)}
                </Text>
              </View>
              <View style={[styles.textView, {alignItems: 'center'}]}>
                <Text style={styles.textStyle}>{slots?.Table2?.[0]?.Diff}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BoxLottie
            animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
          />
        </View>
      )}

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Create Slots'}
          onPress={handleCreateSlot}
        />
      </View>
    </Screen>
  );
};

export default AdminSetupSlots;
