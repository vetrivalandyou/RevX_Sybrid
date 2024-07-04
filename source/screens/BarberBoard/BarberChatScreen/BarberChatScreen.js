import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Search from '../../../components/atom/Search/Search';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import profile from '../../../assets/barberImage1.png';
import constants from '../../../AppConstants/Constants.json';

import {AppImages} from '../../../AppConstants/AppImages';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {imageUrl} from '../../../AppConstants/urlConstants';
import { screenSize } from '../../../components/atom/ScreenSize';

const BarberChatScreen = () => {
  const {SupportingTables} = useSelector(state => state.CrudFormReducer);
  const navigation = useNavigation();

  const {BarberInboxList} = SupportingTables;

  console.log('Barber InboxListInboxListInboxList', BarberInboxList);

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{flex: 0.9, padding: 15, minHeight: screenSize.height, maxHeight: "auto"}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 55}>
        <View style={{flex: 0.08}}>
          <Header
            headerSubView={{marginHorizontal: 5}}
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Inbox'}
            rightIcoName={'bell'}
            onPressRightIcon={() =>
              navigation.navigate(constants.BarberScreen.NotificationScreen)
            }
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
        <View style={{flex: 0.09, minHeight: 60, maxHeight: 60}}>
          <Search />
        </View>
        <View style={{flex: 0.71}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={BarberInboxList}
            renderItem={({item}) => (
              <Messages item={item} navigation={navigation} />
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const Messages = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(constants.BarberScreen.BarberChat, {
          profileData: item,
        })
      }
      style={{
        flex: 1,
        backgroundColor: appColors.darkgrey,
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
      }}>
      <View
        style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{uri: `${imageUrl}${item?.CustomerProfileImage}`}}
          resizeMode="cover"
          style={{width: 56, height: 56, borderRadius: 100}}
        />
      </View>

      <View
        style={{flex: 0.65, paddingHorizontal: 10, flexDirection: 'column'}}>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
            }}>
            {item.CustomerName}
          </Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
            {item.LastMessage}
          </Text>
        </View>
      </View>

      <View style={{flex: 0.2}}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: appColors.Goldcolor,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 12,
              }}>
              {item.NewMessage}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: appColors.White,
              fontSize: 12,
            }}>
            {item.LastMessageTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BarberChatScreen;
