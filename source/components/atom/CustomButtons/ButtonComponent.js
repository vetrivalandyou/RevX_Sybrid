import React from 'react';

import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const ButtonComponent = ({onPress, title, style, btnTextColor, btnColor}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, btnColor]}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
