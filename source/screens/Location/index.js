import React from 'react';
import {ImageBackground, Text, View, Image} from 'react-native';
import Search from '../../components/atom/Search/Search';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import {AppImages} from '../../AppConstants/AppImages';

const LocationScreen = () => {
  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black}}
      >

        <Header
        lefttIcoType={Icons.Ionicons}
        leftIcoName={'chevron-back'}
        headerText={'Location'}
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

     
      <View style={{flex: 0.8, backgroundColor: appColors.Black, padding: 15}}>
        <Search />
        <View style={{flex: 1, borderRadius: 30, marginTop: 10}}>
          <ImageBackground
            style={{
              flex: 1,
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: appColors.darkgrey,
            }}
            source={AppImages.mapImg}
            resizeMode="cover"></ImageBackground>
        </View>
      </View>
    </Screen>
  );
};

export default LocationScreen;
