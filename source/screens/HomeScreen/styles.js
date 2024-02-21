import {StyleSheet} from "react-native";
import appColors from "../../AppConstants/appColors";
import { screenSize } from "../../components/atom/ScreenSize";


export default StyleSheet.create({

    headerComponent:{
        height:screenSize/9,
        backgroundColor:'green',
        backgroundColor:appColors.Black

    },
    slide: {
     
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.Black,
        width:'81.2%',

    },
   
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: appColors.Goldcolor
    },
    inactiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: appColors.darkgrey
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
    
    },
    image: {
        height: "100%", width: "100%",
        resizeMode: 'cover',

    },
})