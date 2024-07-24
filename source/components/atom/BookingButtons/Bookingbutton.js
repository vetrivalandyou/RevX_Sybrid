import React from 'react';

import {Text, TouchableOpacity} from 'react-native';
import Styles from './Styles';

const Bookingbutton = ({onPress, title, style, stylebtn, disabled}) => {
  return (
    <TouchableOpacity
      style={[Styles.bookingcontainer, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[Styles.btnText, stylebtn]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Bookingbutton;
