import React from "react";
import { Text,View,Image,ImageBackground,StatusBar,StyleSheet} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import styles from "./styles";
import AppColors from "../../../AppConstants/appColors";
import { AppImages } from "../../../AppConstants/AppImages";
import ButtonComponent from "../CustomButtons/ButtonComponent";


const Carousel =({style,images,currentImageEmitter,currentImageIndex,ImageComponentStyle,paginationBoxVerticalPadding})=>{
  
    return(
      <View style={styles.cerousContainer}>
    
        <SliderBox
        images={images}
        dotColor={AppColors.Goldcolor}
        inactiveDotColor={AppColors.AppMediumGray}
        onCurrentImagePressed={currentImageIndex}
        currentImageEmitter={currentImageEmitter}
        ImageComponentStyle={ImageComponentStyle}
        paginationBoxVerticalPadding={paginationBoxVerticalPadding}
        circleLoop
       // resizeMethod={'resize'}
        //autoplay 
        />
  
      </View>
   
    )

}
export  default Carousel

