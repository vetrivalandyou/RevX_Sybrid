import {StyleSheet} from 'react-native';
import {screenSize} from '../../../components/atom/ScreenSize';

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
  ProfileMainView: {flex: 0.35},
  ProfileouterView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  profileView: {
    width: '32%',
    height: '56%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 3,
    borderColor: appColors.Goldcolor,
    backgroundColor: 'grey',
  },
  Iconstyle: {
    position: 'absolute',
    left: screenSize.width / 4.4,
    top: screenSize.height / 8.2,
  },
  textView: {
    flex: 0.65,
    justifyContent: 'center',
    paddingLeft: 20,
  },

  textStyle: {
    color: 'white',
    fontSize: 15,
  },
  editImageView: {
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editImageStyle: {
    width: '40%',
    height: '40%',
  },

  DeleteimageView: {
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Deleteimagestyle: {
    width: '40%',
    height: '40%',
  },
});
