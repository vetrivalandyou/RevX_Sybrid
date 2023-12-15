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
      Imagesource: require('../../assets/rectangle2.png'),
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
      Imagesource: require('../../assets/rectangle2.png'),
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
      Imagesource: require('../../assets/rectangle2.png'),
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
      Imagesource: require('../../assets/rectangle2.png'),
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
    <View style={{backgroundColor: 'black', flex: 1, paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          flex: 0.1,
        }}>
        <AntDesign name={'left'} size={15} color={'white'} />

        <Text style={{fontWeight: '500', color: 'white', fontSize: 17}}>
          My Booking
        </Text>
        <View style={styles.NoticationContainer}>
          <FontAwesome name={'bell'} size={15} color={'white'} />
        </View>
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
    </View>
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
