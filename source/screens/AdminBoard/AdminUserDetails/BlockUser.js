import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';

const BlockUser = ({refRBSheet}) => {
  const blockUserByAdmin = () => {
    const payload = {
      operations: 4,
    };
    // PostRequest(endPoint.SETUP_CATEGORIES_DELETE, payload)
    //   .then(res => {
    //     console.log('responseeee>>>>.>', res?.data);
    //     if (res?.data?.code == 200) {
    //       refRBSheet.current.close();
    //     } else {
    //       SimpleSnackBar(res?.data?.message, appColors.Red);
    //     }
    //   })
    //   .catch(err => {
    //     SimpleSnackBar(messages.Catch, appColors.Red);
    //   });
  };

  return (
    <View style={{flex: 1, marginVertical: 15}}>
      <View style={{flex: 0.6}}>
        <View
          style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#E81F1C', fontSize: 18}}>Block User</Text>
        </View>
        <View style={{flex: 0.6, paddingHorizontal: '20%'}}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Are you sure you want to Block user?{' '}
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
              paddingVertical: 13,
              width: '85%',
            }}
            btnColor={appColors.Red}
            btnTextColor={{color: 'white'}}
            title={'Block User'}
            onPress={blockUserByAdmin}
          />
        </View>
      </View>
    </View>
  );
};

export default BlockUser;

const styles = StyleSheet.create({});
