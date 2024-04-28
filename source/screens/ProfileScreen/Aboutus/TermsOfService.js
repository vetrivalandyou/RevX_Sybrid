import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import {GetRequest} from '../../../services/apiCall';

const TermsOfService = ({navigation, route}) => {
  const {aboutUsId} = route.params;
  const [TermsServicesData, seTermsServicesData] = useState([]);

  useEffect(() => {
    getTermsOfServices();
  }, []);

  const getTermsOfServices = () => {
    GetRequest(`Common/Get_AboutUsType?aboutUsTypeId=${aboutUsId}`)
      .then(res => {
        console.log('data.........', res?.data);
        if (res?.data?.code === 200) {
          console.log(res?.data);
          seTermsServicesData(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message || 'Failed to fetch data');
        }
      })
      .catch(err => {
        SimpleSnackBar('Failed to fetch data');
      });
  };

  console.log("TermsServicesData",TermsServicesData)

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 10}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Terms of Service'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
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

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 10,
        }}>
        <View>
          <FlatList
            data={TermsServicesData}
            renderItem={({item, index}) => (
              <TermServices item={item} index={index} />
            )}
          />
        </View>
      </View>
    </Screen>
  );
};

const TermServices = ({item, index}) => {
  return (
    <View
      style={{
        flex: 0.9,
        backgroundColor: appColors.darkgrey,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'column',
        alignContent: 'center',
        padding: 25,
      }}>
      <Text
        style={{
          color: appColors.Goldcolor,
          fontSize: 20,
          fontWeight: 400,
          paddingBottom: 10,
        }}>
          Terms and Services
        {/* {index + 1}. {item.title} */}
      </Text>
      <Text style={{fontSize: 16, color: 'white', lineHeight: 20}}>
        {item.detail}
      </Text>
    </View>
  );
};

export default TermsOfService;
