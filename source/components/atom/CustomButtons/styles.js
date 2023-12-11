import {StyleSheet} from 'react-native';
import AppColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  container: {
    backgroundColor: AppColors.Goldcolor,
    // position:'absolute',
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    bottom: 0,
  },
  btnText: {
    color: AppColors.White,
  },
});
