import React from 'react';
import {View, Text, Image, FlatList, AppRegistry} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../AppConstants/AppImages';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';

const BarberSpecialist = ({navigation}) => {
  const BarberList = [
    {
      id: 1,
      title: 'Senior Barber',
      name: 'Nathan Alexender',
      Imagesource: AppImages.bb1,
    },
    {
      id: 2,
      title: 'Hair Specialist',
      name: 'Janny Winkles',
      Imagesource: AppImages.bb1,
    },
    {
      id: 3,
      title: 'Makeup Artist',
      name: 'Annabol rehanna',
      Imagesource: AppImages.bb1,
    },
    {
      id: 4,
      title: 'Senior Barber',
      name: 'Titus Kitamura',
      Imagesource: AppImages.bb1,
    },
    {
      id: 5,
      title: 'Senior Barber',
      name: 'Nathan Alexender',
      Imagesource: AppImages.bb1,
    },

    {
      id: 6,
      title: 'Hair Stylish',
      name: 'Merill Kelvin',
      Imagesource: AppImages.bb1,
    },
    {
      id: 7,
      title: 'Senior Barber',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
    {
      id: 8,
      title: 'Nathan Alexender',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
    {
      id: 9,
      title: 'Nathan Alexender',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
    {
      id: 10,
      title: 'Nathan Alexender',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
  ];
  const BarberSpecialistContainer = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: appColors.darkgrey,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderRadius: 70,
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Image source={item.Imagesource} style={{}} />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.8, justifyContent: 'center'}}>
            <Text style={{color: appColors.White, fontSize: 18, marginLeft: 5}}>
              {item.title}
            </Text>
            <Text style={{color: appColors.White, marginLeft: 5, fontSize: 12}}>
              {item.name}
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <ButtonComponent style={{width: '98%'}} title={'View'} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Barber Special List'}
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

      <View style={{flex: 0.9}}>
        <FlatList
          data={BarberList}
          renderItem={({item}) => <BarberSpecialistContainer item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </Screen>
  );
};
export default BarberSpecialist;
