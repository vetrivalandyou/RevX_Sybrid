import React, {useState} from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import {AppImages} from '../../../AppConstants/AppImages';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {screenSize} from '../../../components/atom/ScreenSize';
import constants from '../../../AppConstants/Constants.json';
const AdminPaymentMethod = ({navigation}) => {
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
      Imagesource: AppImages.applepay,
      title: 'Apple Pay',
    },
  ];

  return (
    <Screen viewStyle={{padding:15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Payment Method'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
        />
      </View>
      <View style={{flex: 0.8}}>
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
      <View
        style={{
          flex: 0.1,
          // backgroundColor: 'green',
        }}>
        <ButtonComponent
          title={'Continue'}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.PaymentCheckOut)
          }
        />
      </View>
    </Screen>
  );
};

const PaymentCard = ({item, onPress, selected}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styless.container}>
        <View
          style={{
            width:screenSize.width/1.10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <View style={styless.imagecontainer}>
            <Image source={item.Imagesource} style={{}} />
          </View>
          <View style={{width: screenSize.width / 1.67}}>
            <Text style={{fontWeight: '500', fontSize: 15, color: 'white',marginLeft:7}}>
              {item.title}
            </Text>
          </View>
          <View
            style={[
              styless.OuterCircle,
              selected && {backgroundColor: '#c79647'},
             
            ]}>
            {selected && <View style={styless.innerCircle}></View>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default AdminPaymentMethod;

const styless = StyleSheet.create({
  container: {
   // width: screenSize.width,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor:appColors.darkgrey,
    //marginHorizontal: 12,
    marginVertical: 8,
    height:screenSize.height/10,
    justifyContent:'center'
  },

  imagecontainer: {
    width: screenSize.width / 8.5,
  
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
