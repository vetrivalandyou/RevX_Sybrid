import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import { ScreenSize, screenSize } from '../../../components/atom/ScreenSize';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const PreBooking = ({ data }) => {
  const ListPrebooking = item => {
    return (
      <View style={styles.bookingContainerstyle}>
        <View style={{ flex: 1 }}>
          <View
            style={styles.bookingInnercontainerView}>
            <View style={styles.bookingDateview}>
              <Text style={styles.dateTextstyle}>
                {item.item.date}
              </Text>
            </View>
            <View style={styles.ratingboxView}>
              <View style={styles.Ratingcontainer}>
                <View
                  style={styles.RatinginnerView}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={styles.ratingTextstyle}>
                    {item.item.rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.DashedrowView}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor: 'transparent' }}></View>
          </View>

          <View
            style={styles.containerSecondview}>
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
            style={styles.Buttosview}>
            <Bookingbutton
              title={'Cancel Booking'}
            />
            <Bookingbutton
              style={{ backgroundColor: '#c79647' }}
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
      renderItem={({ item, index }) => <ListPrebooking item={item} />}
      keyExtractor={item => item.id}
    />
  );
};



export default PreBooking;
