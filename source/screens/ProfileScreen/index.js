import React from "react";
import { View, Text, Image, FlatList, AppRegistry, TouchableOpacity } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import appColors from "../../AppConstants/appColors";
import Header from "../../components/molecules/Header";
import CustomIcon, { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import { AppImages } from "../../AppConstants/AppImages";
import ButtonComponent from "../../components/atom/CustomButtons/ButtonComponent";
import Entypo from 'react-native-vector-icons/Entypo';



const ProfileScreen = () => {
  const BarberList = [
    {
      id: 1,
      title: 'About Us',
      icon: Icons.Entypo
    },
  
    {
      id: 1,
      title: 'Appointment',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Nearby Vans',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Profile',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Loyalty Points',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Loyalty Points',
      icon: Icons.Entypo
    },
    
    {
      id: 1,
      title: 'Loyalty Points',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Notification',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Refer a Friend',
      icon: Icons.Entypo
    },
    {
      id: 1,
      title: 'Sign Out',
      icon: Icons.Entypo
    },
    
  ]
  const ProfileContainer = ({ item ,onPress}) => {
    return (
      <TouchableOpacity
      onPress={onPress}
      style={{}}
      >


        <View style={{
          paddingVertical: 7,
          paddingHorizontal: 12,
          flexDirection: 'row',
          marginVertical: 5,
          //backgroundColor: 'red',
          justifyContent: 'space-between'

        }}>
          <Text style={{ color: appColors.White, fontSize: 15, marginLeft: 5 }}>
            {item.title}
          </Text>
          <Entypo name="chevron-right" size={25} color={appColors.White} />
        </View>
        <View
            style={{height: 2, backgroundColor: appColors.darkgrey, width: '100%'}}
          />
      </TouchableOpacity>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{ backgroundColor: appColors.Black }}

    >
      <Header
        lefttIcoType={Icons.Ionicons}
        leftIcoName={"chevron-back"}
        headerText={"Barber Earnings"}
        rightIcoName={"bell"}
        rightIcoType={Icons.SimpleLineIcons}
        logIn={"success"}
        rightIcoSize={20}
        leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
      />
      <View style={{ flex: 0.9, padding: 10, backgroundColor: appColors.Black }}>
        <FlatList
          data={BarberList}
          renderItem={({ item }) => <ProfileContainer item={item} />}
          keyExtractor={item => item.id}
        />

      </View>
    </Screen>

  )
}
export default ProfileScreen;
