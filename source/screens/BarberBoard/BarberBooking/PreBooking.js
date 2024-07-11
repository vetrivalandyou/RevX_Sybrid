import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import {ScreenSize, screenSize} from '../../../components/atom/ScreenSize';
import React, {memo, useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import constants from '../../../AppConstants/Constants.json';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import moment from 'moment';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import appColors from '../../../AppConstants/appColors';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import CustomModal from '../../../components/molecules/CustomModal/CustomModal';
import BoxLottie from '../../../components/atom/BoxLottie/BoxLottie';
import {debounce} from '../../../functions/AppFunctions';

const PreBooking = ({
  data,
  userDetails,
  preBookingList,
  setPreBookingList,
  isLoading,
  setIsLoading,
  hasMore,
  setHasMore,
  pageNumber,
  setPageNumber,
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const timeoutRef = useRef();
  const barberRemarksRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [rejectedBookingData, setRejectedBookingData] = useState({});

  const getPreBookings = () => {
    if (hasMore == false) return;

    const payload = {
      operationID: 1,
      roleID: userDetails?._RoleId,
      customerID: 0,
      userID: userDetails?.userId,
      userIP: 'string',
      _PageNumber: pageNumber,
      _RowsOfPage: 10,
    };

    console.log('payload', payload);
    PostRequest(endPoint.BB_BOOKEDSLOTS, payload)
      .then(res => {
        console.log('getPreBookings Pre Booking Response', res?.data);
        if (res?.data?.Table?.length > 0) {
          setPreBookingList(preBookingList => [
            ...preBookingList,
            ...res?.data?.Table,
          ]);
          setPageNumber(pageNumber + 1); // Increment the page number
          setIsLoading(false);
        } else {
          setHasMore(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleClickAccept = item => {
    console.log('Clicked', item);
    const payload = {
      operationID: 8,
      durationMinutes: 0,
      barberID: item?.BarbarID,
      barberName: '',
      slotID: 0,
      slotName: '',
      customerID: item?.CustomerID,
      customerName: '',
      bookingDate: item?.BookingDate,
      transactionID: '',
      isPaid: 0,
      services: '',
      isActive: true,
      userID: 0,
      userIP: '',
      longitude: 0,
      latitude: 0,
      locationName: '',
      remarks: 'Accepted',
      barbarBookedSlotID: item?.BarbarBookedSlotID,
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.Table?.[0]?.HassError == 0) {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message);
          getPreBookings();
        } else {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const handleClickReject = item => {
    console.log('Reject Clicked');
    setRejectedBookingData(item);
    setVisible(true);
  };

  const onPresssCancel = () => {
    setVisible(false);
  };

  const onPressSubmit = () => {
    console.log('Submited', barberRemarksRef.current);
    handleReject();
  };

  const handleReject = () => {
    const payload = {
      operationID: 9,
      durationMinutes: 0,
      barberID: rejectedBookingData?.BarbarID,
      barberName: '',
      slotID: 0,
      slotName: '',
      customerID: rejectedBookingData?.CustomerID,
      customerName: '',
      bookingDate: rejectedBookingData?.BookingDate,
      transactionID: '',
      isPaid: 0,
      services: '',
      isActive: true,
      userID: 0,
      userIP: '',
      longitude: 0,
      latitude: 0,
      locationName: '',
      remarks: barberRemarksRef.current,
      barbarBookedSlotID: rejectedBookingData?.BarbarBookedSlotID,
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.Table?.[0]?.HassError == 0) {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message);
          timeoutRef.current = setTimeout(() => setVisible(false), 3000);
          getPreBookings();
        } else {
          SimpleSnackBar(res?.data?.Table?.[0]?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const CustomModalView = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.2,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: appColors.Goldcolor,
          }}>
          <Text
            style={{
              color: appColors.White,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Enter your Reason
          </Text>
        </View>
        <View style={{flex: 0.5, backgroundColor: appColors.White}}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#F5F5F5',
              margin: 10,
              borderColor: appColors.AppLightGray,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              color: appColors.Black,
            }}
            multiline={true}
            textAlignVertical="top"
            onChangeText={newText => (barberRemarksRef.current = newText)}
            value={barberRemarksRef}
          />
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonComponent
              btnColor={appColors.White}
              btnTextColor={{color: appColors.Goldcolor}}
              style={{
                width: '75%',
                borderWidth: 1,
                borderColor: appColors.Goldcolor,
              }}
              title={'Cancel'}
              onPress={onPresssCancel}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonComponent
              style={{
                backgroundColor: appColors.Goldcolor,
                width: '75%',
              }}
              title={'Submit'}
              onPress={onPressSubmit}
            />
          </View>
        </View>
      </View>
    );
  };

  // const ListPrebooking = ({item, index}) => {
  //   return (
  //     <View key={index} style={styles.bookingContainerstyle}>
  //       <View style={{flex: 1, borderRadius: 20}}>
  //         <View style={styles.bookingInnercontainerView}>
  //           <View style={styles.bookingTextview}>
  //             <Text style={styles.dateTextstyle}>
  //               {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
  //               {item?.SlotName}
  //             </Text>
  //           </View>
  //           <View style={styles.EreciptButtonView}>
  //             <View style={styles.EreciptInnerView}>
  //               <Bookingbutton
  //                 style={styles.EreciptButtonstyle}
  //                 stylebtn={{color: appColors.White, fontSize: 11}}
  //                 onPress={() =>
  //                   navigation.navigate(constants.BarberScreen.BarberEReceipt, {
  //                     bookingSlot: item,
  //                   })
  //                 }
  //                 title={'View E-Recipt'}
  //               />
  //             </View>
  //           </View>
  //         </View>

  //         <View style={styles.DashLineView}>
  //           <View style={styles.DashLinestyle}></View>
  //         </View>

  //         <View
  //           style={[styles.imagetextContainerView, {paddingHorizontal: 15}]}>
  //           <View style={styles.bookingImageview}>
  //             <Image
  //               source={{uri: `${imageUrl}${item.CustomerProfileImage}`}}
  //               style={styles.bookingImagestyle}
  //             />
  //           </View>
  //           <View style={styles.bookingTextview}>
  //             <Text style={styles.Nametext}>{item.CustomerName}</Text>
  //             <View>
  //               <Text style={styles.Titletext}>{item.LocationName}</Text>
  //             </View>
  //             <View>
  //               <Text style={styles.Labeltext}>{item?.serviceNames}</Text>
  //             </View>
  //           </View>
  //         </View>
  //         <View style={styles.ButtonsView}>
  //           <Bookingbutton
  //             onPress={() => handleClickAccept(item)}
  //             style={{backgroundColor: '#c79647'}}
  //             stylebtn={{color: 'white'}}
  //             title={'Accept'}
  //           />
  //           <Bookingbutton
  //             onPress={() => handleClickReject(item)}
  //             style={{backgroundColor: '#E81F1C', borderColor: 'red'}}
  //             stylebtn={{color: 'white'}}
  //             title={'Reject'}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  const ListPrebooking = memo(
    ({item, index, handleClickAccept, handleClickReject}) => (
      <View key={index} style={styles.bookingContainerstyle}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View style={styles.bookingInnercontainerView}>
            <View style={styles.bookingTextview}>
              <Text style={styles.dateTextstyle}>
                {moment(item?.BookingDate).format('MMMM DD, YYYY')} -{' '}
                {item?.SlotName}
              </Text>
            </View>
            <View style={styles.EreciptButtonView}>
              <View style={styles.EreciptInnerView}>
                <Bookingbutton
                  style={styles.EreciptButtonstyle}
                  stylebtn={{color: appColors.White, fontSize: 11}}
                  onPress={() =>
                    navigation.navigate(constants.BarberScreen.BarberEReceipt, {
                      bookingSlot: item,
                    })
                  }
                  title={'View E-Recipt'}
                />
              </View>
            </View>
          </View>

          <View style={styles.DashLineView}>
            <View style={styles.DashLinestyle}></View>
          </View>

          <View
            style={[styles.imagetextContainerView, {paddingHorizontal: 15}]}>
            <View style={styles.bookingImageview}>
              <Image
                source={{uri: `${imageUrl}${item.CustomerProfileImage}`}}
                style={styles.bookingImagestyle}
              />
            </View>
            <View style={styles.bookingTextview}>
              <Text style={styles.Nametext}>{item.CustomerName}</Text>
              <View>
                <Text style={styles.Titletext}>{item.LocationName}</Text>
              </View>
              <View>
                <Text style={styles.Labeltext}>{item?.serviceNames}</Text>
              </View>
            </View>
          </View>
          <View style={styles.ButtonsView}>
            <Bookingbutton
              onPress={() => handleClickAccept(item)}
              style={{backgroundColor: '#c79647'}}
              stylebtn={{color: 'white'}}
              title={'Accept'}
            />
            <Bookingbutton
              onPress={() => handleClickReject(item)}
              style={{backgroundColor: '#E81F1C', borderColor: 'red'}}
              stylebtn={{color: 'white'}}
              title={'Reject'}
            />
          </View>
        </View>
      </View>
    ),
    (prevProps, nextProps) => prevProps.item === nextProps.item,
  );

  const renderItem = ({item, index}) => (
    <ListPrebooking
      item={item}
      index={index}
      handleClickAccept={handleClickAccept}
      handleClickReject={handleClickReject}
    />
  );

  const renderFooter = () => {
    if (hasMore == false) return null;
    return (
      <View style={{margin: 10}}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    );
  };

  const handleLoadMore = debounce(() => {
    if (hasMore == true) {
      getPreBookings();
    }
  }, 300);

  return (
    <>
      <CustomModal
        visible={visible}
        modalHeight={{height: screenSize.height / 3}}
        CustomModalView={CustomModalView}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={appColors.Goldcolor} />
        </View>
      ) : preBookingList?.length > 0 ? (
        <FlatList
          data={preBookingList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index?.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={renderItem}
          // renderItem={({item, index}) => (
          //   <ListPrebooking item={item} index={index} />
          // )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BoxLottie
            animationPath={require('../../../LottieAnimation/NoPostFoundAnimation.json')}
          />
        </View>
      )}
    </>
  );
};

export default PreBooking;
