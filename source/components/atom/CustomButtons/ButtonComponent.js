import React from 'react';

import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';
import CustomIcon from '../../molecules/CustomIcon/CustomIcon';

const ButtonComponent = ({
  onPress,
  title,
  style,
  btnTextColor,
  btnColor,
  isLoading,
  disable,
  type,
  size, name, color,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, btnColor, { backgroundColor: btnColor ? btnColor : appColors.Goldcolor, }]}

      onPress={onPress}
      disabled={disable}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        {icon &&
          <View style={{ marginHorizontal: 5 }}>
            <CustomIcon type={type} size={size} name={name} color={color} />
          </View>}
        {isLoading == true ? (
          <ActivityIndicator size="small" color={appColors.White} />
        ) : (
          <Text style={[styles.btnText, btnTextColor]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
