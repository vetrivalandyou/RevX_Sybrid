import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../Utills/AppConstants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';

import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import DeleteServices from './DeleteServices';
import constants from '../../../AppConstants/Constants.json';
import {PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';
import {AppImages} from '../../../AppConstants/AppImages';
import Servicesboard from '.';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import Dropdown from '../../../components/molecules/Dropdown/Dropdown';

const AddSubservices = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newService, setNewService] = useState('');
  const [servicesList, setServiceslist] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    GetsetupCategories();
  }, []);

  const GetsetupCategories = () => {
    const payload = {
      categoryId: 0,
      categoryName: '',
      operations: 3,
      createdBy: 0,
    };
    PostRequest(endPoint.GET_SETUP_CATEGORIES, payload)
      .then(res => {
        console.log('responseeee>>>>.>', res?.data?.data);
        if (res?.data?.code == 200) {
          setServiceslist(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const handleAddService = () => {
    if (newService.trim() !== '') {
      const payload = {
        categoryId: 0, // Set appropriate category ID if needed
        categoryName: newService.trim(),
        operations: 1, // Operation ID for adding service
        createdBy: 2, // Set appropriate user ID if needed
      };
      PostRequest(endPoint.SETUP_CATEGORIES_CU, payload)
        .then(res => {
          if (res?.data?.code === 200) {
            // If service added successfully, update the list
            setServiceslist([...servicesList, res?.data?.data]);
            GetsetupCategories();
          } else {
            console.error('Error:', res?.data?.message);
          }
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  };

  const dropDownData = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

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
          headerText={'Add Sub Services'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <View style={styles.DropdownView}>
          <Dropdown
            label={'Select Barber'}
            value={selectedValue}
            onValueChange={itemValue => setSelectedValue(itemValue)}
            dropDownData={dropDownData}
            style={styles.dropDownStyle}
            custompickerstyle={{
              color: selectedValue ? appColors.White : appColors.AppLightGray,
            }}
          />
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
          btnTextColor={{color: 'white'}}
          title={'Request For Approval'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({item, onPress, selected}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const handleEditPress = () => {
    navigation.navigate(constants.BarberScreen.ServiceList, {
      serviceName: item.categoryName,
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

          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.editImageView}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image
              source={AppImages.deleteimage}
              style={styles.Deleteimagestyle}
            />
          </TouchableOpacity>

          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteServices refRBSheet={refRBSheet} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddSubservices;
