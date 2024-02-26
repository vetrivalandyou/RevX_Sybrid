import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import AppColors from '../../../AppConstants/appColors';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';

const SocailLogin = ({
  SocailLogin,
  iconName,
  iconSize,
  iconType,
  onPressIcon,
}) => {
  return (
    <View
      style={{
        flex: 0.15,
        justifyContent: 'space-between',
        // backgroundColor: 'red',
      }}>
      <View style={styles.textStyle}>
        <View style={styles.lineStyle}></View>
        <Text style={{color: appColors.White}}>{SocailLogin}</Text>
        <View style={styles.lineStyle}></View>
      </View>

      <View style={styles.iconsStyle}>
        <TouchableOpacity onPress={onPressIcon}>
          <CustomIcon
            type={Icons.AntDesign}
            name={'twitter'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressIcon}>
          <CustomIcon
            type={Icons.AntDesign}
            name={'google'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressIcon}>
          <CustomIcon
            type={Icons.FontAwesome}
            name={'facebook'}
            color={AppColors.White}
            style={{}}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SocailLogin;
