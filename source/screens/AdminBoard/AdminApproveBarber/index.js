import React, {useEffect, useRef, useState} from 'react';
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
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';

const AdminApproveBarber = ({navigation}) => {
  const data = [
    {
      id: 1,
      Imagesource: AppImages.creditcard,
      title: 'Hair Cut',
    },
    {
      id: 2,
      Imagesource: AppImages.paypal,
      title: 'Hair Coloring',
    },
    {
      id: 3,
      Imagesource: AppImages.applepay,
      title: 'Hair Wash',
    },
  ];

  const data1 = [
    {
      id: 1,
      name: 'Nathan Alexender',
      title: 'Senior Barber',
      Imagesource: AppImages.chatone,
      Viewbutton: 'View User',
      Blockbutton: 'Block User',
    },
  ];

  const [btnClicked, setBtnClicked] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [BarberApprove, setBarberApprove] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.spring(animation, {
      toValue: btnClicked ? 0 : 1,
      //duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const [viewDetails, setViewDetails] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const isFocused = useIsFocused();
  const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const toggleItem = itemId => {
    setViewDetails(viewDetails === itemId ? null : itemId);
  };

  useEffect(() => {
    if (isFocused) {
      timeoutRef.current = setTimeout(() => setIsLoading(false), 500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isLoading]);

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
  const InnerContanier = ({item, key, onPress, selected}) => {
    const isSelected = selectedItems.includes(item.id);

    console.log('isSelectedisSelectedisSelected', item);

    return (
      <TouchableOpacity
        key={key}
        onPress={() => toggleSelection(item.id)}
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
  };

  const TicketsComponent = ({item, index, onPress, viewDetails}) => {
    return (
      <View style={ticketStyle.container}>
        <TouchableOpacity
          style={{
            height: screenSize.height / 4,
            width: screenSize.width / 1.1,
            marginBottom: 10,
            backgroundColor: '#252525',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'black',
            paddingHorizontal: 10,
          }}>
          {/* Up Down Icon View Main 1 open */}

          <View
            style={{
              flexDirection: 'row',
              //  alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              flex: 0.6,
              // backgroundColor:'red'
            }}>
            <View
              style={{
                flex: 0.3,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={item.Imagesource}
                style={{
                  height: Platform.OS == 'ios' ? 80 : 70,
                  width: Platform.OS == 'ios' ? 80 : 70,
                  borderRadius: 40,
                }}
              /> */}
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.6,
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
                  {item.title}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                let barberItem;
                if (item?.isClicked == true) {
                  barberItem = BarberApprove[index]['isClicked'] = false;
                } else {
                  barberItem = BarberApprove[index]['isClicked'] = true;
                }
                setBarberApprove([...BarberApprove, {...barberItem}]);
                fadeIn(), setBtnClicked(!btnClicked);
              }}
              style={[
                styles.center,
                {
                  flex: 0.1,
                  justifyContent: 'center',
                },
              ]}>
              <ArrowDownIcon
                name={
                  item?.isClicked == false ? 'arrow-drop-down' : 'arrow-drop-up'
                }
                color={appColors.Goldcolor}
                size={((Sizes.height = 80), (Sizes.width = 42))}
                style={{
                  borderWidth: 1,
                  borderColor: '#C79646',

                  borderRadius: 60,
                  marginHorizontal: -5,
                  // backgroundColor: 'red',
                }}
              />
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
                btnColor={appColors.DarkGreen}
                // onPress={onPress}
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
                style={{
                  backgroundColor: appColors.Red,
                  width: '90%',
                  paddingVertical: 9,
                }}
                title={'Reject'}
              />
            </View>
          </View>
        </TouchableOpacity>
        {item?.isClicked == true && (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={[ticketStyle.ticketDetailView]}>
            {item?.barberServices?.length > 0 &&
              item?.barberServices?.map((index, service) => (
                <InnerContanier
                  key={index}
                  item={service}
                  selected={selectedItems}
                  onPress={() => setSelectedItems}
                  nestedScrollEnabled={true}
                />
              ))}
          </ScrollView>
        )}
      </View>
    );
  };

  useEffect(() => {
    getBarberApproveService();
  }, []);

  const getBarberApproveService = () => {
    const payload = {
      ServicesId: null,
      BarberId: null,
      StatusId: null,
    };
    PostRequest(endPoint.BARBER_APPROVE_SERVICES, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          setLoading(false);
          setBarberApprove(
            res?.data?.data?.map(x => ({
              ...x,
              isClicked: false,
            })),
          );
        } else {
          SimpleSnackBar(res?.data?.message);
          setLoading(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoading(false);
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

      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={appColors.Goldcolor}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View style={{flex: 0.9}}>
          <FlatList
            data={BarberApprove}
            renderItem={({item, index}) => (
              <TicketsComponent
                item={item}
                index={index}
                // onPress={() => {

                // }}
                // viewDetails={viewDetails === item?.id}
              />
            )}
            keyExtractor={item => item.id}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
