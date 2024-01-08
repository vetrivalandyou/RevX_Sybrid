import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';
import {screenSize} from '../../components/atom/ScreenSize';
import constants from '../../AppConstants/Constants.json';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';

const ServicesDetails = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Hair Cut',
      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
    {
      id: 2,
      name: 'Hair Coloring',
      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
    {
      id: 3,
      name: 'Hair Wash',

      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
    {
      id: 4,
      name: 'Shaving',

      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
    {
      id: 5,
      name: 'Skin Care',

      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },

    {
      id: 6,
      name: 'Hair Dryer',

      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
    {
      id: 7,
      name: 'Face Makeup',

      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
    {
      id: 8,
      name: 'Royal Wax',

      price: '$40.00',
      title: '44 types',
      icon: <Entypo name="controller-play" size={17} color={'orange'} />,
    },
  ];
  return (
    <View style={{height: screenSize.height, backgroundColor: 'black'}}>
      <View style={{flex: 0.6}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Our Services'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
          }
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => <Barberinfo item={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(constants.screen.AppointmentDate)}
        style={styles.ApplyNOWButton}>
        <Text style={{fontWeight: '700', fontSize: 13, color: 'white'}}>
          {' '}
          Book Now / $120
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Barberinfo = ({item}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={{width: screenSize.width / 4}}>
          <Text style={{fontWeight: '400', fontSize: 15, color: 'white'}}>
            {item.name}
          </Text>
        </View>

        <View style={{width: screenSize.width / 5}}>
          <Text style={{fontWeight: '500', color: '#c79647', fontSize: 15}}>
            {item.price}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: screenSize.width / 4.5,
          }}>
          <Text style={{fontWeight: '500', color: 'white'}}>{item.title}</Text>

          <Text style={{fontWeight: '200'}}>{item.icon}</Text>
        </View>
      </View>
    </View>
  );
};

export default ServicesDetails;

const styles = StyleSheet.create({
  container: {
    width: screenSize.width / 1.07,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#252525',
    marginHorizontal: 12,
    marginVertical: 8,
  },

  NoticationContainer: {
    height: screenSize.height / 20,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  ApplyNOWButton: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: 15,
    marginHorizontal: 14,
    borderRadius: 40,
    marginVertical: 25,
  },
});
