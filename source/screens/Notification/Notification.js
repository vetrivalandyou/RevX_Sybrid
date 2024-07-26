import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { screenSize } from '../../components/atom/ScreenSize';
import Header from '../../components/molecules/Header';
import {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import constants from '../../AppConstants/Constants.json';
import appColors from '../../AppConstants/appColors';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { RESET_NOTIFICATION_COUNT } from '../../redux/ActionType/NotificationActionTypes';
import { PostRequest } from '../../services/apiCall';
import { endPoint, imageUrl } from '../../AppConstants/urlConstants';
import { getAsyncItem } from '../../utils/SettingAsyncStorage';
import { debounce } from '../../functions/AppFunctions';
import moment from 'moment';
import BoxLottie from '../../components/atom/BoxLottie/BoxLottie';

const UserNotification = ({ navigation }) => {

  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const [notifications, setNotifications] = useState([])
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (isFocused) {
      getAyncUserDetails()
      dispatch({ type: RESET_NOTIFICATION_COUNT });
    }
  }, [isFocused])

  const getAyncUserDetails = async () => {
    const asyncUserDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(asyncUserDetails);
    getAllNotifications(asyncUserDetails);
  };

  const getAllNotifications = (asyncUserDetails) => {
    if (hasMore == false) return;
    const payload = {
      operationID: 3,
      customerid: asyncUserDetails?.userId,
      barberid: 0,
      _PageNumber: pageNumber,
      _RowsOfPage: 10
    }
    console.log("payload", payload)
    PostRequest(endPoint.ALL_NOTIFICATIONS, payload)
      .then((res) => {
        console.log("res?.data", res?.data)
        if (res?.data?.length > 0) {
          setNotifications(notifications => [
            ...notifications,
            ...res?.data
          ]);
          setPageNumber(pageNumber + 1); // Increment the page number
          setIsLoading(false);
        } else {
          setHasMore(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err)
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
      recallAllNotifications();
    }
  }, 300);

  const NotificationContainer = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, borderRadius: 40, flexDirection: 'row' }}>
          <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
            {
              item?.ProfileImage == undefined ?
                (
                  <ActivityIndicator size='small' color={appColors.White} />
                ) :
                (
                  <Image
                    source={{ uri: `${imageUrl}${item?.ProfileImage}` }}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 40,
                    }}
                  />
                )
            }

          </View>
          <View style={{ flex: 0.75, }}>
            <View style={{ flex: 0.7}}>
              <View style={{ flex: 0.7, flexDirection: 'row' }}>
                <View style={{ flex: 0.7, justifyContent: 'flex-end' }}>
                  <Text
                    style={{
                      color: appColors.Goldcolor,
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    {item?.UserName}
                  </Text>
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    style={{
                      color: appColors.White,
                      fontWeight: 'bold',
                      fontSize: 7,
                    }}>
                    {moment(item?.CreatedDate).format('hh:mm A')}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
                <Text
                  style={{
                    color: appColors.White,
                    fontWeight: '400',
                    fontSize: 12,
                  }}>
                  {item?.DescriptionByUser}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row-reverse' }}>
            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <Text
                  style={{
                    color: appColors.White,
                    fontWeight: '400',
                    fontSize: 10,
                  }}>
                  {moment(item?.CreatedDate).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const recallAllNotifications = () => {
    const payload = {
      operationID: 3,
      customerid: 0,
      barberid: userDetails?.userId,
      _PageNumber: pageNumber,
      _RowsOfPage: 10
    }
    console.log("payload", payload)
    PostRequest(endPoint.ALL_NOTIFICATIONS, payload)
      .then((res) => {
        console.log("res?.data", res?.data)
        if (res?.data?.length > 0) {
          setNotifications(notifications => [
            ...notifications,
            ...res?.data
          ]);
          setPageNumber(pageNumber + 1); // Increment the page number
          setIsLoading(false);
        } else {
          setHasMore(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err)
        setIsLoading(false);
      })
  }

  return (
    <Screen statusBarColor={appColors.Black}>
      <View style={{ flex: 1, }}>
        <View style={{ flex: 0.07, }}>
          <Header
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Notification'}
            logIn={'success'}
            isShown={false}
          />
        </View>

        <View style={{ flex: 0.93, }}>
          {
            isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='small' color={appColors.White} />
              </View>
            ) :
              (
                notifications?.length > 0 ?
                  (
                    <FlatList data={notifications} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => index?.toString()}
                      ListFooterComponent={renderFooter}
                      onEndReached={handleLoadMore}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => (
                        <NotificationContainer item={item} index={index} />
                      )} />
                  ) :
                  (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <BoxLottie
                        animationPath={require('../../LottieAnimation/NoPostFoundAnimation.json')}
                      />
                      <Text style={{ color: appColors.White, fontSize: 15, marginTop: 5 }}>No Current Appointment</Text>
                    </View>
                  )

              )
          }
        </View>
      </View>
    </Screen>
  );
};
export default UserNotification;

const styles = StyleSheet.create({
  NoticationContainer: {
    height: screenSize.height / 18.5,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: screenSize.width / 1.07,
    height: Platform.OS == 'ios' ? screenSize.height / 9.5 : screenSize.height / 9,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#252525',
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
});
