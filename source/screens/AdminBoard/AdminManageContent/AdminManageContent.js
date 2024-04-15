import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import { screenSize } from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import CustomIcon, { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import appColors from '../../../AppConstants/appColors';
import { GetRequest } from '../../../services/apiCall';
import { endPoint } from '../../../AppConstants/urlConstants';

const AdminManageContent = ({ navigation }) => {
  const [dropDownData, setDropDownData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAboutUs = () => {
    GetRequest(endPoint.GET_ABOUT_US)
      .then(res => {
        console.log('data.........', res?.data);
        if (res?.data?.code === 200) {
          console.log(res?.data);
          setDropDownData(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message || 'Failed to fetch data');
        }
      })
      .catch(err => {
        SimpleSnackBar('Failed to fetch data');
      })
      .finally(() => setLoading(false)); // Set loading to false when request is complete
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  const handleNavigation = (aboutUsId) => {
    switch (aboutUsId) {
      case 360:
        navigation.navigate(constants.AdminScreens.AdminTermsofServices, { aboutUsId });
        break;
      case 361:
        navigation.navigate(constants.AdminScreens.AdminPrivacypolicy, { aboutUsId });
        break;
      case 362:
        navigation.navigate(constants.AdminScreens.AdminLicensee, { aboutUsId });
        break;
      default:
        break;
    }
  };

  return (
    <Screen viewStyle={{ flex: 1, backgroundColor: appColors.Black, padding: 15 }} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Manage Content'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', padding: 3 }}>
        {loading ? ( 
          <ActivityIndicator style={styles.loader} color={appColors.White} size="large" />
        ) : (
          dropDownData.map(item => (
            <TouchableOpacity
              key={item.id || item.aboutUsId}
              style={{
                flex: 0.1,
                backgroundColor: appColors.darkgrey,
                borderRadius: 16,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
              onPress={() => handleNavigation(item.aboutUsId)}>
              <Text style={{ color: 'white', fontSize: 17, fontWeight: '400' }}>
                {item.aboutUs}
              </Text>
              <CustomIcon
                type={Icons.FontAwesome5}
                name={'edit'}
                color={appColors.White}
                size={18}
              />
            </TouchableOpacity>
          ))
        )}
      </View>
    </Screen>
  );
};

export default AdminManageContent;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});