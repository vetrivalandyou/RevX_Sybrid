import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import CustomIcon, {Icons} from '../../molecules/CustomIcon/CustomIcon';
import Screen from '../ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';

const Search = ({
  leaftIconType,
  leftIconName,
  onPressRightIcon,
  onpressLeftIcon,
  style,
}) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <TouchableOpacity
        onPress={onPressRightIcon}
        style={styles.rightIconContainer}>
        <CustomIcon
          type={Icons.AntDesign}
          name={'search1'}
          color={appColors.White}
          size={25}
          style={{marginLeft: 15}}
        />
      </TouchableOpacity>
      <View style={{flex: 0.7}}>
        <TextInput
          style={{flex: 1, color: appColors.White}}
          placeholder="Search"
          placeholderTextColor={appColors.LightGray}
          onPressIn={() => {
            // navigation.navigate(constants.screen.Search);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={onpressLeftIcon}
        style={styles.leftIconContainer}>
        <CustomIcon
          type={leaftIconType}
          name={leftIconName}
          size={25}
          color={appColors.Goldcolor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColors.darkgrey,
    marginVertical: 5,
  },
  rightIconContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
});
