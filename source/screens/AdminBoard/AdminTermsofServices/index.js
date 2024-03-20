import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from "../../../AppConstants/Constants.json";
import appColors from '../../../AppConstants/appColors';
import { GetRequest } from '../../../services/apiCall';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';

const AdminTermsofServices = ({ navigation, route }) => {
  const { aboutUsId } = route.params;
  const [termsServicesData, setTermsServicesData] = useState([]);

  const getTermsOfServices = () => {
    GetRequest(`Common/Get_AboutUsType?aboutUsTypeId=${aboutUsId}`)
      .then(res => {
        if (res?.data?.code === 200) {
          setTermsServicesData(res?.data?.data);
        } else {
          console.log(res?.data?.message || 'Failed to fetch data');
        }
      })
      .catch(err => {
        console.log('Failed to fetch data', err);
      });
  };

  useEffect(() => {
    getTermsOfServices();
  }, []);

  const handleEdit = () => {
    navigation.navigate(constants.AdminScreens.AdminEditTermsOfServices, {
      description: termsServicesData,
    });
  };

  return (
    <Screen viewStyle={{ flex: 1, backgroundColor: appColors.Black, padding: 15 }} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Terms of Service'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() => navigation.navigate(constants.AdminScreens.AdminNotification)}
          leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
        />
      </View>

      <View style={{ flex: 0.8, paddingVertical: 5 }}>
        <FlatList
          data={termsServicesData}
          renderItem={({ item, index }) => <TermServices item={item} index={index} />}
        />
      </View>

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{ backgroundColor: '#C79646', paddingVertical: Platform.OS == 'ios' ? 18 : 13 }}
          title={'Edit'}
          onPress={handleEdit}
        />
      </View>
    </Screen>
  );
};

const TermServices = ({ item, index }) => {
  return (
    <View style={{ height: 'auto', backgroundColor: '#252525', borderRadius: 20, marginBottom: 20, alignContent: 'center', padding: 20 }}>
      <Text style={{ color: '#C79646', fontSize: 20, fontWeight: '500', paddingBottom: 10 }}>{index + 1}. {item.title}</Text>
      <Text style={{ fontSize: 16, color: 'white', lineHeight: 20 }}>{item.detail}</Text>
    </View>
  );
};

export default AdminTermsofServices;

const styles = StyleSheet.create({
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});