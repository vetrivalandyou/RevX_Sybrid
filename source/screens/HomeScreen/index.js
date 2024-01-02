import React from "react";
import { Image, Text, View, TouchableOpacity, FlatList, ScrollView, ImageBackground } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import appColors from "../../AppConstants/appColors";
import styles from "./styles";
import { AppImages } from "../../AppConstants/AppImages";
import CustomIcon, { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import Search from "../../components/atom/Search/Search";
import { screenSize } from "../../components/atom/ScreenSize";
import ButtonComponent from "../../components/atom/CustomButtons/ButtonComponent";
import constants from "../../AppConstants/Constants.json"






const HomeScreen = ({ navigation }) => {
  const OurServicesData = [
    {
      id: 1,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,
    },
    {
      id: 2,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,
    },
    {
      id: 3,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,
    },
    {
      id: 4,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,
    },
    {
      id: 5,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,
    },
    {
      id: 6,
      title: 'Haircut for Men',
      Imagesource: AppImages.ourservices,
    },
  ];
  const NearbyBarbersData = [
    {
      id: 1,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
    },
    {
      id: 2,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
    },
    {
      id: 3,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
    },
    {
      id: 4,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
    },
    {
      id: 5,
      title: 'The Barber Shop',
      Imagesource: AppImages.nearbybarbers,
    },
  ];

  const OurServices = ({ item }) => {
    return (

      <View style={{ marginHorizontal: 3, height: screenSize.height / 5, width: screenSize.width / 3, alignItems: 'center' }}>
        <View style={{ flex: 1, width: '100%' }}>
          <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ aspectRatio: 1, resizeMode: 'contain' }} source={item.Imagesource} />



          </View>
          <View style={{ flex: 0., alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: appColors.White, fontSize: 16, }}>
              Shave For Men
            </Text>
          </View>
        </View>

      </View>
    );
  };


  const NearbyBarbers = ({ item }) => {
    return (

      <View style={{ marginHorizontal: 5, height: screenSize.height / 3, width: screenSize.width / 2, alignItems: 'center', borderRadius: 10, borderWidth: 2, borderColor: appColors.darkgrey, padding: 10 }}>
        <View style={{ flex: 1, width: "100%" }}>

          <View style={{ flex: 0.6, borderRadius: 30 }}>

            <ImageBackground style={{ flex: 1 }} source={item.Imagesource} resizeMode="contain"  >

            </ImageBackground>



          </View>
          <View style={{ flex: 0.15, justifyContent: 'center' }}>
            <Text style={{ color: appColors.White, fontSize: 20, }}>
              {item.title}
            </Text>
          </View>

          <View style={{ flex: 0.11, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', flex: 0.5 }}>
              <CustomIcon type={Icons.Feather} name={"map-pin"} color={appColors.White} />
              <Text style={{ color: appColors.White, marginLeft: 5 }}>0.8km</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 0.5 }}>
              <CustomIcon type={Icons.AntDesign} name={"staro"} color={appColors.Goldcolor} />
              <Text style={{ color: appColors.White, marginLeft: 5 }}>0.8km</Text>
            </View>



          </View>
          <View style={{ flex: 0.1, justifyContent: 'center' }}>
            <View
              style={{ height: 1, backgroundColor: appColors.darkgrey, width: '100%' }}>

            </View>

          </View>
          <View style={{ flex: 0.2 }}>
            <ButtonComponent title={"View Barber Profile"} style={{ paddingVertical: 10 }} />

          </View>

        </View>

      </View>

    )



  }
  const HomeHeader = ({ heading, sunHeading, source }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>

          <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={source} />
          </View>


          <View style={{ flex: 0.8, justifyContent: 'space-between', flexDirection: 'row' }}>


            <View style={{ flex: 0.6, }}>

              <View style={{ flex: 0.6, justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, color: appColors.White, }}>
                  {heading}
                </Text>
              </View>
              <View style={{ flex: 0.4, flexDirection: 'row', }}>
                <CustomIcon type={Icons.Feather} name={"map-pin"} color={appColors.White} size={20} />

                <Text style={{ marginLeft: 5, color: appColors.White, fontSize: 14 }}>
                  {sunHeading}
                </Text>
              </View>


            </View>


            <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              <TouchableOpacity
                style={{ backgroundColor: appColors.darkgrey, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
              >
                <CustomIcon type={Icons.FontAwesome5} name={"bell"} color={appColors.White} />

              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: appColors.darkgrey, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
              >
                <CustomIcon type={Icons.Feather} name={"filter"} color={appColors.White} />

              </TouchableOpacity>



            </View>

          </View>

        </View>
      </View>

    )
  }
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

      <View style={{ height: screenSize.height }}>
        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, color: appColors.White }}>
            Our Services
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(constants.screen.Services)}
            style={{}}
          >
            <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
              See all
            </Text>
          </TouchableOpacity>

          <ScrollView style={{ flex: 0.75 }}>
            <View style={{}}>
              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 22, color: appColors.White }}>
                  Our Services
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(constants.screen.Services)}
                  style={{}}>
                  <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.2 }}>
                <FlatList
                  data={OurServicesData}
                  renderItem={({ item }) => <OurServices item={item} />}
                  keyExtractor={item => item.id}
                  horizontal={true}
                />
              </View>

              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 22, color: appColors.White }}>
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

              <View style={{ flex: 0.4 }}>
                <FlatList
                  data={NearbyBarbersData}
                  renderItem={({ item }) => <NearbyBarbers item={item} />}
                  keyExtractor={item => item.id}
                  horizontal={true}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Screen>
  )

};

export default HomeScreen
