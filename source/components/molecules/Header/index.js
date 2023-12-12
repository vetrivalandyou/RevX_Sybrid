import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';

const Header = ({
  leftIcoStyle,
  onPressLeftIcon,
  onPressRightIcon,
  headerText,
  rightIcoType,
  rightIcoName,
  rightIcoSize,
  lefttIcoType,
  leftIcoName,
  leftIcoSize,
}) => {
  return (
    <View style={styles.headerView}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressLeftIcon}>
          <CustomIcon
            type={lefttIcoType}
            name={leftIcoName}
            size={leftIcoSize}
            color={appColors.White}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerText}</Text>

        <TouchableOpacity onPress={onPressRightIcon} style={leftIcoStyle}>
          <CustomIcon
            type={rightIcoType}
            name={rightIcoName}
            size={rightIcoSize}
            color={appColors.White}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
