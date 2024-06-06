import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import moment from 'moment';
const PreBooking = ({data, preBookingList}) => {
  const navigation = useNavigation();
  const ListPrebooking = ({item, index}) => {
    return (
      <View key={index} style={styles.bookingContainerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View style={styles.bookingInnercontainerView}>
            <View style={styles.bookingTextview}>
              <Text style={styles.dateTextstyle}>
                {moment(item?.BookingDate).format('DD-MM-YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={styles.EreciptButtonView}>
              <View style={styles.EreciptInnerView}>
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

          <View style={styles.imagetextContainerView}>
            <View style={styles.bookingImageview}>
              <Image
                source={require('../../../assets/rectangle2.png')}
                // source={item.item.Imagesource}
                style={styles.bookingImagestyle}
              />
            </View>
            <View style={styles.bookingTextview}>
              <Text style={styles.Nametext}>{item.CustomerName}</Text>
              <View>
                <Text style={styles.Titletext}>{item.BarberName}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}>
                  Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ButtonsView}>
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
      data={preBookingList}
      renderItem={({item, index}) => <ListPrebooking item={item} index={index} />}
      // renderItem={({item}) => <listBookingCompleted item={item} />}
      keyExtractor={item => item.BarbarBookedSlotID}
    />
  );
};

export default PreBooking;
