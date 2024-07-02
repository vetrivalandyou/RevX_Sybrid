import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  headerView: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 60,
    maxHeight: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    flex: 1,
  },
  headerText: {
    color: appColors.White,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  headerTextView: {
    flex: 0.7,
    justifyContent: 'center',
    // alignItems: 'center',
    //  backgroundColor:"green"
  },
});
