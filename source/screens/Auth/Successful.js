import React from 'react';
import {Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import {AppImages} from '../../AppConstants/AppImages';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import {LogIn} from '../../redux/Action/AuthAction';

const Successfull = ({route}) => {
  const {userDetails} = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleButtonName = () => {
    if (userDetails?.user?._RoleId == 4) return 'Start as User';
    else if (userDetails?.user?._RoleId == 3) return 'Start as Barber';
    else return 'Start as Admin';
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{}}>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Successful'}
        />
      </View>
      <View
        style={{
          flex: 0.85,
          backgroundColor: appColors.Black,
          justifyContent: 'center',
        }}>
        <View
          style={{flex: 0.34, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{height: 300, width: 300}} source={AppImages.success} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, color: appColors.White}}>
            Successful!
          </Text>
          <Text style={{color: appColors.White, fontSize: 15}}>
            You have successfully registered in our App
          </Text>
        </View>
        <View
          style={{alignItems: 'center', flex: 0.2, justifyContent: 'flex-end'}}>
          <ButtonComponent
            onPress={() => {
              dispatch(
                LogIn(userDetails?.user?._RoleId, userDetails?.token, null),
              );
            }}
            style={{width: '50%'}}
            title={handleButtonName()}
          />
        </View>
      </View>
    </Screen>
  );
};
export default Successfull;
