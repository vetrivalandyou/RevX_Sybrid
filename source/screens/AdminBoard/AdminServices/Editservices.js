import React, {useRef, useState} from 'react';
import {View, TextInput, Platform, TouchableOpacity, Image} from 'react-native';
import {PostRequest} from '../../../services/apiCall';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {endPoint, imageUrl, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {LATEST_UPDATE, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import ChooseImage from '../../../components/molecules/ChooseImage';
import {generateRandomNumber} from '../../../functions/AppFunctions';
import {screenSize} from '../../../components/atom/ScreenSize';

const Editservices = ({route}) => {
  const navigation = useNavigation();
  const {item, userId} = route.params;
  const refRBSheet = useRef();
  const [editedServiceName, setEditedServiceName] = useState(
    item?.categoryName,
  );
  const [changedImage, setChangedImage] = useState('');
  const [profileImage, setProfileImage] = useState(`${item?.serviceImage}`);

  const handleClickSaveService = () => {
    const formData = new FormData();
    formData.append('categoryId', item?.categoryId);
    formData.append('operations', LATEST_UPDATE);
    formData.append('CategoryName', editedServiceName.trim());
    formData.append('createdBy', userId);
    formData.append('UserIP', '::1');
    if (changedImage == '') {
      formData.append('ServiceImagePath', profileImage);
      // console.log('profileImage', profileImage);
    } else {
      formData.append('ServiceImage', {
        uri: changedImage?.path,
        name: `${generateRandomNumber()}.jpg`,
        type: changedImage?.mime,
      });
    }

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
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Service'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <View style={{flex: 0.3}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                width: '1600%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
                backgroundColor: ' appColors.Black',
              }}>
              {changedImage != '' ? (
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
                  source={{uri: `${imageUrl}${profileImage}`}}
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
        <View style={{flex: 0.66}}>
          <View style={styles.textFieldView}>
            <TextInput
              style={[
                styles.container,
                {color: 'white', paddingHorizontal: 25, fontSize: 15},
              ]}
              value={editedServiceName}
              onChangeText={text => setEditedServiceName(text)}
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
  );
};

export default Editservices;
