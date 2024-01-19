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
import {AppImages} from '../../AppConstants/AppImages';
import {screenSize} from '../../components/atom/ScreenSize';
import constants from '../../AppConstants/Constants.json';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../AppConstants/appColors';
import Screen from '../../components/atom/ScreenContainer/Screen';

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
      Imagesource: AppImages.applepay,
      title: 'Apple Pay',
    },
  ];
  return (
    <Screen viewStyle={{ flex: 1, backgroundColor: appColors.Black}} statusBarColor={ appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Payment Method'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
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

      {/* <TouchableOpacity
        onPress={() => navigation.navigate(constants.screen.PaymentDetails)}
        style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13}}> Continue</Text>
      </TouchableOpacity> */}

      <View
        style={{
          flex: 0.1,
          // backgroundColor: 'green',
        }}>
        <ButtonComponent
          title={'Continue'}
          onPress={() => navigation.navigate(constants.screen.PaymentDetails)}
        />
      </View>
    </Screen>
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
            <Image source={item.Imagesource} style={{height: 48, width: 48}} />
          </View>
          <View style={{width: screenSize.width / 1.6}}>
            <Text style={{fontWeight: '500', fontSize: 15, color: 'white', marginLeft: 5}}>
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
    width: screenSize.width / 9.2,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  Button: {
    backgroundColor: 'green',
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 40,
    position: 'absolute',
    bottom: 5,
    width: screenSize.width / 1.07,
  },
  imagecontainer: {
    width: screenSize.width / 9.5,
    // paddingVertical: 8,
    // borderWidth: 1,
    // borderRadius: 5,
    // backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
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
