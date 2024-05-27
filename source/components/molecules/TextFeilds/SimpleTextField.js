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
  maxLength,
  returnKeyType,
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
          style={[{flex: 0.9, color: AppColors.White}]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          keyboardType={keyboardType && keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
          returnKeyType={returnKeyType}
          maxLength={maxLength && maxLength}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={{flex: 0.1, alignItems: 'flex-end', paddingVertical: 0}}
            onPress={togglePasswordVisibility}>
            <CustomIcon
              type={Icons.Ionicons}
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              color={AppColors.White}
              size={17}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SimpleTextField;
