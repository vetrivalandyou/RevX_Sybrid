import {StyleSheet} from 'react-native';
import {screenSize} from '../../../components/atom/ScreenSize';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  container: {
    width: screenSize.width / 1.1,
    height: screenSize.height / 13,
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
    flex: 0.5,
    justifyContent: 'center',
    paddingLeft: 20,
    flexWrap: 'wrap',
  },

  textStyle: {
    color: 'white',
    fontSize: 14,
  },
  editImageView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editImageStyle: {
    width: '35%',
    height: '35%',
  },

  DeleteimageView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Deleteimagestyle: {
    width: '35%',
    height: '35%',
  },
  updateprofileView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonouterView: {flexDirection: 'row', marginHorizontal: 10},
  camerabuttonview: {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
  gallerybuttonview: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileMainView: {flex: 0.35},
  ProfileouterView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  profileView: {
    width: '34%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '58%',
    backgroundColor: 'black',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: appColors.Goldcolor,
    backgroundColor:'grey'
  },
  Iconstyle: {
    position: 'absolute',
    left: screenSize.width / 4,
    top: screenSize.height / 8.2
  },
  textFieldView: {flex: 0.19, justifyContent: 'space-evenly'},
  buttonStyle: {
    backgroundColor: '#C79646',
    paddingVertical: Platform.OS == 'ios' ? 17 : 13,
    bottom: 1,
    position: 'absolute',
  },
  validationTextview: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  validationTextStyle: {color: appColors.Goldcolor, fontSize: 12},

  mainView: {flex: 1, marginVertical: 15},
  DeletetitleView: {flex: 0.4, alignItems: 'center', justifyContent: 'center'},
  titleTextStyle: {color: '#E81F1C', fontSize: 18},
  TextView: {flex: 0.6, paddingHorizontal: '20%'},
  TextStyle: {color: 'white', fontSize: 16, textAlign: 'center'},
  buttonsMainView: {
    flex: 0.4,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  CanclebuttonView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  CanclebuttonStyle: {
    backgroundColor: '#424242',
    paddingVertical: 13,
    width: '90%',
  },
  DeleteButtonView: {flex: 0.6, justifyContent: 'center', alignItems: 'center'},
  DeleteButtonStyle: {
    backgroundColor: appColors.Red,
    paddingVertical: 13,
    width: '85%',
  },
});
