import React from "react";
import {Text,View,TouchableOpacity,SafeAreaView,StatusBar} from "react-native"
import styles from "./styles";
import CustomIcon, { Icons } from "../CustomIcon/CustomIcon";
import AppColors from "../../../AppConstants/appColors";
import Screen from "../../atom/ScreenContainer/Screen";

const AuthHeader =({title,onPress,heading,subheading})=>{

return(
  <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        backgroundColor={AppColors.Goldcolor}
        barStyle="light-content"
       // hidden={false}
      />
    <View style={styles.header}>
        <TouchableOpacity
        onPress={onPress}
        >
        <CustomIcon type={Icons.Ionicons} name={"chevron-back"} color={AppColors.White} style={{marginLeft:15}} size={22}/>
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:'center'}}>
        <Text style={styles.titleText}>{title}</Text>
        
        </View>
      
    </View>
    <View style={{marginHorizontal:15,marginBottom:40}}>
    <Text style={styles.headindText}>
        {heading}
    </Text>
 
    <Text style={styles.subHeadindText}>
        {subheading}
    </Text>
    </View>
   
    
    </SafeAreaView>
    )
}
export default AuthHeader;
