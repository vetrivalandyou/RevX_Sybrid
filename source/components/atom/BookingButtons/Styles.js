import {StyleSheet} from 'react-native';
import appColors from '../../../AppConstants/appColors';

export default StyleSheet.create({
  bookingcontainer: {
    height: '55%',
    alignItems: 'center',
    width: '44%',
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#c79647',
    borderWidth: 1.5,

    marginTop: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  completedcontainer: {
    textAlign: 'center',
    height: '50%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: appColors.Accepted,
    // marginTop:5,
  },
  completedcontainerText: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
  },
});
