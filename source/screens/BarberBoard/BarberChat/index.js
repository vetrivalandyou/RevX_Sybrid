import React, { useEffect, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import SignalRService from '../../../services/SignalRService';
import Sizes from '../../../AppConstants/Sizes';
import { screenSize } from '../../../components/atom/ScreenSize';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import { endPoint, imageUrl } from '../../../AppConstants/urlConstants';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import constants from '../../../AppConstants/Constants.json';
import { debounce } from '../../../functions/AppFunctions';
import { PostRequest } from '../../../services/apiCall';

const BarberChat = ({ route, navigation }) => {
  const { profileData } = route?.params || 0;
  const [isFocused, setFocused] = React.useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userDetails, setuserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    console.log('BarberID, CustomerIDBarberID, CustomerID');
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    console.log('userDetailsuserDetails', userDetails);
    setuserDetails(userDetails);
    getPreviousMessages()
    connectToSignalR(userDetails);
  };

  const getPreviousMessages = () => {
    if (hasMore == false) return null
    const payload = {
      operationID: 8,
      parameterID: profileData?.MessageID,
      barberID: 0,
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    }
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then((res) => {
        console.log("res", res?.data);
        if (res?.data?.Table?.length > 0) {
          setAllMessages(allMessages => [...allMessages, ...res?.data?.Table,]);
          setIsLoading(false)
          setPageNumber(pageNumber + 1)
        } else {
          setHasMore(false)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.log("err", err)
        setIsLoading(false)
      })
  }

  const connectToSignalR = async userDetails => {
    SignalRService.onGetmeetingid(json => {
      let parsedData = JSON.parse(json);
      console.log('onGetmeetingid parsedData ---- ', parsedData);
    });

    SignalRService.onReceiveMessage(
      (UserID, message, S_ID, R_ID, S_ProfilePicture, R_ProfilePicture) => {
        console.log(
          'onReceiveMessage user',
          UserID,
          message,
          S_ID,
          R_ID,
          S_ProfilePicture,
          R_ProfilePicture,
        );
        console.log('parsedDataparsedDataparsedData-----------', message);
        setAllMessages(allMessages => [{ Message: message, PSenderID: S_ID, PReceiverID: R_ID }, ...allMessages]);
      },
    );

    // SignalRService.onReceiveMessage(
    //   (UserID, message, S_ID, R_ID, S_ProfilePicture, R_ProfilePicture) => {
    //     console.log(
    //       'onReceiveMessage Barber',
    //       UserID,
    //       message,
    //       S_ID,
    //       R_ID,
    //       S_ProfilePicture,
    //       R_ProfilePicture,
    //     );
    //     console.log('parsedDataparsedDataparsedData-----------', message);
    //     setAllMessages(allMessages => [{message: message}, ...allMessages]);
    //   },
    // );
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const sendMessage = async message => {
    console.log(
      'Barber Chat Screen Send Message Data ---------------> ',
      message,
      profileData?.CustomerID.toString(),
      userDetails?.userId.toString(),
      profileData?.MeetingID.toString(),
    );
    await SignalRService.sendMessage(
      message,
      profileData?.CustomerID.toString(),
      userDetails?.userId.toString(),
      profileData?.MeetingID.toString(),
      userDetails?.userId.toString(),
    );
    setMessage('');
  };

  const ChatDataContainer = ({ item, index, onPress }) => {
    return (
      <View
        style={[
          styles.chatContainer,
          {
            alignSelf:
              item?.PSenderID == userDetails?.userId ? 'flex-end' : 'flex-start',
            backgroundColor:
              item?.S_ID == userDetails?.userId
                ? appColors.darkgrey
                : appColors.charcolgrey,
          },
        ]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            // Handle onPress if needed
          }}>
          <View key={index} style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.85 }}>
              <Text style={{ color: appColors.White }}>{item.Message}</Text>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text style={{ color: appColors.White, fontSize: 9 }}>
                {item.Time_}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onClickBack = async () => {
    await SignalRService.onRemoveUserFromGroup(
      userDetails?.userId.toString(),
      profileData?.BarbarID.toString(),
    );
    navigation.goBack()
  }

  const renderFooter = () => {
    if (hasMore == false) return null;
    return (
      <View style={{ margin: 10 }}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    );
  };

  const handleLoadMore = debounce(() => {
    console.log("LoadMore")
    if (hasMore == true) {
      getPreviousMessages();
    }
  }, 300);

  return (
    <Screen viewStyle={styles.mainContainer} statusBarColor={appColors.Black}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 55}>
        <View style={[ticketStyle.headerMainView]}>
          <TouchableOpacity
            onPress={() => onClickBack()}
            style={[ticketStyle?.headerLeft]}>
            <BackIcon name="arrow-back-ios" color={appColors.White} size={20} />
          </TouchableOpacity>
          <View style={ticketStyle.headerRight}>
            <View style={ticketStyle.headerImageView}>
              <Image
                style={ticketStyle.imageStyle}
                source={{
                  uri: `${imageUrl}${profileData?.CustomerProfileImage}`,
                }}
              />
            </View>
            <TouchableOpacity style={{ flex: 0.8 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                }}>
                <Text style={ticketStyle.chatNameText}>
                  {profileData?.CustomerName}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <FlatList
              data={allMessages}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ChatDataContainer item={item} index={index} />
              )}
              keyExtractor={(item, index) => index?.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              ListFooterComponent={renderFooter}
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
              <View style={{ flex: 0.85, justifyContent: 'center' }}>
                <TextInput
                  placeholder="Type Message..."
                  style={{ height: '70%', color: appColors.White }}
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
                      console.log('userDetails', userDetails);
                      console.log('profileData', profileData);
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
export default BarberChat;

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
  currentStatusText: { fontSize: Sizes.small, color: appColors.White },
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
