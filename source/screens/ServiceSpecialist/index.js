import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppImages} from '../../AppConstants/AppImages';
import Screen from '../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../components/atom/ScreenSize';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../AppConstants/Constants.json';
import appColors from '../../AppConstants/appColors';
import { GetRequest, PostRequest } from '../../services/apiCall';
import { endPoint, messages } from '../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../components/atom/Snakbar/Snakbar';

const ServiceSpecialist = () => {
  const navigation = useNavigation();
  const [Services, setServices]=useState([])
  const[loading,setLoading]=useState(true)
  const [selectedItem,setSelectedItem] = useState(true)
 
useEffect(()=>{
customerservices();
},[])


  const customerservices=()=>{
    const payload= {
      
      Id: 5,
      UserId: 149
    }

 
    PostRequest(endPoint.CUSTOMER_SERVICES,payload)
    .then(res =>{
      setLoading(false)
      if(res?.data?.code==200){
       
        console.log(res?.data);
        setServices(res?.data?.data)
      }
      else{
        SimpleSnackBar(res?.data?.message)
        setLoading(false)
      }
    })
    .catch(res=>{
      SimpleSnackBar(messages.Catch,appColors.Red)
      setLoading(false)
    })

  }
  return (
    <Screen viewStyle={{ flex: 1 }} statusBarColor={appColors.Black}>
        <View style={{flex: 0.1}}>
          <Header
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Hair Cut'}
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
        {loading?(<ActivityIndicator size={'small'}color={appColors.Goldcolor} style={{flex:1,justifyContent:'center',alignItems:'center'}}/>)
        :( 
          <View style={{ flex: 0.8,}}>
          <FlatList
            data={Services}
            renderItem={({item}) => <Servicedetails item={item} 
            selected={selectedItem === item.UserId}
            onPress={() => setSelectedItem(item.UserId)} />}
            keyExtractor={item => item.id}
          />
        </View>
)}

        
        <View style={{ flex: 0.1, justifyContent:'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate(constants.screen.Services)}
          style={styles.ApplyNOWButton}>
          <Text style={{fontWeight: '600', fontSize: 13, color: '#fff'}}>
            {' '}
            Apply Now
          </Text>
        </TouchableOpacity>
        </View>
    </Screen>
  );
};

const Servicedetails = ({item,selected,onPress}) => {
  return (
 <TouchableOpacity onPress={onPress}>
    <View style={[styles.container,selected &&{borderColor:appColors.Goldcolor,borderWidth:1.25}]}>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{paddingVertical: 8}}>
          <Text> {item.serviceImage}</Text>
          </View>

          <View style={{flexDirection: 'column', width: '40%'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontSize: 18,
              }}>
              {item.serviceName}
            </Text>

            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 11.5,
                }}>
                {/* {item.title} */}
                824 Booked
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* <Text style={{color:'white', textAlign:'center', paddingVertical:12, fontSize:12, fontWeight:'bold'}}>View</Text> */}
            <Text style={{color: '#c79647', fontSize: 17, fontWeight: '600'}}>
              ${item.servicePrice}
            </Text>
          </View>
          <View style={styles.Circlecontrainer}>
            <View style={styles.InnerCircle}></View>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default ServiceSpecialist;

const styles = StyleSheet.create({
  container: {
    width: '95%',
height:screenSize.height/11,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#252525',
    marginHorizontal: 10,
    marginVertical: 8,justifyContent:'center',
  },

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
  Circlecontrainer: {
    height: 30,
    width: 30,
    borderRadius: 40,
    backgroundColor: '#252525',
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },

  InnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 40,
    backgroundColor: '#c79647',

    position: 'absolute',

    // backgroundColor:'green'
  },
  ApplyNOWButton: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: Platform.OS == 'ios' ? 20 : 15,
    marginHorizontal: 12,
    borderRadius: 40,
  },
});
