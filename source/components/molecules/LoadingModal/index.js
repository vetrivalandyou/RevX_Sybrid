import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {screenSize} from '../../atom/ScreenSize';
import appColors from '../../../AppConstants/appColors';

const LoadingModal = ({visible, modalHeight}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={[modalHeight, styles.modalstyle]}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    </Modal>
  );
};
export default LoadingModal;

const styles = StyleSheet.create({
  modalstyle: {
    flex: 1,
    backgroundColor: appColors.Black,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
