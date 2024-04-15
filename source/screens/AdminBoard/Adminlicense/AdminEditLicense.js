import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, ActivityIndicator } from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from "../../../AppConstants/Constants.json";
import appColors from '../../../AppConstants/appColors';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { PostRequest } from '../../../services/apiCall';
import { endPoint } from '../../../AppConstants/urlConstants';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';

const AdminEditLicense = ({ route, navigation }) => {
  const { description } = route.params;
  const [editedDescription, setEditedDescription] = useState(description?.[0]?.detail);
  const [editedTitle, setEditedTitle] = useState(description?.[0]?.title);
  const [isFocused, setIsFocused] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetails);
  };

  useEffect(() => {
    getAsyncData();
  }, []);

  const postSaveAboutUsType = payload => {
    setIsLoading(true); // Set loading to true before making the request
    PostRequest(endPoint.SAVE_ABOUTUS_TYPE, payload)
      .then(res => {
        setIsLoading(false); // Set loading to false after receiving response
        if (res?.data?.code === 200) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack(); // Navigate back after saving successfully
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
        }
      })
      .catch(err => {
        setIsLoading(false); // Set loading to false in case of error
        console.log('Error while saving data', err);
      });
  };

  const handleSave = () => {
    const payload = {
      aboutUsId: description?.[0]?.aboutUsId,
      aboutUsTypeId: description?.[0]?.aboutUsTypeId,
      title: editedTitle,
      detail: editedDescription,
      createdBy: userDetails?._RoleId,
    };
    postSaveAboutUsType(payload);
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
        {description.map((item, index) => (
          <View key={index} style={{ height: 'auto', backgroundColor: '#252525', borderRadius: 20, marginBottom: 20, alignContent: 'center', padding: 20, borderColor: isFocused ? '#C79646' : 'transparent', borderWidth: isFocused ? 1 : 0 }}>
            <Text style={{ color: '#C79646', fontSize: 20, fontWeight: '500', paddingBottom: 5 }}>Type of date</Text>
            <TextInput
              style={{ fontSize: 16, color: 'white', lineHeight: 20 }}
              multiline
              value={editedDescription}
              onChangeText={(text) => setEditedDescription(text)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        ))}
      </View>

      {isLoading && (
        <ActivityIndicator size="large" color="#C79646" style={{ position: 'absolute', alignSelf: 'center', marginTop: '50%' }} />
      )}

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{ backgroundColor: '#C79646', paddingVertical: Platform.OS == 'ios' ? 18 : 13, bottom: 1, position: 'absolute' }}
          title={'Save'}
          onPress={handleSave}
        />
      </View>
    </Screen>
  );
};

export default AdminEditLicense;

const styles = StyleSheet.create({
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});