import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import appColors from '../../../AppConstants/appColors';

const Dropdown = ({
  label,
  value,
  onValueChange,
  dropDownData,
  style,
  customPickerStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Picker
        style={[styles.pickerStyle, customPickerStyle]}
        mode="dropdown"
        dropdownIconColor={appColors.AppLightGray}
        selectedValue={value}
        onValueChange={onValueChange}>
        <Picker.Item label={label} value={null} />
        {dropDownData?.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden', // Ensure border-radius is applied correctly
    marginBottom: 10, // Add some margin below the dropdown to accommodate the dropdown list
  },
  pickerStyle: {
    backgroundColor: appColors.Black,
    color: appColors.AppLightGray,
    height: 50, // Adjust height as per your design
  },
  pickerItem: {
    fontSize: 14, // Adjust font size as per your design
    color: appColors.White,
    backgroundColor: appColors.Black,
    marginBottom: 30,
  },
});

export default Dropdown;
