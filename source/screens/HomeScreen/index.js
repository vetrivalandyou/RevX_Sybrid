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
import {useSelector} from 'react-redux';
import {requestLocationPermissionAndGetLocation} from '../../utils/GetLocation';
import {LATEST_SELECT, SUCCESS_CODE} from '../../AppConstants/appConstants';
import {useIsFocused} from '@react-navigation/native';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
const HomeScreen = ({navigation}) => {
  const {coords} = useSelector(state => state.LocationReducer);
  const isFocused = useIsFocused();
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
    setSelectedLocation(asyncNearestLandmark);
    setSelectedLongLat(selectedLongLat);
    getBarberList(asyncLongLat);
  };

  function getBarberList(asyncLongLat) {
    // console.log('asyncLongLat', asyncLongLat);
    const payload = {
      userId: userDetails?.userId,
      latitude: asyncLongLat?.coords?.latitude,
      longitude: asyncLongLat?.coords?.longitude,
      distance: 25,
      userName: '',
      profileImage: '',
    };
    console.log('payload', payload);
    PostRequest(endPoint.GET_VANS_NEAR_CUSTOMER, payload)
      .then(res => {
        console.log('res123', res?.data);
        // if (res?.data?.[] == 200) {
        setBarberList(res?.data);
        // } else {
        //   SimpleSnackBar(res?.data?.message);
        // }
        getServices();
      })
      .catch(err => {
        console.log('596245', err);
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
    console.log('item --------------------------------', item);
    return (
      <View
        key={item?.categoryId}
        style={{
          marginHorizontal: 3,
          height: screenSize.height / 5,
          width: screenSize.width / 3.9,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, width: '100%'}}>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item?.serviceImage == null ? (
              <Image
                style={{width: 80, height: 80, borderRadius: 10}}
                source={AppImages.ourservices3}
              />
            ) : (
              <Image
                style={{resizeMode: 'contain', flex: 1}}
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
              {item?.categoryName}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const NearbyBarbers = ({item}) => (
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
            style={{flex: 1}}
            source={{
              uri: `${imageUrl}${item?.ProfileImage}`,
            }}
            resizeMode="contain"></ImageBackground>
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
            <Text style={{color: appColors.White, marginLeft: 5}}>4.5</Text>
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
            style={{paddingVertical: 9}}
            onPress={() =>
              navigation.navigate(constants.screen.BarberProfile, {
                barberId: item?.UserId,
              })
            }
          />
        </View>
      </View>
    </View>
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
      <BottomSheet ref={locationBottomSheetRef} Height={screenSize.height / 2}>
        <LocationBottomSheet refRBSheet={locationBottomSheetRef} />
      </BottomSheet>
      <View style={{flex: 0.1}}>
        <HomeHeader
          heading={userDetails?.userName}
          sunHeading={selectedLocation}
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
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            <FlatList
              data={barberList}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <NearbyBarbers item={item} key={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate(constants.screen.BarberSpecialist)
            }
            style={{}}>
            <Text style={{color: appColors.Goldcolor, fontSize: 16}}>
              See all
            </Text>
          </TouchableOpacity> */}
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
    </Screen>
  );
};

export default HomeScreen;
