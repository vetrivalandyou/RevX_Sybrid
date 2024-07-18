import React, { useEffect, useState } from 'react';
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
import CustomIcon, { Icons } from '../CustomIcon/CustomIcon';
import AppColors from '../../../AppConstants/appColors';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';

import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

async function onAppleButtonPress(setShowModal) {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    console.log('appleAuthRequestResponse ------>', appleAuthRequestResponse);

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    console.log('appleCredential appleCredential', appleCredential);
    return auth().signInWithCredential(appleCredential);
  } catch (error) {
    console.log('Error occurred during Apple Sign In:', error);
  }
}

const SocailLogin = ({
  SocailLogin,
  iconName,
  iconSize,
  iconType,
  onPressIcon,
  onPressGoogleLogin,
  onPressFacebookLogin
}) => {
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
  //   return appleAuth.onCredentialRevoked(async () => {
  //     console.warn('If this function executes, User Credentials have been Revoked');
  //   });
  // }, []);

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
        // backgroundColor: 'red',
      }}>
      <View style={styles.textStyle}>
        <View style={styles.lineStyle}></View>
        <Text style={{ color: appColors.White }}>{SocailLogin}</Text>
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

        <TouchableOpacity >
          <CustomIcon
            onPress={onPressGoogleLogin}
            type={Icons.AntDesign}
            name={'google'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <CustomIcon
            onPress={onPressFacebookLogin}
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
