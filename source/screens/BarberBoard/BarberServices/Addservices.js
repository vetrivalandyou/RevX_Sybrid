import { View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { PostRequest } from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import { endPoint, messages } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import Dropdown from '../../../components/molecules/Dropdown/Dropdown';
import {
  LATEST_SELECT,
  SUCCESS_CODE,
  pending,
} from '../../../AppConstants/appConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { Picker } from '@react-native-picker/picker';

const Addservices = ({ navigation, route }) => {
  const { userId } = route.params;
  const [servicesList, setServiceslist] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  console.log("ASasaSas")

  useEffect(() => {
    getParentService();
  }, []);

  const getParentService = () => {
    const payload = {
      categoryId: 0,
      categoryName: '',
      operations: LATEST_SELECT,
      createdBy: 0,
    };
    PostRequest(endPoint.GET_SETUP_CATEGORIES, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          console.log(res?.data?.data);
          setServiceslist(
            res?.data?.data?.map(x => ({
              ...x,
              label: x.categoryName,
              value: x.categoryId,
            })),
          );
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(res => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoading(false);
      });
  };

  const handleAddService = () => {
    if (selectedValue != '') {
      const payload = {
        barberId: userId,
        statusId: pending,
        ud_Barber_Categoryies_Type: [
          {
            barberServiceCategryId: parseInt(selectedValue),
          },
        ],
      };
      console.log('payload', payload);
      PostRequest(endPoint.REAPPLY_APPROVE_BARBER_SERVICE_CATEGORY, payload)
        .then(res => {
          if (res?.data?.code === SUCCESS_CODE) {
            SimpleSnackBar(res?.data?.message);
            navigation.goBack();
          } else {
            console.error('Error:', res?.data?.message);
            SimpleSnackBar(res?.data?.message, appColors.Red);
          }
        })
        .catch(err => {
          console.error('Error:', err);
          SimpleSnackBar(messages.WentWrong, appColors.Red);
        });
    }
  };

  return (
    <Screen
      viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Add Services'}
          logIn={'success'}
        />
      </View>
      <View style={{ flex: 0.8 }}>

        {Platform.OS == 'android' ? (
          <View style={styles.DropdownView}>
            <Dropdown
              label={'Select Service'}
              value={selectedValue}
              onValueChange={itemValue => setSelectedValue(itemValue)}
              dropDownData={servicesList}
              style={styles.dropDownStyle}
              custompickerstyle={{
                color: selectedValue ? appColors.White : appColors.AppLightGray,
              }}
            />
          </View>
        ) : (
          <View style={{ flex: 0.3, justifyContent: 'center', }}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 200, width: "100%", borderColor: appColors.Goldcolor, borderWidth: 1, borderRadius: 20, backgroundColor: appColors.Black }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              itemStyle={{ color: appColors.Goldcolor }}
            >
              <Picker.Item
                style={{ fontSize: 13, color: appColors.AppLightGray, backgroundColor: "white" }}
                label={'Select Service'}
                value={null}
              />
              {servicesList?.map((x, ind) => (
                <Picker.Item
                  style={{ fontSize: 13, color: appColors.White }}
                  key={ind}
                  label={x.label}
                  value={x.value}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
            opacity: selectedValue == '' ? 0.3 : 1,
          }}
          btnTextColor={{ color: 'white' }}
          title={'Request For Approval'}
          onPress={handleAddService}
        />
      </View>
    </Screen>
  );
};

export default Addservices;
