import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Sizes from '../../../AppConstants/Sizes';

export default StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  HeaderView: {
    flex: 0.1,
  },
  balanceView: {
    flex: 0.8,
  },
  outerCircle: {
    width: '45%',
    height: '30%',
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: '30%',
    height: '30%',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  outerCirclePressed: {
    backgroundColor: appColors.Goldcolor,
  },
  innerCirclePressed: {
    backgroundColor: 'white',
  },

  PaymentMethodContainerView: {
    flex: 1,
    backgroundColor: appColors.darkgrey,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  ImgStyle: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PaymentMethodInnerContainer: {
    flex: 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  PaymentTextStyle: {
    color: appColors.White,
    fontSize: 14,
    marginLeft: 4,
  },
  btnViewStyle: {
    flex: 0.1,
    justifyContent: 'center',
  },
  headerleftIcoStyle: {
    backgroundColor: appColors.lightBlack,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
