import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { screenSize } from '../../components/atom/ScreenSize';

const ReviewSummary = () => {
  
const data=[
  {
  id:'1',
  title:'Barber Salon',
  label:'Barbarella Inova',
  },
  {
    id:'2',
    title:'Address',
    label:'8974 Meadow Valley Terrace',
  },
    {
      id:'3',
      title:'Name',
      label:'Danile Austin',
      },
    {
        id:'4',
        title:'Phone',
        label:'+123 456 789 00',
     },
       {
          id:'5',
          title:'Booking Date',
          label:'December 24, 2024',
       },
        {
            id:'6',
            title:'Booking Hours',
            label:'10:00 am',
       },
       {
              id:'7',
              title:'Specialist',
              label:'Nathan Alexender',
       },
] 

const data2=[
  {
  id:'1',
  title:'Haircut (Gulf)',
  price:'$40.00',
  },
  {
    id:'2',
    title:'Hair wash (Aloevera Shampoo)',
    price:'$40.00',
  },
    {
      id:'3',
      title:'Shaving (Thin Shaving)',
      price:'$40.00',
      },
  
] 


  return (
    <View style={{height:screenSize.height, backgroundColor: 'black'}}>
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
        <View style={{width: screenSize.width / 2.5, alignItems: 'center'}}>
          <Text style={{fontWeight: '500', color: 'white', fontSize: 17}}>
            Review Summary
          </Text>
        </View>
        <View style={{width: screenSize.width / 4, alignItems: 'flex-end'}}>
          <View style={styles.NoticationContainer}>
            <FontAwesome name={'bell'} size={13} color={'white'} />
          </View>
        </View>
      </View>
      <View>
    </View>

    <View style={styles.Containerstyle}>
    {data.map((item) => (
        <Barberdetails key={item.id} item={item} />
      ))}
    </View>


    <View style={styles.Containerstyle2}>
    {data2.map((item) => (
        <Pricedetails key={item.id} item={item} />
      ))}
      <View style={{backgroundColor:'#c79647', fontSize:25,marginHorizontal:14,borderBottomWidth: 2, borderStyle: 'dotted',marginTop:10, marginBottom:5,}}></View>

<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginHorizontal:20, marginTop:5,}}>
<Text style={{color:'white', fontWeight:'700'}}>Total</Text>
<Text style={{color:'#c79647', fontWeight:'700'}}>$120.00</Text>
</View>
    </View>
   
   



<TouchableOpacity
        onPress={() => navigation.navigate('PreBooking')}  //notification
        style={styles.Button}>
        <Text style={{fontWeight: '700', fontSize: 13, color:'white'}}> Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  )
}

const Barberdetails =({item})=>{
  return(
    <View >
      <View style={{flexDirection:'column', justifyContent:'space-between' }}>
<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginHorizontal:20, marginVertical:5 ,}}>
<Text style={{color:'white', fontSize:13, fontWeight:'400'}}>{item.title}</Text>
<Text style={{color:'white', fontSize:13, fontWeight:'400'}}>{item.label}</Text>
</View>

</View>
</View>
  )
}

const Pricedetails =({item})=>{
  return(
   
<View >
<View style={{flexDirection:'column', justifyContent:'space-between' }}>
<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginHorizontal:20, marginVertical:5 ,}}>
<Text style={{color:'white', fontSize:13.5, fontWeight:'400'}}>{item.title}</Text>
<Text style={{color:'white', fontSize:13.5, fontWeight:'400'}}>{item.price}</Text>
</View>
</View>

</View>




  )
}



export default ReviewSummary

const styles = StyleSheet.create({
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
    Containerstyle:{
        height: screenSize.height / 2.95,
        width: screenSize.width / 1.1,
    paddingVertical:17,
        marginTop: 5,
        backgroundColor:'#252525',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginHorizontal:17,
     
      },
      Containerstyle2:{
        height: screenSize.height / 4.1,
        width: screenSize.width / 1.1,
       justifyContent:'center',
      // alignItems:'center',
        marginTop: 10,
        backgroundColor:'#252525',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginHorizontal:17,
     
      },
      Button: {
        alignItems: 'center',
        backgroundColor: '#c79647',
        paddingVertical: 15,
        marginHorizontal: 13,
        borderRadius: 40,
        position: 'absolute',
        bottom: 5,
        width:screenSize.width/1.07,
      },
})