import React from "react";

import { Text,TextInput ,View} from "react-native";
import styles from "./styles";

const SimpleTextField=({placeholder,keyboardType,value})=>{
return(
    <View style={styles.simpleTextFieldContainer}>
         <TextInput 
         style={{flex:1}}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}

  />

    </View>
 
)
}
export default SimpleTextField;