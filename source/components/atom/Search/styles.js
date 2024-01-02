import {StyleSheet} from 'react-native';
import Sizes from '../../../AppConstants/Sizes';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  Container: {
    width: '100%',
  },
  welcomeText: (color, top) => ({
    fontWeight: 'bold',
    fontSize: Sizes.xxLarge - 6,
    marginHorizontal: Sizes.small,
    color: color,
    // marginTop: top,
    //  backgroundColor: 'red',
  }),
  searchContainer: {
   
   
   
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColors.darkgrey,
  },
  searchIcon: {
    marginHorizontal: Sizes.small,
    color: appColors.White,
    backgroundColor:'blue',
  },
  search: {
    marginHorizontal: Sizes.small,
    color: appColors.AppGray,
  },
  searchWrapper: {
    flex: 1,
    //backgroundColor:'green',
    marginRight: Sizes.small,
    borderRadius: Sizes.small,
    backgroundColor:'green'
  },
  searchInput: {
    color: appColors.White,
    fontSize:14,

    placeholderTextColor: appColors.White,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    backgroundColor: appColors.Black,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
