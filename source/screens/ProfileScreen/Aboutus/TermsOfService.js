import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';

const TermsOfService = ({navigation}) => {
  data = [
    {
      id: 1,
      title: 'Type of date',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem odio enim ut nullam tortor, bibendum interdum. Varius at amet, dignissim morbi ac pulvinar eu blandit lorem. Est pellentesque bibendum quam odio ac, tortor sit. Sed tellus at tellus amet mi.',
    },
  ];
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
          // backgroundColor: appColors.Black,
          flexDirection: 'column',
          padding: 10,
        }}>
        <View>
          <FlatList
            data={data}
            renderItem={({item}) => <TermServices item={item} />}
          />
        </View>
      </View>
    </Screen>
  );
};

const TermServices = ({item}) => {
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
          color: '#C79646',
          fontSize: 20,
          fontWeight: 400,
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

export default TermsOfService;
