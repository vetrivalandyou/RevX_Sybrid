import React, { useRef } from 'react';
import { ImageBackground, Text, View, Image, Button } from 'react-native';
import Search from '../../components/atom/Search/Search';
import Header from '../../components/molecules/Header';
import CustomIcon, { Icons } from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import { AppImages } from '../../AppConstants/AppImages';
import AuthHeader from '../../components/molecules/AuthHeader';
import RBSheet from "react-native-raw-bottom-sheet";
import { screenSize } from "../../components/atom/ScreenSize"
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import LocationBottom from '../LocationBottom';
import ReferFriendsSheet from '../ReferFriendsSheet';
import LogoutBottom from '../LogoutBottom';


const LocationScreen = () => {
  
  const refRBSheet = useRef();


  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{ backgroundColor: appColors.Black, padding: 15, flex: 0.9 }}
    >


      <BottomSheet ref={refRBSheet} Height={screenSize.height - 452}>
        <LocationBottom refRBSheet={refRBSheet} />
      </BottomSheet>
      {/* <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <AuthHeader/>
      </RBSheet>
    </View> */}
      {/* <BottomSheet ref ={refRBSheet} >
      <AuthHeader/>

      </BottomSheet> */}




      <View style={{ flex: 0.1 }}>
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
          headerTextViewStyle={{alignItems:"center"}}
        />


      </View>


      <View style={{ flex: 0.1 }}>
        <Search />
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
          <CustomIcon type={Icons.FontAwesome5} name={"map-marker-alt"} size={40} color={appColors.Goldcolor}
            onPress={() => refRBSheet.current.open()} />

        </ImageBackground>
      </View>
    </Screen>
  );
};

export default LocationScreen;
