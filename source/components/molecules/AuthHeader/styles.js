import { StyleSheet } from "react-native";
import AppColors from "../../../AppConstants/appColors";


export default StyleSheet.create({
  // container: {
  //   flex: 1,
  // },

  authView: {
    backgroundColor: AppColors.Goldcolor,
    flex: 0.29,
  },
  header: {
    flex: 0.4,
    // marginTop:60,
    flexDirection: 'row',
   
   
  },
  titleText: {
    textAlign: 'center',
    color: AppColors.White,
    fontWeight: '500',
    fontSize: 16,
  },
  headindText: {
    color: AppColors.White,
    fontWeight: '400',
    fontSize: 40,
    marginLeft:15,
    // marginTop:20
  },
  subHeadindText: {
    color: AppColors.White,
    fontSize: 15,
    marginLeft:15,

    // marginLeft:15
  }


})
