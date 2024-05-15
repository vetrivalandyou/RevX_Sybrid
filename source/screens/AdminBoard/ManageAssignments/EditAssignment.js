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
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {GetRequest, PostRequest} from '../../../services/apiCall';
import {Picker} from '@react-native-picker/picker';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import constant from '../../../AppConstants/Constants.json';
import * as Yup from 'yup';
import {Formik} from 'formik';

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
  const [isDropdownSelected, setIsDropdownSelected] = useState(false);

  useEffect(() => {
    getBarberList();
    getVanList();
    // getUserDetail();
  }, []);

  useEffect(() => {
    setIsDropdownSelected(!!selectedBarber && !!selectedVans);
  }, [selectedBarber, selectedVans]);

  // const getUserDetail = async () => {
  //   const userDatail = await getAsyncItem(constant.AsyncStorageKeys.userDetails)
  //   setuserDetails(userDatail)
  // }

  const getBarberList = () => {
    PostRequest(endPoint.BARBER_LIST)
      .then(res => {
        if (res?.data?.code == 200) {
          const approvedVans = res?.data?.data.filter(
            barber => barber.isApproved == true,
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
    PostRequest(endPoint.BARBER_VANASSIGNMENT_CU, payload)
      .then(res => {
        console.log('Response:', res?.data?.data);
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
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

  const validationSchema = Yup.object().shape({
    dropdownValue: Yup.string().required('Dropdown value is required'),
  });

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
        {Platform.OS == 'android' ? (
          <View style={styles.DropdownView}>
            <View style={{flex: 0.56}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#fff',
                  marginHorizontal: 10,
                  paddingBottom: 5,
                }}>
                {'Select Barber :'}
              </Text>
              <Dropdown
                label={'Select Barber '}
                value={selectedBarber}
                onValueChange={itemValue => setSelectedBarber(itemValue)}
                dropDownData={barberList?.map(van => ({
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
        ) : (
          <View style={{flex: 0.4, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#fff',
                marginHorizontal: 10,
                paddingBottom: 5,
              }}>
              {'Select Barber :'}
            </Text>
            <Picker
              selectedValue={selectedBarber}
              style={{
                height: 200,
                width: '100%',
                borderColor: appColors.AppLightGray,
                borderWidth: 1,
                borderRadius: 20,
                backgroundColor: appColors.Black,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedBarber(itemValue)
              }
              itemStyle={{color: appColors.Goldcolor}}>
              <Picker.Item
                style={{
                  fontSize: 13,
                  color: appColors.AppLightGray,
                  backgroundColor: 'white',
                }}
                label={'Select Barber'}
                value={null}
              />
              {barberList?.map((x, ind) => (
                <Picker.Item
                  style={{fontSize: 13, color: appColors.White}}
                  key={ind}
                  label={x.userName}
                  value={x.userId}
                />
              ))}
            </Picker>
          </View>
        )}

        {Platform.OS == 'android' ? (
          <View style={styles.DropdownView}>
            <View style={{flex: 0.56}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#fff',
                  marginHorizontal: 10,
                  paddingBottom: 5,
                }}>
                {'Select Van :'}
              </Text>
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
                  color: selectedVans
                    ? appColors.White
                    : appColors.AppLightGray,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{flex: 0.4, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#fff',
                marginHorizontal: 10,
                paddingBottom: 5,
              }}>
              {'Select Van :'}
            </Text>
            <Picker
              selectedValue={selectedVans}
              style={{
                height: 200,
                width: '100%',
                borderColor: appColors.AppLightGray,
                borderWidth: 1,
                borderRadius: 20,
                backgroundColor: appColors.Black,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedVans(itemValue)
              }
              itemStyle={{color: appColors.Goldcolor}}>
              <Picker.Item
                style={{
                  fontSize: 13,
                  color: appColors.AppLightGray,
                  backgroundColor: 'white',
                }}
                label={'Select Van'}
                value={null}
              />
              {VandropDown?.map((x, ind) => (
                <Picker.Item
                  style={{fontSize: 13, color: appColors.White}}
                  key={ind}
                  label={x.vanName}
                  value={x.vanId}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      <View style={styles.buttonView}>
        <ButtonComponent
          style={[
            styles.buttonStyle,
            {opacity: !isDropdownSelected == '' ? 1 : 0.3},
          ]}
          btnTextColor={{color: 'white'}}
          title={isAdded ? 'Save' : 'Update'}
          onPress={SaveVanAssignmet}
          disable={!isDropdownSelected}
        />
      </View>
    </Screen>
  );
};

export default EditAssignment;
