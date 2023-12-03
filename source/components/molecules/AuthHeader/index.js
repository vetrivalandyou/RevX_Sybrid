import React from "react";
import { Text, View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import styles from "./styles";
import CustomIcon, { Icons } from "../CustomIcon/CustomIcon";
import AppColors from "../../../AppConstants/appColors";
import Screen from "../../atom/ScreenContainer/Screen";
import ButtonComponent from "../../atom/CustomButtons/ButtonComponent";

const AuthHeader = ({ title, onPress, heading, subheading }) => {

    return (
        <View style={styles.authView}>
            <View style={[styles.header]}>
                <View style={{ flex: 0.2, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <CustomIcon type={Icons.Ionicons} name={"chevron-back"} color={AppColors.White} style={{}} size={22} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.9,  justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </View>
            <View style={{ flex: 0.4,marginLeft:18,}}>
                <Text style={styles.headindText}>
                    {heading}
                </Text>

                <Text style={styles.subHeadindText}>
                    {subheading}
                </Text>
            </View>
        </View>
    )
}
export default AuthHeader;
