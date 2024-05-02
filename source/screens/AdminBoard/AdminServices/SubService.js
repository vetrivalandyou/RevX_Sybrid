import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import DeleteSubServices from './DeleteSubServices';
import {PostRequest} from '../../../services/apiCall';
import Header from '../../../components/molecules/Header';
import {AppImages} from '../../../AppConstants/AppImages';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import constants from '../../../AppConstants/Constants.json';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {LATEST_SELECT, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import appColors from '../../../AppConstants/appColors';

const SubService = ({route, navigation}) => {
  const {parentService} = route?.params;
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState();
  const [servicesList, setServiceslist] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getSubServices();
      getAsyncData();
    }
  }, [isFocused]);

  console.log('servicesList ', servicesList);

  const getAsyncData = async () => {
    const userDetailsData = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetailsData);
  };

  const getSubServices = () => {
    const payload = {
      serviceId: 0,
      serviceName: '',
      serviceCategoryId: parentService?.categoryId,
      operations: LATEST_SELECT,
    };
    console.log('payload', payload);
    PostRequest(endPoint.BARBER_SERVICES_GET, payload)
      .then(res => {
        console.log('res?.data', res?.data?.data);
        if (res?.data?.code == SUCCESS_CODE) {
          setServiceslist(res?.data?.data);
        } else {
          // SimpleSnackBar(res?.data?.message, appColors.Red);
          console.log('res?.data?.message');
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const addSubService = () => {
    navigation.navigate(constants.AdminScreens.AddSubServices, {
      parentService: parentService,
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
          headerText={'Sub services '}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        {servicesList?.length <= 0 ? (
          <View style={styless.container}>
            <Text style={styless.text}>
              Oops! Looks like there's no data to display at the moment.
            </Text>
          </View>
        ) : (
          <FlatList
            data={servicesList}
            keyExtractor={item => item?.servicesId?.toString()}
            renderItem={({item, index}) => (
              <Servicelist
                key={item?.servicesId}
                item={item}
                userId={userDetails?.userId}
              />
            )}
          />
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
          title={'Add Sub Service'}
          onPress={addSubService}
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({key, item, userId}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const handleEditPress = () => {
    navigation.navigate(constants.AdminScreens.EditSubServices, {
      subService: item,
      userId: userId,
    });
  };

  return (
    <TouchableOpacity key={key}>
      <View style={[styles.container]}>
        <View style={styles.Subcontainer}>
          <View style={[styles.textView, {flex: 0.1}]}>
            <Image
              source={{uri: `${imageUrl}${item?.serviceImage}`}}
              style={{width: 35, height: 35, borderRadius: 100}}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{item?.serviceName}</Text>
          </View>
          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.editImageView}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image
              source={AppImages.deleteimage}
              style={styles.Deleteimagestyle}
            />
          </TouchableOpacity> */}
          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteSubServices refRBSheet={refRBSheet} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubService;

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: appColors.White,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
