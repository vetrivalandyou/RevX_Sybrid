import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import appColors from '../../../AppConstants/appColors';


const Dropdown = ({label, value, onValueChange, dropDownData, style,custompickerstyle}) => {
  const [isTextInputFocused, setTextInputFocused] = useState(false);
  const [isDropdownSelected, setDropdownSelected] = useState(false);

  const handleValueChange = (itemValue, itemIndex) => {
    setDropdownSelected(itemValue !== null);
    onValueChange(itemValue, itemIndex);
  };

  return (
    <View
      style={[
        styles.container,
        style,
        {
          borderWidth: 1,
          // borderColor: isTextInputFocused
          //   ? appColors.AppGreen
          //   : appColors.LighBlue,
        },
      ]}>
      <Picker
        style={[
          styles.Pickerstyle, custompickerstyle
      ]}
        mode="dropdown"
        dropdownIconColor={'white'}
        // onFocus={() => {
        //   setTextInputFocused(true);
        // }}
        // onBlur={() => {
        //   setTextInputFocused(false);
        // }}
        selectedValue={value}
        onValueChange={onValueChange}>
        <Picker.Item
          style={{fontSize: 13, color: appColors.AppLightGray}}
          label={label}
          value={null}
        />
        {dropDownData?.map((x, ind) => (
          <Picker.Item
            style={{fontSize: 13,}}
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
  Pickerstyle:{
 
      width: '100%',
      height: '100%',
      color: appColors.AppLightGray,

  }
});

export default Dropdown;
