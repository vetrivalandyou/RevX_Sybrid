import React from "react";

import { Text,TouchableOpacity } from "react-native";
import styles from "./styles";


const ButtonComponent=({onPress,title,style})=>{
    return (
        <TouchableOpacity
        style={[styles.container,style]}
         onPress={onPress}
        >
            <Text style={styles.btnText}
            title={title} > 
            Get Started
            </Text>

        </TouchableOpacity>
       
    )

}

export default ButtonComponent;