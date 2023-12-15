import { StyleSheet } from "react-native";
import colors from "../../../AppConstants/colors";
import textStyles from "../../../AppConstants/textStyles";


export default styles = StyleSheet.create({
    heading:{ 
        marginTop: 15,
        ...textStyles.regularHeading, 
        color: colors.Orange,
        fontFamily:'Louis George Cafe Bold',
        fontSize:24
        
    },
    text:{
        textAlign: 'center', 
        ...textStyles.smallGrayText,
        marginTop: 15,
       fontFamily:'Inter-Regular',
       fontWeight: '400',
      
    },
    button:{
        marginTop: 25
    },
    pinTextInput:{
        fontSize: 20, 
        textAlign: 'center', 
        borderWidth: 1, 
        borderColor: colors.AppLightGray, 
        padding: 18
    },
    bottomSheetScrollContainer:{
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 20, 
        paddingVertical: 10
    }
})