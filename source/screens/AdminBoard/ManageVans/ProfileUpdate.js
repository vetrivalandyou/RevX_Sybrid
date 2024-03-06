import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import ImagePicker from 'react-native-image-crop-picker';
import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
import styles from "./styles";
const ProfileUpdate = ({ onImageCaptured }) => {
  const [imageUri, setImageUri] = useState(null);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // Image object will contain information about the captured image
        console.log(image);

        setImageUri(image.path);
        onImageCaptured(image.path);

        // You can also display the image using Image component
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
        setImageUri(image.path);
        onImageCaptured(image.path); // Pass the selected image back to the parent component
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };


  return (
    <View style={styles.updateprofileView}>
      <View style={styles.buttonouterView}>
        <View
          style={styles.camerabuttonview}>
          <ButtonComponent
            style={{
              backgroundColor: '#424242',
              paddingVertical: 13,
              width: '90%',
            }}
            icon={true}
            type={Icons.MaterialCommunityIcons}
            name={'camera-outline'}
            size={21}
            color={'white'}
            btnTextColor={{ color: 'white' }}
            title={'Camera '}
            onPress={openCamera}
          />
        </View>
        <View style={styles.gallerybuttonview}>
          <ButtonComponent
            style={{
              backgroundColor: '#E81F1C',
              paddingVertical: 13,
              width: '90%',
            }}
            icon={true}
            type={Icons.FontAwesome}
            name={'photo'}
            size={16}
            color={'white'}
            btnTextColor={{ color: 'white' }}
            title={'Gallery'}
            onPress={openGallery}
          />
        </View>
      </View>
    </View >
  );
};
export default ProfileUpdate;
