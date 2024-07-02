import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../AppConstants/appColors';
import SignalRService from '../../services/SignalRService';
import Sizes from '../../AppConstants/Sizes';
import {screenSize} from '../../components/atom/ScreenSize';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import {imageUrl} from '../../AppConstants/urlConstants';
import {getAsyncItem} from '../../utils/SettingAsyncStorage';
import constants from '../../AppConstants/Constants.json';

const UserChat = ({route, navigation}) => {
  const {profileData} = route?.params || 0;
  const [isFocused, setFocused] = React.useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    // if(isFocused){
    console.log('BarberID, CustomerIDBarberID, CustomerID');
    getAsyncData();
    // }
  }, []);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    console.log('userDetailsuserDetails', userDetails);
    setuserDetails(userDetails);
    connectToSignalR(userDetails);
  };

  const connectToSignalR = async userDetails => {
    // SignalRService.joinChat(
    //   0,
    //   profileData?.BarbarID,
    //   userDetails?.userId,
    //   profileData?.MeetingID,
    // );

    SignalRService.onGetmeetingid(
      (UserID, message, S_ID, R_ID, S_ProfilePicture, R_ProfilePicture) => {
        // let parsedData = JSON.parse(json);
        console.log(
          'onGetmeetingid parsedData ---- ',
          UserID,
          message,
          S_ID,
          R_ID,
          S_ProfilePicture,
          R_ProfilePicture,
        );
      },
    );

    SignalRService.onReceiveMessage(
      (UserID, message, S_ID, R_ID, S_ProfilePicture, R_ProfilePicture) => {
        console.log(
          'onReceiveMessage',
          UserID,
          message,
          S_ID,
          R_ID,
          S_ProfilePicture,
          R_ProfilePicture,
        );
        console.log('parsedDataparsedDataparsedData-----------', message);
        setAllMessages(allMessages => [{message: message}, ...allMessages]);
      },
    );
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  console.log('profileData', profileData);
  const sendMessage = async message => {
    console.log('message', message, profileData?.BarbarID.toString());
    await SignalRService.sendMessage(message, profileData?.BarbarID.toString());
    setMessage('');
  };

  const ChatDataContainer = ({item, index, onPress}) => {
    return (
      <View
        style={[
          styles.chatContainer,
          {
            alignSelf:
              item?.S_ID == userDetails?.userId ? 'flex-end' : 'flex-start',
          },
        ]}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            // Handle onPress if needed
          }}>
          <View key={index} style={{flexDirection: 'row'}}>
            <View style={{flex: 0.85}}>
              <Text style={{color: appColors.White}}>{item.message}</Text>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text style={{color: appColors.White, fontSize: 9}}>
                {item.Time_}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Screen viewStyle={styles.mainContainer} statusBarColor={appColors.Black}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 55}>
        <View style={[ticketStyle.headerMainView]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[ticketStyle?.headerLeft]}>
            <BackIcon name="arrow-back-ios" color={appColors.White} size={20} />
          </TouchableOpacity>
          <View style={ticketStyle.headerRight}>
            <View style={ticketStyle.headerImageView}>
              <Image
                style={ticketStyle.imageStyle}
                source={{uri: `${imageUrl}${profileData?.ProfileImage}`}}
              />
            </View>
            <TouchableOpacity style={{flex: 0.8}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                }}>
                <Text style={ticketStyle.chatNameText}>
                  {profileData?.UserName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{flex: 0.9}}>
            <FlatList
              data={allMessages}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ChatDataContainer item={item} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              inverted={true}
            />
          </View>
          <View
            style={{
              flex: 0.1,
              minHeight: 70,
              maxHeight: 70,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderRadius: 20,
                height: '80%',
                paddingHorizontal: 15,
                backgroundColor: appColors.darkgrey,
                borderColor: 'black',
                borderWidth: 1,
                color: appColors.White,
              }}>
              <View style={{flex: 0.85, justifyContent: 'center'}}>
                <TextInput
                  placeholder="Type Message..."
                  style={{height: '70%'}}
                  placeholderTextColor={appColors.White}
                  onChangeText={setMessage}
                  value={message}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </View>

              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (message.trim() !== '') {
                      sendMessage(message);
                    }
                  }}>
                  <CustomIcon
                    type={Icons.Ionicons}
                    name={'send'}
                    size={18}
                    color={appColors.White}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};
export default UserChat;

const ticketStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.Black,
  },
  headerMainView: {
    minHeight: 70,
    maxHeight: 70,
    flexDirection: 'row',
    backgroundColor: appColors.Black,
  },
  headerLeft: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerRight: {
    flex: 0.9,
    flexDirection: 'row',
  },
  headerImageView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  chatNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.White,
  },
  currentStatusText: {fontSize: Sizes.small, color: appColors.White},
  chatBubbleMainView: {
    width: screenSize.width / 1.4,
    height: 'auto',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  chatMessageTextView: {
    width: screenSize.width / 1.5,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'flex-start',
  },
  chatMessageText: {
    fontSize: Sizes.medium,
    fontWeight: '500',
    color: appColors.White,
  },
  chatMessageTimeView: {
    width: screenSize.width / 1.55,
    height: screenSize.height / 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  chatMessageTimeText: {
    fontSize: Sizes.small,
    fontWeight: '500',
    color: 'grey',
  },
  chatBoxBubble: {
    width: '95%',
    height: 'auto',
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: '#232b2b',
  },
  sendButtonMainView: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonSubView: {
    padding: 10,
    backgroundColor: appColors.Goldcolor,
    borderRadius: 100,
  },
});
