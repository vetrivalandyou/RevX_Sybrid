import React from 'react';
import { Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import CustomIcon, { Icons } from '../CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';
import constants from '../../../AppConstants/Constants.json';
import { useNavigation } from '@react-navigation/native';
import { AppImages } from '../../../AppConstants/AppImages';

const Header = ({
  leftIcoStyle,
  onPressLeftIcon,
  onPressRightIcon,
  headerText,
  rightIcoType,
  rightIcoName,
  rightIcoSize,
  rightIcoColor,
  rightIcoName2, rightIcoType2, rightIcoSize2,
  iconContainerStyle1, iconContainerStyle2,
  doubleIcon,
  iconStyle,
  lefttIcoType,
  leftIcoName,
  leftIcoSize,
  image,
  headerTextViewStyle,
  headerTextt,
  headerSubView,
}) => {
  const navigation = useNavigation();
  console.log('test', onPressRightIcon);

  console.log(onPressRightIcon);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <View style={[styles.header, headerSubView]}>
          <View style={{ flex: 0.15, justifyContent: 'center', }}>
            {image ? (
              <Image
                source={AppImages.SuperAdmin}
                style={{ width: 50, height: 50 }}
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
          {
            !doubleIcon && (
              <View style={[styles.headerTextView, headerTextViewStyle]}>
                <Text style={[styles.headerText, headerTextt]}>{headerText}</Text>
              </View>
            )
          }


          <View style={{ flex: !doubleIcon ? 0.15 : 0.3, justifyContent: 'center' }}>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {
                  doubleIcon && (
                    <View style={iconContainerStyle2}>
                      <CustomIcon
                        type={rightIcoType2}
                        name={rightIcoName2}
                        size={rightIcoSize2}
                        color={rightIcoColor}
                      />
                    </View>
                  )
                }

                <View style={iconContainerStyle1}>
                  <View style={{iconStyle}}>
                  <CustomIcon
                    type={rightIcoType}
                    name={rightIcoName}
                    size={rightIcoSize}
                    color={appColors.White}
                  />
                  </View>
                </View>


              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
