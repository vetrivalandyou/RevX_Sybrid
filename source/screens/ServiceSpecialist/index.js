import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AppImages} from '../../AppConstants/AppImages';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../components/atom/ScreenSize';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../AppConstants/Constants.json';
import appColors from '../../AppConstants/appColors';
import {GetRequest, PostRequest} from '../../services/apiCall';
import {
  baseUrl,
  endPoint,
  imageUrl,
  messages,
} from '../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {LATEST_SELECT, approve} from '../../AppConstants/appConstants';
import {useDispatch, useSelector} from 'react-redux';
import {
  PULL_CHILDSERVICE_DATA,
  PUSH_CHILDSERVICE_DATA,
} from '../../redux/Action/AppointmentActionType';
import BoxLottie from '../../components/atom/BoxLottie/BoxLottie';


const ServiceSpecialist = ({route}) => {
  const {item} = route.params || {};
  const {SelectedChildServices} = useSelector(
    state => state.AppointmentReducer,
  );
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [Services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('item Service Specialist', item);

  useEffect(() => {
    if (isFocused) {
      customerservices();
    }
  }, [isFocused]);

  const customerservices = () => {
    const payload = {
      operationID: LATEST_SELECT,
      parameterID: 2,
      barbarID: item?.BarbarID,
      parentServiceID: item?.ParentServiceID,
      parentServiceStatusID: approve,
      childServiceID: 0,
      childServiceStatusID: 0,
      barbarSpecialityID: 0,
      isActive: true,
      userID: 0,
      userIP: '',
    };
    console.log("-----", payload)
    PostRequest(endPoint.BARBER_PARENTCHILD_SERVICES, payload)
      .then(res => {
        if (res?.data?.length > 0) {
          setServices(res?.data);
        } else {
          ('');
        }
        setLoading(false);
      })
      .catch(res => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoading(false);
      });
  };

  const handleSelectChildService = item => {
    const isPresent = SelectedChildServices.some(
      x => x.ChildServiceID === item?.ChildServiceID,
    );
    if (isPresent) {
      dispatch({type: PULL_CHILDSERVICE_DATA, payload: item?.ChildServiceID});
    } else {
      dispatch({type: PUSH_CHILDSERVICE_DATA, payload: item});
    }
  };

  const returnTotal = () => {
    if (SelectedChildServices?.length == 0) {
      return 0;
    } else {
      const totalPrice = SelectedChildServices?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.ServicePrice,
        0,
      );
      return totalPrice;
    }
  };

  return (
    <Screen viewStyle={{flex: 1}} statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={item?.ParentServices}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
          }
          rightIcoSize={20}
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
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={appColors.Goldcolor}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View style={{flex: 0.8}}>
          {Services?.length > 0 ? (
               <FlatList
               data={Services}
               keyExtractor={item => item.ChildServiceID}
               renderItem={({item}) => (
                 <Servicedetails
                   item={item}
                   selectedItem={SelectedChildServices}
                   onPress={() => handleSelectChildService(item)}
                 />
               )}
             />
          ) : (
            <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BoxLottie
              animationPath={require('../../LottieAnimation/NoPostFoundAnimation.json')}
            />
          </View>
          )}
       

        </View>
      )}

      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.ApplyNOWButton}>
          <Text
            style={{fontWeight: '600', fontSize: 14, color: appColors.White}}>
            Total ${' '}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
              }}>{`${returnTotal()}`}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const Servicedetails = ({item, selectedItem, onPress}) => {
  const isItemIdPresent = itemId => {
    return selectedItem?.some(x => x?.ChildServiceID === itemId);
  };

  return (
    <TouchableOpacity key={item?.ChildServiceID} onPress={onPress}>
      <View
        style={[
          styles.container,
          isItemIdPresent(item?.ChildServiceID) && {
            borderColor: appColors.Goldcolor,
            borderWidth: 1.25,
          },
        ]}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View style={{paddingVertical: 8}}>
              <Image
                source={{uri: `${imageUrl}${item?.ServiceImage}`}}
                style={{width: 50, height: 50, borderRadius: 100}}
              />
            </View>
            <View style={{flexDirection: 'column', width: '40%'}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '400',
                  fontSize: 15,
                }}>
                {item.ChildService}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#c79647', fontSize: 15, fontWeight: '600'}}>
                ${item.ServicePrice}
              </Text>
            </View>
            <View style={[styles.Circlecontrainer]}>
              <View style={[styles.InnerCircle]}></View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceSpecialist;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: screenSize.height / 10,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#252525',
    marginHorizontal: 10,
    marginVertical: 8,
    justifyContent: 'center',
  },

  NoticationContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },
  Circlecontrainer: {
    height: 30,
    width: 30,
    borderRadius: 40,
    backgroundColor: appColors.Black,
    borderColor: appColors.White,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  InnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 40,
    backgroundColor: appColors.Goldcolor,
    position: 'absolute',
  },
  ApplyNOWButton: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: Platform.OS == 'ios' ? 20 : 15,
    marginHorizontal: 12,
    borderRadius: 40,
  },
});
