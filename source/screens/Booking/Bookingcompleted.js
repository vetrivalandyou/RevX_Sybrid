import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../components/atom/ScreenSize';
import React from 'react';
import Completedbutton from '../../components/atom/BookingButtons/Completedbutton';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Bookingcompleted = ({data}) => {
  const ListBookingCompleted = item => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6, justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 14}}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
              }}>
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
                    {item.item.rating}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 0.2, justifyContent: 'center'}}>
              <Completedbutton title={'Completed'} />
            </View>
          </View>

          <View
            style={{
              fontSize: 25,
              marginHorizontal: 14,
              borderBottomWidth: 2,
              borderStyle: 'dashed',
              borderBottomColor: '#c79647',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              flex: 0.58,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.35, alignItems: 'center'}}>
              <Image
                source={item.item.Imagesource}
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
                {item.item.name}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: 'white',
                    marginVertical: 9,
                  }}>
                  {item.item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 10, fontWeight: '400', color: '#c79647'}}>
                  {item.item.label}
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
              style={{width: '90%', height: '55%'}}
              title={'View E-Receipt'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => <ListBookingCompleted item={item} />}
      // renderItem={({item}) => <listBookingCompleted item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  Containerstyle: {
    height: screenSize.height / 2.8,
    width: screenSize.width / 1.11,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    // marginHorizontal: 10,
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

export default Bookingcompleted;
