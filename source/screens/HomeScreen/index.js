import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import styles from './styles';
import {AppImages} from '../../AppConstants/AppImages';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Search from '../../components/atom/Search/Search';
import {screenSize} from '../../components/atom/ScreenSize';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../AppConstants/Constants.json';
import {screensEnabled} from 'react-native-screens';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {endPoint, imageUrl} from '../../AppConstants/urlConstants';
import {PostRequest} from '../../services/apiCall';
import {getAsyncItem} from '../../utils/SettingAsyncStorage';
import LocationBottomSheet from '../../components/atom/LocationButtomSheet';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {requestLocationPermissionAndGetLocation} from '../../utils/GetLocation';
import {LATEST_SELECT, SUCCESS_CODE} from '../../AppConstants/appConstants';
import {useIsFocused} from '@react-navigation/native';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import SignalRService from '../../services/SignalRService';
import {SET_INITIAL_DROPDOWN_FORM_STATE} from '../../redux/ActionType/CrudActionTypes';
const HomeScreen = ({navigation}) => {
  const {coords} = useSelector(state => state.LocationReducer);
  const {Notification} = useSelector(state => state.NotificationReducer);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const locationBottomSheetRef = useRef(null);
  const [userDetails, setUserDetails] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [barberList, setBarberList] = useState([]);
  const [ourServices, setOurServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedLongLat, setSelectedLongLat] = useState();

  useEffect(() => {
    if (isFocused) {
      getAsyncData();
      getServices();
    }
  }, [isFocused]);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    const asyncNearestLandmark = await getAsyncItem(
      constants.AsyncStorageKeys.nearest_landmark,
    );
    const asyncLongLat = await getAsyncItem(constants.AsyncStorageKeys.longLat);
    setUserDetails(userDetails);
    setSelectedLongLat(selectedLongLat);
    setSelectedLocation(asyncNearestLandmark);
    getBarberList(asyncLongLat, userDetails);
    if (SignalRService?.isConnected()) {
      console.log('SignalR is in Connected State');
    } else {
      connectToSignalR(userDetails);
    }
  };

  const connectToSignalR = async userDetails => {
    SignalRService.startConnection(
      parseInt(userDetails?._RoleId),
      userDetails?.userId.toString(),
      dispatch,
    );
    SignalRService.onGetChatList_CC(json => {
      let parsedData = JSON.parse(json);
      console.log('Get Chat CC', parsedData);
      let data = {
        name: 'InboxList',
        value: parsedData,
      };
      dispatch({type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data});
    });
  };

  function getBarberList(asyncLongLat, userDetails) {
    const payload = {
      userId: userDetails?.userId,
      latitude:
        asyncLongLat?.coords?.latitude == undefined
          ? 0
          : asyncLongLat?.coords?.latitude,
      longitude:
        asyncLongLat?.coords?.longitude == undefined
          ? 0
          : asyncLongLat?.coords?.longitude,
      distance: 25,
      userName: '',
      profileImage: '',
    };
    console.log('payload payload payload', payload);

    PostRequest(endPoint.GET_VANS_NEAR_CUSTOMER, payload)
      .then(res => {
        console.log('res------------------', res?.data);

        setBarberList(res?.data);
        getServices();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getServices() {
    const payload = {
      categoryId: 0,
      categoryName: '',
      operations: LATEST_SELECT,
      createdBy: 0,
    };
    PostRequest(endPoint.GET_SETUP_CATEGORIES, payload)
      .then(res => {
        console.log('check ==============================', res?.data?.data);
        if (res?.data?.code == SUCCESS_CODE) {
          setOurServices(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log('1231231', err);
        setIsLoading(false);
      });
  }

  const BarbersData = [
    {
      id: 1,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off',
    },
    {
      id: 2,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off',
    },
    {
      id: 3,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off',
    },
    {
      id: 4,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off',
    },
    {
      id: 5,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off',
    },
  ];

  const OurServices = ({item}) => {
    return (
      <View
        key={item?.categoryId}
        style={{
          marginHorizontal: 3,
          height: screenSize.height / 5,
          width: screenSize.width / 3.9,
          alignItems: 'center',
        }}>
        <View
          style={{flex: 1, backgroundColor: appColors.Black, width: '100%'}}>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item?.serviceImage == null ? (
              <Image
                style={{width: 80, height: 80, borderRadius: 100}}
                source={AppImages.ourservices}
              />
            ) : (
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                }}
                source={{uri: `${imageUrl}${item?.serviceImage}`}}
              />
            )}
          </View>

          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 14,
                textAlign: 'center',
              }}>
              {item?.categoryName?.length > 16
                ? `${item.categoryName.slice(0, 12)}...`
                : item?.categoryName}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const NearbyBarbers = ({item}) => (
    console.log('itemitemitem ???????????///', item?.ProfileImage),
    (
      <View
        key={item?.userId}
        style={{
          marginHorizontal: 5,
          height: screenSize.height / 3,
          width: screenSize.width / 2,
          alignItems: 'center',
          borderRadius: 30,
          borderWidth: 2,
          borderColor: appColors.darkgrey,
          padding: 10,
        }}>
        <View style={{flex: 1, width: '100%'}}>
          <View style={{flex: 0.8, borderRadius: 30}}>
            <ImageBackground
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: 'hidden',
              }}
              source={{
                uri: `${imageUrl}${item?.ProfileImage}`,
              }}
              resizeMode="cover"></ImageBackground>
          </View>
          <View style={{flex: 0.2, justifyContent: 'center'}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 18,
              }}>
              {item?.UserName}
            </Text>
          </View>

          <View style={{flex: 0.11, flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', flex: 0.5}}>
              <CustomIcon
                type={Icons.Feather}
                name={'map-pin'}
                color={appColors.White}
                size={16}
              />
              <Text style={{color: appColors.White, marginLeft: 5}}>
                {item?.Distance?.toFixed(2)} km
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.5,
              }}>
              <CustomIcon
                type={Icons.AntDesign}
                name={'staro'}
                color={appColors.Goldcolor}
                size={16}
              />
              <Text style={{color: appColors.White, marginLeft: 5}}>
                {item?.Rating}
              </Text>
            </View>
          </View>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <View
              style={{
                height: 1,
                backgroundColor: appColors.White,
                width: '100%',
              }}></View>
          </View>
          <View style={{flex: 0.2}}>
            <ButtonComponent
              title={'View Barber Profile'}
              style={{paddingVertical: 10}}
              btnTextColor={{fontSize: 12}}
              onPress={() =>
                navigation.navigate(constants.screen.BarberProfile, {
                  barberId: item?.UserId,
                })
              }
            />
          </View>
        </View>
      </View>
    )
  );

  const Bestoffer = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          marginHorizontal: 5,
          height: screenSize.height / 2.4,
          width: screenSize.width / 1.15,
          alignItems: 'center',
          borderRadius: 30,
          borderWidth: 2,
          borderColor: appColors.darkgrey,
          padding: 10,
        }}>
        <View style={{flex: 1, width: '100%'}}>
          <View style={{flex: 0.55}}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 25}}
              source={item.Imagesource}></Image>

            <View
              style={{
                position: 'absolute',
                padding: 10,
                width: '97%',
                alignItems: 'flex-end',
              }}>
              <CustomIcon
                type={Icons.AntDesign}
                name={'hearto'}
                color={appColors.White}
                size={20}
              />
            </View>
          </View>
          <View style={{flex: 0.15, justifyContent: 'center'}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 25,
              }}>
              {item.title}
            </Text>
          </View>
          <View style={{flex: 0.17}}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 15,
              }}>
              {item.lable}
            </Text>

            <Text
              style={{
                color: appColors.White,
                fontSize: 15,
              }}>
              {item.sublable}
            </Text>
          </View>
          <View style={{flex: 0.13, flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                type={Icons.Feather}
                name={'map-pin'}
                color={appColors.White}
                size={16}
              />
              <Text style={{color: appColors.White, marginLeft: 5}}>0.8km</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                type={Icons.AntDesign}
                name={'staro'}
                color={appColors.Goldcolor}
                size={16}
              />
              <Text style={{color: appColors.White, marginLeft: 5}}>
                4.1rating
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.44,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  height: 40,
                  width: '88%',
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image source={item.percentageimage}></Image>
                  </View>
                  <View style={{flex: 0.6, justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: appColors.Goldcolor,
                        fontSize: 18,
                      }}>
                      {item.percentage}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View></View>
        </View>
      </View>
    );
  };

  const HomeHeader = ({heading, sunHeading, source, refRBSheet}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{uri: source}}
              style={{width: 55, height: 55, borderRadius: 100}}
            />
          </View>

          <View
            style={{
              flex: 0.8,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flex: 0.6}}>
              <View
                style={{flex: 0.6, justifyContent: 'center', marginLeft: 3}}>
                <Text style={{fontSize: 18, color: appColors.White}}>
                  {heading}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{flex: 0.4, flexDirection: 'row'}}>
                <CustomIcon
                  type={Icons.Feather}
                  name={'map-pin'}
                  color={appColors.White}
                  size={15}
                />
                <Text
                  numberOfLines={1}
                  style={{marginLeft: 3, color: appColors.White, fontSize: 12}}>
                  {sunHeading}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 0.4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(constants.screen.Notification)
                }
                style={{
                  backgroundColor: appColors.darkgrey,
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  type={Icons.FontAwesome5}
                  name={'bell'}
                  color={appColors.White}
                  size={20}
                />
                {Notification?.length > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: 30,
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                      backgroundColor: appColors.Goldcolor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: appColors.White, fontSize: 12}}>
                      {Notification?.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: appColors.darkgrey,
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  onPress={() =>
                    navigation.navigate(constants.screen.PaymentStatus)
                  }
                  type={Icons.Feather}
                  name={'filter'}
                  color={appColors.White}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      viewStyle={{padding: 15, flex: 0.9}}>
      <View
        style={{
          minHeight: screenSize.height / 1.2,
          maxHeight: 'auto',
        }}>
        <BottomSheet
          ref={locationBottomSheetRef}
          Height={screenSize.height / 2}>
          <LocationBottomSheet refRBSheet={locationBottomSheetRef} setHomeScreenLocation={setSelectedLocation} />
        </BottomSheet>
        <View style={{flex: 0.1}}>
          <HomeHeader
            heading={userDetails?.userName}
            sunHeading={
              selectedLocation == '' ? 'No Location Selected' : selectedLocation
            }
            source={`${imageUrl}${userDetails?.profileImage}`}
            refRBSheet={locationBottomSheetRef}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Search leaftIconType={Icons.Ionicons} leftIconName={'filter'} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0.8}}>
          <View
            style={{
              height: screenSize.height / 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: appColors.White,
                marginLeft: 8,
                fontWeight: 'bold',
              }}>
              Our Services
            </Text>
          </View>
          <View style={{height: screenSize.height / 6}}>
            {isLoading == false ? (
              <FlatList
                data={ourServices}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <OurServices item={item} />}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="small" color={appColors.Goldcolor} />
              </View>
            )}
          </View>
          <View
            style={{
              height: screenSize.height / 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: appColors.White,
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Nearby Barbers
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.screen.BarberSpecialist)
              }
              style={{}}>
              <Text style={{color: appColors.Goldcolor, fontSize: 16}}>
                See All Barbers
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: screenSize.height / 2.9, justifyContent: 'center'}}>
            {isLoading == false ? (
              <>
                {barberList?.length > 0 ? (
                  <FlatList
                    data={barberList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <NearbyBarbers item={item} key={index} />
                    )}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: appColors.Goldcolor,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      No Barber Available at your Location!!
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="small" color={appColors.Goldcolor} />
              </View>
            )}
          </View>
          <View
            style={{
              height: screenSize.height / 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: appColors.White,
                marginLeft: 8,
                fontWeight: 'bold',
              }}>
              Best Offers
            </Text>
          </View>
          <View style={{height: screenSize.height / 2.35}}>
            <FlatList
              data={BarbersData}
              renderItem={({item, index}) => (
                <Bestoffer item={item} index={index} />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default HomeScreen;
