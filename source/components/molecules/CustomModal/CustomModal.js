import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const CustomModal = ({visible, onRequestClose, label, onYes, onNo}) => {
  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
        
        

      >
     <View style={{ height:height, justifyContent: 'center', alignItems: 'center' }}>
    <View style={styles.modalstyle}>
      <Text style={{fontSize:20, color:'black', fontWeight:'600', textAlign:'center'}}>{label}</Text>
      <View style={{ flexDirection: 'row', justifyContent:'space-evenly', marginTop: 20, alignItems:'center' }}>
        <View style={styles.modalbutton}>
        <TouchableOpacity onPress={onYes}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Yes</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.modalbutton2}>
        <TouchableOpacity onPress={onNo}>
          <Text style={{ color: 'black', fontWeight:'700' }}>No</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
</Modal>
  )
}

//Do You Want To Save The Information For Later Use

export default CustomModal

const styles = StyleSheet.create({
    modalstyle:{
        height: height / 3.9,
        width: width / 1.3,
       justifyContent:'center',
      // alignItems:'center',
        marginTop: 5,
        backgroundColor:'white',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'black',
     
      },
      modalbutton:{
          alignItems: 'center',
          backgroundColor: '#c79647',
          borderRadius: 40,
        justifyContent:'center',
        height:height/17,
          width:width/3.9,
      
      },
      modalbutton2:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
      borderColor:'black',
       borderWidth:1.7,
      justifyContent:'center',
      height:height/17,
        width:width/3.9,
    
    },
})