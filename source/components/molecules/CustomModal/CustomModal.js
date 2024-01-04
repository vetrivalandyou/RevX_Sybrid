import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../AppConstants/Constants.json';
const {height, width} = Dimensions.get('window');

const CustomModal = ({visible, onRequestClose, label, onYes, onNo}) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View
        style={{
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.modalstyle}>
          <Text
            style={{
              fontSize: 28,
              color: 'black',
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {'Do You Want to Save The Information For Later Use'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={styles.modalbutton}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(constants.screen.ReviewSummary)
                }>
                <Text style={{color: 'white', fontWeight: '700'}}>Yes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalbutton2}>
              <TouchableOpacity
                onPress={() => {
                  onRequestClose(); // Call the onRequestClose prop to close the modal
                }}>
                <Text style={{color: 'black', fontWeight: '700'}}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

//Do You Want To Save The Information For Later Use

export default CustomModal;

const styles = StyleSheet.create({
  modalstyle: {
    height: height / 3.9,
    width: width / 1.3,
    justifyContent: 'center',
    // alignItems:'center',
    marginTop: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'black',
    paddingHorizontal: 20,
  },
  modalbutton: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    borderRadius: 40,
    justifyContent: 'center',
    height: height / 17,
    width: width / 3.9,
  },
  modalbutton2: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1.7,
    justifyContent: 'center',
    height: height / 17,
    width: width / 3.9,
  },
});
