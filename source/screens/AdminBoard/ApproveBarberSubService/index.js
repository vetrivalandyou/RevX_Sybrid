import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Platform,
  RefreshControl,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Sizes from '../../../AppConstants/Sizes';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import constant from '../../../AppConstants/Constants.json';
import {screenSize} from '../../../components/atom/ScreenSize';
import {approve, reject} from '../../../AppConstants/appConstants';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {endPoint, imageUrl, messages} from '../../../AppConstants/urlConstants';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import ArrowDownIcon from 'react-native-vector-icons/MaterialIcons';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';

const initialBarberApproveFields = {
  operationID: 0,
  parameterID: 1,
  barbarID: 0,
  parentServiceStatusID: 0,
  childServiceStatusID: 0,
  isActive: true,
  userID: 0,
  userIP: 'string',
  tbL_Approve_BB_ParentServices_: [
    {
      parentService_PK_ID: 0,
      parentServiceStatusID: 0,
    },
    {
      parentService_PK_ID: 0,
      parentServiceStatusID: 0,
    },
  ],
  tbL_Approve_BB_ChildServices_: [
    {
      childService_PK_ID: 0,
      childServiceStatusID: 0,
    },
  ],
};

const ApproveBarberSubService = ({navigation}) => {
  const isFocused = useIsFocused();
  const [openIndex, setOpenIndex] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [BarberApprove, setBarberApprove] = useState([]);
  const [barberServices, setBarberServices] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getBarberListAndServices();
    }
  }, [isFocused]);

  const getBarberListAndServices = () => {
    PostRequest(
      endPoint.BARBER_PC_SERVICES_APPROVAL,
      initialBarberApproveFields,
    )
      .then(res => {
        console.log('getBarberListAndServices-----', res?.data);
        setBarberApprove(res?.data);
        setIsRefreshing(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setIsRefreshing(false);
      });
  };

  const postBarberApproveService = payload => {
    PostRequest(endPoint.BARBER_PC_SERVICES_APPROVAL, payload)
      .then(res => {
        console.log('res', res?.data);
        SimpleSnackBar(res?.data?.[0]?.Message);
        setOpenIndex(null);
        getBarberListAndServices();
      })
      .catch(err => {
        console.log('postBarberApproveServicepostBarberApproveService', err);
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  const handleAction = (item, operation) => {
    let payload;
    let makingParentService;

    if (operation == 'Accept') {
      makingParentService = selectedItems?.map(x => ({
        childService_PK_ID: x,
        childServiceStatusID: approve,
      }));
      payload = {
        ...initialBarberApproveFields,
        operationID: 2,
        barbarID: item?.UserId,
        parameterID: 1,
        tbL_Approve_BB_ChildServices_: makingParentService,
      };
    } else {
      makingParentService = selectedItems?.map(x => ({
        childService_PK_ID: x,
        childServiceStatusID: reject,
      }));
      payload = {
        ...initialBarberApproveFields,
        operationID: 3,
        barbarID: item?.UserId,
        parameterID: 1,
        tbL_Approve_BB_ChildServices_: makingParentService,
      };
    }

    console.log('SUBSERVICES', payload);

    postBarberApproveService(payload);
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

  const handleRefresh = () => {
    getBarberListAndServices();
  };

  const InnerContanier = ({item}) => {
    const isSelected = selectedItems.includes(item.ServicesId);
    return (
      <TouchableOpacity
        key={item.ServicesId}
        onPress={() => toggleSelection(item.ServicesId)}
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
          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: 'white',
                marginLeft: 5,
              }}>
              {item.ServiceCategoryName}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: 'white',
                marginLeft: 5,
              }}>
              -----
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: 'white',
                marginLeft: 5,
              }}>
              {item.BarberServiceCategryname}
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,
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
  };

  const TicketsComponent = ({item, index, openIndex, onPress}) => {
    const isCollapse = index !== openIndex;
    return (
      <View key={item?.UserId} style={ticketStyle.container}>
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
                source={{uri: `${imageUrl}${item.ProfileImage}`}}
                style={{
                  height: Platform.OS == 'ios' ? 80 : 63,
                  width: Platform.OS == 'ios' ? 80 : 63,
                  borderRadius: 40,
                }}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'column',
                justifyContent: 'center',
                paddingHorizontal: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                {item.UserName}
              </Text>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                  }}>
                  {item?.UserEmail}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onPress}
              style={[
                styles.center,
                {
                  flex: 0.2,
                  justifyContent: 'center',
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

          <View style={{height: 1, position: 'relative', marginHorizontal: 15}}>
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
                style={{
                  backgroundColor: appColors.Green,
                  width: '90%',
                  paddingVertical: 9,
                  opacity:
                    openIndex == index && selectedItems?.length > 0 ? 0.9 : 0.3,
                }}
                disable={
                  openIndex == index && selectedItems?.length > 0 ? false : true
                }
                onPress={() => handleAction(item, 'Accept')}
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
                  opacity:
                    openIndex == index && selectedItems?.length > 0 ? 0.9 : 0.3,
                }}
                disable={
                  openIndex == index && selectedItems?.length > 0 ? false : true
                }
                title={'Reject'}
              />
            </View>
          </View>
        </View>

        {!isCollapse && (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={[ticketStyle.ticketDetailView]}>
            <Fragment>
              {barberServices?.map((service, index) => (
                <InnerContanier
                  key={index}
                  item={service}
                  selected={selectedItems}
                  nestedScrollEnabled={true}
                  onPress={() => setSelectedItems}
                />
              ))}
            </Fragment>
          </ScrollView>
        )}
      </View>
    );
  };

  const handleClickCollapse = useCallback(
    index => {
      setOpenIndex(index !== openIndex ? index : null);
    },
    [openIndex],
  );

  const handlePressBarber = (item, index) => {
    setSelectedItems([]);
    const payload = {
      ...initialBarberApproveFields,
      operationID: 1,
      barbarID: item?.UserId,
      parameterID: 1,
    };
    console.log('payload', payload);
    PostRequest(endPoint.BARBER_PC_SERVICES_APPROVAL, payload)
      .then(res => {
        console.log('res?.data------------------------', res?.data);
        setBarberServices(res?.data);
        handleClickCollapse(index);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

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
          headerText={'Approve Sub Services'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constant.AdminScreens.AdminNotification)
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
        {BarberApprove?.length > 0 ? (
          <FlatList
            data={BarberApprove}
            nestedScrollEnabled={true}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.UserId.toString()}
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
                onPress={() => handlePressBarber(item, index)}
              />
            )}
          />
        ) : (
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BoxLottie
              animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};

export default ApproveBarberSubService;

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
