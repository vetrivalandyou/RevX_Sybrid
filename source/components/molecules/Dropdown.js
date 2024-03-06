import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import appColors from '../../AppConstants/appColors';
import CustomIcon, {Icons} from './CustomIcon/CustomIcon';
import { screenSize } from '../atom/ScreenSize';

const CustomDropdownPicker = ({items, values, setValues, onChange}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  console.log('values', values);

  const handleItemPress = item => {
    const isSelected = values.some(
      selected => selected.setupDetailId === item.setupDetailId,
    );
    if (isSelected) {
      setValues(
        values.filter(
          selected => selected.setupDetailId !== item.setupDetailId,
        ),
      );
    } else {
      setValues([...values, item]);
    }
    console.log('Selected Items===:', values);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text
          style={{
            color:
              values?.length > 0 ? appColors.White : appColors.AppLightGray,
          }}>
          {values?.length > 0
            ? values?.map(x => x.setupDetailName).join(', ')
            : 'Select Items'}
        </Text>
        <CustomIcon
          type={Icons.AntDesign}
          name={showDropdown ? 'up' : 'down'}
          size={15}
          color={appColors.White}
        />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleItemPress(item);
                onChange && onChange();
              }}>
              <Text
                style={
                  values.includes(item) ? styles.selectedItem : styles.item
                }>
                {item?.setupDetailName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 17,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1.5,
    borderRadius: 25,
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    bottom: 50,
    width: screenSize.width / 1.1,
    backgroundColor: 'white',
  },
  item: {
    padding: 5,
    color: 'black',
  },
  selectedItem: {
    padding: 8,
    backgroundColor: appColors.Goldcolor,
    color: appColors.White,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default CustomDropdownPicker;
