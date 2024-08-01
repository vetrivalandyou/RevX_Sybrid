import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import AppColors from '../../../AppConstants/appColors';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';

const RememberMe = ({RememberTex, ForgetPasswordText, onPress, onPressFP}) => {
  const [remember, setRemember] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.ReIcon} onPress={() => setRemember(!remember)}>
          <CustomIcon
            type={Icons.Fontisto}
            name={ remember == true ? 'radio-btn-active' : "radio-btn-passive"}
            color={AppColors.White}
            size={12}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.rememeberText}>{RememberTex}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPressFP}>
        <Text style={{color: appColors.Goldcolor}}>{ForgetPasswordText}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RememberMe;
