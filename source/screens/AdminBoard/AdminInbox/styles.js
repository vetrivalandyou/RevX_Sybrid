import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Sizes from '../../../AppConstants/Sizes';
import {screenSize} from '../../../components/atom/ScreenSize';

export default StyleSheet.create({
  mainContainer: {
    flex: 0.6,
    padding: 15,
    minHeight: screenSize.height / 1.15,
    maxHeight: 'auto',
    //  backgroundColor:appColors.White
  },
  HeaderView: {
    flex: 0.1,
  },
  searchBarView: {
    flex: 0.1,
    // backgroundColor:'red'
  },
  ChatContainer: {
    flex: 0.8,
  },
});
