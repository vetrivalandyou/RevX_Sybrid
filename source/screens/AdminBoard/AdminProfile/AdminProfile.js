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
      title: 'Approve Sub Service',
      icon: Icons.Entypo,
    },
    {
      id: 4,
      title: 'Manage Content',
      icon: Icons.Entypo,
    },
    {
      id: 5,
      title: 'Manage Vans',
      icon: Icons.Entypo,
    },
    {
      id: 6,
      title: 'Van Assignments',
      icon: Icons.Entypo,
    },
    {
      id: 7,
      title: 'Our Services',
      icon: Icons.Entypo,
    },

    {
      id: 8,
      title: 'Approve Barber',
      icon: Icons.Entypo,
    },
    {
      id: 9,
      title: 'Setup Slots',
      icon: Icons.Entypo,
    },
    {
      id: 10,
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
        navigation.navigate(constants.AdminScreens.AdminBarberDetails);
        break;
      case 2:
        navigation.navigate(constants.AdminScreens.ApproveSubServices);
        break;
      case 3:
        navigation.navigate(constants.AdminScreens.AdminManageContent);
        break;
      case 4:
        navigation.navigate(constants.AdminScreens.ManageVans);
        break;
      case 5:
        navigation.navigate(constants.AdminScreens.Assignments);
        break;
      case 6:
        navigation.navigate(constants.AdminScreens.OurServices);
        break;
      case 7:
        navigation.navigate(constants.AdminScreens.AdminApproveBarber);
        break;
      case 8:
        navigation.navigate(constants.AdminScreens.AdminSetupSlots);
        break;
      case 9:
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
        <View style={{flex: 0.13}}>
          <TouchableOpacity>
            <Image
              source={profile}
              resizeMode="cover"
              style={{width: 50, height: 50}}
            />

            <CustomIcon
              type={Icons.AntDesign}
              size={18}
              name={'pluscircle'}
              color={'white'}
              style={{position: 'absolute', left: 35, top: 33}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.58, flexDirection: 'column'}}>
          <Text style={{color: 'white', fontSize: 24, fontWeight: 400}}>
            Super Admin
          </Text>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
            SuperAdmin@revx.com{' '}
          </Text>
        </View>
        <View style={{flex: 0.2}}>
          {/* <TouchableOpacity>
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
          </TouchableOpacity> */}
        </View>
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

export default AdminProfile;
