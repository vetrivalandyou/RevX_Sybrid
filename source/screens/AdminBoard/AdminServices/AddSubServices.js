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

const AddSubServices = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newService, setNewService] = useState('');
  const [servicesList, setServiceslist] = useState([]);

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
          headerText={'Add Sub Service'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              style={{
                paddingLeft: 16,
                fontSize: 15,
                color: 'white',
              }}
              placeholder="Enter your Sub Services"
              placeholderTextColor={'grey'}
              value={newService}
              onChangeText={text => setNewService(text)}
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
          btnTextColor={{color: 'white'}}
          title={'Save Sub Services'}
          // onPress={handleAddService}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  );
};

export default AddSubServices;
