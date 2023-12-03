import { StyleSheet } from "react-native";
import AppColors from "../../../AppConstants/appColors";


export default StyleSheet.create({
  // container: {
  //   flex: 1,
  // },

  authView: {
    backgroundColor: AppColors.Goldcolor,
    flex: 0.30,
  },
  header: {
    flex: 0.6,
    // marginTop:60,
    flexDirection: 'row',
  },
  titleText: {
    textAlign: 'center',
    color: AppColors.White,
    fontWeight: '500',
    fontSize: 15
  },
  headindText: {
    color: AppColors.White,
    fontWeight: '500',
    fontSize: 40,
    //marginLeft:15,
    // marginTop:20
  },
  subHeadindText: {
    color: AppColors.White,
    fontSize: 15
    // marginLeft:15
  }


})
