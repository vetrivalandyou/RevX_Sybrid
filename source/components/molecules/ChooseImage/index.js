import React from 'react';
import {View, StyleSheet} from 'react-native';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import ImagePicker from 'react-native-image-crop-picker';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
const ChooseImage = ({setProfileImage, refRBSheet}) => {
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setProfileImage(image);
        refRBSheet.current.close();
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setProfileImage(image);
        refRBSheet.current.close();
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={chooseImageStyle.mainContainer}>
      <View style={chooseImageStyle.subView}>
        <View style={chooseImageStyle.buttonView}>
          <ButtonComponent
            style={chooseImageStyle.buttonStyle}
            icon={true}
            type={Icons.MaterialCommunityIcons}
            name={'camera-outline'}
            size={21}
            color={'white'}
            btnTextColor={{color: 'white'}}
            title={'Camera '}
            onPress={openCamera}
          />
        </View>
        <View style={chooseImageStyle.buttonView}>
          <ButtonComponent
            style={chooseImageStyle.buttonStyle}
            icon={true}
            type={Icons.FontAwesome}
            name={'photo'}
            size={16}
            color={'white'}
            btnTextColor={{color: 'white'}}
            title={'Gallery'}
            onPress={openGallery}
          />
        </View>
      </View>
    </View>
  );
};

const chooseImageStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  buttonView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#424242',
    paddingVertical: 13,
    width: '90%',
  },
});
export default ChooseImage;
