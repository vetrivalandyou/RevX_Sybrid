import {StyleSheet} from 'react-native';
import {screenSize} from '../../../components/atom/ScreenSize';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  container: {
    width: screenSize.width / 1.1,
    height: screenSize.height / 11.5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#252525',
    marginVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Subcontainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textView: {
    flex: 0.9,
    paddingLeft: 20,
    flexDirection: 'row',
  },

  textStyle: {
    color: 'white',
    fontSize: 15,
  },
  editImageView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editImageStyle: {
    width: '40%',
    height: '40%',
  },

  DeleteimageView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
    // backgroundColor: 'red',
  },

  Deleteimagestyle: {
    width: '30%',
    height: '20%',
  },
  DropdownView: {
    width: screenSize.width / 1.12,
    height: screenSize.height / 14,
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#C79646',
    paddingVertical: Platform.OS == 'ios' ? 17 : 13,
    bottom: 1,
    position: 'absolute',
  },
  dropDownStyle: {
    backgroundColor: appColors.Black,
    borderColor: appColors.AppLightGray,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
});
