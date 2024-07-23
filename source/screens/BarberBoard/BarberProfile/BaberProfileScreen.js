import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Share from 'react-native-share';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import profile from '../../../assets/chatfive.png';
import constants from '../../../AppConstants/Constants.json';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import LogoutBottom from '../../LogoutBottom';
import {screenSize} from '../../../components/atom/ScreenSize';
import {GetRequest} from '../../../services/apiCall';
import Entypo from 'react-native-vector-icons/Entypo';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import {imageUrl} from '../../../AppConstants/urlConstants';
import DynamicLinks from '@react-native-firebase/dynamic-links';

const BaberProfileScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const isFocused = useIsFocused();

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (isFocused) {
      getAsyncData();
    }
  }, [isFocused]);

  const getAsyncData = async () => {
    const userDetails = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetails);
  };

  const constructProfileUrl = barberDetails => {
    return Promise.resolve(
      `revx://revx.com/barberprofile/profileId=${barberDetails?.userId}`,
    );
  };

  const BarberList = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: Icons.Entypo,
    },

    {
      id: 2,
      title: 'Share On Social Media',
      icon: Icons.Entypo,
    },
    {
      id: 3,
      title: 'Notification',
      icon: Icons.Entypo,
    },
    {
      id: 4,
      title: 'My Services',
      icon: Icons.Entypo,
    },

    {
      id: 5,
      title: 'Sign Out',
      icon: Icons.Entypo,
    },
  ];

  const handleNavigation = index => {
    switch (index) {
      case 0:
        navigation.navigate(constants.BarberScreen.Profile);
        break;
      case 1:
        shareUserProfileLink();
        break;
      case 3:
        navigation.navigate(constants.BarberScreen.Servicesboard);
        break;
      case 4:
        refRBSheet.current.open();
        break;
      default:
        break;
    }
  };

  console.log("UserDetails", userDetails)

  const generateLink = async () => {
    try {
      const link = await DynamicLinks().buildShortLink(
        {
          link: `https://revx.page.link/g576?barberProfileId=${userDetails?.userId}`,
          domainUriPrefix: 'https://revx.page.link',
          android: {
            packageName: 'com.revxmobileapp',
          },
          ios: {
            appStoreId: '123456789',
            bundleId: 'com.proceed.RevXMobileApp',
          },
        },
        DynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('Link', link);
      return Promise.resolve(link);
    } catch (err) {
      console.log('err', err);
    }
  };

  const shareUserProfileLink = async () => {
    console.log("----------")
      try {
        const constructedUrl = await generateLink();
        const options = {
          message: 'Check out RevX App!',
          url: constructedUrl,
        };
        console.log("option", options)
        await Share.open(options);
      } catch (error) {
        console.log('Error sharing:', error.message);
      }
  };

  const ProfileContainer = ({item, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            flexDirection: 'row',
            marginVertical: 5,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: appColors.White,
              fontSize: 16,
              fontWeight: 500,
              marginLeft: 5,
            }}>
            {item.title}
          </Text>
          <Entypo name="chevron-right" size={25} color={appColors.White} />
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: appColors.darkgrey,
            width: '92%',
            marginHorizontal: 14,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: 'appColors.Black'}}>
      <BottomSheet ref={refRBSheet} Height={screenSize.height / 5}>
        <LogoutBottom refRBSheet={refRBSheet} />
      </BottomSheet>

      <View
        style={{
          flex: 0.09,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 14,
        }}>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <Image
            source={{uri: `${imageUrl}${userDetails?.profileImage}`}}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 100}}
          />
        </View>
        <View style={{flex: 0.8, marginLeft: 3, flexDirection: 'column'}}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 400}}>
            {userDetails?.userName}
          </Text>
          <Text style={{color: 'white', fontSize: 12, fontWeight: 400}}>
            {userDetails?.loginEmailId}
          </Text>
        </View>
        {/* <View>
          <TouchableOpacity
          // onPress={() => navigation.navigate(constants.screen.EditProfile)}
          >
            <View
              style={{
                paddingHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: appColors.Goldcolor,
                  fontSize: 18,
                  marginLeft: 5,
                }}>
                Edit
              </Text>
              <Entypo
                name="chevron-right"
                size={18}
                color={appColors.Goldcolor}
              />
            </View>
          </TouchableOpacity>
        </View> */}
      </View>

      <View
        style={{
          height: 1,
          position: 'relative',
          marginHorizontal: 15,
          margin: 10,
        }}>
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
          flex: 0.03,
          borderBottomWidth: 3,
          borderStyle: 'dotted',
          marginBottom: 20,
          borderColor: appColors.White,
          marginHorizontal: 20,
        }}></View> */}

      <View style={{flex: 0.9, padding: 2, backgroundColor: appColors.Black}}>
        {BarberList.map((item, index) => (
          <ProfileContainer
            key={index}
            item={item}
            onPress={() => handleNavigation(index)}
          />
        ))}
      </View>
    </Screen>
  );
};

export default BaberProfileScreen;
