import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppImages} from '../../AppConstants/AppImages';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../components/atom/ScreenSize';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../AppConstants/Constants.json';

const ServiceSpecialist = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chatfour,
      price: '$40.00',
    },
    {
      id: 2,
      title: '824 Booked',
      name: 'Under Cut',
      Imagesource: AppImages.chatfour,
      price: '$17.00',
    },
    {
      id: 3,
      title: '824 Booked',
      name: 'Crew Cut',
      Imagesource: AppImages.chatfour,
      price: '$12.00',
    },
    {
      id: 4,
      title: '824 Booked',
      name: 'Regular Cut',
      Imagesource: AppImages.chatfour,
      price: '$18.00',
    },
    {
      id: 5,
      title: '824 Booked',
      name: 'Temple Fade',
      Imagesource: AppImages.chatfour,
      price: '$14.00',
    },

    {
      id: 6,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chatfour,
      price: '$16.00',
    },
  ];
  return (
    <Screen statusBarColor={appColors.Black}>
      <View style={{height: screenSize.height, backgroundColor: 'black'}}>
        <View style={{flex: 0.6}}>
          <Header
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Hair Cut'}
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
          onPress={() => navigation.navigate(constants.screen.ServicesDetails)}
          style={styles.ApplyNOWButton}>
          <Text style={{fontWeight: '600', fontSize: 13, color: '#fff'}}>
            {' '}
            Apply Now
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const Barberinfo = ({item}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{paddingVertical: 8}}>
            <Image
              source={item.Imagesource}
              style={{height: 62, width: 60, borderRadius: 5}}
            />
          </View>

          <View style={{flexDirection: 'column', width: '40%'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontSize: 18,
              }}>
              {item.name}
            </Text>

            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 11.5,
                }}>
                {item.title}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <Text style={{color:'white', textAlign:'center', paddingVertical:12, fontSize:12, fontWeight:'bold'}}>View</Text> */}
            <Text style={{color: '#c79647', fontSize: 17, fontWeight: '600'}}>
              {item.price}
            </Text>
          </View>
          <View style={styles.Circlecontrainer}>
            <View style={styles.InnerCircle}></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ServiceSpecialist;

const styles = StyleSheet.create({
  container: {
    width: '95%',

    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#252525',
    marginHorizontal: 10,
    marginVertical: 8,
  },

  NoticationContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },
  Circlecontrainer: {
    height: 30,
    width: 30,
    borderRadius: 40,
    backgroundColor: '#252525',
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  InnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 40,
    backgroundColor: '#c79647',

    position: 'absolute',

    // backgroundColor:'green'
  },
  ApplyNOWButton: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: 15,
    marginHorizontal: 12,
    borderRadius: 40,
    marginTop: 13,
    marginBottom: 17,
  },
});
