import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import DeleteServices from './DeleteServices';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import {AppImages} from '../../../AppConstants/AppImages';
import Header from '../../../components/molecules/Header';
import {endPoint} from '../../../AppConstants/urlConstants';
import constants from '../../../AppConstants/Constants.json';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Dropdown from '../../../components/molecules/Dropdown/Dropdown';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import {
  LATEST_INSERT,
  LATEST_SELECT,
  SUCCESS_CODE,
  pending,
} from '../../../AppConstants/appConstants';

const AddSubservices = ({navigation, route}) => {
  const {parentService, userId} = route.params;
  const [subServiceList, setSubServiceList] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueDetails, setSelectedValueDetails] = useState('');

  // console.log('userId', userId);
  // console.log('parentService', parentService);
  // console.log('subServiceList', subServiceList);

  useEffect(() => {
    GetsetupCategories();
  }, [selectedValueDetails]);

  const GetsetupCategories = () => {
    const payload = {
      serviceId: 0,
      serviceName: '',
      serviceCategoryId: parentService?.barberServiceCategryId,
      operations: LATEST_SELECT,
    };
    PostRequest(endPoint.BARBER_SERVICES_GET, payload)
      .then(res => {
        // console.log('responseeee>>>>.>', res?.data?.data);
        setSubServiceList(
          res?.data?.data?.map(x => ({
            ...x,
            label: x.serviceName,
            value: x.servicesId,
          })),
        );
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const handleAddService = () => {
    if (selectedValue !== '') {
      const payload = {
        barberId: userId,
        statusId: pending,
        isApproved: false,
        operations: LATEST_INSERT,
        createdBy: userId,
        ud_Barber_Approve_Service_Type: [
          {
            servicesId: selectedValue,
          },
        ],
      };

      console.log('payload', payload);
      PostRequest(endPoint.APPROVE_BARBER_SERVICE, payload)
        .then(res => {
          console.log('res', res?.data?.data);
          // if (res?.data?.code === SUCCESS_CODE) {
          //   SimpleSnackBar(res?.data?.message);
          //   navigation.goBack();
          // } else {
          //   console.error('Error:', res?.data?.message);
          //   SimpleSnackBar(res?.data?.message, appColors.Red);
          // }
        })
        .catch(err => {
          console.error('Error:', err);
          SimpleSnackBar(err?.data?.message, appColors.Red);
        });
    }
  };

  const handleSelectSubService = e => {
    // console.log('eeeeeeeeee', e);
    setSelectedValue(e);
    const getValue = subServiceList?.find(x => x.servicesId == e);
    console.log('getValue', getValue);
    setSelectedValueDetails(getValue);
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
          headerText={'Add Sub Services'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <View style={{flex: 0.18}}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              margin: 5,
              paddingLeft: 5,
            }}>
            <Text style={{color: appColors.White, fontSize: 15}}>
              Sub Service
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
            }}>
            <Dropdown
              label={'Select Sub Service'}
              value={selectedValue}
              onValueChange={e => handleSelectSubService(e)}
              dropDownData={subServiceList}
              style={[styles.dropDownStyle, {borderRadius: 20}]}
              custompickerstyle={{
                color: selectedValue ? appColors.White : appColors.AppLightGray,
              }}
            />
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              margin: 5,
              paddingLeft: 5,
            }}>
            <Text style={{color: appColors.White, fontSize: 15}}>
              Sub Service Price
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
            }}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              placeholder="Service Price"
              placeholderTextColor={appColors.LightGray}
              value={selectedValueDetails?.servicePrice?.toString()}
              editable={false}
            />
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              margin: 5,
              paddingLeft: 5,
            }}>
            <Text style={{color: appColors.White, fontSize: 15}}>
              Sub Service Duration
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
            }}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              placeholder="Service Duration"
              placeholderTextColor={appColors.LightGray}
              value={selectedValueDetails?.serviceDuration?.toString()}
              editable={false}
              // onChangeText={text => setSubServiceDescription(text)}
            />
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
          title={'Request For Approval'}
          onPress={handleAddService}
        />
      </View>
    </Screen>
  );
};

export default AddSubservices;
