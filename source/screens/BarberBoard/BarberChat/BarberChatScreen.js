import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Search from '../../../components/atom/Search/Search';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import profile from '../../../assets/barberImage1.png';

import {AppImages} from '../../../AppConstants/AppImages';

const BarberChatScreen = ({navigation}) => {
  chat = [
    {
      id: 1,
      name: 'Barbella Inova',
      profileimage: AppImages.chatone,
      message: 'Awesome!',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 2,
      name: 'Janny Winkles',
      profileimage: AppImages.chattwo,
      message: 'Omg this is amazing!',
      messagecount: '3',
      messagetime: '20:00',
    },
    {
      id: 3,
      name: 'The classic Cut',
      profileimage: AppImages.chatthree,
      message: 'Wow this is really epic!',
      messagecount: '3',
      messagetime: '20:00',
    },
    {
      id: 4,
      name: 'Oh La La Barber',
      profileimage: AppImages.chatfour,
      message: 'How are you?',
      messagecount: '3',
      messagetime: '20:00',
    },
    {
      id: 5,
      name: 'Nathan Alexender',
      profileimage: AppImages.chatfive,
      message: 'Great!',
      messagecount: '3',
      messagetime: '20:00',
    },
    {
      id: 6,
      name: 'The classic Cut',
      profileimage: AppImages.chatthree,
      message: 'Wow this is really epic!',
      messagecount: '3',
      messagetime: '20:00',
    },
    {
      id: 7,
      name: 'Janny Winkles',
      profileimage: AppImages.chatfive,
      message: 'Wow this is really epic!',
      messagecount: '3',
      messagetime: '20:00',
    },
  ];
  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Inbox'}
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
      <View style={{flex: 0.09}}>
        <Search />
      </View>
      <View style={{flex: 0.7}}>
        <FlatList
          data={chat}
          renderItem={({item}) => <Messages item={item} />}
        />
      </View>
    </Screen>
  );
};

const Messages = ({item}) => {
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: appColors.darkgrey,
          borderRadius: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View style={{flex: 0.1}}>
          <Image
            source={item.profileimage}
            resizeMode="cover"
            style={{width: 56, height: 56}}
          />
        </View>

        <View style={{flex: 0.6, flexDirection: 'column'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 400,
              marginBottom: 5,
            }}>
            {item.name}
          </Text>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
            {item.message}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: 'column',
            // marginVertical: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: appColors.White,
              fontSize: 14,
              marginLeft: 5,
              backgroundColor: appColors.Goldcolor,
              borderRadius: 60,
              paddingHorizontal: 10,
              paddingVertical: 4,
              marginBottom: 4,

              // paddingHorizontal: 10,
            }}>
            {item.messagecount}
          </Text>
          <Text
            style={{
              color: appColors.White,
              fontSize: 14,
              marginLeft: 5,
            }}>
            {item.messagetime}
          </Text>
          {/* <Entypo
                name="chevron-right"
                size={20}
                color={appColors.Goldcolor}
              /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BarberChatScreen;
