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
import appColors from '../../../AppConstants/appColors';
import SignalRService from '../../../services/SignalRService';
import Sizes from '../../../AppConstants/Sizes';
import { screenSize } from '../../../components/atom/ScreenSize';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import { endPoint, imageUrl } from '../../../AppConstants/urlConstants';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import constants from '../../../AppConstants/Constants.json';
import { useNavigation } from '@react-navigation/native';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import { debounce } from '../../../functions/AppFunctions';
import { PostRequest } from '../../../services/apiCall';
import moment from 'moment';

const AdminChatView = ({ route }) => {
  const navigation = useNavigation()
  const { profileData } = route?.params || {};
  const [allMessages, setAllMessages] = useState([]);
  const [userDetails, setuserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    console.log('userDetailsuserDetails', userDetails);
    setuserDetails(userDetails);
    getAllMessages()
  };

  const getAllMessages = () => {
    if (hasMore == false) return null
    const payload = {
      operationID: 8,
      parameterID: profileData?.MessageID,
      barberID: 0,
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    }
    console.log("payload", payload)
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then((res) => {
        console.log("res", res?.data);
        if (res?.data?.Table?.length > 0) {
          setAllMessages(res?.data?.Table)
          setIsLoading(false)
          setPageNumber(pageNumber + 1)
        } else {
          setHasMore(false)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }


  const ChatDataContainer = ({ item, index }) => {
    return (
      <View>
        <View style={{  flexDirection: "row", paddingVertical: 0, alignItems: "center", position:"absolute",left:2,top:2 }}>
          <Image
            style={{ width: 25, height: 25, borderRadius: 100}}
            source={{
              uri: `${imageUrl}${item?.senderimage}`,
            }}
          />
        </View>
        <View
          style={[
            styles.chatContainer,
            {
              paddingHorizontal:10,
              paddingVertical:2,
              alignSelf: "center",
              // width: "100",
              backgroundColor: appColors.charcolgrey,

            },
          ]}>
          <TouchableOpacity
            style={{ flex: 1 }}>
            <Text style={{ color: appColors.Goldcolor }}>{item?.sender}</Text>
            <View key={index} style={{  paddingVertical:6 }}>
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
                  {moment(item.Datetime).format('hh:ss a')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    );
  };

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
      getAllMessages();
    }
  }, 300);

  console.log("hasMore", hasMore)

  return (
    <Screen viewStyle={styles.mainContainer} statusBarColor={appColors.Black}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
                style={{ width: 20, height: 20, borderRadius: 100, borderWidth: 1, borderColor: appColors.Goldcolor, marginTop: 8 }}
                source={{
                  uri: `${imageUrl}${profileData?.user1image}`,
                }}
              />
            </View>
            <View style={ticketStyle.headerImageView}>
              <Image
                style={{ width: 20, height: 20, borderRadius: 100, borderWidth: 1, borderColor: appColors.Goldcolor, marginBottom: 8, marginRight: 5 }}
                source={{
                  uri: `${imageUrl}${profileData?.user2image}`,
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
                  {profileData?.user1} / {profileData?.user2}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {
            isLoading == true ?
              (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size='small' color={appColors.Goldcolor} />
                </View>
              ) :
              (
                allMessages?.length > 0 ?
                  (
                    <FlatList
                      data={allMessages}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => index?.toString()}
                      onEndReachedThreshold={0.5}
                      onEndReached={handleLoadMore}
                      ListFooterComponent={renderFooter}
                      renderItem={({ item, index }) => (
                        <ChatDataContainer item={item} index={index} />
                      )}
                      inverted={true}
                    />
                  ) :
                  (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <BoxLottie animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')} />
                    </View>
                  )
              )
          }

        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};
export default AdminChatView;

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
    // flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 30,
    height: 30,
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
