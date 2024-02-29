import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../../AppConstants/appColors';

const LocationBottomSheet = ({refRBSheet}) => {
  return (
    <View style={lbStyle.mainContainer}>
      {/* <Text>Location Bottom Sheet</Text> */}
      {/* <Button onPress={() => refRBSheet.current.close()}>Close</Button> */}
    </View>
  );
};

const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColors.Black
  },
});
export default LocationBottomSheet;
