import { StyleSheet } from "react-native";
import appColors from "../../../AppConstants/appColors";
import Sizes from "../../../AppConstants/Sizes";
import { screenSize } from "../../../components/atom/ScreenSize";

export default StyleSheet.create({
  mainContainer: {
flex: 1,
    padding: 15,
     backgroundColor:appColors.Black
  },
  HeaderView: {
    flex: 0.1
  },


  chatDataContainerView: {
    flex: 0.8,
  },
  MasgTypeView: {
    flex: 0.1,
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  messageChatView: {

    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',

  },

  chatContainer: {

    height: "auto",
    backgroundColor: appColors.darkgrey,
    width: screenSize.width / 1.3,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    alignSelf: 'flex-start',
    marginVertical: 4



  },
  input: {
    borderRadius: 50, paddingHorizontal: 15, flex: 1, backgroundColor: appColors.darkgrey, borderColor: 'black',
    borderWidth: 1,
    color: appColors.White

  },
  focusedInput: {
    borderColor: appColors.White,
  },
  focusBulr: {
    borderColor: appColors.darkgrey,
    border: 0
  }

})