import React, {useState, useEffect, useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import DeleteSubServices from './DeleteSubServices';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import {AppImages} from '../../../AppConstants/AppImages';
import constants from '../../../AppConstants/Constants.json';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import {LATEST_SELECT, approve} from '../../../AppConstants/appConstants';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {endPoint, imageUrl, messages} from '../../../AppConstants/urlConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';

const ServiceList = ({navigation, route}) => {
  const {item} = route.params;
  const isFocused = useIsFocused();
  const [subServices, setSubServices] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getUserDetail();
    }
  }, [isFocused]);

  const getUserDetail = async () => {
    const userDatail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDatail);
    getChildService(userDatail?.userId);
  };

  const getChildService = userId => {
    const payload = {
      // serviceId: 0,
      // serviceName: '',
      // serviceCategoryId: item?.barberServiceCategryId,
      // operations: 5,
      servicesId: 0,
      serviceCategoryId: item?.barberServiceCategryId,
      barberId: userId,
      statusId: 0,
      pageNumber: 1,
      pageSize: 10,
    };
    console.log(payload);
    PostRequest(endPoint.BARBER_APPROVE_SERVICES, payload)
      .then(res => {
        console.log('res', res?.data?.data);
        setSubServices(res?.data?.data?.[0]?.barberServices);
      })
      .catch(res => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1, backgroundColor: appColors.Black}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Sub Services'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <FlatList
          data={subServices}
          keyExtractor={item => item.servicesId}
          renderItem={({item}) => (
            <Servicedetails key={item.servicesId} item={item} />
          )}
        />
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
          title={'Request Sub Service'}
          onPress={() =>
            navigation.navigate(constants.BarberScreen.AddSubservices, {
              parentService: item,
              userId: userDetails?.userId,
            })
          }
        />
      </View>
    </Screen>
  );
};

const Servicedetails = ({item, key, onPress}) => {
  const refRBSheet = useRef();
  return (
    <TouchableOpacity key={key} onPress={onPress}>
      <View style={[styles.container]}>
        <View style={styles.Subcontainer}>
          <View
            style={{
              paddingVertical: 8,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.serviceImage != '' && (
              <Image
                style={{width: 55, height: 55, borderRadius: 100}}
                source={{uri: `${imageUrl}/${item.serviceImage}`}}
              />
            )}
          </View>
          <View style={{flex: 0.3, marginLeft: 10, justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontSize: 15,
              }}>
              {item.serviceName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.1,
            }}>
            <Text style={{color: '#c79647', fontSize: 15, fontWeight: '600'}}>
              {/* ${item.servicePrice} */}$ 100
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.2,
            }}>
            <Text
              style={{
                color:
                  item?.servicesStatusId == approve
                    ? appColors.Green
                    : item?.servicesStatusId == 9
                    ? appColors.AppLightGray
                    : appColors.Red,
                fontSize: 13,
                fontWeight: '600',
              }}>
              {/* ${item.servicePrice} */}
              Pending
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image
              source={AppImages.deleteimage}
              style={styles.Deleteimagestyle}
            />
          </TouchableOpacity>
          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteSubServices refRBSheet={refRBSheet} DeleteService={item} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ServiceList;
