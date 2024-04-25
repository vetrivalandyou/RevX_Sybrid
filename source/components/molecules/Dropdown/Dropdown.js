import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import appColors from '../../../AppConstants/appColors';

const Dropdown = ({
  label,
  value,
  onValueChange,
  dropDownData,
  style,
  custompickerstyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          borderWidth: 1,
        },
      ]}>
      <Picker
        style={[styles.Pickerstyle, custompickerstyle]}
        mode="dropdown"
        dropdownIconColor={'white'}
        selectedValue={value}
        onValueChange={onValueChange}>
        <Picker.Item
          style={{fontSize: 13, color: appColors.AppLightGray}}
          label={label}
          value={null}
        />
        {dropDownData?.map((x, ind) => (
          <Picker.Item
            style={{fontSize: 13, color: appColors.White}}
            key={ind}
            label={x.label}
            value={x.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.Black,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  Pickerstyle: {
    width: '100%',
    height: '100%',
    color: appColors.AppLightGray,
  },
});

export default Dropdown;
