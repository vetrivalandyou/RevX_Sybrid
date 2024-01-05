import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  MianContainer: {
    flex: 0.9,
    padding: 15,
  },

  headerView: {
    flex: 0.1,
  },
  headerleftIcoStyle: {
    backgroundColor: appColors.lightBlack,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBarContainer: {
    flex: 0.1,
    // backgroundColor:'red',
    // justifyContent:'center',
    // alignItems:'center'
  },
  cardContainer: {
    flex: 0.25,
    backgroundColor: appColors.darkgrey,
    borderRadius: 10,
  },
  imgContainer: {
    flex: 0.5,
  },
  cardInnerContainer: {
    flex: 0.5,
    marginHorizontal: 20,
  },
  AvailableBalancetTextViewStyle: {
    flex: 0.5,
    justifyContent: 'center',
  },
  AvailableBalanceTextStyle: {
    fontSize: 13.4,
    color: appColors.White,
    marginTop: 15,
  },
  balanceMainViewStyle: {
    flex: 0.5,
    flexDirection: 'row',
  },
  balanceViewStyle: {
    flex: 0.5,
  },
  balanceTextStyle: {
    fontSize: 31.03,
    color: appColors.White,
  },
  ExViewStyle: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ExTextStyle: {
    fontSize: 13.41,
    color: appColors.White,
  },
});
