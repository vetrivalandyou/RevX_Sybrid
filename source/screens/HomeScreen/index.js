import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import styles from './styles';
import { AppImages } from '../../AppConstants/AppImages';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import Search from '../../components/atom/Search/Search';
import { screenSize } from '../../components/atom/ScreenSize';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../AppConstants/Constants.json';
import { screensEnabled } from 'react-native-screens';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
const HomeScreen = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const OurServicesData = [
    {
      id: 1,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,

    },
    {
      id: 2,
      title: 'Shave For Men',
      Imagesource: AppImages.ourservices2,

    },
    {
      id: 3,
      title: 'Facial for Men',
      Imagesource: AppImages.ourservices3,

    },
    {
      id: 4,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,

    },
    {
      id: 5,
      title: 'Shave For Men',
      Imagesource: AppImages.ourservices2,

    },
    {
      id: 6,
      title: 'Facial for Men',
      Imagesource: AppImages.ourservices3,

    },
  ];
  const BarbersData = [
    {
      id: 1,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off'


    },
    {
      id: 2,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
      percentageimage: AppImages.Percentage,
      lable: 'Get a discount for every service order! ',
      sublable: 'only valid for toda',
      percentage: '50% Off'
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
  

  
  const OurServices = ({ item }) => {
    return (
      <View
        style={{
          marginHorizontal: 3,
          height: screenSize.height / 5,
          width: screenSize.width / 3.9,
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <View style={{ flex: 1, width: '100%' }}>
          <View
            style={{
              flex: 0.65,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'green',
            }}>
            <Image
              style={{ resizeMode: 'contain', flex: 1 }}
              source={item.Imagesource}
            />
          </View>
          <View
            style={{
              flex: 0.35,
              flexWrap: 'wrap',
              // backgroundColor: 'pink',
            }}>
            <Text style={{ color: appColors.White, fontSize: 14 }}>
              {item.title}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const NearbyBarbers = ({ item }) => {
    return (
      <View
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
        <View style={{ flex: 1, width: '100%' }}>
          <View style={{ flex: 0.8, borderRadius: 30 }}>
            <ImageBackground
              style={{ flex: 1 }}
              source={item.Imagesource}
              resizeMode="contain"></ImageBackground>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'center' }}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 18,
   
              }}>
              {item.title}
            </Text>
          </View>

          <View style={{ flex: 0.11, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', flex: 0.5 }}>
              <CustomIcon
                type={Icons.Feather}
                name={'map-pin'}
                color={appColors.White}
                size={16}
              />
              <Text style={{ color: appColors.White, marginLeft: 5 }}>0.8km</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 0.5 }}>
              <CustomIcon
                type={Icons.AntDesign}
                name={'staro'}
                color={appColors.Goldcolor}
                size={16}
              />
              <Text style={{ color: appColors.White, marginLeft: 5 }}>0.8km</Text>
            </View>
          </View>
          <View style={{ flex: 0.1, justifyContent: 'center' }}>
            <View
              style={{
                height: 1,
                backgroundColor: appColors.White,
                width: '100%',
              }}></View>
          </View>
          <View style={{ flex: 0.2 }}>
            <ButtonComponent
              title={'View Barber Profile'}
              style={{ paddingVertical: 9 }}
              onPress={() =>
                navigation.navigate(constants.screen.BarberProfile)}
            />
          </View>
        </View>
      </View>
    );
  };

  
  const Bestoffer = ({ item }) => {
    return (
      <View
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
        <View style={{ flex: 1, width: '100%' }}>
          <View style={{ flex: 0.55, }} >
            <Image
              style={{ width: '100%', height: '100%', borderRadius: 25 }}
              source={item.Imagesource}>

            </Image>
           
            <View style={{ position: 'absolute', padding: 10, width: '97%', alignItems: 'flex-end' }}>
              <CustomIcon
                type={Icons.AntDesign}
                name={'hearto'}
                color={appColors.White}
                size={20}
              />
            </View>
          </View>
          <View style={{ flex: 0.15, justifyContent: 'center', }}>
            <Text
              style={{
                color: appColors.White,
                fontSize: 25,

              }}>
              {item.title}
            </Text>
          </View>
          <View style={{ flex: 0.17, }}>
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
          <View style={{ flex: 0.13, flexDirection: 'row' }}>

            <View style={{ flexDirection: 'row', flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
              <CustomIcon
                type={Icons.Feather}
                name={'map-pin'}
                color={appColors.White}
                size={16}
              />
              <Text style={{ color: appColors.White, marginLeft: 5 }}>0.8km</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
              <CustomIcon
                type={Icons.AntDesign}
                name={'staro'}
                color={appColors.Goldcolor}
                size={16}
              />
              <Text style={{ color: appColors.White, marginLeft: 5 }}>4.1rating</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 0.44, justifyContent: 'flex-end' }}>
              <View style={{ height: 40, width: '88%', borderWidth: 1, borderRadius: 10, backgroundColor: 'white' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }} >
                    <Image

                      source={item.percentageimage}>

                    </Image>
                  </View>
                  <View style={{ flex: 0.6, justifyContent: 'center' }} >
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
          <View>
          </View>
        </View>

      </View>
    );
  };
  const HomeHeader = ({ heading, sunHeading, source }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={source} />
          </View>

          <View
            style={{
              flex: 0.8,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{ flex: 0.6 }}>
              <View style={{ flex: 0.6, justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, color: appColors.White }}>
                  {heading}
                </Text>
              </View>
              <View style={{ flex: 0.4, flexDirection: 'row' }}>
                <CustomIcon
                  type={Icons.Feather}
                  name={'map-pin'}
                  color={appColors.White}
                  size={18}
                />

                <Text
                  style={{ marginLeft: 5, color: appColors.White, fontSize: 14 }}>
                  {sunHeading}
                </Text>
              </View>
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
      viewStyle={{ padding: 15, flex: 0.9 }}>
      <View style={{ flex: 0.1 }}>
        <HomeHeader
          heading={'Jonna Emma'}
          sunHeading={'Washington DC'}
          source={AppImages.profile}
        />
      </View>

      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          // backgroundColor: 'green',
          marginTop: 10,
        }}>
        <Search leaftIconType={Icons.Ionicons} leftIconName={'filter'} />
      </View>

      <ScrollView style={{ flex: 0.8, }} >

        <View
          style={{
            height: screenSize.height / 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',


          }}>
          <Text style={{ fontSize: 20, color: appColors.White }}>
            Our Services
          </Text>
          <TouchableOpacity
          // onPress={() => navigation.navigate(constants.screen.Services)}
          >
            <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: screenSize.height / 6 }}>
          <FlatList
            data={OurServicesData}
            renderItem={({ item }) => <OurServices item={item} />}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>

        <View
          style={{
            height: screenSize.height / 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

          }}>
          <Text style={{ fontSize: 20, color: appColors.White }}>
            Nearby Barbers
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(constants.screen.BarberSpecialist)
            }
            style={{}}>
            <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: screenSize.height / 2.9, }}>
          <FlatList
            data={BarbersData}
            renderItem={({ item }) => <NearbyBarbers item={item} />}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>

        <View
          style={{
            height: screenSize.height / 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal:10,
          

          }}>
          <Text style={{ fontSize: 20, color: appColors.White }}>
            Best Offer
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(constants.screen.BarberSpecialist)
            }
            style={{}}>
            <Text style={{ color: appColors.Goldcolor, fontSize: 16, }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: screenSize.height / 2.35, }}>
          <FlatList
            data={BarbersData}
            renderItem={({ item }) => <Bestoffer item={item} />}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>




      </ScrollView>

    </Screen>
  );
};

export default HomeScreen;