import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import { Formik } from 'formik';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { endPoint, messages } from '../../../AppConstants/urlConstants';
import { PostRequest } from '../../../services/apiCall';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import appColors from '../../../AppConstants/appColors';
import { NavigationContainer } from '@react-navigation/native';

const DeleteVanServices = ({ refRBSheet, vandetails }) => {

  console.log("test,", vandetails);

  const VanInfo = () => {
    const formData = new FormData();
    formData.append('vanId', vandetails.vanId);
    formData.append('UserIP', "::1");
    formData.append('vanName', vandetails.vanName);
    // formData.append('vanRegistrationNo', vandetails.vanRegistrationNo);

    formData.append('CreatedBy', '2');
    formData.append('Operations', '4');
    console.log("testtttt", formData);

    PostRequest(endPoint.DELETE_VANS, formData)

      .then(res => {
        console.log("checkkk", res.data.data)
        if (res?.data?.code == 200) {
          console.log('response', res?.data.data);

        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        console.log(err)
        SimpleSnackBar(messages.Catch, appColors.Red);
        //else condition is running
        console.log("errrrrrr", messages.Catch)
      });
  };
  const handleDeleteServices = () => {

    VanInfo();

  };
  
  return (
    <View style={styles.mainView}>
      <View style={{ flex: 0.6 }}>
        <View
          style={styles.DeletetitleView}>
          <Text style={styles.titleTextStyle}>Delete Services</Text>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.TextStyle}>
            Are you sure you want to delete your service?{' '}
          </Text>
        </View>
      </View>

      <View
        style={styles.buttonsMainView}>


        <View
          style={styles.CanclebuttonView}>
          <ButtonComponent
            style={styles.CanclebuttonStyle}
            btnTextColor={{ color: 'white' }}
            title={'Cancel '}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View
          style={styles.DeleteButtonView}>
          <ButtonComponent
            style={styles.DeleteButtonStyle}
            btnTextColor={{ color: 'white' }}
            title={'Delete Services'}
            onPress={handleDeleteServices}
          />
        </View>

      </View>
    </View>
  );
};

export default DeleteVanServices;


