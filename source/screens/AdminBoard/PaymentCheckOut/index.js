import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../../components/molecules/CustomModal/CustomModal';
import {screenSize} from '../../../components/atom/ScreenSize';
import constants from '../../../AppConstants/Constants.json';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import PaymentModal from '../../../components/molecules/PaymentModal/PaymentModal';

const PaymentCheckOut = ({navigation}) => {
  const [Name, onChangeName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  const handleConfirmPayment = () => {
    // Open the modal when the button is pressed
    setModalPaymentVisible(true);
  };

  const handleModalClose = () => {
    // Close the modal
    setModalPaymentVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      toggleModal(); // Show the modal when the switch is enabled
    }
  };

  return (
    <Screen viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={''}
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
      <Text
        style={{
          color: 'white',
          fontSize: 15,
          marginLeft: 5,
          flex: 0.07,
        }}>
        Enter The Details To Add A New Card
      </Text>
      <View style={{flex: 0.1}}>
        <SimpleTextField
          placeholder={'Enter Card Holder Name'}
          Customtextiput={{color: appColors.Goldcolor}}
          placeholderTextColor={appColors.White}
          onChangeText={onChangeName}
          innerCustomstyle={{
            borderColor: appColors.Gray,
          }}
          value={Name}
        />
      </View>
      <View style={{flex: 0.1}}>
        <SimpleTextField
          placeholder={'Enter Card No'}
          Customtextiput={{color: appColors.Goldcolor}}
          placeholderTextColor={appColors.White}
          onChangeText={onChangePassword}
          keyboardType={'numeric'}
          maxLength={16}
          value={password.replace(/\d(?=\d{4})/g, '*')}
          innerCustomstyle={{borderColor: appColors.Gray}}
        />
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginRight: 10,
              flex: 0.5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                marginLeft: 10,
                marginBottom: 10,
              }}>
              Date
            </Text>

            <SimpleTextField
              placeholder={'MM/YY'}
              Customtextiput={{color: appColors.Goldcolor}}
              placeholderTextColor={appColors.Gray}
              keyboardType={'numeric'}
              innerCustomstyle={{marginTop: 7, width: '96%'}}
            />
          </View>
          <View style={{flexDirection: 'column', flex: 0.5}}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                marginLeft: 10,
                marginBottom: 10,
              }}>
              CVC
            </Text>
            <SimpleTextField
              placeholder={'000'}
              Customtextiput={{color: appColors.Goldcolor}}
              placeholderTextColor={appColors.Gray}
              innerCustomstyle={{
                marginTop: 7,
                width: '96%',
                alignSelf: 'flex-end',
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          alignItems: 'center',
          marginHorizontal: 5,
          marginTop: 5,
          flex: 0.1,
        }}>
        <View>
          <Switch
            trackColor={{false: 'grey', true: '#23c16c'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            // ios_backgroundColor="yellow"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 13, marginLeft: 4}}>
            Mark as default card
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleConfirmPayment} style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13, color: 'white'}}>
          {' '}
          Continue
        </Text>
      </TouchableOpacity>
      <PaymentModal
        visible={modalPaymentVisible}
        showImage={true}
        showLable={true}
        showLable1={true}
        showViewEReciptButton={true}
        onRequestClose={handleModalClose}
        title={'Payment Successful!'}
        lable1={'Your booking has been successfully done'}
        onPress={() => navigation.goBack()}
        // showLable1={'sadad'}
      />

      {/* <CustomModal
        visible={modalVisible}
        onRequestClose={toggleModal}
        lable1={'Do You Want To Save The Information For Later Use'}
        showLable1={true}
        modalHeight={{height: screenSize.height / 4}}
        onYes={toggleModal}
        showYesNoButton={true}
        onNo={toggleModal}
      /> */}
    </Screen>
  );
};

export default PaymentCheckOut;

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
    width: screenSize.width / 1.07,
  },
  textinputcontainer: {
    height: screenSize.height / 15,
    width: screenSize.width / 1.09,
    marginTop: 16,
    marginVertical: 7,
    marginHorizontal: 14,
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 40,
    borderColor: 'grey',
    color: '#c79647',
  },
  cardinput: {
    height: screenSize.height / 15,
    width: screenSize.width / 1.09,
    paddingHorizontal: 22,
    marginVertical: 5,
    marginHorizontal: 14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'grey',
    color: '#c79647',
  },
  dateinput: {
    height: screenSize.height / 15,
    width: screenSize.width / 2.21,
    paddingHorizontal: 22,
    marginTop: 5,
    borderWidth: 1,

    borderRadius: 40,
    borderColor: 'grey',
    color: '#c79647',
  },
});
