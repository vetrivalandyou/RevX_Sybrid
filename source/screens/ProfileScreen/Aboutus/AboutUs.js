import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import { endPoint } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import { GetRequest } from '../../../services/apiCall';

const AboutUs = ({ navigation }) => {
  const [dropDownData, setDropDownData] = useState([]);

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
      });
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  const handleNavigation = (aboutUsId) => {
    switch (aboutUsId) {
      case 360:
        navigation.navigate(constants.screen.TermsOfService, { aboutUsId });
        break;
      case 361:
        navigation.navigate(constants.screen.PrivacyPolicy, { aboutUsId });
        break;
      case 362:
        navigation.navigate(constants.screen.License, { aboutUsId });
        break;
      default:
    
        break;
    }
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{ backgroundColor: appColors.Black, padding: 10 }}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'About Us'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
          }
          rightIcoSize={20}
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

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 3,
        }}>
        {dropDownData.map(item => (
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
              type={Icons.AntDesign}
              name={'caretright'}
              color={appColors.Goldcolor}
              size={18}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export default AboutUs;