import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {useEffect} from 'react';
import Completedbutton from '../../../components/atom/BookingButtons/Completedbutton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import Styles from '../../../components/atom/BookingButtons/Styles';
import {endPoint} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import appColors from '../../../AppConstants/appColors';

const Bookingcompleted = ({data, userDetails}) => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getCompletedBooking();
  }, [isFocused]);

  const getCompletedBooking = () => {
    const payload = {
      operationID: 2,
      roleID: userDetails?._RoleId,
      customerID: userDetails?.userId,
      userID: 0,
      userIP: 'string',
    };
    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('Bookingcompleted Response', res?.data);
        // setPreBookingList(res?.data?.Table);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ListBookingCompleted = item => {
    return (
      <View style={styles.completedContaierstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View style={styles.ContainerInnerView}>
            <View style={styles.CompletedDateview}>
              <Text style={styles.completedDatestyle}>{item.item.date}</Text>
            </View>
            <View style={styles.completedButtonview}>
              <Completedbutton title={'Completed'} />
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>

          <View style={styles.containerSecondview}>
            <View style={styles.completedImageview}>
              <Image
                source={item.item.Imagesource}
                style={styles.completedImagestyle}
              />
            </View>
            <View style={styles.completedTextview}>
              <Text style={styles.Nametext}>{item.item.name}</Text>
              <View>
                <Text style={styles.Titletext}>{item.item.title}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}>{item.item.label}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Bookingbutton
              style={{
                borderColor: appColors.Goldcolor,
                color: 'white',
                height: 27,
                width: '90%',
                flex: 0.9,
              }}
              stylebtn={{fontSize: 12, color: 'white'}}
              onPress={() =>
                navigation.navigate(constants.BarberScreen.BarberEReceipt)
              }
              title={'View E-Recipt'}
            />
            {/* <Bookingbutton
              style={{backgroundColor: '#c79647'}}
              stylebtn={{color: 'white'}}
              title={'Accept'}
            />
            <Bookingbutton
              style={{backgroundColor: '#E81F1C', borderColor: 'red'}}
              stylebtn={{color: 'white'}}
              title={'Reject'}
            /> */}
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
export default Bookingcompleted;
