import React from 'react';

import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import Search from '../../../components/atom/Search/Search';
import {AppImages} from '../../../AppConstants/AppImages';
import appColors from '../../../AppConstants/appColors';
import {screenSize} from '../../../components/atom/ScreenSize';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';

const AdminInbox = () => {
  const navigation = useNavigation();

  const chatData = [
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
      name: 'Barbella Inova',
      profileimage: AppImages.chatfive,
      message: 'Hey',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 3,
      name: 'Barbella Inova',
      profileimage: AppImages.chatsix,
      message: 'Available?',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 4,
      name: 'Barbella Inova',
      profileimage: AppImages.chatthree,
      message: 'Hello',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 5,
      name: 'Barbella Inova',
      profileimage: AppImages.chatfour,
      message: 'Coming',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 6,
      name: 'Barbella Inova',
      profileimage: AppImages.chattwo,
      message: 'Nice to meet you',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 7,
      name: 'Barbella Inova',
      profileimage: AppImages.chatone,
      message: 'Take care',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 8,
      name: 'Barbella Inova',
      profileimage: AppImages.chatthree,
      message: 'See you again',
      messagecount: '2',
      messagetime: '20:00',
    },
    {
      id: 9,
      name: 'Barbella Inova',
      profileimage: AppImages.chatfour,
      message: 'Awesome!',
      messagecount: '2',
      messagetime: '20:00',
    },
  ];

  const ChatContainer = ({item, onPress}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: appColors.darkgrey,
          borderRadius: 50,
          height: screenSize.height / 10.5,
          marginVertical: 8,
        }}
        onPress={onPress}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            borderRadius: 50,
          }}>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={item.profileimage} style={{}} />
          </View>

          <View style={{flex: 0.75, justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.5,
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 10,
                    color: appColors.White,
                    fontWeight: '400',
                  }}>
                  {item.name}
                </Text>
              </View>
              <View style={{flex: 0.2, justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 50,
                    height: '50%',
                    backgroundColor: appColors.Goldcolor,
                    width: '35%',
                    alignItems: 'center',
                    marginTop: 15,
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: appColors.White, fontSize: 12}}>
                    {item.messagecount}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', flex: 0.5}}>
              <View style={{flex: 0.78}}>
                <Text style={{fontSize: 13, color: appColors.White}}>
                  {item.message}
                </Text>
              </View>
              <View style={{flex: 0.22}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  {item.messagetime}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen viewStyle={styles.mainContainer} statusBarColor={appColors.Black}>
      {/* Header View */}
      <View style={styles.HeaderView}>
        <Header
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
          headerText={'Inbox'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          rightIcoSize={20}
          headerTextViewStyle={{alignItems: 'center'}}
        />
      </View>

      {/* Search Bar View */}
      <View style={styles.searchBarView}>
        <Search style={{marginVertical: 8}} />
      </View>

      {/* FlatList  View */}

      <View style={styles.ChatContainer}>
        <FlatList
          data={chatData}
          renderItem={({item}) => (
            <ChatContainer
              item={item}
              onPress={() =>
                navigation.navigate(constants.AdminScreens.AdminChat)
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </Screen>
  );
};

export default AdminInbox;
