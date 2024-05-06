import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import { AppImages } from '../../../AppConstants/AppImages';
import { screenSize } from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import appColors from '../../../AppConstants/appColors';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import BlockUser from './BlockUser';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import { PostRequest } from '../../../services/apiCall';
import { endPoint, imageUrl, messages } from '../../../AppConstants/urlConstants';
import { getAsyncItem } from '../../../utils/SettingAsyncStorage';
import { LATEST_SELECT } from '../../../AppConstants/appConstants';

const AdminUserDetails = ({ navigation }) => {
  const [userList, setUserlist] = useState([]);
  const pageRef = useRef(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Nathan Alexender',
  //     title: 'Senior Barber',
  //     Imagesource: AppImages.chatone,
  //     Viewbutton: 'View User',
  //     Blockbutton: 'Block User',
  //   },
  //   {
  //     id: 2,
  //     name: 'Nathan Alexender',
  //     title: 'Senior Barber',
  //     Imagesource: AppImages.chatone,
  //     Viewbutton: 'View User',
  //     Blockbutton: 'Block User',
  //   },
  //   {
  //     id: 3,
  //     name: 'Nathan Alexender',
  //     title: 'Senior Barber',
  //     Imagesource: AppImages.chatone,
  //     Viewbutton: 'View User',
  //     Blockbutton: 'Block User',
  //   },
  //   {
  //     id: 4,
  //     name: 'Nathan Alexender',
  //     title: 'Senior Barber',
  //     Imagesource: AppImages.chatone,
  //     Viewbutton: 'View User',
  //     Blockbutton: 'Block User',
  //   },
  //   {
  //     id: 5,
  //     name: 'Nathan Alexender',
  //     title: 'Senior Barber',
  //     Imagesource: AppImages.chatone,
  //     Viewbutton: 'View User',
  //     Blockbutton: 'Block User',
  //   },
  // ];

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log('userList', userList);

  const handleEndReached = () => {
    setIsLoading(true);
    if (!isLoading) {
      pageRef.current++;
      getAllUsersList();
    }
  };

  const getAllUsersList = () => {
    if (!hasMoreData) {
      return;
    }
    setIsLoading(true);
    const payload = {
      operationID: LATEST_SELECT,
      roleID: 4,
      isActive: true,
      userID: 0,
      userIP: '::1',
      pageNumber: pageRef.current,
      pageSize: 5,
    };
    PostRequest(endPoint.Get_USER_BARBER_DETAILS, payload)
      .then(res => {
        console.log('Helo', res?.data);
        if (res?.data?.length > 0) {
          setUserlist([...userList, ...res?.data]);
        } else {
          setHasMoreData(false);
        }
        setIsLoading(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setIsLoading(false);
      });
  };

  const getAllUsers = () => {
    const payload = {
      operationID: 3,
      roleID: 4,
      isActive: true,
      userID: 0,
      userIP: '::1',
      pageNumber: pageRef.current,
      pageSize: 5,
    };
    PostRequest(endPoint.Get_USER_BARBER_DETAILS, payload)
      .then(res => {
        if (res?.data?.length > 0) {
          setUserlist(res?.data);
          setIsLoading(false);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
          setIsLoading(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setIsLoading(false);
      });
  };
  console.log("userList", userList.UserEmail)
  return (
    <Screen
      viewStyle={{ padding: 15, flex: 1, backgroundColor: appColors.Black }}
      statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'User Details'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
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
      <View style={{ flex: 0.9 }}>
        <FlatList
          data={userList}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          extraData={userList}
          renderItem={({ item, index }) => (
            <Detailslist
              item={item}
              index={index}
            // openIndex={openIndex}
            // onPress={() => handleClickCollapse(index)}
            />
          )}
        />
      </View>
    </Screen>
  );
};

const Detailslist = ({ item, onPress }) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const handleViewUser = item => {
    navigation.navigate(constants.AdminScreens.AdminViewUsers, {
      UserName: item.UserName,
      ProfileImage: item.ProfileImage,
      UserEmail: item.UserEmail,
      PhoneNo: item.PhoneNo,
    });
  }

  // const handleViewUser = item => {
  //   navigation.navigate(constants.AdminScreens.AdminViewUsers, {
  //     userName: item.UserName,
  //     profileImage: item.ProfileImage,
  //     userEmail: item.UserEmail,
  //     phoneNo: item.PhoneNo,
  //   });
  // };

  return (
    <View style={styles.Containerstyle}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            flex: 0.6,
          }}>
          <View
            style={{ paddingVertical: 8, flex: 0.3, alignItems: 'flex-start' }}>
            {item?.ProfileImage != '' && (
              <Image
                source={{ uri: `${imageUrl}${item?.ProfileImage}` }}
                style={{
                  height: Platform.OS == 'ios' ? 80 : 70,
                  width: Platform.OS == 'ios' ? 80 : 70,
                  borderRadius: 40,
                }}
              />
            )}
          </View>
          <View style={{ flexDirection: 'column', flex: 0.7 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontSize: 20,
              }}>
              {item?.UserName}
            </Text>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  paddingVertical: 4,
                }}>
                {/* {item.title} */}
                {'User'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, position: 'relative', marginHorizontal: 15 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderWidth: 1,
              borderColor: appColors.Goldcolor,
              borderStyle: 'dashed',
              backgroundColor: 'transparent',
            }}></View>
        </View>
        {/* <View
          style={{
            fontSize: 25,
            marginHorizontal: 14,
            borderBottomWidth: 2,
            borderStyle: 'dashed',
            borderBottomColor: '#c79647'
          }}></View> */}
        <View style={{ flex: 0.4, flexDirection: 'row' }}>
          {item?.IsActive == true ? (
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ButtonComponent
                onPress={() => handleViewUser(item)}
                style={{
                  backgroundColor: '#c79647',
                  width: '90%',
                  paddingVertical: 9,
                }}
                title={'View User'}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ButtonComponent
                onPress={() => handleViewUser(item)}
                style={{
                  backgroundColor: '#c79647',
                  width: '90%',
                  paddingVertical: 9,
                }}
                disable={true}
                title={'View User'}
              />
            </View>
          )}

          <View
            style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
            {item.IsActive == true ? (
              <ButtonComponent
                style={{
                  backgroundColor: '#E81F1C',
                  width: '90%',
                  paddingVertical: 9,
                }}
                btnColor={appColors.Red}
                title={'Block User'}
                onPress={() => refRBSheet.current.open()}
              />
            ) : (
              <ButtonComponent
                style={{
                  width: '90%',
                  paddingVertical: 9,
                }}
                btnColor={appColors.Red}
                title={'This User is Blocked by Admin'}
              // onPress={() => refRBSheet.current.open()}
              />
            )}

            <BottomSheet ref={refRBSheet} Height={200}>
              <BlockUser refRBSheet={refRBSheet} />
            </BottomSheet>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminUserDetails;
