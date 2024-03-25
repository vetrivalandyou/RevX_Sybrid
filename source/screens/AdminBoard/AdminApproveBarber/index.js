import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Image,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import ArrowDownIcon from 'react-native-vector-icons/MaterialIcons';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import {screenSize} from '../../../components/atom/ScreenSize';
import Sizes from '../../../AppConstants/Sizes';
import {AppImages} from '../../../AppConstants/AppImages';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Header from '../../../components/molecules/Header';
import {endPoint, imageUrl, messages} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import constant from '../../../AppConstants/Constants.json';
import {Insert, approve, reject} from '../../../AppConstants/appConstants';

const initialBarberApproveFields = {
  servicesId: null,
  barberId: null,
  statusId: null,
};

const AdminApproveBarber = ({navigation}) => {
  const isFocused = useIsFocused();

  const btnClicked = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [BarberApprove, setBarberApprove] = useState([]);
  const pageRef = useRef(1);

  // const fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.spring(animation, {
  //     toValue: btnClicked.current ? 0 : 1,
  //     //duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     timeoutRef.current = setTimeout(() => setIsLoading(false), 500);
  //   }
  //   return () => clearTimeout(timeoutRef.current);
  // }, [isLoading]);

  useEffect(() => {
    getAsyncData();
    getBarberApproveService();
  }, []);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constant.AsyncStorageKeys.userDetails,
    );
    console.log('userDetails', userDetails);
    setUserDetails(userDetails);
  };

  const getBarberApproveService = () => {
    if (!hasMoreData) {
      console.log('inside hasMoreData');
      return;
    }
    console.log('Outside');
    setIsLoading(true);
    const payload = {
      ...initialBarberApproveFields,
      pageNumber: pageRef.current,
      pageSize: 5,
    };
    console.log('Payload', payload);
    PostRequest(endPoint.BARBER_APPROVE_SERVICES, payload)
      .then(res => {
        if (res?.data?.data?.length > 0) {
          let newData = res?.data?.data;
          setBarberApprove([...BarberApprove, ...newData]);
          setIsRefreshing(false);
        } else {
          setHasMoreData(false);
        }
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const getBarberApproveList = () => {
    const payload = {
      ...initialBarberApproveFields,
      pageNumber: pageRef.current,
      pageSize: 5,
    };
    PostRequest(endPoint.BARBER_APPROVE_SERVICES, payload)
      .then(res => {
        if (res?.data?.data?.length > 0) {
          let newData = res?.data?.data;
          setBarberApprove(newData);
          setIsRefreshing(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const postBarberApproveService = payload => {
    PostRequest(endPoint.BARBER_APPROVE_SERVICE_POST, payload)
      .then(res => {
        console.log('res', res?.data);
        if (res?.data?.code === 200) {
          SimpleSnackBar(res?.data?.message);
          setIsLoading(false);
          getBarberApproveService();
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

  const handleAction = (item, operation) => {
    const payload = {
      BarberId: item?.barberId,
      operations: Insert,
      createdBy: userDetails?._RoleId,
      ud_Barber_Approve_Service_Type: selectedItems.map(service => ({
        servicesId: service,
      })),
    };
    if (operation == 'Accept') {
      postBarberApproveService({...payload, StatusId: approve, isApproved: 1});
    } else {
      postBarberApproveService({...payload, StatusId: reject, isApproved: 0});
    }
  };

  const toggleSelection = itemId => {
    const selectedIndex = selectedItems.indexOf(itemId);
    let newSelectedItems = [...selectedItems];
    if (selectedIndex === -1) {
      newSelectedItems.push(itemId);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleEndReached = () => {
    if (!isLoading) {
      pageRef.current++;
      getBarberApproveService();
    }
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{flex: 0.2}}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    ) : null;
  };

  const handleRefresh = () => {
    pageRef.current = 1;
    setIsRefreshing(true);
    setBarberApprove(null);
    getBarberApproveList();
  };

  const InnerContanier = useCallback(
    ({item}) => {
      const isSelected = selectedItems.includes(item.servicesId);
      return (
        <TouchableOpacity
          key={item.servicesId}
          onPress={() => toggleSelection(item.servicesId)}
          style={{
            backgroundColor: '#252525',
            marginVertical: 8,
            height: screenSize.height / 17,
            marginHorizontal: 5,
            borderRadius: 8,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 15,
                  color: 'white',
                  marginLeft: 5,
                }}>
                {item.serviceName}
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <View
                style={[
                  ticketStyle.OuterCircle,
                  isSelected && {backgroundColor: '#c79647'},
                ]}>
                {isSelected && (
                  <CustomIcon
                    type={Icons.AntDesign}
                    name={'check'}
                    color={appColors.White}
                    size={18}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedItems],
  );

  const TicketsComponent = useCallback(
    ({item, index, openIndex, onPress}) => {
      const isCollapse = index !== openIndex;
      return (
        <View key={item?.barberId} style={ticketStyle.container}>
          <View
            style={{
              height: screenSize.height / 5,
              width: screenSize.width / 1.1,
              marginBottom: 10,
              backgroundColor: '#252525',
              borderWidth: 1,
              borderRadius: 20,
              borderColor: 'black',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                flex: 0.6,
              }}>
              <View
                style={{
                  flex: 0.3,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: `${imageUrl}${item.profileImage}`}}
                  style={{
                    height: Platform.OS == 'ios' ? 80 : 63,
                    width: Platform.OS == 'ios' ? 80 : 63,
                    borderRadius: 40,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 0.5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 17,
                  }}>
                  {item.barberName}
                </Text>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}>
                    Abda.Shaheen1@gmail.com
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                // onPress={() => toggleItem(item?.barberId)}
                onPress={onPress}
                style={[
                  styles.center,
                  {
                    flex: 0.2,
                    justifyContent: 'center',
                    // backgroundColor:'pink',
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: appColors.Goldcolor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ArrowDownIcon
                    name={
                      isCollapse == true ? 'arrow-drop-down' : 'arrow-drop-up'
                    }
                    color={appColors.Goldcolor}
                    size={30}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{height: 1, position: 'relative', marginHorizontal: 15}}>
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

            <View style={{flex: 0.4, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ButtonComponent
                  btnColor={appColors.DarkGreen}
                  onPress={() => handleAction(item, 'Accept')}
                  style={{
                    backgroundColor: appColors.Green,
                    width: '90%',
                    paddingVertical: 9,
                  }}
                  title={'Accept'}
                />
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ButtonComponent
                  btnColor={appColors.Red}
                  onPress={() => handleAction(item, 'Reject')}
                  style={{
                    backgroundColor: appColors.Red,
                    width: '90%',
                    paddingVertical: 9,
                  }}
                  title={'Reject'}
                />
              </View>
            </View>
          </View>
          {item?.barberServices?.length > 0 ? (
            <Fragment>
              {!isCollapse && (
                <ScrollView
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  style={[ticketStyle.ticketDetailView]}>
                  <Fragment>
                    {item?.barberServices?.map((service, index) => (
                      <InnerContanier
                        key={index}
                        item={service}
                        selected={selectedItems}
                        onPress={() => setSelectedItems}
                        nestedScrollEnabled={true}
                      />
                    ))}
                  </Fragment>
                </ScrollView>
              )}
            </Fragment>
          ) : null}
        </View>
      );
    },
    [selectedItems],
  );

  const handleClickCollapse = useCallback(
    index => {
      setOpenIndex(index !== openIndex ? index : null);
    },
    [openIndex],
  );

  return (
    <Screen
      viewStyle={{padding: 15, flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Approve Barber'}
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

      <View style={{flex: 0.9}}>
        <FlatList
          data={BarberApprove}
          windowSize={5}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          keyExtractor={item => item.barberId.toString()}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
          extraData={BarberApprove}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[appColors.Goldcolor]}
            />
          }
          renderItem={({item, index}) => (
            <TicketsComponent
              item={item}
              index={index}
              openIndex={openIndex}
              onPress={() => handleClickCollapse(index)}
            />
          )}
        />
      </View>
    </Screen>
  );
};

export default AdminApproveBarber;

const ticketStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.Black,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: appColors.AppGreen,
    height: screenSize.height / 14,
    width: screenSize.width,
  },
  headerLeft: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketMainHeading: {
    fontSize: Sizes.large,
    fontWeight: 'bold',
    color: appColors.White,
  },
  headerRight: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    backgroundColor: appColors.AppLightGreen,
    borderRadius: 50,
    padding: 10,
  },
  ticketView: {
    height: screenSize.height / 12,
    flexDirection: 'row',
    borderBottomColor: appColors.AppGreen,
  },
  ticketCenterView: {
    height: screenSize.height / 12,
    width: screenSize.width / 1.12,
    flexDirection: 'row',
  },
  innerTicketCenterView: {
    height: screenSize.height / 12,
    width: screenSize.width / 2.3,
  },
  subUpperInnerTicketView: {
    height: screenSize.height / 24,
    width: screenSize.width / 2.3,
    justifyContent: 'flex-end',
  },
  ticket: {
    width: screenSize.width / 2.4,
    borderWidth: 1,
    borderColor: appColors.AppLightGray,
    borderRadius: 10,
    flexDirection: 'row',
  },
  ticketDisplay: {
    fontWeight: 13,
    fontWeight: 'bold',
    color: appColors.AppGreen,
    textAlign: 'center',
    // marginLeft: 10,
  },
  subLowerInnerTicketView: {
    height: screenSize.height / 24,
    width: screenSize.width / 2.3,
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  ticketHolder: {
    fontSize: Sizes.mediumLarge,
    fontWeight: '500',
    // marginLeft: 10,
    color: appColors.AppGray,
  },
  innerRightTicketView: {
    height: screenSize.height / 12,
    width: screenSize.width / 2.4,
  },
  innerSubUpperRightTicketView: {
    height: screenSize.height / 24,
    width: screenSize.width / 2.4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  ticketStatusView: {
    width: screenSize.width / 4,
    alignItems: 'center',
    padding: 5,
    backgroundColor: appColors.AppGreen,
    borderRadius: 100,
    // marginRight: 10,
  },
  ticketStatusText: {
    fontSize: Sizes.small,
    fontWeight: '500',
    color: 'white',
  },
  chatButton: {
    width: screenSize.width / 15,
    alignItems: 'center',
    padding: 5,
    backgroundColor: appColors.AppGreen,
    borderRadius: 100,
  },
  ticketDateView: {
    height: screenSize.height / 24,
    width: screenSize.width / 2.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ticketDetailView: {
    height: screenSize.height / 3,
    //backgroundColor: '#F9F6EE',
    borderBottomColor: '#EDEADE',
    //  borderBottomWidth:0.1,
    borderBottomColor: appColors.AppGreen,
    //  paddingHorizontal:8
  },
  ticketDetailFirstView: {
    height: screenSize.height / 9,
    width: screenSize.width,
  },
  descriptionView: {
    height: screenSize.height / 23,
    width: screenSize.width,
    justifyContent: 'center',
  },
  descriptionText: {
    // marginLeft: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: appColors.AppGreen,
  },
  descriptionTextView: {
    height: screenSize.height / 21,
    width: screenSize.width,
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  descriptionDetailText: {
    // marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: appColors.AppGreen,
    textAlign: 'center',
  },
  tableHeader: {
    height: screenSize.height / 20,
    width: screenSize.width,
    flexDirection: 'row',
    backgroundColor: appColors.AppGreen,
  },
  singleTableHeader: {
    height: screenSize.height / 20,
    width: screenSize.width / 5,
    justifyContent: 'center',
  },
  tableHeaderText: {
    textAlign: 'center',
    fontSize: Sizes.small,
    fontWeight: 'bold',
    color: appColors.White,
  },
  tableBody: {
    height: screenSize.height / 19,
    width: screenSize.width,
    flexDirection: 'row',
    borderColor: appColors.AppGreen,
    //  borderWidth: 1,
  },
  singleTableBody: {
    height: screenSize.height / 30,
    width: screenSize.width / 5.2,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'green',
  },
  tableBodyText: {
    textAlign: 'center',
    fontSize: Sizes.small,
    fontWeight: '500',
    color: appColors.AppGreen,
  },
  createTicketButton: {
    backgroundColor: appColors.AppGreen,
    position: 'absolute',
    bottom: 20,
    right: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenSize.height / 15,
    width: screenSize.width / 7.5,
  },
  container2: {
    width: screenSize.width / 1,
    borderRadius: 10,
    backgroundColor: '#252525',
    //   marginHorizontal: 12,
    marginVertical: 8,
    width: screenSize.width / 2,
  },

  NoticationContainer: {
    height: screenSize.height / 18.5,
    width: screenSize.width / 9.2,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  Button: {
    backgroundColor: 'green',
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 40,
    position: 'absolute',
    bottom: 5,
    width: screenSize.width / 1.07,
  },
  imagecontainer: {
    width: screenSize.width / 9.5,
    // paddingVertical: 8,
    // borderWidth: 1,
    // borderRadius: 5,
    // backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
  },
  OuterCircle: {
    height: screenSize.height / 35,
    width: screenSize.width / 17,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: screenSize.height / 90,
    width: screenSize.width / 43,
    borderRadius: 40,
    backgroundColor: 'lightgray',
    position: 'absolute',
  },
});
