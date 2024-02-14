import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import appColors from '../../AppConstants/appColors';
import constants from '../../AppConstants/Constants.json';
import Header from '../../components/molecules/Header';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../../components/atom/ScreenSize';
import Entypo from 'react-native-vector-icons/Entypo';
import {GetRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';

const Services = ({route}) => {
  const {userId} = route.params;

  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [barberServices, setBarberServices] = useState([]);

  useEffect(() => {
    getBarberServices();
  }, []);
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

  function getBarberServices() {
    GetRequest(`${endPoint.SERVICE_CATEGORIES}?id=${149}`)
      .then(res => {
        console.log(res?.data);
        if (res?.data?.code == 200) {
          setBarberServices(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Screen viewStyle={{flex: 1}} statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
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
      <View style={{flex: 0.8}}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Barberinfo
              item={item}
              selected={selectedItem === item.id}
              onPress={() => setSelectedItem(item.id)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate(constants.screen.AppointmentDate)}
          style={styles.ApplyNOWButton}>
          <Text style={{fontWeight: '600', fontSize: 13, color: 'white'}}>
            {' '}
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const Barberinfo = ({item, onPress, selected}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          selected && {borderColor: '#c79647', borderWidth: 1.25},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={{width: screenSize.width / 4}}>
            <Text
              style={{fontWeight: '400', fontSize: 15, color: appColors.White}}>
              {item.name}
            </Text>
          </View>
          {selected && ( // Show price only if the item is selected
            <View style={{width: screenSize.width / 5}}>
              <Text style={{fontWeight: '500', color: '#c79647', fontSize: 15}}>
                {item.price}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: screenSize.width / 4.5,
            }}>
            <Text style={{fontWeight: '500', color: appColors.White}}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.screen.ServiceSpecialist)
              }>
              <Text style={{fontWeight: '200'}}>{item.icon}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    width: screenSize.width / 1.07,
    paddingVertical: Platform.OS == 'ios' ? 25 : 16,
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
    paddingVertical: Platform.OS == 'ios' ? 20 : 15,
    marginHorizontal: 14,
    borderRadius: 40,
  },
});
