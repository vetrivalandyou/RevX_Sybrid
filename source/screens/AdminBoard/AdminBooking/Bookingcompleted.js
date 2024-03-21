import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { ScreenSize, screenSize } from '../../../components/atom/ScreenSize';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
const Bookingcompleted = ({ data }) => {
  const ListBookingCompleted = item => {
    return (
      <View style={styles.completedContaierstyle}>
        <View style={{ flex: 1 }}>
          <View
            style={styles.ContainerInnerView}>
            <View style={styles.CompletedDateview}>
              <Text style={styles.completedDatestyle}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={styles.Ratingview}>
              <View style={styles.Ratingstyle}>
                <View
                  style={styles.RatinginnerView}>
                  <AntDesign name={'staro'} size={12} color={'#c79647'} />
                  <Text style={styles.ratingTextstyle}>
                    {item.item.rating}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.CompletedbuttonView}>
              <Completedbutton title={'Completed'} />
            </View>
          </View>

          <View style={styles.CompletedDashineView}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor: 'transparent' }}></View>
          </View>
          <View
            style={styles.containerSecondview}>
            <View style={styles.completedImageview}>
              <Image
                source={item.item.Imagesource}
                style={styles.completedImagestyle}
              />
            </View>
            <View style={styles.completedTextview}>
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
            style={styles.ReceiptbuttonView}>
            <Bookingbutton
              style={{ width: '90%', height: '55%' }}
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
      renderItem={({ item, index }) => <ListBookingCompleted item={item} />}
      keyExtractor={item => item.id}
    />
  );
};
export default Bookingcompleted;
