import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {LATEST_INSERT, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import ChooseImage from '../../../components/molecules/ChooseImage';
import {AppImages} from '../../../AppConstants/AppImages';
import {generateRandomNumber} from '../../../functions/AppFunctions';
import {screenSize} from '../../../components/atom/ScreenSize';

const Addservices = ({route}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const {userDetails} = route?.params || {};
  const [newService, setNewService] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleAddService = () => {
    if (!profileImage) {
      SimpleSnackBar('Please select an image.', appColors.Red);
      return; // Exit function early if no image is selected
    }
    const formData = new FormData();
    formData.append('categoryId', 0);
    formData.append('operations', LATEST_INSERT);
    formData.append('CategoryName', newService.trim());
    formData.append('createdBy', userDetails?.userId);
    formData.append('UserIP', '::1');
    formData.append('ServiceImage', {
      uri: profileImage?.path,
      name: `${generateRandomNumber()}.jpeg`,
      type: profileImage?.mime,
    });

    console.log("handleAddService --- FormData",formData)
    console.log(" profileImage?.path",  profileImage?.path)
    console.log("profileImage?.mime",  profileImage?.mime)
    PostRequest(endPoint.SETUP_CATEGORIES_CU, formData)
      .then(res => {
        if (res?.data?.code === SUCCESS_CODE) {
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
    setProfileImage(image);
    refRBSheet.current.close();
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
          headerText={'Add Service'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <View style={{flex: 0.2}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                width: '28%',
                height: '82%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {profileImage?.path ? (
                <Image
                  source={{uri: profileImage?.path}}
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
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              marginLeft: 10,
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
          <View
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
              value={newService}
              onChangeText={text => setNewService(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: 'red',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
            opacity: newService.trim() !== '' ? 1 : 0.3,
          }}
          btnTextColor={{color: 'white'}}
          title={'Save Service'}
          disable={newService.trim() !== '' ? false : true}
          onPress={handleAddService}
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

export default Addservices;
