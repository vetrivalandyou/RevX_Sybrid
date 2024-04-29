import React, {useState} from 'react';
import {View, TextInput, Platform} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {LATEST_INSERT, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const Addservices = ({route}) => {
  const navigation = useNavigation();
  const {userId} = route.params;
  const [newService, setNewService] = useState('');

  const handleAddService = () => {
    const payload = {
      categoryId: 0,
      categoryName: newService.trim(),
      operations: LATEST_INSERT,
      createdBy: userId,
    };
    console.log('payloadf sadsfdsf', payload);
    PostRequest(endPoint.SETUP_CATEGORIES_CU, payload)
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
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center'}}>
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
    </Screen>
  );
};

export default Addservices;
