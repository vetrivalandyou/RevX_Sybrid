import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Platform,
    ActivityIndicator,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import Screen from '../../../components/atom/ScreenContainer/Screen';
  import {screenSize} from '../../Utills/AppConstants';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Entypo from 'react-native-vector-icons/Entypo';
  import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
  import styles from './styles';
  import {useNavigation} from '@react-navigation/native';
  import { Formik } from 'formik';
import * as Yup from 'yup';
  import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
  import Header from '../../../components/molecules/Header';
  import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
  import constants from '../../../AppConstants/Constants.json';
import DeleteVanServices from './DeleteVanServices';
import { endPoint } from '../../../AppConstants/urlConstants';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../../AppConstants/appColors';
import { PostRequest } from '../../../services/apiCall';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
  
  const AddVanservices = ({navigation}) => {
   

    const validationSchema = Yup.object().shape({
      VanName: Yup.string().required(' Van name is required'),
      VanRegistrationNo: Yup.string()
       
        .required('Van Registration no is required'),
        VanRegistrationId: Yup.string()
        .required('Van Registration Id'),
        
        VanModel: Yup.string().required('Van Model is required'),
      
    });

    const VanInfo = (values, setSubmitting) => {
     
      const payload = {
        ...values,
        Operation:1,
        CreatedBy:2
      }
      console.log("payload", payload)
      PostRequest(endPoint.ADD_VANS, payload)
        .then(res => {
          if (res?.data?.code == 200) {
            setLoading(true);
            console.log("test",res?.data);
            setLoading(true);
            SimpleSnackBar(res?.data?.message);
            navigation.goBack();
          
          } else {
            SimpleSnackBar(res?.data?.message);
          }
          setSubmitting(false);
      
        })
        .catch(err => {
          SimpleSnackBar(messages.Catch, appColors.Red);
          setSubmitting(false);
       
        });
    };

    return (
      <Screen viewStyle={{ flex: 1, padding: 15 , backgroundColor: appColors.Black}} statusBarColor={appColors.Black}>
        <View style={{flex: 0.1}}>
          <Header
            headerSubView={{marginHorizontal: 5}}
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Add Vans'}
            logIn={'success'}
          />
        </View>
        
        <Formik
          initialValues={{
            VanName: '',
            VanRegistrationNo: '',
            VanRegistrationId: '',
            VanModel: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            VanInfo(values, setSubmitting);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
          <>
          <View style={{flex:0.8,}}>
          <View style={{flex: 0.12, alignItems: 'center'}}>
          <View style={styles.container}>
           
                <SimpleTextField
                textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Name'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanName')}
                    onBlur={handleBlur('VanName')}
                    value={values.VanName}
                  />
                   
              </View>
        </View>
        <View>
{touched.VanName && errors.VanName && (
                    <View
                      style={{ marginLeft: 12, marginTop: 4,}}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanName}
                      </Text>
                    </View>
                  )}
        </View>

        <View style={{flex: 0.12, alignItems: 'center',}}>
        <View style={styles.container}>
            
                   <SimpleTextField
                   textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Registration No'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanRegistrationNo')}
                    onBlur={handleBlur('VanRegistrationNo')}
                    value={values.VanRegistrationNo}
                  />
                   {/* {touched.VanRegistrationNo && errors.VanRegistrationNo && (
                    <View
                      style={{ marginLeft: 8, marginTop: 4,  }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.VanRegistrationNo}
                      </Text>
                    </View>
                  )} */}
              
        </View>
        </View>
        <View>
{touched.VanRegistrationNo && errors.VanRegistrationNo && (
                    <View
                    style={{ marginLeft: 12, marginTop: 4,}}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanRegistrationNo}
                      </Text>
                    </View>
                  )}
        </View>

        <View style={{flex: 0.12, alignItems: 'center',}}>
        <View style={styles.container}>
           
                 <SimpleTextField
                    textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Registration Id'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanRegistrationId')}
                    onBlur={handleBlur('VanRegistrationId')}
                    value={values.VanRegistrationId}
                    
                  />
                   {/* {touched.VanRegistrationId && errors.VanRegistrationId && (
                    <View
                      style={{ marginLeft: 8, marginTop: 2,backgroundColor:'purple'}}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 10 }}>
                        {errors.VanRegistrationId}
                      </Text>
                    </View>
                  )} */}
              </View>
             
              
</View>
<View>
{touched.VanRegistrationId && errors.VanRegistrationId && (
                    <View
                    style={{ marginLeft: 12, marginTop: 4,}}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanRegistrationId}
                      </Text>
                    </View>
                  )}
        </View>

        <View style={{flex: 0.12, alignItems: 'center',}}>
        <View style={styles.container}>
           
                   <SimpleTextField
                   textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Model'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanModel')}
                    onBlur={handleBlur('VanModel')}
                    value={values.VanModel }
                  />
                  
            
           
        </View>
        </View>
       
{touched.VanModel && errors.VanModel && (
                    <View
                    style={{ marginLeft: 12, marginTop: 4,}}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12}}>
                        {errors.VanModel}
                      </Text>
                    </View>
                  )}
        </View>
       
        <View style={styles.buttonView}>
          <ButtonComponent
            style={{
              backgroundColor: '#C79646',
              paddingVertical: Platform.OS == 'ios' ? 17 : 13,
              bottom: 1,
              position: 'absolute',
            }}
            btnTextColor={{color: 'white'}}
            title={'Save Vans'}
            disabled={isSubmitting}
            onPress={handleSubmit}
             isLoading={isSubmitting}
          />
          
                 
                
       
        </View>
        </>
          )}
        </Formik>
       
     
      </Screen>
    );
  };
  
  
  
  export default AddVanservices;
  