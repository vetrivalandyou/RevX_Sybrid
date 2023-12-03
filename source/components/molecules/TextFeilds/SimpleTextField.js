import React from "react";

import { Text,TextInput ,View,StyleSheet,TouchableOpacity} from "react-native";
import AppColors from "../../../AppConstants/appColors";
import styles from "./styles";
import appColors from "../../../AppConstants/appColors";
import CustomIcon, { Icons } from "../CustomIcon/CustomIcon";

const SimpleTextField=({placeholder,keyboardType,value,onChangeText,onPressIcon,eyeOpen,secureTextEntry})=>{
  return (
    
     <View style={styles.mainContainer}>
      <View style={styles.innerContainner}>
        <TextInput
         style={{flex:1,}}
          placeholder={placeholder}
          placeholderTextColor={appColors.darkgrey}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity
        onPress={onPressIcon}
        style={{}}
        >
          <CustomIcon type={Icons.Ionicons} 
            name={eyeOpen ? 'eye-outline' : 'eye-off-outline'}
            color={appColors.White}/>

        </TouchableOpacity>
        </View>
   </View>
  
  );
};


export default SimpleTextField;