import React, {useEffect} from 'react';
import {Text, View, StatusBar, TouchableOpacity} from 'react-native';
import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../../services/axiosInstance';
import {endPoint} from '../../AppConstants/urlConstants';
import {GetRequest, PostRequest} from '../../services/apiCall';

const Login = () => {
  const navigation = useNavigation();
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <Screen
      authStyle={{flex: 1, backgroundColor: appColors.Goldcolor}}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}
      translucent={false}
      barStyle="light-content">
      <View style={{flex: 0.3}}>
        <AuthHeader
          logIn={'Log In'}
          heading={'Welcome Back!'}
          subheading={'Please Login your account, Enter your details.'}
          onPress={() => {
            return navigation.navigate(constants.AuthScreen.ScreenSlider);
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
          flex: 0.7,
          padding: 15,
          backgroundColor: appColors.Black,
        }}>
        <View style={{flex: 0.3, justifyContent: 'space-evenly'}}>
          <SimpleTextField
            placeholder={'Enter Your Email'}
            placeholderTextColor={appColors.White}
          />

          <SimpleTextField
            placeholder={'Enter Your Password'}
            value={passwordValue}
            onChangeText={setPasswordValue}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={appColors.White}
          />
        </View>
        {/* <View style={{ flex: 0.1, justifyContent: 'center' ,backgroundColor:'purple'}}> */}
        <RememberMe
          RememberTex={'Remember me'}
          ForgetPasswordText={'Forget Password'}
          onPressFP={() =>
            navigation.navigate(constants.AuthScreen.ForgotPassword)
          }
        />

        {/* </View> */}
        <View
          style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <ButtonComponent
            title={'Sign In'}
            onPress={() =>
              navigation.navigate(constants.AuthScreen.Successfull)
            }
          />
        </View>

        <View
          style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Text style={{color: appColors.GrayColor}}>Not register yet? </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(constants.AuthScreen.CreateAccount)
            }>
            <Text style={{color: appColors.Goldcolor}}>Create an account</Text>
          </TouchableOpacity>
        </View>
        <View></View>

        <SocailLogin
          SocailLogin={'or Login Using'}
          iconName={'facebook'}
          iconType={Icons.FontAwesome}
          color={appColors.White}
        />
      </View>
    </Screen>
  );
};
export default Login;
