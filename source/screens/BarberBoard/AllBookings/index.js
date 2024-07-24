import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import appColors from "../../../AppConstants/appColors";

const AllBookings = () => {
  return(
    <View style={{ flex: 1, backgroundColor: appColors.Black}}>
      <Text selectable style={{ color: appColors.White}}> All Bookings </Text>
    </View>
  )
}
export default AllBookings;