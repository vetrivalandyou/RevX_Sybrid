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
import React, { useRef, useState } from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';




import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import Header from '../../../components/molecules/Header';
import CustomIcon, { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import DeleteVanServices from './DeleteVanServices';
import { endPoint } from '../../../AppConstants/urlConstants';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import appColors from '../../../AppConstants/appColors';
import { PostRequest } from '../../../services/apiCall';

import { AppImages } from '../../../AppConstants/AppImages';
import ProfileUpdate from './ProfileUpdate';
import { screenSize } from '../../../components/atom/ScreenSize';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import Styles from '../../../components/atom/BookingButtons/Styles';

const AddVanservices = ({ navigation, }) => {
  const refRBSheet = useRef();

  const [profileImage, setProfileImage] = useState(null);

  const handleImageCaptured = (imageUri) => {

    setProfileImage(imageUri);
    // Update the profile image state with the captured image URI
    refRBSheet.current.close(); // Close the bottom sheet after capturing the image
  };



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
      Operation: 1,
      CreatedBy: 2
    }
    console.log("payload", payload)
    PostRequest(endPoint.ADD_VANS, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          setLoading(true);
          console.log("test", res?.data);
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
    <Screen viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
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
            <View style={{ flex: 0.8, }}>





<View style={styles.ProfileMainView}>

         
                <View style={styles.ProfileouterView}>

                <TouchableOpacity onPress={() => refRBSheet.current.open()}  style={styles.profileView} >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.imageStyle}
                    />
                  ) : (
                    <Image
                      source={AppImages.ProfileSlider}
                      style={styles.imageStyle}
                    />
                  )}
                  <CustomIcon type={Icons.AntDesign} size={20} name={'pluscircle'} color={'white'} style={styles.Iconstyle} />
                  </TouchableOpacity>

                </View>
              </View>

              <View style={{ flex: 0.7, backgroundColor:'red'}}>
                <View style={{ flex: 0.15, }}>
                  {/* <View style={styles.container}> */}

                  <SimpleTextField
                    // textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Name'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanName')}
                    onBlur={handleBlur('VanName')}
                    value={values.VanName}
                  />

                  {/* </View> */}
                </View>
                <View>
                  {touched.VanName && errors.VanName && (
                    <View
                      style={{ marginLeft: 12, marginTop: 4, }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanName}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ flex: 0.15, }}>
                  {/* <View style={styles.container}> */}

                  <SimpleTextField
                    //  textUpperView={ {borderWidth: 0,}}
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

                  {/* </View> */}
                </View>
                <View>
                  {touched.VanRegistrationNo && errors.VanRegistrationNo && (
                    <View
                      style={{ marginLeft: 12, marginTop: 4, }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanRegistrationNo}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ flex: 0.15 }}>
                  {/* <View style={styles.container}> */}

                  <SimpleTextField
                    // textUpperView={ {borderWidth: 0,}}
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
                  {/* </View> */}


                </View>
                <View style={{ justifyContent: 'center' }}>
                  {touched.VanRegistrationId && errors.VanRegistrationId && (
                    <View
                      style={{ marginLeft: 12, marginTop: 4, }}>
                      <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                        {errors.VanRegistrationId}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ flex: 0.15, }}>
                  {/* <View style={styles.container}> */}

                  <SimpleTextField
                    //  textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Model'}
                    placeholderTextColor={appColors.LightGray}
                    onChangeText={handleChange('VanModel')}
                    onBlur={handleBlur('VanModel')}
                    value={values.VanModel}
                  />



                  {/* </View> */}
                </View>

                {touched.VanModel && errors.VanModel && (
                  <View
                    style={{ marginLeft: 12, marginTop: 4, justifyContent: 'center' }}>
                    <Text style={{ color: appColors.Goldcolor, fontSize: 12 }}>
                      {errors.VanModel}
                    </Text>
                  </View>
                )}

              </View>
            </View>
            <View style={styles.buttonView}>
              <ButtonComponent
                style={{
                  backgroundColor: '#C79646',
                  paddingVertical: Platform.OS == 'ios' ? 17 : 13,
                  bottom: 1,
                  position: 'absolute',
                }}
                btnTextColor={{ color: 'white' }}
                title={'Save'}
                disabled={isSubmitting}
                onPress={handleSubmit}
                isLoading={isSubmitting}
              />

            </View>
          </>

        )}
      </Formik>

      <BottomSheet ref={refRBSheet} Height={120}>
        <ProfileUpdate onImageCaptured={handleImageCaptured} />
      </BottomSheet>


    </Screen>
  );
};



