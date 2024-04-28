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
import React, {useEffect, useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../Utills/AppConstants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
import {LATEST_SELECT} from '../../../AppConstants/appConstants';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';

const OurServices = ({navigation}) => {
  const initialServiceFields = {
    categoryId: 0,
    categoryName: '',
    operations: LATEST_SELECT,
    createdBy: 0,
  };
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState();
  const [servicesList, setServiceslist] = useState([]);

  useEffect(() => {
    if (isFocused) {
      GetsetupCategories();
      getAsyncData();
    }
  }, [isFocused]);

  const getAsyncData = async () => {
    const userDetailsData = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetailsData);
  };

  const GetsetupCategories = () => {
    PostRequest(endPoint.GET_SETUP_CATEGORIES, initialServiceFields)
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

  const addSubService = item => {
    console.log('item', item);
    navigation.navigate(constants.AdminScreens.SubService, {
      parentService: item,
    });
  };

  const addService = () => {
    navigation.navigate(constants.AdminScreens.Addservices, {
      userId: userDetails?.userId,
    });
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
          headerText={'Our Services'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <FlatList
          data={servicesList}
          keyExtractor={item => item.categoryId.toString()}
          renderItem={({item, index}) => (
            <Servicelist
              key={item?.categoryId}
              item={item}
              userId={userDetails?.userId}
              onPress={() => addSubService(item)}
            />
          )}
        />
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
          title={'Add Service'}
          onPress={addService}
        />
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
          <TouchableOpacity
            onPress={() => handleEditPress(item)}
            style={styles.editImageView}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => refRBSheet.current.open()}
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

export default OurServices;
