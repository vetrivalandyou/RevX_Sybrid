import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../AppConstants/Constants.json';
import {GetRequest, PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {AppImages} from '../../AppConstants/AppImages';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {approve} from '../../AppConstants/appConstants';

const BarberSpecialist = ({navigation}) => {
  const [barberList, setBarberList] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    getBarberList();
  }, []);

  function getBarberList() {
    PostRequest(endPoint.BARBER_LIST)
      .then(res => {
        setLoading(false);
        console.log('res', res?.data);
        if (res?.data?.code == 200) {
          setBarberList(res?.data?.data?.filter(x => x.statusId == approve));
        } else SimpleSnackBar(res?.data?.message);
        setLoading(false);
      })
      .catch(err => {
        setLoading(flase);
        console.log(err);
      });
  }

  const BarberSpecialistContainer = ({item}) => {
    console.log("item",item)
    return (
      <View
        style={{
          backgroundColor: appColors.darkgrey,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderRadius: 70,
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(constants.screen.BarberProfile)}>
          <Image source={AppImages.bb1} style={{marginRight: 10}} />
          {/* <Image source={{uri: item?.ProfileImage}} style={{}} /> */}
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.8, justifyContent: 'center'}}>
            <Text style={{color: appColors.White, fontSize: 18, marginLeft: 5}}>
              {item?.userName}
            </Text>
          </View>
          <View style={{flex: 0.5, justifyContent: 'center'}}>
            {console.log('itemitemitemitem', item)}

            <ButtonComponent
              onPress={() =>
                navigation.navigate(constants.screen.Services, {
                  barberDetails: {UserId: item?.userId},
                })
              }
              style={{width: '98%'}}
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
      viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Barber Special List'}
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
      {Loading ? (
        <ActivityIndicator
          size="small"
          color="#C79646"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View style={{flex: 0.9}}>
          <FlatList
            data={barberList}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <BarberSpecialistContainer item={item} />}
            keyExtractor={item => item?.userId}
          />
        </View>
      )}
    </Screen>
  );
};
export default BarberSpecialist;
