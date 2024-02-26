import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import appColors from '../../../AppConstants/appColors';


const Dropdown = ({label, value, onValueChange, dropDownData, style}) => {
  const [isTextInputFocused, setTextInputFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        style,
        {
          borderWidth: 1,
          borderColor: isTextInputFocused
            ? appColors.AppGreen
            : appColors.LighBlue,
        },
      ]}>
      <Picker
        style={{
          width: '100%',
          height: '100%',
          color: appColors.AppLightGray,
        }}
        mode="dropdown"
        onFocus={() => {
          setTextInputFocused(true);
        }}
        onBlur={() => {
          setTextInputFocused(false);
        }}
        selectedValue={value}
        onValueChange={onValueChange}>
        <Picker.Item
          style={{fontSize: 13, color: appColors.AppLightGray}}
          label={label}
          value={null}
        />
        {dropDownData?.map((x, ind) => (
          <Picker.Item
            style={{fontSize: 13}}
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
    backgroundColor: '#FAF9F6',
    // marginTop: 15,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Dropdown;
