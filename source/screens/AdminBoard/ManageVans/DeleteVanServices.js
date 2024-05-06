import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {Formik} from 'formik';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import appColors from '../../../AppConstants/appColors';
import {NavigationContainer} from '@react-navigation/native';
import {Delete} from '../../../AppConstants/appConstants';

const DeleteVanServices = ({
  refRBSheet,
  vanDetails,
  userDetails,
  VanServices,
}) => {
  console.log('test,', vanDetails);
  console.log('userDetails', userDetails);

  const VanInfo = () => {
    const formData = new FormData();
    formData.append('VanId', vanDetails?.vanId);
    formData.append('Operations', Delete);
    formData.append('CreatedBy', userDetails?.userId);

    console.log('Payload', formData);
    PostRequest(endPoint.DELETE_VANS, formData)
      .then(res => {
        console.log('checkkk', res.data.data);
        if (res?.data?.code == 200) {
          SimpleSnackBar(res?.data?.message);
          refRBSheet.current.close();
          VanServices();
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };
  const handleDeleteServices = () => {
    VanInfo();
  };

  return (
    <View style={styles.mainView}>
      <View style={{flex: 0.6}}>
        <View style={styles.DeletetitleView}>
          <Text style={styles.titleTextStyle}>Delete Van</Text>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.TextStyle}>
            Are you sure you want to delete your van?{' '}
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
            style={[styles.DeleteButtonStyle]}
            btnColor={appColors.Red}
            btnTextColor={{color: 'white'}}
            title={'Delete Van'}
            onPress={handleDeleteServices}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteVanServices;
