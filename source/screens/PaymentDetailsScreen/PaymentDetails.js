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
import CustomModal from '../../components/molecules/CustomModal/CustomModal';
import { screenSize } from '../../components/atom/ScreenSize';
import constants from "../../AppConstants/Constants.json"


const PaymentDetails = ({navigation}) => {
  const [Name, onChangeName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  
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
    <View style={{height: screenSize.height, backgroundColor: 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
          alignItems: 'center',
          marginVertical: 14,
        }}>
        <View style={{width: screenSize.width / 4}}>
          <AntDesign name={'left'} size={15} color={'white'} />
        </View>

        <View style={{width: screenSize.width / 4, alignItems: 'flex-end'}}>
          <View style={styles.NoticationContainer}>
            <FontAwesome name={'bell'} size={13} color={'white'} />
          </View>
        </View>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 15,
          marginLeft:17,
          marginVertical: 8,
        }}>
        Enter The Details To Add A New Card
      </Text>
      <TextInput
        style={styles.textinputcontainer}
        onChangeText={onChangeName}
        placeholder="Enter Card Holder Name"
        placeholderTextColor={'grey'}
        value={Name}
      />

      <TextInput
        style={styles.cardinput}
        // secureTextEntry={true} // Hide password when showPassword is false
        placeholder="Enter Card No"
        placeholderTextColor={'grey'}
        value={password.replace(/\d(?=\d{4})/g, '*')} 
        onChangeText={onChangePassword}
        keyboardType="numeric"
        maxLength={16}
      />
      <View style={{flexDirection: 'row', marginVertical: 10, justifyContent:'space-evenly', marginVertical:17}}>
        <View
          style={{
            flexDirection: 'column',
      
       
          }}>
          <Text style={{color: 'white', fontSize:12,marginLeft:8}}>Date</Text>
          <TextInput
            style={styles.dateinput}
            // secureTextEntry={true}
            placeholder="MM/YY"
            placeholderTextColor={'grey'}
            keyboardType="numeric"
          />
        </View>
        <View style={{flexDirection: 'column', }}>
          <Text style={{color: 'white', fontSize:12,marginLeft:8}}>CVC</Text>
          <TextInput
            style={styles.dateinput}
           
            placeholder="000"
            placeholderTextColor={'grey'}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          alignItems:'center',
          marginHorizontal:5,
          marginTop:5,
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
          <Text style={{color: 'white', fontSize:13,marginLeft:4}}>Mark as default card</Text>
        </View>
      </View>
    
     


      <TouchableOpacity
        onPress={() => navigation.navigate(constants.screen.ReviewSummary)}
        style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13}}> Continue</Text>
      </TouchableOpacity>
    <CustomModal
     
      visible={modalVisible}
      onRequestClose={toggleModal}
      label={"Do You Want To Save The Information For Later Use"}
      onYes={toggleModal}
      onNo={toggleModal}
     
    
  />

    </View>
  );
};

export default PaymentDetails;

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
  textinputcontainer: {
    height: screenSize.height / 15,
    width: screenSize.width / 1.09,
    marginTop: 16,
    marginVertical: 7,
    marginHorizontal: 14,
    borderWidth: 1,
paddingHorizontal:22,
    borderRadius: 40,
    borderColor: 'grey',
    color: '#c79647',
  },
  cardinput: {
    height: screenSize.height / 15,
    width: screenSize.width / 1.09,
    paddingHorizontal:22,
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
    paddingHorizontal:22,
    marginTop: 5,
    borderWidth: 1,

    borderRadius: 40,
    borderColor: 'grey',
    color: '#c79647',

  },
 
});
