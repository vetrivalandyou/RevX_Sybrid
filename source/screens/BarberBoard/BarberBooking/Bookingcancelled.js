import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useRef} from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import CancelBooking from './CancelBooking';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';

const Bookingcancelled = ({data}) => {
  const refRBSheet = useRef();
  const ListBookingCanceled = item => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.25,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6}}>
              <Text style={{color: 'white', fontSize: 16}}>
                {item.item.date}
              </Text>
            </View>

            <View style={{flex: 0.25}}>
              <Completedbutton
                onPress={() => refRBSheet.current.open()}
                title={'Canceled'}
                style={{backgroundColor: '#e81f1c'}}
                textstyle={{color: 'white'}}
              />

              <BottomSheet ref={refRBSheet} Height={300}>
                <CancelBooking refRBSheet={refRBSheet} />
              </BottomSheet>
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
              flex: 0.65,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <View style={{flex: 0.35, alignItems: 'center'}}>
              <Image
                source={item.item.Imagesource}
                style={{
                  height: '89%',
                  width: '82%',
                  borderRadius: 7,
                  marginTop: 10,
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
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => <ListBookingCanceled item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  Containerstyle: {
    height: screenSize.height / 3.5,
    width: screenSize.width / 1.1,
    marginBottom: 10,
    backgroundColor: '#252525',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    marginHorizontal: 20,
  },
});

export default Bookingcancelled;
