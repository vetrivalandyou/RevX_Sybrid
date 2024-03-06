import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const DeleteAssignment = ({refRBSheet}) => {
  return (
    <View style={{flex: 1, marginVertical: 15}}>
      <View style={{flex: 0.6}}>
        <View
          style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#E81F1C', fontSize: 18}}>Delete Assgnments</Text>
        </View>
        <View style={{flex: 0.6, paddingHorizontal: '20%'}}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Are you sure you want to delete your Assigment?{' '}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{flex: 0.4, justifyContent: 'center', alignItems: 'flex-end'}}>
          <ButtonComponent
            style={{
              backgroundColor: '#424242',
              paddingVertical: 13,
              width: '90%',
            }}
            btnTextColor={{color: 'white'}}
            title={'Cancel '}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <ButtonComponent
            style={{
              backgroundColor: '#E81F1C',
              paddingVertical: 13,
              width: '85%',
            }}  
            btnTextColor={{color: 'white'}}
            title={'Delete Asignment'}
          />
        </View>

      </View>
    </View>
  );
};

export default DeleteAssignment;

const styles = StyleSheet.create({});
