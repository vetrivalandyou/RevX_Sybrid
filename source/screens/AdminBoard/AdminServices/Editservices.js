import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { PostRequest } from '../../../services/apiCall';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import { endPoint, imageUrl, messages } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import { LATEST_UPDATE, SUCCESS_CODE } from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import ChooseImage from '../../../components/molecules/ChooseImage';
import { generateRandomNumber } from '../../../functions/AppFunctions';
import { screenSize } from '../../../components/atom/ScreenSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Editservices = ({ route }) => {
  const navigation = useNavigation();
  const { item, userId } = route.params;
  const refRBSheet = useRef();
  const [editedServiceName, setEditedServiceName] = useState(
    item?.categoryName,
  );
  const [changedImage, setChangedImage] = useState('');
  const [profileImage, setProfileImage] = useState(`${item?.serviceImage}`);

  console.log('profileImage', profileImage);

  const handleClickSaveService = () => {
    const formData = new FormData();
    formData.append('categoryId', item?.categoryId);
    formData.append('operations', LATEST_UPDATE);
    formData.append('CategoryName', editedServiceName.trim());
    formData.append('createdBy', userId);
    formData.append('UserIP', '::1');
    if (changedImage == '') {
      formData.append('ServiceImagePath', profileImage);
    } else {
      formData.append('ServiceImage', {
        uri: changedImage?.path,
        name: `${generateRandomNumber()}.jpg`,
        type: changedImage?.mime,
      });
    }

    console.log(
      'Change data Change data changedImagechangedImagechangedImagechangedImagechangedImage',
      changedImage,
    );
    console.log('Change data Change data', formData);
    PostRequest(endPoint.SETUP_CATEGORIES_CU, formData)
      .then(res => {
        if (res?.data?.code == SUCCESS_CODE) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        console.log(err);
        SimpleSnackBar(messages.WentWrong, appColors.Red);
      });
  };

  const handleImageCaptured = image => {
    setChangedImage(image);
    refRBSheet.current.close();
  };

  return (
    <KeyboardAwareScrollView
      // resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{
        minHeight: screenSize.height,
        // maxHeight: 'auto',
        // justifyContent: 'center',
      }}
      scrollEnabled={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      enableOnAndroid={true}
      style={{
        backgroundColor: appColors.Black
      }}>
      <Screen
        viewStyle={{
          flex: 1,
          padding: 15,
          backgroundColor: appColors.Black,

        }}
        statusBarColor={appColors.Black}>
        <View style={{ flex: 0.1 }}>
          <Header
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Edit Service'}
            logIn={'success'}
            isShown={false}
          />
        </View>
        <View style={{ flex: 0.7 }}>
          <View style={{ flex: 0.2 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',

                  backgroundColor: ' appColors.Black',
                }}>
                {changedImage != '' ? (
                  <Image
                    source={{ uri: changedImage?.path }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 80,
                      borderWidth: 3,
                      borderColor: appColors.Goldcolor,
                      backgroundColor: 'grey',
                      resizeMode: 'cover',
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: `${imageUrl}${profileImage}` }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 80,
                      borderWidth: 3,
                      borderColor: appColors.Goldcolor,
                      backgroundColor: 'grey',
                      resizeMode: 'cover',
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
                    left:
                      Platform?.OS == 'android'
                        ? screenSize.width / 4.5
                        : screenSize.width / 5,
                    top:
                      Platform?.OS == 'android'
                        ? screenSize.height / 10
                        : screenSize.height / 12,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.18 }}>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'flex-end',
                marginLeft: 10,
                color: appColors.White,
              }}>
              <Text
                style={{
                  color: appColors.White,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Service Name :
              </Text>
            </View>
            {Platform.OS == "android" ? <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: '#252525',
                marginVertical: 5,
                paddingHorizontal: 5,
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="Enter your Services"
                placeholderTextColor={'grey'}
                value={editedServiceName}
                onChangeText={text => setEditedServiceName(text)}
              />
            </View> : <View
              style={{
                flex: 0.6,
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: '#252525',
                marginVertical: 5,
                paddingHorizontal: 5,
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="Enter your Services"
                placeholderTextColor={'grey'}
                value={editedServiceName}
                onChangeText={text => setEditedServiceName(text)}
              />
            </View>}

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
            title={'Save Service'}
            onPress={handleClickSaveService}
          />
        </View>

        <BottomSheet ref={refRBSheet} Height={120}>
          <ChooseImage
            refRBSheet={refRBSheet}
            setProfileImage={handleImageCaptured}
          />
        </BottomSheet>
      </Screen>
    </KeyboardAwareScrollView>

  );
};

export default Editservices;
