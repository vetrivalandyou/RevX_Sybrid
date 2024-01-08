import React, { useRef } from 'react';
import { ImageBackground, Text, View, Image, Button } from 'react-native';
import Search from '../../components/atom/Search/Search';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import { AppImages } from '../../AppConstants/AppImages';
import AuthHeader from '../../components/molecules/AuthHeader';
import RBSheet from 'react-native-raw-bottom-sheet';
import { screenSize } from '../../components/atom/ScreenSize';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import LocationBottom from '../LocationBottom';
import constants from '../../AppConstants/Constants.json';

import ReferFriendsSheet from '../ReferFriendsSheet';
import LogoutBottom from '../LogoutBottom';
import constants from "../../AppConstants/Constants.json"
import { useNavigation } from '@react-navigation/native';

const LocationScreen = () => {

  const navigation = useNavigation();

  const refRBSheet = useRef();

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{ backgroundColor: appColors.Black, padding: 15, flex: 0.9 }}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height - 452}>
        <LocationBottom refRBSheet={refRBSheet} />
      </BottomSheet>

      <View style={{ flex: 0.1 }}>

        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Location'}
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
          headerTextViewStyle={{ alignItems: 'center' }}
          onPressRightIcon={() => navigation.navigate(constants.screen.Notification)}
        />
      </View>

      <View style={{ flex: 0.1 }}>
        <Search
          leaftIconType={Icons.Ionicons}
          leftIconName={'filter'}
          style={{ marginVertical: 11 }}
        />
      </View>

      <View style={{ flex: 0.8, borderRadius: 30 }}>
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: 'center',
            borderRadius: 30,
            backgroundColor: appColors.darkgrey,
          }}
          source={AppImages.mapImg}
          resizeMode="cover">
          <CustomIcon
            type={Icons.FontAwesome5}
            name={'map-marker-alt'}
            size={40}
            color={appColors.Goldcolor}
            onPress={() => refRBSheet.current.open()}
            style={{ alignSelf: 'center' }}
          />
        </ImageBackground>
      </View>
    </Screen>
  );
};

export default LocationScreen;
