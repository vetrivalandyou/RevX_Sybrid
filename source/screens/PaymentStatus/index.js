import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import appColors from "../../AppConstants/appColors";
import Screen from "../../components/atom/ScreenContainer/Screen";
import { AppImages } from "../../AppConstants/AppImages";
import { endPoint } from "../../AppConstants/urlConstants";
import { PostRequest } from "../../services/apiCall";
import CustomIcon, { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import { useNavigation } from "@react-navigation/native";
import constant from "../../AppConstants/Constants.json"

const PaymentStatus = ({ route }) => {
  const navigation = useNavigation()
  const { paymentStatus } = route?.params || undefined;

  useEffect(() => {
    // getServices()
  }, [])

  function getServices() {
    const payload = {
      operationID: 0,
      amount: "",
      currency: "",
      description: "",
      qty: "",
      profileID: 0,
      userIP: "",
      transactionID: "",
      barbarID: 0,
      customerID: 0,
      bookingDate: ""
    };
    PostRequest(endPoint.PaymentSuccess, payload)
      .then(res => {

      })
      .catch(err => {
        console.log('1231231', err);
      });
  }
  return (
    <Screen>
      <View style={{ flex: 1, backgroundColor: appColors.Black }}>
        <View style={{ flex: 0.6, }}>
          <View style={{ flex: 0.15, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate(constant.screen.BottomTabNavigation)} style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
              <CustomIcon type={Icons.FontAwesome} name="angle-left" size={25} color={appColors.White} />
            </TouchableOpacity>
            <View style={{ flex: 0.6, justifyContent:'center', alignItems:'center'}}>
              <Text style={{ color: appColors.White, fontSize: 18, fontWeight: 'bold'}}>Payment Status</Text>
            </View>
          </View>
          <View style={{ flex: 0.85, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Image source={paymentStatus == "true" ? AppImages.PaymentSuccess : AppImages.PaymentReject} style={{ width: 150, height: 150 }} />
          </View>

        </View>
        <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: appColors.Goldcolor }}>{paymentStatus == "true" ? "Payment Suceessfull" : "Payment Failed"}</Text>
        </View>
      </View>
    </Screen>
  )
}
export default PaymentStatus