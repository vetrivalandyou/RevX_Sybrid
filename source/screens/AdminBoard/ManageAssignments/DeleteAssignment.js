import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';

const DeleteAssignment = ({refRBSheet}) => {
  return (
    <View style={styles.mainView}>
      <View style={{flex: 0.6}}>
        <View
          style={styles.DeletetitleView}>
          <Text style={styles.titleTextStyle}>Delete Assgnments</Text>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.TextStyle}>
            Are you sure you want to delete your Assigment?{' '}
          </Text>
        </View>
      </View>
      <View
        style={styles.buttonsMainView}>
        <View
          style={styles.CanclebuttonView}>
          <ButtonComponent
            style={styles.CanclebuttonStyle}
            btnTextColor={{color: 'white'}}
            title={'Cancel '}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View
          style={styles.DeleteButtonView}>
          <ButtonComponent
            style={styles.DeleteButtonStyle}  
            btnTextColor={{color: 'white'}}
            title={'Delete Asignment'}
          />
        </View>

      </View>
    </View>
  );
};

export default DeleteAssignment;

