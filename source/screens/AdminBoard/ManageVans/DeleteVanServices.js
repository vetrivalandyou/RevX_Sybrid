import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import { Formik } from 'formik';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { endPoint, messages } from '../../../AppConstants/urlConstants';
import { PostRequest } from '../../../services/apiCall';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import appColors from '../../../AppConstants/appColors';

const DeleteVanServices = ({ refRBSheet, vandetails }) => {
  console.log("test,", vandetails);
  // const [editedDetails, setEditedDetails] = useState([vandetails])
  const VanInfo = () => {
    const payload = {
      vanId:vandetails.vanId,
      vanName: vandetails.vanName,
      vanRegistrationId: vandetails.vanRegistrationId,
      vanRegistrationNo: vandetails.vanRegistrationNo,
      vanModel: vandetails.vanModel,

      Operation: 4,
      
    }
    console.log("testtttt", payload),
    console.log(".......",vandetails)

      PostRequest(endPoint.DELETE_VANS, payload)
        .then(res => {
          console.log("Responseee", res?.data)
          // console.log("........",setEditedDetails)
        
           refRBSheet.current.close()
        })
        .catch(err => {
          SimpleSnackBar(messages.Catch, appColors.Red);
          console.log(".................",err)
         
        });
  };
  const handleDeleteServices = () => {
    VanInfo();
  // console.log(VanInfo()),
    SimpleSnackBar('deleted sucessfully', appColors.Green)
     // Call your API function here
  };


  return (
    <View style={{ flex: 1, marginVertical: 15 }}>
      <View style={{ flex: 0.6 }}>
        <View
          style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#E81F1C', fontSize: 18 }}>Delete Services</Text>
        </View>
        <View style={{ flex: 0.6, paddingHorizontal: '20%' }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            Are you sure you want to delete your service?{' '}
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
          style={{ flex: 0.4, justifyContent: 'center', alignItems: 'flex-end' }}>
          <ButtonComponent
            style={{
              backgroundColor: '#424242',
              paddingVertical: 13,
              width: '90%',
            }}
            btnTextColor={{ color: 'white' }}
            title={'Cancel '}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View
          style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
          <ButtonComponent
            style={{
              backgroundColor: '#E81F1C',
              paddingVertical: 13,
              width: '85%',
            }}
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

const styles = StyleSheet.create({});
