import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import appColors from '../../AppConstants/appColors';
import {AppImages} from '../../AppConstants/AppImages';
import {screenSize} from '../../components/atom/ScreenSize';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../AppConstants/Constants.json';
import {GetRequest, PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import {TabRouter} from '@react-navigation/native';
import Share from 'react-native-share';
import {LATEST_SELECT, approve} from '../../AppConstants/appConstants';

const BarberProfile = ({navigation, route}) => {
  const {barberId} = route.params || {};

  console.log('barberIdbarberId222111', barberId);

  const [barberDetail, setBarberDetail] = useState();
  const [barberProfile, setBarberProfile] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [barberList, setBarberList] = useState();
  const [Loading, setLoading] = useState(true);

  const Profiles = [
    {
      // title: 'Find Barber & Salons Easily in Your Hands',
      illustration: AppImages.ProfileSlider,
    },
    {
      // title: 'Book Your Favorite Barber & Salon Quickly',
      illustration: AppImages.slider2,
    },
    {
      // title: 'Schedule the Appointment in the best Salon',
      illustration: AppImages.slider3,
    },
  ];

  useEffect(() => {
    getBarber_Detail();
    getBarberList();
    getBarberDetails();
  }, []);

  function getBarberList() {
    PostRequest(endPoint.BARBER_LIST)
      .then(res => {
        console.log('res', res?.data);
        if (res?.data?.code == 200) {
          setBarberList(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  function getBarber_Detail() {
    GetRequest(`${endPoint.BARBER_DETAIL}?id=${barberId}`)
      .then(res => {
        console.log('res', res?.data);
        if (res?.data?.code == 200) {
          setBarberProfile(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  const shareProfile = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const constructedUrl = await constructProfileUrl();
        const options = {
          message: 'Check out Barber Profile!',
          url: constructedUrl,
        };
        await Share.open(options);
      } catch (error) {
        console.log('Error sharing:', error.message);
      }
    });
  };

  const constructProfileUrl = () => {
    return Promise.resolve(
      `revx://revx.com/barberprofile/profileId=${barberId}`,
    );
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.slide}>
        <Image source={item.illustration} style={styles.image} />
        {/* <Text style={styles.title}>{item.title}</Text> */}
      </View>
    );
  };

  const getBarberDetails = () => {
    const payload = {
      operationID: LATEST_SELECT,
      roleID: 3,
      isActive: true,
      userID: barberId,
      userIP: '',
      pageSize: 1,
      pageNumber: 1,
    };
    PostRequest(endPoint.ADMIN_USERDETAILS, payload)
      .then(res => {
        if (res?.data?.length > 0) {
          console.log('BarberDetails ------------------', res?.data);
          setBarberDetail(res?.data?.[0]);
        } else {
          SimpleSnackBar('Barber Details not Found', appColors.Red);
        }
      })
      .catch(err => {
        console.log('Error', err);
        SimpleSnackBar(messages.WentWrong, appColors.Red);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: appColors.Black}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={{flex: 0.4}}>
        <Carousel
          //  ref={carouselRef}
          data={Profiles}
          renderItem={renderItem}
          onSnapToItem={index => setActiveSlide(index)}
          sliderWidth={screenSize.width}
          itemWidth={screenSize.width}
          autoplay={false}
        />
        <Pagination
          dotsLength={Profiles.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
        <View
          style={{flex: 1, position: 'absolute', top: 40, left: 0, right: 0}}>
          <View style={{flex: 0.1}}>
            <Header
              lefttIcoType={Icons.Ionicons}
              onPressLeftIcon={() =>
                navigation.navigate(constants.screen.HomeScreen)
              }
              leftIcoName={'chevron-back'}
              doubleIcon={true}
              color={appColors.Black}
              // headerText={'Barber Special List'}
              rightIcoName={'filter'}
              rightIcoType={Icons.Feather}
              rightIcoSize={20}
              iconContainerStyle1={{
                backgroundColor: appColors.White,
                borderRadius: 50,
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              rightIcoName2={'bell'}
              rightIcoType2={Icons.FontAwesome5}
              rightIcoSize2={20}
              rightIcoColor={appColors.Black}
              doubleIconright={() =>
                navigation.navigate(constants.screen.Notification)
              }
              iconContainerStyle2={{
                backgroundColor: appColors.White,
                borderRadius: 50,
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 0.1, flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 0.79}}>
          <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 27, color: appColors.White}}>
              {barberProfile?.userName}
            </Text>
          </View>
          <View style={{flex: 0.35, flexDirection: 'row'}}>
            <View style={{flex: 0.33, flexDirection: 'row'}}>
              <View style={{flex: 0.23, justifyContent: 'center'}}>
                <CustomIcon
                  type={Icons.Ionicons}
                  name={'location-outline'}
                  color={appColors.White}
                  size={20}
                />
              </View>
              <View style={{flex: 0.77, justifyContent: 'center'}}>
                <View>
                  <Text
                    style={{
                      color: appColors.White,
                      fontSize: 15,
                      fontWeight: '500',
                    }}>
                    {/* {barberDetails.type} */}
                    1.6 km
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.77, flexDirection: 'row'}}>
              <View style={{flex: 0.11, justifyContent: 'center'}}>
                <CustomIcon
                  type={Icons.AntDesign}
                  name={'staro'}
                  color={appColors.Goldcolor}
                  size={18}
                />
              </View>
              <View style={{flex: 0.89, justifyContent: 'center'}}>
                <Text
                  style={{
                    color: appColors.White,
                    fontSize: 15,
                    fontWeight: '500',
                  }}>
                  4.1rating
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 0.21}}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View style={styles.Ratingbox}>
              <View
                style={{
                  color: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  type={Icons.AntDesign}
                  name={'staro'}
                  color={appColors.Goldcolor}
                  size={17}
                />
                <Text style={{color: '#c79647', fontSize: 12}}>4.1</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 0.35, justifyContent: 'center'}}>
            <View>
              <Text
                style={{
                  color: appColors.Goldcolor,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                5k+ ratings
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </View>
      <View style={{flex: 0.11, flexDirection: 'row', paddingHorizontal: 5}}>
        <View style={{flex: 0.2}}>
          <View
            style={{
              flex: 0.73,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 55,
                width: 55,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: appColors.White,
                borderWidth: 2,
              }}>
              <CustomIcon
                type={Icons.Ionicons}
                name={'location-outline'}
                color={appColors.White}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.27, justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: appColors.White,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Location
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.2}}>
          <View
            style={{
              flex: 0.73,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 55,
                width: 55,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: appColors.White,
                borderWidth: 2,
              }}>
              <CustomIcon
                type={Icons.Ionicons}
                name={'chatbubble-ellipses-outline'}
                color={appColors.White}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.27, justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: appColors.White, fontSize: 17}}>Chat</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.2}}>
          <View
            style={{
              flex: 0.73,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={shareProfile}
              style={{
                borderRadius: 50,
                height: 55,
                width: 55,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: appColors.White,
                borderWidth: 2,
              }}>
              <CustomIcon
                type={Icons.Ionicons}
                name={'share-outline'}
                color={appColors.White}
                size={25}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 0.27}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: appColors.White,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Share
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{flex: 0.04, marginHorizontal: 10, justifyContent: 'center'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: appColors.White,
            borderStyle: 'dashed',
            backgroundColor: 'transparent',
          }}></View>
      </View>
      <View
        style={{flex: 0.05, justifyContent: 'center', marginHorizontal: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, color: appColors.White}}>
            Barber Specialist
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(constants.screen.BarberSpecialist)
            }>
            <Text style={{color: appColors.Goldcolor, fontSize: 15}}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
        {barberList?.length > 0 ? (
          <View style={{flex: 1}}>
            {barberList
              ?.filter(y => y.statusId == approve)
              ?.slice(0, 3)
              ?.map((x, i) => (
                <View key={i} style={{flex: 0.33, justifyContent: 'center'}}>
                  <View
                    style={{
                      backgroundColor: appColors.darkgrey,
                      paddingVertical: 5,
                      paddingHorizontal: 12,
                      borderRadius: 70,
                      flexDirection: 'row',
                      marginVertical: 5,
                      marginHorizontal: 6,
                    }}>
                    <View
                      style={{
                        flex: 0.2,
                        flexDirection: 'row',
                      }}>
                      <Image source={AppImages.bb1} />
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: appColors.White,
                          fontSize: 16,
                          marginLeft: 10,
                        }}>
                        {x.userName}
                      </Text>
                    </View>
                    <View style={{flex: 0.3, justifyContent: 'center'}}>
                      <ButtonComponent
                        title={'View'}
                        onPress={() => {
                          navigation.push(constants.screen.BarberProfile, {
                            barberId: x?.userId,
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
          </View>
        ) : (
          <Fragment>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'do-not-disturb-alt'}
                color={appColors.Goldcolor}
                size={80}
              />
              <Text
                style={{
                  color: appColors.White,
                  fontSize: 16,
                  marginTop: 10,
                }}>
                No Barber Listed
              </Text>
            </View>
          </Fragment>
        )}
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          paddingHorizontal: 12,
        }}>
        <ButtonComponent
          title={'View Services'}
          onPress={() =>
            navigation.navigate(constants.screen.Services, {
              barberDetails: barberDetail,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.Black,
  },

  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.Goldcolor,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.darkgrey,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  Ratingbox: {
    height: screenSize.height / 28,
    width: screenSize.width / 7,
    justifyContent: 'center',

    borderWidth: 0.75,
    borderRadius: 7,
    borderColor: '#c79647',
  },
});
export default BarberProfile;
