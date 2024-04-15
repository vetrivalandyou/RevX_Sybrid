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
import Share from 'react-native-share';
import Header from '../../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../../components/molecules/CustomIcon/CustomIcon';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import appColors from '../../../../AppConstants/appColors';
import {AppImages} from '../../../../AppConstants/AppImages';
import {screenSize} from '../../../../components/atom/ScreenSize';
import ButtonComponent from '../../../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../../../AppConstants/Constants.json';
import {GetRequest} from '../../../../services/apiCall';
import {endPoint} from '../../../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../../../components/atom/Snakbar/Snakbar';
import {getAsyncItem} from '../../../../utils/SettingAsyncStorage';

const Profile = ({navigation}) => {
  const [barberDetails, setBarberDetails] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    getAsyncDetail();
  }, [isLoading]);

  const getAsyncDetail = async () => {
    console.log('Inside');
    const barberDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    getBarber_Detail(barberDetails?.userId);
    console.log('barberDetails', barberDetails);
  };

  function getBarber_Detail(userId) {
    console.log('userId', userId);
    GetRequest(`${endPoint.BARBER_DETAIL}?id=${94}`)
      .then(res => {
        console.log('asdasd', res?.data);
        if (res?.data?.code == 200) {
          setBarberDetails(res?.data?.data);
          setIsLoading(false);
        } else {
          SimpleSnackBar(res?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }

  const getbarberProfile = () => {
    GetRequest(`Admin/Barber_Detail?id=${21}`)
      .then(res => {
        console.log('res', res?.data);
        shareProfile(res?.data?.data);
      })
      .catch(err => {
        console.log('Hello', err);
      });
  };

  const shareProfile = async barberDetails => {
    return new Promise(async (resolve, reject) => {
      try {
        const constructedUrl = await constructProfileUrl(barberDetails);
        const options = {
          message: 'Check out My Profile!',
          url: constructedUrl,
        };
        await Share.open(options);
      } catch (error) {
        console.log('Error sharing:', error.message);
      }
    });
  };

  const constructProfileUrl = barberDetails => {
    return Promise.resolve(
      `revx://revx.com/barberprofile/profileId=${barberDetails?.userId}`,
    );
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.slide}>
        <Image source={item.illustration} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.Black,
        justifyContent: 'center',
      }}>
      <View style={{flex: 1}}>
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
            autoplay={true}
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
            style={{
              flex: 1,
              position: 'absolute',
              top: 40,
              left: 0,
              right: 0,
            }}>
            <View style={{flex: 0.1}}>
              <Header
                lefttIcoType={Icons.Ionicons}
                onPressLeftIcon={() => navigation.goBack()}
                leftIcoName={'chevron-back'}
                doubleIcon={true}
                color={appColors.Black}
                headerText={'Barber Special List'}
                rightIcoName={'filter'}
                rightIcoType={Icons.Feather}
                rightIcoSize={20}
                iconStyle={{color:appColors.Black,fontWeight:'bold'}}
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
                {barberDetails?.userName}
              </Text>
            </View>
            <View style={{flex: 0.35, flexDirection: 'row'}}>
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
                    4.1 rating
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
                  <Text style={{color: '#c79647', fontSize: 12}}>4.1 </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: appColors.Goldcolor,
                    fontSize: 14,
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
                onPress={getbarberProfile}
                style={{
                  borderRadius: 50,
                  height: 55,
                  width: 55,
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
          style={{
            flex: 0.04,
            marginHorizontal: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: appColors.White,
              borderStyle: 'dashed',
              backgroundColor: 'transparent',
            }}></View>
        </View>
        <View style={{flex: 0.39, justifyContent: 'center'}}>
          {barberDetails?.barberServices?.length > 0 ? (
            <Fragment>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  marginHorizontal: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18, color: appColors.White}}>
                    Barber Services
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(constants.BarberScreen.Servicesboard)
                    }>
                    <Text style={{color: appColors.Goldcolor, fontSize: 15}}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {barberDetails?.barberServices.slice(0, 3)?.map((x, i) => (
                <View key={i} style={{flex: 0.3, justifyContent: 'center'}}>
                  <View
                    style={{
                      backgroundColor: appColors.darkgrey,
                      paddingVertical: 7,
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
                        flex: 0.8,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: appColors.White, fontSize: 16, marginLeft: 10}}>
                        {x.serviceName}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </Fragment>
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
                  No Service Added
                </Text>
              </View>
            </Fragment>
          )}
        </View>
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
export default Profile;
