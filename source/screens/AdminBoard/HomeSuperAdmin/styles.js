import { StyleSheet } from "react-native";
import appColors from "../../../AppConstants/appColors";

export default StyleSheet.create({
   MianContainer:{
    flex:0.9,
    padding:15
    },

    headerView:{
      flex: 0.1 
    },
    headerleftIcoStyle:{
      backgroundColor: appColors.lightBlack,
      borderRadius: 50,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },


   searchBarContainer:{
    flex: 0.1,
 
    

   }  
   ,
   CardContainer:{
    flex:0.25,
    backgroundColor:appColors.darkgrey,
    borderRadius:20,
    
  

   },
   visaCardImageView:{
    flex:0.5,
    //backgroundColor:'red',

   },
   visaCardDetailsView:{
    flex:0.5,
  //  backgroundColor:'purple',
   // padding:16,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingHorizontal:15
   
   },
   haedingText:{
    color:appColors.White,
    fontSize:12.41
   },
   balanceText:{
    fontWeight:'500',
    color:appColors.White,
    fontSize:31
   }



})