export default AddVanservices;



// import { FlatList, StyleSheet, Text, View } from "react-native";
// import Screen from "../../../components/atom/ScreenContainer/Screen";
// import Header from "../../../components/molecules/Header";
// import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
// import appColors from "../../../AppConstants/appColors";
// import ButtonComponent from "../../../components/atom/CustomButtons/ButtonComponent";

// const AddVanServices =({navigation})=>{


//   const data = [
//     { id: '1', rating: ' 1' ,comment:'Nice'},
//     { id: '2', rating: ' 2',comment:'Beautiful'},
//     { id: '3', rating: ' 3' ,comment:'Love it!!!'},
//     { id: '4', rating: ' 4' ,comment:'Fast Delivery'},
//     { id: '5', rating: ' 5' ,comment:'Nice'},

//     // Add more items as needed
//   ];

  
// return(
//   <Screen statusBarColor={appColors.Black} >
//         <View style={{ flex: 0.1, backgroundColor: appColors.Black }}>
    
//       <Header
//         lefttIcoType={Icons.Ionicons}
//         onPressLeftIcon={() => navigation.goBack()}
//         leftIcoName={'chevron-back'}
//         headerText={'Rating'}
//         rightIcoName={'bell'}
//         rightIcoType={Icons.SimpleLineIcons}
//         logIn={'success'}
//         rightIcoSize={20}
//         leftIcoStyle={{
//           backgroundColor: appColors.lightBlack,
//           borderRadius: 50,
//           height: 50,
//           width: 50,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       />
// </View>
// <View style={{flex:0.8,}}>

// <View style={{flex:0.1,}}>
// <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       horizontal={true}
//     />
 
// </View>
// <View style={{flex:0.08,justifyContent:'center',marginHorizontal:10}}>

// <Text style={{color:appColors.White,fontSize:15}}>Comment Rating</Text>
// </View>


// <View style={{
//             height: 1.5,
//             backgroundColor: appColors.AppLightGray,
//             width: '95%',
//             marginHorizontal: 10
// }}></View>

// <View style={{flex:0.13,}}>
// <FlatList
//       data={data}
//       renderItem={Rendercomments}
//       keyExtractor={(item) => item.id}
//       horizontal={true}
//     />
// </View>
// </View>
// <View style={styles.buttonView}>
 
//         <ButtonComponent
//           style={{
//             backgroundColor: '#C79646',
//             paddingVertical: Platform.OS == 'ios' ? 17 : 13,
//             bottom: 1,
//             position: 'absolute',
//           }}
//           btnTextColor={{color: 'white'}}
//           title={'Submit'}
//           onPress={() => navigation.goBack()}
//         />
//       </View>
   

//     </Screen>
// )}

// const renderItem = ({ item }) => (
//   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//   <View style={{ height:50,width:85,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:appColors.Gray,marginHorizontal:2,}}>
//     <View style={{flexDirection:'row',}}>
//     <CustomIcon type={Icons.AntDesign}
//     name={'star'}
//     size={20}
//     color={appColors.Goldcolor}/>
//     <Text style={{color:appColors.White}}>{item.rating}</Text>
//     </View>
//     </View>
//   </View>
// );

// const Rendercomments = ({ item }) => (
//   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//   <View style={{ height:40,width:90,borderRadius:20,borderWidth:1,justifyContent:'center' ,alignItems:'center',marginHorizontal:3,borderColor:appColors.AppLightGray}}>
    
//     <Text style={{color:appColors.White}}>{item.comment}</Text>
//     </View>
//   </View>
// );





// export default AddVanServices;

// const styles= StyleSheet.create({
// buttonView: {
//   flex: 0.1,
//  justifyContent:'center',alignItems:'center',

 
// },
// })  
