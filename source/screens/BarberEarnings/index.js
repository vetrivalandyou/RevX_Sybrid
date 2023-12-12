import React from 'react';
import {View, Text, Image, FlatList, AppRegistry} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../AppConstants/AppImages';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';

const BarberEarnings = () => {
  const BarberList = [
    {
      id: 1,
      title: '$40,65',
      name: 'Nathan Alexender',
      Imagesource: AppImages.bb1,
    },
    {
      id: 2,
      title: '$40,65',
      name: 'Janny Winkles',
      Imagesource: AppImages.bb1,
    },
    {
      id: 3,
      title: '$40,65',
      name: 'Annabol rehanna',
      Imagesource: AppImages.bb1,
    },
    {
      id: 4,
      title: '$40,65',
      name: 'Titus Kitamura',
      Imagesource: AppImages.bb1,
    },
    {
      id: 5,
      title: '$40,65',
      name: 'Nathan Alexender',
      Imagesource: AppImages.bb1,
    },

    {
      id: 6,
      title: '$40,65',
      name: 'Merill Kelvin',
      Imagesource: AppImages.bb1,
    },
    {
      id: 7,
      title: '$40,65',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
    {
      id: 8,
      title: '$40,65',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
    {
      id: 8,
      title: '$40,65',
      name: 'Jonsie Jack',
      Imagesource: AppImages.bb1,
    },
    {
      id: 8,
      title: '$40,65',
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
          backgroundColor: 'red',
          //  flex:1
          // height:300
        }}>
        <Image source={item.Imagesource} />

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'green'}}>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              backgroundColor: 'pink',
            }}>
            <Text style={{color: appColors.White, fontSize: 18, marginLeft: 5}}>
              {item.title}
            </Text>
            <Text style={{color: appColors.White, marginLeft: 5, fontSize: 12}}>
              {item.name}
            </Text>
          </View>
          <View style={{flex: 0.4, backgroundColor: 'blue'}}>
            <ButtonComponent style={{}} title={'View'} />
          </View>
        </View>
        {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ color: appColors.White, fontSize: 18, marginLeft: 10, backgroundColor:'green'}}>
                            {item.title}
                        </Text>
                        <Text style={{ color: appColors.White, marginLeft: 10, fontSize: 15 }}>
                            {item.name}
                        </Text>

                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonComponent style={{}}
                            title={"View"}
                        />
                    </View>
                </View>  */}
      </View>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black}}>
      <Header
        lefttIcoType={Icons.Ionicons}
        leftIcoName={'chevron-back'}
        headerText={'Barber Earnings'}
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
      <View
        style={{flex: 0.9, padding: 10, backgroundColor: appColors.AppBlue}}>
        <FlatList
          data={BarberList}
          renderItem={({item}) => <BarberSpecialistContainer item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </Screen>
  );
};
export default BarberEarnings;
