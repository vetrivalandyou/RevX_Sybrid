import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {screenSize} from '../../atom/ScreenSize';
import {AppImages} from '../../../AppConstants/AppImages';

const PaymentModal = ({
  visible,
  onRequestClose,
  modalHeight,
  label,
  onYes,
  onNo,
  title,
  Customlablestyle,
  lable1,
  showYesNoButton,
  showViewEReciptButton,
  showImage,
  showLable,
  showLable1,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[styles.modalstyle, modalHeight]}>
          {showImage && (
            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                paddingTop: 10,
                // backgroundColor: 'red',
              }}>
              <Image
                source={AppImages.success}
                style={{height: 130, width: 250}}
              />
            </View>
          )}
          {showLable && (
            <View style={{flex: 0.2}}>
              <Text style={[styles.Labelstyle, Customlablestyle]}>{label}</Text>
              <Text style={{fontSize: 28, color: 'black', textAlign: 'center'}}>
                {title}
              </Text>
            </View>
          )}
          {showLable1 && (
            <View style={{flex: 0.1}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {lable1}
              </Text>
            </View>
          )}
          {showYesNoButton && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 0.27,
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 0.45, alignItems: 'flex-end'}}>
                <ButtonComponent
                  style={{
                    backgroundColor: '#C79646',
                    width: '80%',
                    paddingVertical: 12,
                    borderWidth: 1.5,
                    borderColor: '#C79646',
                  }}
                  title={'Yes'}
                  onPress={onYes}
                />
              </View>
              <View style={{flex: 0.45, alignItems: 'flex-start'}}>
                <ButtonComponent
                  style={{
                    backgroundColor: 'white',
                    width: '80%',
                    borderWidth: 1.5,
                    paddingVertical: 12,
                  }}
                  btnstyle={{color: 'black'}}
                  title={'No'}
                  onPress={onYes}
                />
              </View>
            </View>
          )}
          {showViewEReciptButton && (
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <ButtonComponent
                style={{
                  backgroundColor: '#C79646',
                  width: '65%',
                }}
                title={'View E-Recipt'}
                onPress={() => {
                  onRequestClose(); // Call the onRequestClose prop to close the modal
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

//Do You Want To Save The Information For Later Use

export default PaymentModal;

const styles = StyleSheet.create({
  modalstyle: {
    height: screenSize.height / 2.2,
    width: screenSize.width / 1.3,
    justifyContent: 'center',
    // alignItems:'center',

    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'black',
  },
  Labelstyle: {
    fontSize: 23,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
});
