

import React from "react";

import { Text,TouchableOpacity } from "react-native";
import Styles from "./Styles";


const Bookingbutton=({onPress,title,style})=>{
    return (
        <TouchableOpacity
        style={[Styles.bookingcontainer,style]}
         onPress={onPress}
        >
            <Text style={Styles.btnText} > 
            {title}
          </Text>

        </TouchableOpacity>
       
    )

}


export default Bookingbutton

