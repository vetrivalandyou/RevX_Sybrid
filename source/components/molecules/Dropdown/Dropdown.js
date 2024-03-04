import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons from Expo
import appColors from '../../../AppConstants/appColors';
import CustomIcon, { Icons } from '../CustomIcon/CustomIcon';
import { screenSize } from '../../atom/ScreenSize';

const CustomDropdownPicker = ({ items }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemPress = item => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text style={{ color: appColors.AppLightGray }}>
          {selectedItems.length > 0 ? selectedItems.join(', ') : 'Select Items'}
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
            <TouchableOpacity key={index} onPress={() => handleItemPress(item)}>
              <Text
                style={
                  selectedItems.includes(item)
                    ? styles.selectedItem
                    : styles.item
                }>
                {item.setupDetailName}
                
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
    marginVertical:5

  },
  selectedContainer: {
    marginTop: 10,
    flexDirection:'row',

  },
});

export default CustomDropdownPicker;

