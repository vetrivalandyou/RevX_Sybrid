import React from 'react';

import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';

const ButtonComponent = ({onPress, title, style, btnTextColor, btnColor, isLoading}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, btnColor]}
      onPress={onPress}>
        {
          isLoading == true ? 
          (
            <ActivityIndicator size='small' color={appColors.White} />
          ) : 
          (
            <Text style={[styles.btnText, btnTextColor]}>{title}</Text>
          )
        }
     
    </TouchableOpacity>
  );
};

export default ButtonComponent;
