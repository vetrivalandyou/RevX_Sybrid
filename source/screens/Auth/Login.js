import React from 'react';
import {Text, View, StatusBar, TouchableOpacity} from 'react-native';
import AuthHeader from '../../components/molecules/AuthHeader';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppColors from '../../AppConstants/appColors';
import appColors from '../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import RememberMe from '../../components/molecules/RememberMe';
import SocailLogin from '../../components/molecules/SocailLogin';

const Login = ({navigation}) => {
  // const [isEye, setIsEye] = React.useState(false);
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Screen
      statusBarColor={appColors.Goldcolor}
      translucent={true}
      barStyle="light-content">
      <AuthHeader
        logIn={'Log In'}
        heading={'Welcome Back!'}
        subheading={'Please Login your account, Enter your details.'}
        onPress={() => navigation.navigate(constants.screen.ScreenSlider)}
      />

      <View
        style={{
          backgroundColor: 'white',
          flex: 0.8,
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
          onPressFP={() => navigation.navigate(constants.screen.ForgotPassword)}
        />

        {/* </View> */}
        <View
          style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <ButtonComponent
            title={'Sign In'}
            onPress={() =>
              navigation.navigate(constants.screen.BottomTabNavigation)
            }
          />
        </View>

        <View
          style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Text style={{color: appColors.GrayColor}}>Not register yet? </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(constants.screen.CreateAccount)}>
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
