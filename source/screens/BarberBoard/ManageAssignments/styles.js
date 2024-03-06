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
    flex: 0.7,
    justifyContent: 'center',
    paddingLeft: 20,
  },

  textStyle: {
    color: 'white',
    fontSize: 15,
  },
  editImageView: {
    flex: 0.15,
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
  },

  Deleteimagestyle: {
    width: '40%',
    height: '40%',
  },
});
