import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../Utills/AppConstants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {AppImages} from '../../../AppConstants/AppImages';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {LATEST_INSERT, LATEST_SELECT} from '../../../AppConstants/appConstants';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import DeleteSlot from './DeleteSlot';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';

const CreateSlot = ({navigation}) => {
  const createSlots = (values, setSubmitting) => {
    const payload = {
      ...values,
    };
    console.log('values', values);
    PostRequest(endPoint.CREATE_SETUP_SLOTS, payload)
      .then(res => {
        if (res?.data?.length > 0) {
          console.log('res?.data', res?.data);
          SimpleSnackBar(res?.data?.[0]?.Message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.[0]?.Message, appColors.Red);
          setSubmitting(false);
        }
      })
      .catch(err => {
        console.log('error', err);
        SimpleSnackBar(messages.Catch, appColors.Red);
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    NoofBussinessHours: Yup.number()
      .min(1, 'Business Hours must be greater than 0')
      .required('Business Hours is required'),
    DurationInMins: Yup.number()
      .min(1, 'Duration per slot in minutes must be greater than 0')
      .required('Duration per slot in minutes is required'),
  });

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Create Slots'}
          logIn={'success'}
        />
      </View>

      <View style={{flex: 0.9}}>
        <Formik
          initialValues={{
            OperationID: LATEST_INSERT,
            DurationInMins: 0,
            NoofBussinessHours: 0,
            IsActive: true,
            UserID: 0,
            UserIP: '::1',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting}) => {
            createSlots(values, setSubmitting);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Fragment>
              <View style={{flex: 0.9}}> 
                <View style={{flex: 0.19, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      marginHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    {'Business Hours'}
                  </Text>
                  <SimpleTextField
                  
                    placeholder={'Working Hours'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('NoofBussinessHours')}
                    onBlur={handleBlur('NoofBussinessHours')}
                    value={values?.NoofBussinessHours?.toString()}
                    keyboardType={'numeric'}
                    returnKeyType="done"
                    maxLength={2}
                  />
                  {touched.NoofBussinessHours && errors.NoofBussinessHours && (
                    <View
                      style={{
                        marginLeft: 10,
                        marginTop: 2,
                        marginBottom: 15,
                      }}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.NoofBussinessHours}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{flex: 0.16, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#fff',
                      marginHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    {'Duration per slot in minutes (0:30)'}
                  </Text>
                  <SimpleTextField
                    placeholder={'Duration Minutes'}
                    placeholderTextColor={appColors.AppLightGray}
                    onChangeText={handleChange('DurationInMins')}
                    onBlur={handleBlur('DurationInMins')}
                    value={values?.DurationInMins?.toString()}
                    keyboardType={'numeric'}
                      
                    maxLength={3}
                  />
                  {touched.DurationInMins && errors.DurationInMins && (
                    <View
                      style={{
                        marginLeft: 10,
                        marginTop: 2,
                        marginBottom: 15,
                      }}>
                      <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                        {errors.DurationInMins}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={[styles.createbuttonView]}>
                <ButtonComponent
                  style={{
                    backgroundColor: '#C79646',
                    paddingVertical: Platform.OS == 'ios' ? 17 : 13,
                    bottom: 1,
                    position: 'absolute',
                  }}
                  btnTextColor={{color: 'white'}}
                  title={'Create'}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
    </Screen>
  );
};

const Servicelist = ({item, userId, onPress, selected}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const handleEditPress = item => {
    navigation.navigate(constants.AdminScreens.Editservices, {
      item: item,
      userId: userId,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          selected && {borderColor: '#c79647', borderWidth: 1.25},
        ]}>
        <View style={styles.Subcontainer}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{item.categoryName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CreateSlot;
