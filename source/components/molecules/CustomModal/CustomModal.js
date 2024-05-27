import {StyleSheet, Text, View, Modal, Image} from 'react-native';
import React from 'react';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {screenSize} from '../../atom/ScreenSize';

const CustomModal = ({
  visible,
  onRequestClose,
  modalHeight,
  label,
  onYes,
  title,
  Customlablestyle,
  lable1,
  showYesNoButton,
  showViewEReciptButton,
  showImage,
  showLable,
  showLable1,
  CustomModalView,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[styles.modalstyle, modalHeight]}>
          {CustomModalView && (
            <CustomModalView />
          )}
          {showImage && (
            <View
              style={{flex: 0.4, alignItems: 'center', paddingTop: 10}}></View>
          )}
          {showLable && (
            <View style={{flex: 0.2}}>
              <Text style={[styles.Labelstyle, Customlablestyle]}>{label}</Text>
              <Text
                style={{fontSize: 11.5, color: 'black', textAlign: 'center'}}>
                {title}
              </Text>
            </View>
          )}
          {showLable1 && (
            <View style={{flex: 0.4}}>
              <Text
                style={{
                  fontSize: 20,
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
                  btnTextColor={{color: 'black'}}
                  title={'No'}
                  onPress={onYes}
                />
              </View>
            </View>
          )}
          {showViewEReciptButton && (
            <View style={{flex: 0.16, alignItems: 'center'}}>
              <ButtonComponent
                style={{
                  backgroundColor: '#C79646',
                  bottom: 1,
                  position: 'absolute',
                  width: '65%',
                }}
                title={'View E-Recipt'}
                onPress={onYes}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;

const styles = StyleSheet.create({
  modalstyle: {
    height: screenSize.height / 2,
    width: screenSize.width / 1.3,
    // justifyContent: 'center',
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
