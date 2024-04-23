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
import DeleteSubServices from './DeleteSubServices';

const SubService = ({navigation}) => {
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

  const addSubService = () => {
    navigation.navigate(constants.AdminScreens.AddSubServices);
  };

  const editService = () => {
    // navigation.navigate(constants.AdminScreens.Addservices);
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
          headerText={'Sub services'}
          logIn={'success'}
        />
      </View>
      {/* <View style={{flex: 0.15, alignItems: 'center'}}>
            <View style={styles.container}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.74, justifyContent: 'center'}}>
                  <TextInput
                    style={{
                      paddingLeft: 16,
                      fontSize: 15,
                      color: 'white',
                    }}
                    placeholder="Enter your Services"
                    placeholderTextColor={'grey'}
                    value={newService}
                    onChangeText={text => setNewService(text)}
                  />
                </View>
                <View
                  style={{
                    flex: 0.26,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ButtonComponent
                    style={{
                      width: '82%',
                      backgroundColor: '#C79646',
                      borderRadius: 5,
                      paddingVertical: 11,
                    }}
                    btnTextColor={{color: 'white'}}
                    title={'Add'}
                    onPress={handleAddService}
                  />
                </View>
              </View>
            </View>
          </View> */}

      <ScrollView style={{flex: 0.65}}>
        {servicesList?.map(item => (
          <Servicelist
            key={item.categoryId}
            item={item}
            // selected={selectedItem === item.categoryId}
            // onPress={() => setSelectedItem(item.categoryId)}
            // onPress={editService}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Add Sub Service'}
          onPress={addSubService}
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({item, onPress, selected}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const handleEditPress = () => {
    // navigation.navigate(constants.AdminScreens.Addservices, {
    //   serviceName: item.categoryName,
    // });
    navigation.navigate(constants.AdminScreens.EditSubServices);
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
            <DeleteSubServices refRBSheet={refRBSheet} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubService;
