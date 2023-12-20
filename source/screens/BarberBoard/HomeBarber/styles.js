import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  MianContainer: {
    flex: 0.9,
    padding: 15,
  },
  searchBarContainer: {
    flex: 0.1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  CardContainer: {
    flex: 0.25,
    backgroundColor: appColors.darkgrey,
    borderRadius: 20,
  },
  visaCardImageView: {
    flex: 0.5,
    //backgroundColor:'red',
  },
  visaCardDetailsView: {
    flex: 0.5,
    //  backgroundColor:'purple',
    // padding:16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
  },
  haedingText: {
    color: appColors.White,
    fontSize: 12.41,
  },
  balanceText: {
    fontWeight: '500',
    color: appColors.White,
    fontSize: 31,
  },
});
