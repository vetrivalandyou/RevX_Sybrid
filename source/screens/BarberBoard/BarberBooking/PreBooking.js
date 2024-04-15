import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const PreBooking = ({data}) => {
  const navigation = useNavigation();
  const ListPrebooking = item => {
    return (
      <View
        style={styles.bookingContainerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={styles.bookingInnercontainerView}>
            <View style={styles.bookingTextview}>
              <Text
                style={styles.dateTextstyle}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={styles.EreciptButtonView}>
              <View
                style={styles.EreciptInnerView}>
                <Bookingbutton
                  style={styles.EreciptButtonstyle}
                  stylebtn={{color: 'white'}}
                  onPress={() =>
                    navigation.navigate(constants.BarberScreen.BarberEReceipt)
                  }
                  title={'View E-Recipt'}
                />
              </View>
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>

          <View
            style={styles.imagetextContainerView}>
            <View style={styles.bookingImageview}>
              <Image
                source={item.item.Imagesource}
                style={styles.bookingImagestyle}
              />
            </View>
            <View style={styles.bookingTextview}>
              <Text style={styles.Nametext}>
                {item.item.name}
              </Text>
              <View>
                <Text
                  style={styles.Titletext}>
                  {item.item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={styles.Labeltext}>
                  {item.item.label}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={styles.ButtonsView}>
            <Bookingbutton
              style={{backgroundColor: '#c79647'}}
              stylebtn={{color: 'white'}}
              title={'Accept'}
            />
            <Bookingbutton
              style={{backgroundColor: '#E81F1C', borderColor: 'red'}}
              stylebtn={{color: 'white'}}
              title={'Reject'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => <ListPrebooking item={item} />}
      // renderItem={({item}) => <listBookingCompleted item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default PreBooking;
