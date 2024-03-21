import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';

const Bookingcancelled = ({data}) => {
  const ListBookingCanceled = item => {
    return (
      <View style={styles.Containerstyle}>
        <View style={{flex: 1}}>
          <View style={styles.ContainerInnerview}>
            <View style={styles.Dateview}>
              <Text style={styles.DateTextstyle} >
                {item.item.date}
              </Text>
            </View>

            <View style={styles.CancelbuttonView}>
              <Completedbutton
                title={'Cancel'}
                style={{backgroundColor: '#e81f1c'}}
                textstyle={{color: 'white'}}
              />
            </View>
          </View>

          <View style={styles.DashedrowView}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor:'transparent'  }}></View>
          </View>
          <View
            style={styles.ContainerSecondview}>
            <View style={styles.imageView}>
              <Image
                source={item.item.Imagesource}
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.Textview}>
              <Text style={styles.nameStyle}>
                {item.item.name}
              </Text>
              <View>
                <Text
                  style={styles.titleStyle}>
                  {item.item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={styles.labelStyle}>
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



export default Bookingcancelled;
