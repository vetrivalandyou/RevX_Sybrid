import React, {useState} from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../../AppConstants/appColors';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';

const SimpleTextField = ({
  placeholderTextColor,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  textUpperView,
  textStyle,
  // onPressIcon,
  // eyeOpen,
  secureTextEntry,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.innerContainner, textUpperView]}>
        <TextInput
          style={[ {flex: 1, color: AppColors.White}]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <CustomIcon
              type={Icons.Ionicons}
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              color={AppColors.White}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SimpleTextField;
