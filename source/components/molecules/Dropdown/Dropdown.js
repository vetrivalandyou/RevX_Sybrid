// import React, {useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import appColors from '../../../AppConstants/appColors';

// const Dropdown = ({label, value, onValueChange, dropDownData, style}) => {
//   const [isTextInputFocused, setTextInputFocused] = useState(false);

//   return (
//     <View
//       style={[
//         styles.container,
//         style

//       ]}>
//       <Picker
//         style={{
//           width: '100%',
//           height: '100%',
//           color: appColors.White,
//           fontSize:15,

//         }}
//         dropdownIconColor={appColors.White}
//         mode="dropdown"
//         onFocus={() => {
//           setTextInputFocused(true);
//         }}
//         onBlur={() => {
//           setTextInputFocused(false);
//         }}
//         selectedValue={value}
//         onValueChange={onValueChange}>
//         <Picker.Item
//           style={{fontSize: 13, color: appColors.AppLightGray}}
//           label={label}
//           value={null}
//         />
//         {dropDownData?.map((x, ind) => (
//           <Picker.Item
//             style={{fontSize: 13}}
//             key={ind}
//             label={x.label}
//             value={x.value}
//           />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FAF9F6',
//     // marginTop: 15,
//     borderColor: 'grey',
//     borderWidth: 1,
//     borderRadius: 10,
//   },
// });

// export default Dropdown;
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; // Import AntDesign icons from Expo
import CustomIcon, {Icons} from '../CustomIcon/CustomIcon';
import {screenSize} from '../../atom/ScreenSize';
import appColors from '../../../AppConstants/appColors';

const CustomDropdownPicker = ({items}) => {
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
        <Text style={{color: appColors.AppLightGray}}>Select Items</Text>
        <CustomIcon
          type={Icons.AntDesign}
          name={showDropdown ? 'up' : 'down'}
          size={20}
          color={appColors.White}
        />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity style={{ padding: 5}} key={index} onPress={() => handleItemPress(item)}>
              <Text
                style={
                  selectedItems.includes(item)
                    ? styles.selectedItem
                    : styles.item
                }>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* <View style={styles.selectedContainer}>
        <Text>Selected Items:</Text>
        {selectedItems.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View> */}
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
    padding: 15,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
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
    borderRadius: 5
  },
  selectedContainer: {
    marginTop: 10,
  },
});

export default CustomDropdownPicker;
