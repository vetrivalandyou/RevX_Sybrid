import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import AppColors from '../../../AppConstants/appColors';
import Screen from '../../atom/ScreenContainer/Screen';
import ButtonComponent from '../../atom/CustomButtons/ButtonComponent';

const AuthHeader = ({
  logIn,
  onPress,
  heading,
  subheading,
  style,
  isForgetCheckEmail,
}) => {
  return (
    <View style={[styles.authView, style]}>
      {isForgetCheckEmail == true ? (
        <View style={{flex: 1}}>
          <View style={[styles.header, {flex: 1}]}>
            <View
              style={{
                flex: 0.1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={onPress}>
                <CustomIcon
                  type={Icons.Ionicons}
                  name={'chevron-back'}
                  color={AppColors.White}
                  style={{}}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.8, justifyContent: 'center'}}>
              <Text style={styles.titleText}>{logIn}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={[styles.header]}>
            <View
              style={{
                flex: 0.1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={onPress}>
                <CustomIcon
                  type={Icons.Ionicons}
                  name={'chevron-back'}
                  color={AppColors.White}
                  style={{}}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.8, justifyContent: 'center'}}>
              <Text style={styles.titleText}>{logIn}</Text>
            </View>
          </View>
          <View style={{flex: 0.5, padding: 10}}>
            <Text style={styles.headindText}>{heading}</Text>
            <Text style={styles.subHeadindText}>{subheading}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default AuthHeader;
