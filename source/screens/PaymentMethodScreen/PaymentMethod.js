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
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';
import { AppImages } from '../../AppConstants/AppImages';
import { screenSize } from '../../components/atom/ScreenSize';
import constants from "../../AppConstants/Constants.json"

const PaymentMethod = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    {
      id: 1,
      Imagesource: AppImages.creditcard,
      title: 'Credit card',
    },
    {
      id: 2,
      Imagesource: AppImages.paypal,
      title: 'Paypal',
    },
    {
      id: 3,
      Imagesource:AppImages.applepay,
      title: 'Apple Pay',
    },
  ];
  return (
    <View style={{height: screenSize.height, backgroundColor: 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          alignItems: 'center',
          marginVertical: 6,
        }}>
        <View style={{width: screenSize.width / 4}}>
          <AntDesign name={'left'} size={15} color={'white'} />
        </View>
        <View style={{width: screenSize.width / 2.5, alignItems: 'center'}}>
          <Text style={{fontWeight: '500', color: 'white', fontSize: 17}}>
            Payment Method
          </Text>
        </View>
        <View style={{width: screenSize.width / 4, alignItems: 'flex-end'}}>
          <View style={styles.NoticationContainer}>
            <FontAwesome name={'bell'} size={13} color={'white'} />
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <PaymentCard
              item={item}
              selected={selectedItem === item.id}
              onPress={() => setSelectedItem(item.id)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(constants.screen.PaymentDetails)}
        style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13}}> Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentCard = ({item, onPress, selected}) => {

  return (
    
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <View style={styles.imagecontainer}>
            <Image source={item.Imagesource} style={{height: 20, width: 22}} />
          </View>
          <View style={{width: screenSize.width / 1.6}}>
            <Text style={{fontWeight: '500', fontSize: 15, color: 'white'}}>
              {item.title}
            </Text>
          </View>
          <View
            style={[
              styles.OuterCircle,
              selected && {backgroundColor: '#c79647'},
            ]}>
            {selected && <View style={styles.innerCircle}></View>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    width: screenSize.width / 1.07,

    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#252525',
    marginHorizontal: 12,
    marginVertical: 8,
  },

  NoticationContainer: {
    height: screenSize.height / 18.5,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  Button: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 40,
    position: 'absolute',
    bottom: 5,
    width:screenSize.width/1.07,
  },
  imagecontainer: {
    width: screenSize.width / 9.5,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  OuterCircle: {
    height: screenSize.height / 35,
    width: screenSize.width / 17,
    borderRadius: 40,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: screenSize.height / 90,
    width: screenSize.width / 43,
    borderRadius: 40,
    backgroundColor: 'lightgray',
    position: 'absolute',
  },
});
