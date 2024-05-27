import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import AppColors from '../../../AppConstants/appColors';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';

import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';


async function onAppleButtonPress(setShowModal) {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    console.log("appleAuthRequestResponse ------>", appleAuthRequestResponse  )

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    console.log("appleCredential appleCredential", appleCredential)

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  } catch (error) {
    console.log('Error occurred during Apple Sign In:', error);
    // Handle the error here, for example, you can show an error message to the user
  }
}

const SocailLogin = ({
  SocailLogin,
  iconName,
  iconSize,
  iconType,
  onPressIcon,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []); 

  const handleAppleButtonPress = () => {
    if (Platform.OS === 'ios') {
      onAppleButtonPress(setShowModal);
    } else {
      setShowModal(true);
    }
  }

  return (
    <View
      style={{
        flex: 0.15,
        justifyContent: 'space-between',
        // backgroundColor: 'red',
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

        <TouchableOpacity onPress={onPressIcon}>
          <CustomIcon
            type={Icons.AntDesign}
            name={'google'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressIcon}>
          <CustomIcon
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
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Please log in using your Apple account</Text>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default SocailLogin;
