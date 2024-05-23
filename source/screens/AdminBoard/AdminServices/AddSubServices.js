import {
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import {AppImages} from '../../../AppConstants/AppImages';
import {screenSize} from '../../../components/atom/ScreenSize';
import {LATEST_INSERT, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import ChooseImage from '../../../components/molecules/ChooseImage';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {generateRandomNumber} from '../../../functions/AppFunctions';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';

const AddSubServices = ({route, navigation}) => {
  const refRBSheet = useRef();
  const {parentService, userId} = route.params || {};
  const [changedImage, setChangedImage] = useState(null);
  const [subServiceName, setSubServiceName] = useState();
  const [subServicePrice, setSubServicePrice] = useState();
  const [subServiceDuration, setSubServiceDuration] = useState();
  const [subServiceDescription, setSubServiceDescription] = useState();

  const handleSaveSubService = () => {
    if (!changedImage) {
      SimpleSnackBar('Please select an image.', appColors.Red);
      return; // Exit function early if no image is selected
    }
    if (
      !subServiceName ||
      !subServicePrice ||
      !subServiceDuration ||
      !subServiceDescription
    ) {
      SimpleSnackBar('Please fill in all fields.', appColors.Red);
      return; // Exit function early if any input field is empty
    }
    const formData = new FormData();
    formData.append('ServiceId', 0);
    formData.append('Discount', 0.0);
    formData.append('UserIP', '::1');
    formData.append('CreatedBy', userId);
    formData.append('Operations', LATEST_INSERT);
    formData.append('ServiceName', subServiceName);
    formData.append('ServicePrice', parseFloat(subServicePrice));
    formData.append('ServiceDescription', subServiceDescription);
    formData.append('ServiceCategoryId', parentService?.categoryId);
    formData.append('ServiceDuration', parseFloat(subServiceDuration));
    formData.append('ServiceImage', {
      uri: changedImage?.path,
      name: `${generateRandomNumber()}.jpg`,
      type: changedImage?.mime,
    });

    PostRequest(endPoint.BARBER_SERVICES_CU, formData)
      .then(res => {
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
  const handleImageCaptured = image => {
    setChangedImage(image);
    refRBSheet.current.close();
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
          headerText={'Add Sub Service'}
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
              {changedImage?.path ? (
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
                  source={AppImages.dummyVan}
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
              placeholder="Enter Service Name"
              placeholderTextColor={appColors.LightGray}
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
              placeholder="Enter Service Price}"
              placeholderTextColor={appColors.LightGray}
              value={subServicePrice?.toString()}
              onChangeText={text => setSubServicePrice(text)}
              keyboardType={'numeric'}
              returnKeyType="done"
              maxLength={6}
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
              placeholder="Enter Service Duration"
              placeholderTextColor={appColors.LightGray}
              value={subServiceDuration?.toString()}
              onChangeText={text => setSubServiceDuration(text)}
              keyboardType={'numeric'}
              returnKeyType="done"
              maxLength={6}
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
            // opacity: subServiceName.trim() !== '' ? 1 : 0.3,
          }}
          btnTextColor={{color: 'white'}}
          title={'Save Sub Service'}
          // disable={subServiceName.trim() !== '' ? false : true}
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

export default AddSubServices;
