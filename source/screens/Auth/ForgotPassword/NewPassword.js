import React from 'react';
import {Text, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const NewPassword = ({navigation}) => {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  // const togglePasswordVisibility = () => {
  //   setIsPasswordVisible(!isPasswordVisible);
  // };

  return (
    <Screen>
      <AuthHeader
        logIn={'New Password'}
        heading={'Create New Password'}
        subheading={'Please Login your account, Enter your details.'}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: 'white',
          flex: 0.8,
          padding: 15,
          backgroundColor: appColors.Black,
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'space-evenly',
          }}>
          <SimpleTextField
            placeholder={'Enter Your Password'}
            value={passwordValue}
            onChangeText={setPasswordValue}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={appColors.White}
          />

          <SimpleTextField
            placeholder={'Enter Your Confirm Password'}
            value={passwordValue}
            onChangeText={setPasswordValue}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={appColors.White}
          />
        </View>

        <View style={{flex: 0.2}}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            Password must be atleast 8 Character{' '}
          </Text>
        </View>

        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
            marginHorizontal: 20,
          }}>
          <ButtonComponent
            title={'Reset Password'}
            onPress={() => navigation.navigate(constants.screen.Login)}
          />
        </View>
      </View>
    </Screen>
  );
};
export default NewPassword;
