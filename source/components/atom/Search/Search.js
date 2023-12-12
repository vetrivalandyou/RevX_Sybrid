import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import CustomIcon, {Icons} from '../../molecules/CustomIcon/CustomIcon';
import Screen from '../ScreenContainer/Screen';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';

const Search = () => {
  return (
    <View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <CustomIcon
            type={Icons.Feather}
            name={'search'}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="search"
            onPressIn={() => {
              // navigation.navigate(constants.screen.Search);
            }}
          />
        </View>

        <TouchableOpacity>
          <CustomIcon
            type={Icons.MaterialIcons}
            name={'multitrack-audio'}
            style={styles.searchIcon}
            color={appColors.Goldcolor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
