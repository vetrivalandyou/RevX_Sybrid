import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import {screenSize} from '../atom/ScreenSize';
import appColors from '../../AppConstants/appColors';
import CustomIcon, {Icons} from './CustomIcon/CustomIcon';

const CustomDropdownPicker = ({items, values, setValues, onChange}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemPress = item => {
    onChange && onChange(item);
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
  };

  const DropdownList = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          handleItemPress(item);
          onChange && onChange(item);
        }}>
        <Text style={values.includes(item) ? styles.selectedItem : styles.item}>
          {item?.setupDetailName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[styles.header, {flex: 0.6, flexDirection: 'row'}]}>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              color:
                values?.length > 0 ? appColors.White : appColors.AppLightGray,
              paddingLeft: 10,
            }}>
            {values?.length > 0
              ? values?.map(x => x.setupDetailName).join(', ')
              : 'Select Items'}
          </Text>
        </View>
        <View style={{flex: 0.2}}></View>
        <CustomIcon
          type={Icons.AntDesign}
          name={showDropdown ? 'up' : 'down'}
          size={15}
          color={appColors.White}
        />
      </TouchableOpacity>
      {showDropdown && (
        <ScrollView style={styles.dropdown}>
          {items?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleItemPress(item);
                onChange && onChange(item);
              }}>
              <Text
                style={
                  values.includes(item) ? styles.selectedItem : styles.item
                }>
                {item?.setupDetailName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? 20 : 17,
    paddingHorizontal: Platform.OS == 'ios' ? 20 : 17,
    borderColor: 'grey',
    borderWidth: 1.5,
    borderRadius: 25,
  },
  dropdown: {
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    position: 'absolute',
    bottom: 50,
    width: screenSize.width / 1.1,
    height: screenSize.height / 2,
    backgroundColor: 'white',
  },
  item: {
    padding: 8,
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
