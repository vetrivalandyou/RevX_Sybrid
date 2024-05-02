import React, {useEffect} from 'react';
import Header from '../../components/molecules/Header';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../AppConstants/appColors';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../AppConstants/Constants.json';
import {PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {useSelector} from 'react-redux';
import {screenSize} from '../../components/atom/ScreenSize';

const AppointmentDate = ({route, navigation}) => {
  const {barberDetails} = route.params;
  const {SelectedChildServices} = useSelector(
    state => state.AppointmentReducer,
  );

  const currentDate = new Date();
  const threeMonthsAhead = new Date();
  const markedDates = {};
  threeMonthsAhead.setMonth(currentDate.getMonth() + 3);

  const [seelectedDate, setSelectedDate] = React.useState('');
  const [availableSlots, setAvailableSlots] = React.useState([]);
  const [selectedSlotId, setSelectedSlotId] = React.useState('');

  console.log("barberDetails Appointment Details",barberDetails)

  const returnTotalDuration = () => {
    if (SelectedChildServices?.length == 0) {
      return 0;
    } else {
      const totalDuration = SelectedChildServices?.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.ServiceDuration,
        0,
      );
      return totalDuration;
    }
  };

  const fetchSelectedTimeSlot = selectedData => {
    const payload = {
      operationID: 3,
      durationMinutes: returnTotalDuration(),
      bookingDate: selectedData,
      barberID: barberDetails?.UserId,
      isActive: true,
      userID: 0,
      userIP: 'string',
    };
    console.log('payload', payload);
    PostRequest(endPoint?.BARBER_AVAILABLESLOTS, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        setAvailableSlots(res?.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const SelectedHourse = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedSlotId(item)}
        style={{
          marginVertical: 5,
          marginHorizontal: 5,
          borderWidth: 1,
          borderColor:
            selectedSlotId?.SlotID == item?.SlotID
              ? appColors.Goldcolor
              : appColors.GrayColor,
          borderRadius: 10,
          padding: 8,
          width: '47%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: appColors.AppLightGray,
            fontSize: 13.5,
            fontWeight: '400',
          }}>
          {item.TimeSlot.split(':')[0] + ':00'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View
        style={{
          height: screenSize.height / 4,
          width: screenSize.width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {seelectedDate == '' ? (
          <Text
            style={{
              color: appColors.Goldcolor,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Please Select Date for Time Slots.
          </Text>
        ) : (
          <Text
            style={{
              color: appColors.Goldcolor,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            We are sorry !! No Slot Available on {seelectedDate} date.
          </Text>
        )}
      </View>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{backgroundColor: appColors.Black, padding: 5}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Appointment Date'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'Appointment Date'}
          onPressRightIcon={() =>
            navigation.navigate(constants.screen.Notification)
          }
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>

      <View style={{flex: 0.42}}>
        <Calendar
          style={{
            borderRadius: 20,
            height: 'auto',
            width: 'auto',
            paddingBottom: 10,
          }}
          theme={{
            arrowColor: 'white',
            calendarBackground: appColors.darkgrey,
            textSectionTitleColor: appColors.White,
            selectedDayBackgroundColor: appColors.Goldcolor,
            selectedDayTextColor: appColors.White,
            todayTextColor: appColors.White,
            dayTextColor: appColors.White,
            textDisabledColor: appColors.Gray,
            textDayFontSize: 11,
            textMonthFontSize: 15,
            textDayHeaderFontSize: 13,
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            monthTextColor: appColors.White,
            'stylesheet.day.basic': {
              base: {
                width: 22,
                marginBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              },
            },
            'stylesheet.calendar.header': {
              monthText: {
                margin: 5,
                color: appColors.White,
                fontSize: 14,
              },
            },
          }}
          hideExtraDays={true}
          showSixWeeks={true}
          minDate={currentDate.toISOString().split('T')[0]}
          maxDate={threeMonthsAhead.toISOString().split('T')[0]}
          markedDates={{
            [seelectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: appColors.Goldcolor,
            },
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
            fetchSelectedTimeSlot(day.dateString);
          }}
        />
        {/* <Calendar
          hideExtraDays={false}
          showSixWeeks={true}
          minDate={currentDateString}
          maxDate={threeMonthsLaterString}
          style={{
            borderRadius: 20,
            backgroundColor: appColors.darkgrey,
            height: 'auto',
            width: 'auto',
            paddingBottom: 10,
          }}
          theme={{
            arrowColor: 'white',
            calendarBackground: appColors.darkgrey,
            textSectionTitleColor: appColors.White,
            selectedDayBackgroundColor: appColors.Goldcolor,
            selectedDayTextColor: appColors.White,
            todayTextColor: appColors.White,
            dayTextColor: appColors.White,
            textDisabledColor: appColors.White,
            textDayFontSize: 11,
            textMonthFontSize: 15,
            textDayHeaderFontSize: 13,
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            monthTextColor: appColors.White,
            'stylesheet.day.basic': {
              base: {
                width: 22,
                marginBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              },
            },
            'stylesheet.calendar.header': {
              monthText: {
                margin: 5,
                color: appColors.White,
                fontSize: 14,
              },
            },
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: appColors.Goldcolor,
            },
          }}
        /> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          flex: 0.08,
          alignItems: 'flex-end',
          marginHorizontal: 10,
        }}>
        <Text style={{color: appColors.White, fontSize: 20}}>
          Selected Hours
        </Text>
      </View>

      <View
        style={{
          flex: 0.3,
          padding: 5,
          justifyContent: 'center',
        }}>
        {seelectedDate == '' ? (
          <View
            style={{
              height: screenSize.height / 4,
              width: screenSize.width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {seelectedDate == '' ? (
              <Text
                style={{
                  color: appColors.Goldcolor,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Please Select Date for Time Slots.
              </Text>
            ) : (
              <Text
                style={{
                  color: appColors.Goldcolor,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                We are sorry !! No Slot Available on {seelectedDate} date.
              </Text>
            )}
          </View>
        ) : (
          <FlatList
            data={availableSlots}
            numColumns={2}
            keyExtractor={item => item.SlotID.toString()}
            // ListEmptyComponent={renderEmptyComponent}
            renderItem={({item, index}) => (
              <SelectedHourse key={item.SlotID} item={item} />
            )}
          />
        )}
      </View>

      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          opacity: selectedSlotId == '' ? 0.3 : 1,
        }}>
        <ButtonComponent
          title={'Continue'}
          disable={selectedSlotId == '' ? true : false}
          onPress={() =>
            navigation.navigate(constants.screen.ReviewSummary, {
              selectedSlotId: selectedSlotId,
              seelectedDate: seelectedDate,
              barberDetails: barberDetails,
            })
          }
        />
      </View>
    </Screen>
  );
};

const appointmentDateStyle = StyleSheet.create({});
export default AppointmentDate;
