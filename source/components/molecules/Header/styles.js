import { StyleSheet } from "react-native";
import appColors from "../../../AppConstants/appColors";

export default StyleSheet.create({

    headerView: {
        flex: 0.1,
      //  backgroundColor: 'blue',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        backgroundColor: appColors.Black,
        flex: 1,
        alignItems: 'center',
      //  backgroundColor:'brown',
       
    },
    headerText: {
        color: appColors.White,
        fontSize: 18
    }
})