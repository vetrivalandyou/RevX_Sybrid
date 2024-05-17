import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicatorComponent,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import appColors from '../../AppConstants/appColors';
import constants from '../../AppConstants/Constants.json';
import Header from '../../components/molecules/Header';
import Screen from '../../components/atom/ScreenContainer/Screen';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../../components/atom/ScreenSize';
import Entypo from 'react-native-vector-icons/Entypo';
import {GetRequest, PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {LATEST_SELECT, approve} from '../../AppConstants/appConstants';
import {useDispatch, useSelector} from 'react-redux';
import {RESET_CHILDSERVICES_DATA} from '../../redux/Action/AppointmentActionType';

const Services = ({route}) => {
  const {barberDetails} = route.params || 0;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {SelectedChildServices} = useSelector(
    state => state.AppointmentReducer,
  );

  console.log(' Services barberDetails', barberDetails);

  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [barberServices, setBarberServices] = useState([]);

  useEffect(() => {
    getBarberServices();
    return () => {
      dispatch({type: RESET_CHILDSERVICES_DATA, payload: new Array(0)});
    };
  }, []);

  function getBarberServices() {
    const payload = {
      operationID: LATEST_SELECT,
      parameterID: 1,
      barbarID: barberDetails?.UserId,
      parentServiceID: 0,
      parentServiceStatusID: 0,
      childServiceID: 0,
      childServiceStatusID: 0,
      barbarSpecialityID: 0,
      isActive: true,
      userID: 0,
      userIP: '',
    };
    console.log('Payload', payload);
    PostRequest(endPoint.BARBER_PARENTCHILD_SERVICES, payload)
      .then(res => {
        console.log("resresres",res?.data)
        if (res?.data?.length > 0) {
          setBarberServices(res?.data);
        } else {
          console.log('No Service Found');
          // SimpleSnackBar('No Service Found', appColors.Red);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

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
          headerText={'Our Services'}
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
          {barberServices?.length > 0 ? (
            <FlatList
              data={barberServices}
              keyExtractor={item => item?.ParentServiceID}
              renderItem={({item}) => <Barberinfo item={item} />}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: appColors.White,
                }}>
                No Service Found !!
              </Text>
            </View>
          )}
        </View>
      )}

      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(constants.screen.AppointmentDate, {
              barberDetails: barberDetails,
            })
          }
          disabled={SelectedChildServices?.length > 0 ? false : true}
          style={[
            styles.ApplyNOWButton,
            {opacity: SelectedChildServices?.length > 0 ? 1 : 0.3},
          ]}>
          <Text style={{fontWeight: '600', fontSize: 13, color: 'white'}}>
            Book Now{' '}
            {returnTotal() != 0 && (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>{`/ $${returnTotal()}`}</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const Barberinfo = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={item?.ParentServiceID}
      onPress={() =>
        navigation.navigate(constants.screen.ServiceSpecialist, {
          item: item,
        })
      }>
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={{width: screenSize.width / 2}}>
            <Text
              style={{fontWeight: '400', fontSize: 15, color: appColors.White}}>
              {item?.ParentServices}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: screenSize.width / 4.5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: screenSize.width / 6,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  color: appColors.White,
                  fontSize: 14,
                }}>
                {item?.ServiceCount}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  color: appColors.White,
                  fontSize: 14,
                }}>
                {item?.ServiceCount > 1 ? ' types' : ' type'}
              </Text>
            </View>
            <View>
              <CustomIcon
                name={'controller-play'}
                type={Icons.Entypo}
                size={17}
                color={appColors.Goldcolor}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    width: screenSize.width / 1.07,
    height: screenSize.height / 10,
    justifyContent: 'center',
    paddingVertical: Platform.OS == 'ios' ? 25 : 16,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#252525',
    marginHorizontal: 12,
    marginVertical: 8,
  },

  NoticationContainer: {
    height: screenSize.height / 20,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',
  },

  ApplyNOWButton: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: Platform.OS == 'ios' ? 20 : 15,
    marginHorizontal: 14,
    borderRadius: 40,
  },
});
