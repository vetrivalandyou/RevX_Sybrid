import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Sizes from '../../../AppConstants/Sizes';

export default StyleSheet.create({
  mainContainer: {
    // flex: 0.9,
    padding: 15,
  },
  HeaderView: {
    flex: 0.1,
  },
  balanceView: {
    flex: 0.15,
    backgroundColor: appColors.Goldcolor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: appColors.White,
    fontSize: Sizes.small,
  },
  balance: {
    color: appColors.White,
    fontSize: 44,
  },
  earnbarberView: {
    flex: 0.1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earnbarberText: {
    fontWeight: '400',
    fontSize: Sizes.medium,
    color: appColors.White,
  },
  viewallView: {
    flex: 0.5,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    //  backgroundColor:'red'
  },
  viewallText: {
    color: appColors.Goldcolor,
    fontSize: 10,
  },
  barberEarnComponenet: {
    flex: 0.25,
  },

  mapView: {
    flex: 0.3,
    //  backgroundColor:'green',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: appColors.Goldcolor,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    color: appColors.White,
    textAlign: 'center',
  },
});
