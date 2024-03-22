import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { screenSize } from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import CustomDropdownPicker from '../../../components/molecules/CustomDropdownPicker';
import Dropdown from '../../../components/molecules/Dropdown/Dropdown';
import appColors from '../../../AppConstants/appColors';
import { endPoint } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import { GetRequest, PostRequest } from '../../../services/apiCall';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import constant from '../../../AppConstants/Constants.json'

const EditAssignment = ({ route }) => {
  const navigation = useNavigation();
  const { serviceName, isAdded } = route.params || {};
  const [selectedVans, setselectedvans] = useState(serviceName);
  const [userDetails, setuserDetails] = useState();
  const [barberid, setbarberid] = useState(serviceName);
  const [dropDownData, setDropDownData] = useState([]);
  const [VandropDown, setVanDropDown] = useState([]);

  useEffect(() => {
  PostbarberList();
    getVanList();
    getUserDetail();
   
  }, []);
  
  const getUserDetail = async()=> {
    const userDatail = await getAsyncItem(constant.AsyncStorageKeys.userDetails)
    setuserDetails(userDatail)
  }

  const PostbarberList = () => {
    PostRequest(endPoint.BARBER_LIST)
      .then(res => {
    
        if (res?.data?.code == 200) {
          
          const approvedVans = res?.data?.data.filter(van => van.isApproved ==false);
          setDropDownData(approvedVans);
        } else {
          SimpleSnackBar(res?.data?.message);
     
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const getVanList = () => {
    GetRequest(endPoint.GET_VANS)
      .then(res => {
        if (res?.data?.code == 200) {
          // console.log(res?.data);
          setVanDropDown(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
       
      });
  };


  
  const SaveVanAssignmet = () => {
    console.log('selected vans',userDetails)
  console.log('selected assignmt',)
    const payload = {
      id: null,
      barberId : barberid,
      vanId: selectedVans,
      operations: 2,
      createdBy: userDetails.userId,
    };
    

    PostRequest(endPoint.BARBER_VANASSIGNMENT_CRUD,payload)
      .then(res => {
        console.log('Response:', res?.data?.data);
        if (res?.data?.code == 200) {
          console.log('Data:', res?.data.data);
         
        } else {
          SimpleSnackBar(res?.data?.message);
          console.log('................else',res.data)

        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };
 




  return (
    <Screen viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={isAdded ? 'Add Van Assignment' : 'Edit Van Assignment'}
          logIn={'success'}
        />
      </View>
      <View style={{ flex: 0.8, }}>
        <View style={{ flex: 0.15, justifyContent: 'center' }}>
          <View style={{ flex: 0.65, }}>
            <Dropdown label={'Select a value'}
              value={selectedVans}
              onValueChange={(itemValue) => setselectedvans(itemValue)}
              dropDownData={dropDownData.map(van => ({ label: van.userName, value: van.userId}))}
              style={{ backgroundColor: 'black', borderColor: appColors.AppLightGray, borderRadius: 30, paddingHorizontal: 10,}}
              custompickerstyle={{ color: selectedVans ? appColors.White : appColors.AppLightGray, }}
            />
          </View>
        </View>

        <View style={{ flex: 0.15, justifyContent: 'center' }}>
          <View style={{ flex: 0.65, }}>
            <Dropdown label={'Select a value'}
              value={barberid}
              onValueChange={(itemValue) => setbarberid(itemValue)}
              dropDownData={VandropDown.map(Van =>({label: Van.vanName, value: Van.vanId}))}
              style={{ backgroundColor: 'black', borderColor: appColors.AppLightGray, borderRadius: 30, paddingHorizontal: 10,}}
              custompickerstyle={{ color: barberid ? appColors.White : appColors.AppLightGray, }}
            />
          </View>
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
          title={isAdded ? 'Save' : 'Update'}

          onPress={ SaveVanAssignmet}
        />
      </View>
    </Screen>
  );
};


export default EditAssignment;
