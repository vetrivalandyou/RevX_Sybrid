import React from 'react';
<<<<<<< HEAD
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppColors from '../../AppConstants/appColors';
=======
import {Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import Screen from '../../components/atom/ScreenContainer/Screen';
>>>>>>> 25b34d2e6470c2a60e088e631f5bc2765c981152
import appColors from '../../AppConstants/appColors';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
<<<<<<< HEAD
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import { AppImages } from '../../AppConstants/AppImages';
import Header from '../../components/molecules/Header';
import { useDispatch } from 'react-redux';
import { LogIn } from '../../redux/Action/AuthAction';

const Successfull = ({ navigation }) => {

  const [isEye, setIsEye] = React.useState(false);
=======
import {AppImages} from '../../AppConstants/AppImages';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import {LogIn} from '../../redux/Action/AuthAction';

const Successfull = ({route}) => {
  const {userDetails} = route.params;
>>>>>>> 25b34d2e6470c2a60e088e631f5bc2765c981152

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
      <View style={{ flex: 0.1, justifyContent: 'center' }}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Successful'}
<<<<<<< HEAD
        // rightIcoName={"bell"}
        // rightIcoType={Icons.SimpleLineIcons}
        // logIn={"success"}
        // rightIcoSize={20}
        //   leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
=======
>>>>>>> 25b34d2e6470c2a60e088e631f5bc2765c981152
        />
      </View>
      <View
        style={{
          flex: 0.85,
          backgroundColor: appColors.Black,
          justifyContent: 'center',
        }}>
        <View
          style={{ flex: 0.34, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ height: 300, width: 300 }} source={AppImages.success} />
        </View>
<<<<<<< HEAD

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: appColors.White }}>
            Successful!
          </Text>

          <Text style={{ color: appColors.White, fontSize: 15 }}>
=======
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, color: appColors.White}}>
            Successful!
          </Text>
          <Text style={{color: appColors.White, fontSize: 15}}>
>>>>>>> 25b34d2e6470c2a60e088e631f5bc2765c981152
            You have successfully registered in our App
          </Text>
        </View>

        <View
          style={{ alignItems: 'center', flex: 0.2, justifyContent: 'flex-end' }}>
          <ButtonComponent
<<<<<<< HEAD
            onPress={() =>
              // navigation.navigate(constants.screen.BottomTabNavigation)
              dispatch(LogIn(1, null, null))
            }
            style={{ width: '50%' }}
            title={'Start as User'}
          />
        </View>

        <View
          style={{ alignItems: 'center', flex: 0.2, justifyContent: 'flex-end' }}>
          <ButtonComponent
          
            onPress={() => dispatch(LogIn(2, null, null))}
            style={{ width: '50%' }}
            title={'Start as Barber'}
          />
        </View>

        <View
          style={{ alignItems: 'center', flex: 0.2, justifyContent: 'flex-end' }}>
          <ButtonComponent
            onPress={() => dispatch(LogIn(3, null, null))}
            style={{ width: '50%' }}
            title={'Start as Admin'}
=======
            onPress={() => {
              dispatch(
                LogIn(userDetails?.user?._RoleId, userDetails?.token, null),
              );
            }}
            style={{width: '50%'}}
            title={handleButtonName()}
>>>>>>> 25b34d2e6470c2a60e088e631f5bc2765c981152
          />
        </View>
      </View>
    </Screen>
  );
};
export default Successfull;
