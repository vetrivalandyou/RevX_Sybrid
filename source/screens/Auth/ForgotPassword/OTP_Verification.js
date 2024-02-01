import React from "react";
import { View, Text, TouchableOpacity} from 'react-native';
import ButtonComponent from "../../../components/atom/CustomButtons/ButtonComponent";
import constants from '../../../AppConstants/Constants.json';
import appColors from "../../../AppConstants/appColors";

const OTP_Verification = ({navigation}) => {
  return(
    <View style={{ flex: 1, backgroundColor: appColors.Black}}>
      <View
          style={{
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            fontSize: 16,
          }}>
          <ButtonComponent
            title={'Continue'}
            onPress={() => navigation.navigate(constants.AuthScreen.NewPassword)}
          />
        </View>
    </View>
  )
}

export default OTP_Verification;