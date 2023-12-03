import React from "react";
import { Text, View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import CustomIcon, { Icons } from "../CustomIcon/CustomIcon";
import AppColors from "../../../AppConstants/appColors";
import styles from "./styles";

const RememberMe = ({ RememberTex, ForgetPasswordText, onPress }) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                    style={styles.ReIcon}
                    onPress={onPress}
                >
                    <CustomIcon type={Icons.Ionicons}
                        name={"chevron-back"}
                        color={AppColors.White}
                        size={12}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.rememeberText}>
                        {RememberTex}
                    </Text>

                </View>

            </View>

            <TouchableOpacity>
                <Text style={{ color: appColors.Goldcolor }}>
                    {ForgetPasswordText}
                </Text>

            </TouchableOpacity>

        </View >

    )
}
export default RememberMe;
