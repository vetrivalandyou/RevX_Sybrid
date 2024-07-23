import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  ActivityIndicator,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../../AppConstants/AppImages';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../../AppConstants/Constants.json';
import {useIsFocused} from '@react-navigation/native';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {screenSize} from '../../../components/atom/ScreenSize';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';

const AdminBarberEarnings = ({navigation}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [barberList, setBarberList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getBarberEarning();
    }
  }, [isFocused]);

  const getBarberEarning = () => {
    const payload = {
      operationID: 1,
      parameterID: 0,
      barberID: 0,
      _PageNumber: 1,
      _RowsOfPage: 10,
    };
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then(res => {
        if (res?.data?.Table?.length > 0) {
          console.log('res?.data?.Tableres?.data?.Table', res?.data?.Table);
          setBarberList(res?.data?.Table);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log('1231231', err);
        setIsLoading(false);
      });
  };

  const BarberSpecialistContainer = ({item}) => {
    console.log('item QQQQQQQQQQQQQQQQQQQQQ', item);
    return (
      <View
        style={{
          backgroundColor: appColors.darkgrey,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderRadius: 70,
          flexDirection: 'row',
          margin: 10,
          height: screenSize.height / 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: `${imageUrl}${item?.ProfileImage}`}}
              style={{width: 55, height: 55, borderRadius: 50}}
            />
          </View>
          <View style={{flex: 0.5, justifyContent: 'center'}}>
            <Text
              style={{
                color: appColors.White,
                fontWeight: 'bold',
                fontSize: 22,
                marginLeft: 7,
              }}>
              ${item.P_Amount.toLocaleString()}
            </Text>
            <Text
              style={{
                color: appColors.White,
                marginTop: 3,
                marginLeft: 7,
                fontSize: 12,
              }}>
              {item.UserName}
            </Text>
          </View>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
            <ButtonComponent
              style={{}}
              onPress={() =>
                navigation.navigate(constants.AdminScreens.BarberEarnReport, {
                  BarberData: item,
                })
              }
              title={'View'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{padding: 0.9}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          headerText={'Barber Earnings'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          headerTextViewStyle={{alignItems: 'center'}}
          onPressLeftIcon={() => navigation.goBack()}
        />
      </View>

      <View style={{flex: 0.9}}>
        {barberList?.length > 0 ? (
          <>
            {isLoading == false ? (
              <FlatList
                data={barberList}
                keyExtractor={item => item.BarbarID}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <BarberSpecialistContainer item={item} />
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={appColors.Goldcolor} />
              </View>
            )}
          </>
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
      </View>
    </Screen>
  );
};
export default AdminBarberEarnings;
