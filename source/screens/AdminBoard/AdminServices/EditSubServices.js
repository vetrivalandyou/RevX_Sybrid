import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {screenSize} from '../../../components/atom/ScreenSize';
// import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import Header from '../../../components/molecules/Header';
import appColors from '../../../AppConstants/appColors';
import {LATEST_UPDATE, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import {endPoint, imageUrl, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {PostRequest} from '../../../services/apiCall';
import {AppImages} from '../../../AppConstants/AppImages';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import ChooseImage from '../../../components/molecules/ChooseImage';
import {generateRandomNumber} from '../../../functions/AppFunctions';

const EditSubServices = ({route, navigation}) => {
  const refRBSheet = useRef();
  const {item, userId} = route.params || {};
  const beforeChangeImage = `${imageUrl}/${item?.serviceImage}`;
  
  const [changedImage, setChangedImage] = useState();
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [subServiceName, setSubServiceName] = useState(item?.serviceName);
  const [subServicePrice, setSubServicePrice] = useState(
    item?.servicePrice.toString(),
  );
  const [subServiceDuration, setSubServiceDuration] = useState(
    item?.serviceDuration.toString(),
  );
  const [subServiceDescription, setSubServiceDescription] = useState(
    item?.serviceDescription,
  );

  const handleImageCaptured = image => {
    setIsChangeImage(true);
    setChangedImage(image);
    refRBSheet.current.close();
  };

  const handleSaveSubService = () => {
    let image;
    if (isChangeImage) {
      image = {
        name: generateRandomNumber(),
        uri: changedImage?.path,
        type: changedImage?.mime,
      };
    } else {
      image = beforeChangeImage;
    }
    const formData = new FormData();
    formData.append('Operations', LATEST_UPDATE);
    formData.append('ServiceId', item?.servicesId);
    formData.append('ServiceName', subServiceName);
    formData.append('ServiceDescription', item?.serviceDescription);
    formData.append('ServicePrice', parseFloat(subServicePrice));
    formData.append('ServiceDuration', parseFloat(subServiceDuration));
    formData.append('ServiceCategoryId', item?.serviceCategoryId);
    formData.append('ServiceImage', image);
    formData.append('Discount', parseFloat(0.0));
    formData.append('CreatedBy', userId);
    formData.append('UserIP', '::1');

    console.log(image);

    PostRequest(endPoint.BARBER_SERVICES_CU, formData)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.code == SUCCESS_CODE) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Sub Service'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <View style={{flex: 0.2}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                width: '28%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '82%',
                backgroundColor: appColors.Black,
              }}>
              {isChangeImage ? (
                <Image
                  source={{uri: changedImage?.path}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 80,
                    borderWidth: 2,
                    borderColor: appColors.Goldcolor,
                    backgroundColor: 'grey',
                  }}
                />
              ) : (
                <Image
                  source={{uri: beforeChangeImage}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 80,
                    borderWidth: 3,
                    borderColor: appColors.Goldcolor,
                    backgroundColor: 'grey',
                  }}
                />
              )}
              <CustomIcon
                type={Icons.AntDesign}
                size={20}
                name={'pluscircle'}
                color={'white'}
                style={{
                  position: 'absolute',
                  left: screenSize.width / 5,
                  top: screenSize.height / 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <View style={{flex: 0.3, justifyContent: 'flex-end', marginLeft: 10}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Service Name
            </Text>
          </View>
          <View style={{flex: 0.7}}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              value={subServiceName}
              onChangeText={text => setSubServiceName(text)}
            />
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <View style={{flex: 0.3, justifyContent: 'flex-end', marginLeft: 10}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Service Price
            </Text>
          </View>
          <View style={{flex: 0.7}}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              value={subServicePrice}
              onChangeText={text => setSubServicePrice(text)}
            />
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <View style={{flex: 0.3, justifyContent: 'flex-end', marginLeft: 10}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Service Duration (in minutes)
            </Text>
          </View>
          <View style={{flex: 0.7}}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              value={subServiceDuration}
              onChangeText={text => setSubServiceDuration(text)}
            />
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <View style={{flex: 0.3, justifyContent: 'flex-end', marginLeft: 10}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Service Description
            </Text>
          </View>
          <View style={{flex: 0.7}}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              placeholder="Enter Service Description"
              placeholderTextColor={appColors.LightGray}
              value={subServiceDescription}
              onChangeText={text => setSubServiceDescription(text)}
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
          title={'Update Sub Service'}
          onPress={handleSaveSubService}
        />
      </View>
      <BottomSheet ref={refRBSheet} Height={120}>
        <ChooseImage
          refRBSheet={refRBSheet}
          setProfileImage={handleImageCaptured}
        />
      </BottomSheet>
    </Screen>
  );
};

export default EditSubServices;
