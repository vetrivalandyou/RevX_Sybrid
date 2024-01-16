import {StyleSheet} from 'react-native';
import AppColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  mainContainer: {
    //  flex: 0.15,
    //  backgroundColor:'red',
    justifyContent: 'flex-end',
    color: AppColors.White,
    // marginTop:20,
  },
  innerContainner: {
    borderRadius: 25,
    // borderColor: AppColors.darkgrey,
    borderWidth: 1,
    width: '100%',
    borderColor: AppColors.AppLightGray,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 15,
    alignItems: 'center',
  },
});
