import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Styles from './Styles';

const Completedbutton = ({onPress, title, style, textstyle}) => {
  return (
    <TouchableOpacity
      style={[Styles.completedcontainer, style]}
      onPress={onPress}>
      <Text style={[Styles.completedcontainerText, textstyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Completedbutton;

const styles = StyleSheet.create({});
