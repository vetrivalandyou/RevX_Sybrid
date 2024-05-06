import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {Delete} from '../../../AppConstants/appConstants';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';

const DeleteAssignment = ({
  refRBSheet,
  vanAssignment,
  userDetails,
  VanServices,
  selectedItem,
}) => {
  console.log('test,', vanAssignment);
  console.log('userDetails', userDetails);

  const VanInfo = () => {
    const formData = new FormData();
    formData.append('Id', (id = 0));
    formData.append('VanId', vanAssignment?.vanId);
    formData.append('BarberId', vanAssignment?.barberId);
    formData.append('Operations', Delete);
    formData.append('CreatedBy', userDetails?.userId);
    formData.append('UserIP', (userIP = '::1'));
    console.log('formData', formData);
    PostRequest(endPoint.BARBER_VANASSIGNMENT_CU, formData)
      .then(res => {
        console.log('formData', formData);

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
            onPress={handleDeleteServices}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteAssignment;
