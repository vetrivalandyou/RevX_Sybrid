import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Platform,
  StyleSheet,
} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import AppColors from '../../../AppConstants/appColors';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';
import {jwt_decode} from 'jwt-decode';
import auth from '@react-native-firebase/auth';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../atom/Snakbar/Snakbar';

const SocailLogin = ({
  SocailLogin,
  iconName,
  iconSize,
  iconType,
  onPressIcon,
}) => {
  const [showModal, setShowModal] = useState(false);

  if (Platform.OS == 'android') {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '379767599880-3t7pvflfu8u28ck99mshtva23sfr16ik.apps.googleusercontent.com',
      // '379767599880-3t7pvflfu8u28ck99mshtva23sfr16ik.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  } else {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '379767599880-b33kgjlumovqpstj2v234slgnqp3lsnv.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }

  const registerUser = (userInfo, isLoginId) => {
    const {email, name, id} = userInfo?.user;
    const payload = {
      FullName: name,
      UserEmail: email,
      UserPassword: '',
      UserPhone: '',
      loginWith: isLoginId /* Login With Google 3 */,
      AuthenticationCode: id,
    };
    console.log('userInfouserInfouserInfo', userInfo);
    console.log('payloadpayload', payload);
    LoginUser(userInfo, isLoginId);
    // PostRequest(endPoint.SIGNUP, payload)
    //   .then(res => {
    //     if (res?.data?.code == 200) {
    //     } else {
    //     }
    //   })
    //   .catch(err => {
    //     SimpleSnackBar(messages.Catch, appColors.Red);
    //   });
  };

  const LoginUser = (userInfo, isLoginId) => {
    const payload = {
      UserEmail: userInfo?.user?.email,
      UserPassword: '',
      loginWith: isLoginId,
      AuthenticationCode: userInfo?.user?.id,
    };
    console.log('login user payload', payload);
    // PostRequest(endPoint.LOGIN, payload)
    //   .then(res => {
    //     console.log('res', res?.data);
    //     // if (res?.data?.code == 200) {
    //     //   setAsyncItem(
    //     //     constants.AsyncStorageKeys.token,
    //     //     res?.data?.data?.token,
    //     //   );
    //     //   setAsyncItem(
    //     //     constants.AsyncStorageKeys.userDetails,
    //     //     res?.data?.data?.user,
    //     //   );
    //     //   navigation?.navigate(constants.AuthScreen.Successfull, {
    //     //     userDetails: res?.data?.data,
    //     //   });
    //     // } else {
    //     //   SimpleSnackBar(res?.data?.message);
    //     // }
    //   })
    //   .catch(err => {
    //     SimpleSnackBar(messages.Catch, appColors.Red);
    //     console.log('fail');
    //   });
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Login With Google', userInfo);
      registerUser(userInfo, 3); /* Login With Google 3 */
    } catch (error) {
      console.log('err', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          // setState({userInfo: user});
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        'user_hometown',
        'user_birthday',
      ]);

      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const accessTokenData = await AccessToken.getCurrentAccessToken();
        if (accessTokenData) {
          console.log(accessTokenData.accessToken.toString());
          // You can use the accessTokenData.accessToken.toString() as needed
        }

        // Extract access token from the data
        const {accessToken} = accessTokenData;

        // Now you can use the accessToken to make requests to the Facebook Graph API to get user data

        // Fetch user's email
        const emailResponse = await fetch(
          `https://graph.facebook.com/me?fields=email&access_token=${accessToken}`,
        );
        const emailData = await emailResponse.json();

        // Fetch user's name and phone number
        const profileResponse = await fetch(
          `https://graph.facebook.com/me?fields=name,phone&access_token=${accessToken}`,
        );
        const profileData = await profileResponse.json();

        // Combine all data
        const userData = {
          email: emailData.email,
          name: profileData.name,
          phone: profileData.phone,
          // Add more fields as needed
        };

        AccessToken.getCurrentAccessToken().then(data => {
          const accessToken = data.accessToken.toString();

          this.getInfoFromToken(accessToken);
        });

        // Do something with the user data
        console.log('userInfo', userData);
        console.log('profile', profileData);
      }
    } catch (error) {
      console.log('Error with Facebook login:', error);
    }
  };

  async function onAppleButtonPress() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      console.log('appleAuthRequestResponse ------>', appleAuthRequestResponse);

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      console.log('credentialState', credentialState);

      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      console.log('appleCredential appleCredential', appleCredential);
      const userDetails = await auth().signInWithCredential(appleCredential);
      const {email, displayName} = {jwt_decode}(identityToken);
      console.log(
        '{jwt_decode}{jwt_decode}{jwt_decode}{jwt_decode}{jwt_decode}',
        email,
        displayName,
      );
      console.log(
        'userDetails userDetails userDetails userDetails userDetails',
        userDetails,
      );
    } catch (error) {
      console.log('Error occurred during Apple Sign In:', error);
    }
  }

  const handleAppleButtonPress = () => {
    if (Platform.OS === 'ios') {
      onAppleButtonPress(setShowModal);
    } else {
      setShowModal(true);
    }
  };

  return (
    <View
      style={{
        flex: 0.15,
        justifyContent: 'space-between',
      }}>
      <View style={styles.textStyle}>
        <View style={styles.lineStyle}></View>
        <Text style={{color: appColors.White}}>{SocailLogin}</Text>
        <View style={styles.lineStyle}></View>
      </View>

      <View style={styles.iconsStyle}>
        <TouchableOpacity onPress={handleAppleButtonPress}>
          <CustomIcon
            type={Icons.AntDesign}
            name={'apple1'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <CustomIcon
            onPress={loginWithGoogle}
            type={Icons.AntDesign}
            name={'google'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomIcon
            onPress={handleFacebookLogin}
            type={Icons.FontAwesome}
            name={'facebook'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for Android */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalText}>
              Apple Authentication is not supported on this device.
            </Text>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setShowModal(false)}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SocailLogin;

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: appColors.Goldcolor,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: appColors.White,
  },
  closeButton: {
    backgroundColor: AppColors.Primary,
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: appColors.White,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
