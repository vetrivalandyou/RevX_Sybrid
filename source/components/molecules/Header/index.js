import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import {AppImages} from '../../../AppConstants/AppImages';

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
  image,
  headerTextViewStyle,
  headerTextt,
}) => {
  const navigation = useNavigation();

  console.log(onPressRightIcon);

  return (
    <View style={styles.headerView}>
      <View style={styles.header}>
        <View style={{flex: 0.15, justifyContent: 'center'}}>
          {image ? (
            <Image
              source={AppImages.SuperAdmin}
              style={{width: 50, height: 50}}
            />
          ) : (
            <TouchableOpacity onPress={onPressLeftIcon}>
              <CustomIcon
                type={lefttIcoType}
                name={leftIcoName}
                size={leftIcoSize}
                color={appColors.White}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.headerTextView, headerTextViewStyle]}>
          <Text style={[styles.headerText, headerTextt]}>{headerText}</Text>
        </View>

        <View style={{flex: 0.15, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={
              onPressRightIcon
                ? onPressRightIcon
                : () => {
                    navigation.navigate(
                      constants.AdminScreens.AdminNotification,
                    );
                  }
            }
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
