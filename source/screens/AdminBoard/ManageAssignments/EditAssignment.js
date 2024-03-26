import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {screenSize} from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import CustomDropdownPicker from '../../../components/molecules/CustomDropdownPicker';
import Dropdown from '../../../components/molecules/Dropdown/Dropdown';
import appColors from '../../../AppConstants/appColors';
import {endPoint} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {GetRequest, PostRequest} from '../../../services/apiCall';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import constant from '../../../AppConstants/Constants.json';

const EditAssignment = ({route}) => {
  const navigation = useNavigation();
  const {item, isAdded, userDetails} = route.params || {};

  console.log('serviceName', item);
  console.log('isAdded', isAdded);
  const [barberList, setBarberList] = useState([]);
  const [VandropDown, setVanDropDown] = useState([]);
  const [selectedVans, setSelectedVans] = useState(
    isAdded == false ? item?.vanId : '',
  );
  const [selectedBarber, setSelectedBarber] = useState(
    isAdded == false ? item?.barberId : '',
  );

  useEffect(() => {
    getBarberList();
    getVanList();
    // getUserDetail();
  }, []);

  // const getUserDetail = async () => {
  //   const userDatail = await getAsyncItem(constant.AsyncStorageKeys.userDetails)
  //   setuserDetails(userDatail)
  // }

  const getBarberList = () => {
    PostRequest(endPoint.BARBER_LIST)
      .then(res => {
        if (res?.data?.code == 200) {
          const approvedVans = res?.data?.data.filter(
            barber => barber.isApproved == false,
          );
          setBarberList(approvedVans);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const getVanList = () => {
    GetRequest(endPoint.GET_VANS)
      .then(res => {
        if (res?.data?.code == 200) {
          setVanDropDown(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const SaveVanAssignmet = () => {
    console.log('userDetails', userDetails);
    console.log('selectedBarber', selectedBarber);
    console.log('selectedVans', selectedVans);
    const payload = {
      id: null,
      barberId: selectedBarber,
      vanId: selectedVans,
      operations: isAdded == true ? 1 : 2,
      createdBy: userDetails.userId,
      userIP: '::1',
    };

    console.log('Payload', payload);
    PostRequest(endPoint.BARBER_VANASSIGNMENT_CRUD, payload)
      .then(res => {
        console.log('Response:', res?.data?.data);
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  console.log('selectedVansState', selectedVans);
  console.log('selectedBarberState', selectedBarber);

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={isAdded ? 'Assign Van' : 'Edit Assigned Van'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <View style={styles.DropdownView}>
          <View style={{flex: 0.65}}>
            <Dropdown
              label={'Select Barber'}
              value={selectedBarber}
              onValueChange={itemValue => setSelectedBarber(itemValue)}
              dropDownData={barberList.map(van => ({
                label: van.userName,
                value: van.userId,
              }))}
              style={styles.dropDownStyle}
              custompickerstyle={{
                color: selectedBarber
                  ? appColors.White
                  : appColors.AppLightGray,
              }}
            />
          </View>
        </View>
        <View style={styles.DropdownView}>
          <View style={{flex: 0.65}}>
            <Dropdown
              label={'Select Van'}
              value={selectedVans}
              onValueChange={itemValue => setSelectedVans(itemValue)}
              dropDownData={VandropDown.map(Van => ({
                label: Van.vanName,
                value: Van.vanId,
              }))}
              style={styles.dropDownStyle}
              custompickerstyle={{
                color: selectedVans ? appColors.White : appColors.AppLightGray,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonComponent
          style={styles.buttonStyle}
          btnTextColor={{color: 'white'}}
          title={isAdded ? 'Save' : 'Update'}
          onPress={SaveVanAssignmet}
        />
      </View>
    </Screen>
  );
};

export default EditAssignment;
