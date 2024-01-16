import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScreenSize} from '../../components/atom/ScreenSize';

// import Bookinglist from './PreBooking';
import Bookingcompleted from './Bookingcompleted';
import Bookingcancelled from './Bookingcancelled';
import {useEffect, useRef, useState} from 'react';
import PreBooking from './PreBooking';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import Screen from '../../../components/atom/ScreenContainer/Screen';

const MyBooking = ({navigation}) => {
  const activeButton = useRef('1');
  const [tabState, setTabState] = useState(false);

  const data = [
    {
      id: 1,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
    {
      id: 2,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
    {
      id: 3,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
    {
      id: 4,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
  ];

  const handleButtonPress = buttonName => {
    activeButton.current = buttonName; // Update useRef instead of setState
    setTabState(!tabState);
  };

  const renderComponent = () => {
    switch (activeButton.current) {
      case '1':
        return <PreBooking data={data} />;

      case '2':
        return <Bookingcompleted data={data} />;

      case '3':
        return <Bookingcancelled data={data} />;

      default:
        return null;
    }
  };

  useEffect(() => {}, [activeButton]);

  return (
    <Screen viewStyle={{padding: 15}} statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Booking'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 0.09,
        }}>
        <TouchableOpacity
          style={[
            styles.Button,
            activeButton.current === '1' && {backgroundColor: '#c79647'}, // Change color based on active button
          ]}
          onPress={() => handleButtonPress('1')}>
          <Text style={{fontWeight: '500', fontSize: 13, color: 'white'}}>
            Pre Booking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Button,
            activeButton.current === '2' && {backgroundColor: '#c79647'},
          ]}
          onPress={() => handleButtonPress('2')}>
          <Text style={{fontWeight: '500', fontSize: 13, color: 'white'}}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Button,
            activeButton.current === '3' && {backgroundColor: '#c79647'},
          ]}
          onPress={() => handleButtonPress('3')}>
          <Text style={{fontWeight: '500', fontSize: 13, color: 'white'}}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.7}}>{renderComponent(activeButton)}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  NoticationContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green'
  },
  Button: {
    flex: 0.3,
    height: '65%',
    alignItems: 'center',
    backgroundColor: '#252525',
    justifyContent: 'center',
    borderRadius: 40,
  },
});

export default MyBooking;
