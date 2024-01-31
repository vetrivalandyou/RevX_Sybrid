import Snackbar from 'react-native-snackbar';
import appColors from '../../../AppConstants/appColors';

export const NormalSnackbar = (barText, snackBarColor) => {
  Snackbar.show({
    text: `${barText}`,
    backgroundColor: snackBarColor ? snackBarColor : appColors.Goldcolor,
    textColor: appColors.White,
    duration: Snackbar.LENGTH_LONG,
  });
};
