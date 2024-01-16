import { screenSize } from "../../../components/atom/ScreenSize";
const { StyleSheet } = require("react-native");

export default StyleSheet.create({
    Containerstyle: {
      height: screenSize.height / 4,
      width: screenSize.width / 1.1,
      marginBottom: 10,
      backgroundColor: '#252525',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: 'black',
     paddingHorizontal:10
    },
  })