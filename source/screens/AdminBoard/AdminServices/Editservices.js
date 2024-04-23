import React, {useState} from 'react';
import {View, TextInput, Platform} from 'react-native';
import {PostRequest} from '../../../services/apiCall';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {LATEST_UPDATE, SUCCESS_CODE} from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';


const Editservices = ({route}) => {
  const navigation = useNavigation();
  const {item, userId} = route.params;
  const [editedServiceName, setEditedServiceName] = useState(
    item?.categoryName,
  );

  const handleClickSaveService = () => {
    const payload = {
      categoryId: item?.categoryId,
      categoryName: editedServiceName,
      operations: LATEST_UPDATE,
      createdBy: userId,
    };
    PostRequest(endPoint.SETUP_CATEGORIES_CU, payload)
      .then(res => {
        console.log(res?.data);
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
        <TextInput
          style={[
            styles.container,
            {color: 'white', paddingHorizontal: 25, fontSize: 15},
          ]}
          value={editedServiceName}
          onChangeText={text => setEditedServiceName(text)}
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
          title={'Save Service'}
          onPress={handleClickSaveService}
        />
      </View>
    </Screen>
  );
};

export default Editservices;
