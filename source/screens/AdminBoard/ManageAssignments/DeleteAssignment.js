import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const DeleteAssignment = ({refRBSheet}) => {
  return (
    <View style={styles.mainView}>
      <View style={{flex: 0.6}}>
        <View style={styles.DeletetitleView}>
          <Text style={styles.titleTextStyle}>Delete Assgnments</Text>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.TextStyle}>
            Are you sure you want to delete your Barber Van Assignment?{' '}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsMainView}>
        <View style={styles.CanclebuttonView}>
          <ButtonComponent
            style={styles.CanclebuttonStyle}
            btnTextColor={{color: 'white'}}
            title={'Cancel '}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View style={styles.DeleteButtonView}>
          <ButtonComponent
            style={styles.DeleteButtonStyle}
            btnTextColor={{color: 'white'}}
            title={'Delete Assigned Van'}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteAssignment;
