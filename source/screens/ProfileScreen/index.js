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
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import Header from '../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../AppConstants/AppImages';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import profile from '../../assets/profile.png';
import constants from '../../AppConstants/Constants.json';
import BottomSheet from '../../components/molecules/BottomSheetContent/BottomSheet';
import LogoutBottom from '../LogoutBottom';
import {screenSize} from '../../components/atom/ScreenSize';

const ProfileScreen = ({navigation}) => {
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const refRBSheet = useRef();

  const BarberList = [
    {
      id: 1,
      title: 'About Us',
      icon: Icons.Entypo,
    },

    {
      id: 2,
      title: 'Appointment',
      icon: Icons.Entypo,
    },
    {
      id: 3,
      title: 'Nearby Vans',
      icon: Icons.Entypo,
    },
    {
      id: 4,
      title: 'Profile',
      icon: Icons.Entypo,
    },
    {
      id: 5,
      title: 'Loyalty Points',
      icon: Icons.Entypo,
    },
    {
      id: 6,
      title: 'Notification',
      icon: Icons.Entypo,
    },
    {
      id: 7,
      title: 'Refer a Friend',
      icon: Icons.Entypo,
    },
    {
      id: 8,
      title: 'Sign Out',
      icon: Icons.Entypo,
    },
  ];

  const handleSignOut = () => {
    setIsSignOutModalVisible(false);
  };

  const handleNavigation = index => {
    switch (index) {
      case 0:
        navigation.navigate(constants.screen.AboutUs);
        break;
      // case 6:
      //   navigation.navigate(constants.screen.AboutUs);
      //   break;
      case 7: // Index of 'Sign Out' item
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
      <BottomSheet ref={refRBSheet} Height={screenSize.height / 4}>
        <LogoutBottom refRBSheet={refRBSheet} />
      </BottomSheet>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSignOutModalVisible}
        onRequestClose={() => setIsSignOutModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#252525',
              // padding: 60,
              paddingHorizontal: 20,
              width: 410,
              paddingVertical: 40,
              borderRadius: 10,
              borderTopEndRadius: 30,
              borderTopStartRadius: 30,
            }}>
            <Text style={{fontSize: 20, fontWeight: 500, color: 'white'}}>
              Logout?
            </Text>
            <Text style={{fontSize: 15, fontWeight: 500, color: '#9E9E9E'}}>
              Are you sure you want to logout from the app?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <TouchableOpacity onPress={() => setIsSignOutModalVisible(false)}>
                <Text
                  style={{
                    borderWidth: 1,
                    paddingVertical: 15,
                    paddingHorizontal: 60,
                    fontSize: 16,
                    borderRadius: 30,
                    color: appColors.White,
                    borderColor: appColors.White,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    borderWidth: 1,
                    paddingVertical: 15,
                    paddingHorizontal: 60,
                    fontSize: 16,
                    borderRadius: 30,
                    color: appColors.White,
                    borderColor: appColors.Red,
                    backgroundColor: appColors.Red,
                  }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            Jonna Emma
          </Text>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
            danielaustin@gmail.com
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(constants.screen.CreateAccount)}>
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

      <View style={{ height: 1, position:'relative', marginHorizontal: 15,  marginBottom: 20, }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor:'transparent'  }}></View>
          </View>

     

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

export default ProfileScreen;
