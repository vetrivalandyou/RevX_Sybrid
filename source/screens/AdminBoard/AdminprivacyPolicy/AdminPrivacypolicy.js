import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import Screen from '../../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../../components/atom/ScreenSize';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';

const AdminPrivacypolicy = ({navigation}) => {
  const [Termsdescription, setTermdescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem odio enim ut nullam tortor, bibendum interdum. Varius at amet, dignissim morbi ac pulvinar eu blandit lorem. Est pellentesque bibendum quam odio ac, tortor sit. Sed tellus at tellus amet mi.',
  );

  data = [
    {
      id: 1,
      title: '1: Type of data We Collect',
      description: Termsdescription,
    },
    {
      id: 2,
      title: '2: Use Of Personal Data',
      description: Termsdescription,
    },

    {
      id: 3,
      title: '3: Disclouser Of Your Personal Data',
      description: Termsdescription,
    },
  ];
  return (
    <Screen viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
         headerSubView={{ marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Privacy Policy'}
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

      <View
        style={{
          flex: 0.9,

          paddingVertical: 5,
        }}>
        <FlatList
          data={data}
          renderItem={({item}) => <Privacylist item={item} />}
        />
      </View>
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: 13,
            bottom: 1,
            position: 'absolute',
          }}
          title={'Edit'}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.AdminEditPrivacypolicy, {
              description: Termsdescription, // Pass the current description to the edit screen
              // Pass the function to update the description
            })
          }
        />
      </View>
    </Screen>
  );
};

const Privacylist = ({item}) => {
  return (
    <View
      style={{
        height: 'auto',

        backgroundColor: '#252525',
        borderRadius: 20,
        marginBottom: 20,

        alignContent: 'center',
        padding: 20,
      }}>
      <Text
        style={{
          color: '#C79646',
          fontSize: 17,
          fontWeight: '500',
          paddingBottom: 10,
        }}>
        {item.title}
      </Text>
      <Text style={{fontSize: 16, color: 'white', lineHeight: 20}}>
        {item.description}
      </Text>
    </View>
  );
};

export default AdminPrivacypolicy;

const styles = StyleSheet.create({
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
