import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DeleteServices from './DeleteServices';
import { PostRequest } from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import { AppImages } from '../../../AppConstants/AppImages';
import constants from '../../../AppConstants/Constants.json';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import { endPoint, messages } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { SUCCESS_CODE, approve } from '../../../AppConstants/appConstants';

const Servicesboard = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [barberServices, setBarberServices] = useState([]);
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
    getBarberServices(userDatail?.userId);
  };

  function getBarberServices(userId) {
    const payload = {
      serviceCategoryId: 0,
      barberId: userId,
      statusId: 0,
    };
    console.log('pyload', payload);
    PostRequest(endPoint.BARBER_SERVICE_CATEGORY, payload)
      .then(res => {
        console.log('----------------', res?.data?.data);
        if (res?.data?.code == SUCCESS_CODE) {
          setBarberServices(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(messages.WentWrong, appColors.Red);
      });
  }

  const handleItemPress = item => {
    if (item?.categoryStatusId == 10) {
      navigation.navigate(constants.BarberScreen.ServiceList, {
        item: item,
        userId: userDetails?.userId,
      });
    }
  };

  console.log(
    'barberServices barberServices barberServices',
    barberServices?.[0]?.categories,
  );

  return (
    <Screen
      viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1, backgroundColor: appColors.Black }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'My Services'}
          logIn={'success'}
        />
      </View>

      <ScrollView style={{ flex: 0.8 }}>
        {barberServices?.[0]?.categories?.map((item, index) => (
          <Servicelist
            key={item.barberServiceCategryId}
            item={item}
            index={index}
            onPress={() => handleItemPress(item)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{ color: 'white' }}
          title={'Request Service'}
          onPress={() =>
            navigation.navigate(constants.BarberScreen.Addservices, {
              userId: userDetails?.userId,
            })
          }
        />
      </View>
    </Screen>
  );
};

const handleApproveRejectRemarks = item => {
  if (item?.categoryStatusId == 10) {
    return (
      <>
        Approved{' '}
        <CustomIcon
          name="check-square-o"
          type={Icons.FontAwesome}
          size={11}
          color={appColors.White}
        />
      </>
    );
  } else if (item?.categoryStatusId == 11) {
    return (
      <>
        Rejected{' '}
        <CustomIcon
          name="cancel"
          type={Icons.MaterialIcons}
          size={11}
          color={appColors.White}
        />
      </>
    );
  } else {
    return (
      <>
        Pending{' '}
        <CustomIcon
          name="clock"
          type={Icons.Octicons}
          size={11}
          color={appColors.White}
        />
      </>
    );
  }
};

const Servicelist = ({ index, item, onPress }) => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  return (
    <TouchableOpacity key={item.barberServiceCategryId} onPress={onPress}>
      <View style={[styles.container]}>
        <View style={[styles.Subcontainer]}>
          <View style={[styles.textView]}>
            <View style={{ flex: 0.8, justifyContent: 'center' }}>
              <Text style={styles.textStyle}>{item.barberServiceCategry}</Text>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <View style={{
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:
                  item?.categoryStatusId == 10
                    ? appColors.Sucess
                    : item?.categoryStatusId == 9
                      ? appColors.Goldcolor
                      : appColors.Reject,
                width: "100%",
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 20,
              }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: appColors.White,

                      fontSize: 12,
                    },
                  ]}>
                  {handleApproveRejectRemarks(item)}
                </Text>
              </View>

            </View>
          </View>
          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteServices refRBSheet={refRBSheet} DeleteService={item} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Servicesboard;
