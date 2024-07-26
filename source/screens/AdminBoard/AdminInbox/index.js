import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, Image, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import Search from '../../../components/atom/Search/Search';
import { AppImages } from '../../../AppConstants/AppImages';
import appColors from '../../../AppConstants/appColors';
import { screenSize } from '../../../components/atom/ScreenSize';
import constants from '../../../AppConstants/Constants.json';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { PostRequest } from '../../../services/apiCall';
import { endPoint, imageUrl } from '../../../AppConstants/urlConstants';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import { debounce } from '../../../functions/AppFunctions';
import moment from 'moment';

const AdminInbox = () => {
  const { SupportingTables } = useSelector(state => state.CrudFormReducer);
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const [isLoading, setIsLoading] = useState(true)
  const [allChatBubble, setAllChatBubble] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isFocused) getChatBubble()
  }, [isFocused])

  const getChatBubble = () => {
    if (hasMore == false) return null
    const payload = {
      operationID: 7,
      parameterID: 0,
      barberID: 0,
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    }
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then((res) => {
        console.log("res", res?.data?.Table);
        if (res?.data?.Table?.length > 0) {
          setIsLoading(false)
          setPageNumber(pageNumber + 1)
          setAllChatBubble(res?.data?.Table)
        } else {
          setHasMore(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
      })
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
    if (hasMore == true) {
      getChatBubble();
    }
  }, 300);

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{ flex: 0.9, padding: 15, minHeight: screenSize.height, maxHeight: "auto" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 55}>
        <View style={{ flex: 0.08 }}>
          <Header
            headerSubView={{ marginHorizontal: 5 }}
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
        <View style={{ flex: 0.09, minHeight: 60, maxHeight: 60 }}>
          <Search />
        </View>
        <View style={{ flex: 0.71 }}>
          {
            isLoading ?
              (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size='small' color={appColors.Goldcolor} />
                </View>
              ) :
              (
                allChatBubble?.length > 0 ?
                  (
                    <FlatList
                      data={allChatBubble}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => index?.toString()}
                      onEndReachedThreshold={0.5}
                      onEndReached={handleLoadMore}
                      ListFooterComponent={renderFooter}
                      renderItem={({ item }) => (
                        <Messages item={item} navigation={navigation} />
                      )}
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

const Messages = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(constants.AdminScreens.AdminChatView, {
          profileData: item,
        })
      }
      style={{
        flex: 1,
        backgroundColor: appColors.darkgrey,
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10,
      }}>

      <View style={{ flexDirection: 'row',  alignItems: 'center', flex: 0.28,}}>
        <View style={{  justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10, borderWidth: 1, borderRadius: 100, borderColor: appColors.White }}>
          <Image
            source={{ uri: `${imageUrl}${item.user1image}`}}
            resizeMode="cover"
            style={{ width: 30, height: 30, borderRadius: 100 }}
          />
        </View>
        <View style={{  justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginRight: 10, borderWidth: 1, borderRadius: 100, borderColor: appColors.White }}>
          <Image
            source={{ uri: `${imageUrl}${item.user2image}`}}
            resizeMode="cover"
            style={{ width: 30, height: 30, borderRadius: 100 }}
          />
        </View>
      </View>

      <View
        style={{ flex: 0.65, paddingHorizontal: 10, flexDirection: 'column' }}>
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 13,
              fontWeight: '500',
            }}>
            {item.user1} / {item?.user2}
          </Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={{ color: 'white', fontSize: 11, fontWeight: 400 }}>
            {item.Message == null ? "No Message" : item.Message }
          </Text>
        </View>
      </View>

      <View style={{ flex: 0.3 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight:6,
            marginBottom:4
          }}>
          <Text
            style={{
              color: appColors.White,
              fontSize: 12,
            }}>
            {item.Datetime == null ? "Not Found" : moment(item?.Datetime).format('DD-MM-YY')}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default AdminInbox;
