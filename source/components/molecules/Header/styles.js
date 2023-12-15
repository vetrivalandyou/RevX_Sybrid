import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  headerView: {
    flex: 1,
    justifyContent: 'center',
   //backgroundColor:'brown'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  //  backgroundColor: appColors.pink,
    flex: 1,
 //   alignItems: 'center',
    
    // backgroundColor:'brown',
  },
  headerText: {
    color: appColors.White,
    fontSize: 18,
  },
});
