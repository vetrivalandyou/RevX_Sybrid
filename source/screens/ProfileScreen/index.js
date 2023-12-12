import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  TouchableOpacity,
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

const ProfileScreen = ({navigation}) => {
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

  const handleNavigation = index => {
    // Use the index to navigate to different screens or perform any action based on the index
    switch (index) {
      case 0:
        navigation.navigate(constants.screen.AboutUs);
        break;
      // Add more cases as per your requirement
      default:
        // Default navigation or action for other indices
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
      <View
        style={{
          flex: 0.07,
          // backgroundColor: appColors.Black,
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

      <View
        style={{
          flex: 0.02,
          borderBottomWidth: 5,
          borderStyle: 'dotted',
          marginBottom: 20,
          borderColor: appColors.White,

          // backgroundColor: 'pink',
        }}></View>

      {/* <Header
        lefttIcoType={Icons.Ionicons}
        leftIcoName={'chevron-back'}
        headerText={'Barber Earnings'}
        rightIcoName={'bell'}
        rightIcoType={Icons.SimpleLineIcons}
        logIn={'success'}
        rightIcoSize={20}
        leftIcoStyle={{
          backgroundColor: appColors.lightBlack,
          borderRadius: 50,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      /> */}
      <View style={{flex: 0.9, padding: 10, backgroundColor: appColors.Black}}>
        {BarberList.map((item, index) => (
          <ProfileContainer
            key={index}
            item={item}
            onPress={() => handleNavigation(index)} // Pass the index to handleNavigation function
          />
        ))}
      </View>
    </Screen>
  );
};
export default ProfileScreen;
