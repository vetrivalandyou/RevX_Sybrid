import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  headerView: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    flex: 1,
  },
  headerText: {
    color: appColors.White,
    fontSize: 18,
    fontWeight:'500'
  },
  headerTextView:{
    flex: 0.7, 
    justifyContent: 'center', 
    // alignItems: 'center',
   //  backgroundColor:"green"
  }
});
