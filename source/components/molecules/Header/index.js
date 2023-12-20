import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  return (
    <View style={styles.headerView}>
      <View style={styles.header}>
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={onPressLeftIcon}>
            <CustomIcon
              type={lefttIcoType}
              name={leftIcoName}
              size={leftIcoSize}
              color={appColors.White}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>

        <View style={{flex: 0.1, justifyContent: 'center', marginRight: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(constants.screen.Notification)}
            style={leftIcoStyle}>
            <CustomIcon
              type={rightIcoType}
              name={rightIcoName}
              size={rightIcoSize}
              color={appColors.White}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
