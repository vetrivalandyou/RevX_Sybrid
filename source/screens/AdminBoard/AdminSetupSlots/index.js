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
import {screenSize} from '../../Utills/AppConstants';
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

  const fetchSelectedTimeSlot = selectedData => {
    const payload = {
      operationID: LATEST_SEARCH,
      durationMinutes: 0,
      bookingDate: '2024-05-06T13:21:09.807Z',
      barberID: 0,
      isActive: true,
      userID: 0,
      userIP: '',
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

  const createSlot = () => {
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
      <View style={{flex: 0.8}}>
        <View style={[styles.container]}>
          <View style={styles.Subcontainer}>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>{'Slot'}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>
                {convertedTime(slots?.Table?.[0]?.TimeSlot1)}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>
                {convertedTime(slots?.Table1?.[0]?.TimeSlot2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
          onPress={createSlot}
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({item, userId, onPress, selected}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const handleEditPress = item => {
    navigation.navigate(constants.AdminScreens.Editservices, {
      item: item,
      userId: userId,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          selected && {borderColor: '#c79647', borderWidth: 1.25},
        ]}>
        <View style={styles.Subcontainer}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{item.categoryName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleEditPress(item)}
            style={styles.editImageView}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image
              source={AppImages.deleteimage}
              style={styles.Deleteimagestyle}
            />
          </TouchableOpacity>

          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteServices refRBSheet={refRBSheet} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdminSetupSlots;
