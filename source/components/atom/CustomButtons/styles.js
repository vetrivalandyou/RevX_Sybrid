import {Platform, StyleSheet} from 'react-native';
import AppColors from '../../../AppConstants/appColors';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  container: {
    
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    paddingVertical: Platform.OS == 'ios' ? 18 : 15,
    bottom: 0,
  },
  btnText: {
    color: appColors.White,
    fontSize: 14,
  },
});
