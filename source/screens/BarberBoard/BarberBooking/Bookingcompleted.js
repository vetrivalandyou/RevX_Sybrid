import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';

const Bookingcompleted = ({data}) => {
  const navigation = useNavigation();

  const ListBookingCompleted = item => {
    return (
      <View style={styles.completedContaierstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
    
            style={styles.ContainerInnerView}>
            <View style={styles.CompletedDateview}>
              <Text style={styles.completedDatestyle}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={styles.completedButtonview}>
              <Completedbutton title={'Completed'} />
            </View>
            <View
              style={styles.EreciptView}>
              <View
                style={{
                  flex: 0.6,
                }}>
                <View
                  style={styles.EreciptInnerView}>
                  <Bookingbutton
                    style={styles.EreciptbuttonStyle}
                    stylebtn={{fontSize: 10, color: 'white'}}
                    onPress={() =>
                      navigation.navigate(constants.BarberScreen.BarberEReceipt)
                    }
                    title={'View E-Recipt'}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.DashLineView }>
            <View style={styles.DashLinestyle}></View>
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
      renderItem={({item, index}) => <ListBookingCompleted item={item} />}
      keyExtractor={item => item.id}
    />
  );
};


//   Containerstyle: {
//     height: screenSize.height / 2.8,
//     width: screenSize.width / 1.1,
//     marginBottom: 10,
//     backgroundColor: '#252525',
//     borderWidth: 1,
//     borderRadius: 20,
//     marginHorizontal: 20,
//   },
//   Ratingbox: {
//     height: screenSize.height / 28,
//     width: screenSize.width / 7.1,
//     justifyContent: 'center',
//     borderWidth: 0.75,
//     borderRadius: 7,
//     borderColor: '#c79647',
//   },
// });

export default Bookingcompleted;
