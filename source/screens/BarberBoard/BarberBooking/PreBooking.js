import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';

const PreBooking = ({data}) => {
  const navigation = useNavigation();
  const ListPrebooking = item => {
    return (
      <View
        style={{
          height: screenSize.height / 2.8,
          width: screenSize.width / 1.1,
          marginBottom: 10,
          backgroundColor: '#252525',
          borderWidth: 1,
          borderRadius: 20,
          marginHorizontal: 20,
        }}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={{
                flex: 0.6,
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  color: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Bookingbutton
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    height: 27,
                    flex: 0.8,
                  }}
                  stylebtn={{color: 'white'}}
                  onPress={() =>
                    navigation.navigate(constants.BarberScreen.BarberEReceipt)
                  }
                  title={'View E-Recipt'}
                />
              </View>
            </View>
          </View>

          <View style={{ height: 1, position:'relative', marginHorizontal: 15, }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor:'transparent'  }}></View>
          </View>

          {/* <View
            style={{
              fontSize: 25,
              marginHorizontal: 14,
              borderBottomWidth: 2,
              borderStyle: 'dashed',
              borderBottomColor: '#c79647',
            }}></View> */}

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
              <Text style={{fontSize: 22, fontWeight: '600', color: 'white'}}>
                {item.item.name}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#9E9E9E',
                    marginVertical: 9,
                  }}>
                  {item.item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 12, fontWeight: '400', color: '#c79647'}}>
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

const styles = StyleSheet.create({
  Containerstyle: {
    height: screenSize.height / 2.8,
    width: screenSize.width / 1.13,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    marginHorizontal: 10,
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
