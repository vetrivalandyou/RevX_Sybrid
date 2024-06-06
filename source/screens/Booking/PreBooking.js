import {View, Text, StyleSheet, Image, FlatList, Platform} from 'react-native';
import Bookingbutton from '../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../components/atom/ScreenSize';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appColors from '../../AppConstants/appColors';
import moment from 'moment';

const PreBooking = ({data, preBookingList}) => {
  const ListPrebooking = ({item}) => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.7}}>
              <Text style={{color: 'white', fontSize: 14}}>
                {moment(item?.BookingDate).format("DD-MM-YYYY")} - {item?.SlotName}
              </Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
              <View style={styles.Ratingbox}>
                <View
                  style={{
                    color: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={{color: '#c79647', fontSize: 11}}>
                    {/* {item.item.rating} */}
                    4.5
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{position: 'relative', marginHorizontal: 15}}>
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

          <View
            style={{
              flexDirection: 'row',
              flex: 0.58,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.35, alignItems: 'center'}}>
              <Image
                source={require('../../assets/rectangle2.png')}
                style={{
                  height: '80%',
                  width: '82%',
                  borderRadius: 7,
                  marginTop: 5,
                }}
              />
            </View>
            <View style={{flexDirection: 'column', flex: 0.63}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                {item?.BarberName}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: 'white',
                    marginVertical: 9,
                  }}>
                  {item?.CustomerName}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 10, fontWeight: '400', color: '#c79647'}}>
                  {/* {item.item.label} */}
                  Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Bookingbutton
              // stylebtn={{color: 'White'}}
              // style={{backgroundColor: 'red'}}
              title={'Cancel Booking'}
            />
            <Bookingbutton
              style={{backgroundColor: '#c79647'}}
              title={'View E-Receipt'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={preBookingList}
      renderItem={({item, index}) => <ListPrebooking item={item} />}
      // renderItem={({item}) => <listBookingCompleted item={item} />}
      keyExtractor={item => item.BarbarBookedSlotID}
    />
  );
};

const styles = StyleSheet.create({
  Containerstyle: {
    height: screenSize.height / 2.8,
    width: screenSize.width / 1.13,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    // marginHorizontal: 2,
  },
  Ratingbox: {
    height: screenSize.height / 28,
    width: screenSize.width / 7.1,
    justifyContent: 'center',

    borderWidth: 0.75,
    borderRadius: 7,
    borderColor: '#c79647',
  },
});

export default PreBooking;
