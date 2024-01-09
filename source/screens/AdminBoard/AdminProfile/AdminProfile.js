import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../AppConstants/AppImages';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import profile from '../../../assets/chatfive.png';
import constants from '../../../AppConstants/Constants.json';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import LogoutBottom from '../../LogoutBottom';
import {screenSize} from '../../../components/atom/ScreenSize';
import {useNavigation} from '@react-navigation/native';

const AdminProfile = () => {
  const navigation = useNavigation();

  const refRBSheet = useRef();

  const BarberList = [
    {
      id: 1,
      title: 'User Details',
      icon: Icons.Entypo,
    },

    {
      id: 2,
      title: 'Barber Details',
      icon: Icons.Entypo,
    },
    {
      id: 3,
      title: 'Notification',
      icon: Icons.Entypo,
    },
    {
      id: 4,
      title: 'Manage Content',
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
        navigation.navigate(constants.AdminScreens.AdminUserDetails);
        break;
        case 1:
        navigation.navigate(constants.AdminScreens.AdminUserDetails);
        break;
      case 2:
        navigation.navigate(constants.AdminScreens.AdminNotification);
        break;
        case 3:
          navigation.navigate(constants.AdminScreens.AdminManageContent);
          break;
      case 4: // Index of 'Sign Out' item
        // setIsSignOutModalVisible(true);
        refRBSheet.current.open();
        break;
      default:
        break;
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
      {/* <BottomSheet ref={refRBSheet} Height={screenSize.height - 452}>
        <LocationBottom refRBSheet={refRBSheet} />
      </BottomSheet> */}
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
        <View style={{flex: 0.1}}>
          <Image
            source={profile}
            resizeMode="cover"
            style={{width: 50, height: 50}}
          />
        </View>
        <View style={{flex: 0.7, flexDirection: 'column'}}>
          <Text style={{color: 'white', fontSize: 24, fontWeight: 400}}>
            Michel Smith
          </Text>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
            Michelsmith@gmail.com{' '}
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 12,
                flexDirection: 'row',
                // marginVertical: 5,
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
                size={20}
                color={appColors.Goldcolor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 0.03,
          borderBottomWidth: 3,
          borderStyle: 'dotted',
          marginBottom: 20,
          borderColor: appColors.White,
          marginHorizontal: 20,
        }}></View>

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

export default AdminProfile;
