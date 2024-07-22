import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import appColors from "../../AppConstants/appColors";
import Screen from "../../components/atom/ScreenContainer/Screen";
import { AppImages } from "../../AppConstants/AppImages";
import { endPoint } from "../../AppConstants/urlConstants";
import { PostRequest } from "../../services/apiCall";

const PaymentStatus = ({ route }) => {
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
        <View style={{ flex: 0.6, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Image source={paymentStatus == true ? AppImages.PaymentSuccess : AppImages.PaymentReject} style={{ width: 200, height: 200 }} />
        </View>
        <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: appColors.Goldcolor }}>{paymentStatus == true ? "Payment Suceessfull" : "Payment Failed"}</Text>
        </View>
      </View>
    </Screen>
  )
}
export default PaymentStatus