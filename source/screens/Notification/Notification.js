import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../AppConstants/AppImages';
import { screenSize }from "../../components/atom/ScreenSize"

const Notification = () => {
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
            Notification
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
 
 <Text style={{color:'white', marginHorizontal:12,marginVertical:5, fontSize:13}}>Today</Text>
 <View style={styles.container}>
 <View
        style={{
          flexDirection: 'column',
        
         
        }}>
    
          <View  style={{
           flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10,
    
     

           
           }}>
             <View style={{paddingVertical:8}}>
                   <Image source={AppImages.notification}
            style={{height:screenSize.height/12, width:screenSize.width/6, borderRadius:40 , }}  
               
            />
            </View>
           
             <View style={{flexDirection: 'column',  width:screenSize.width/1.47,  }}>
         
              <Text
                style={{
                  color: 'white',
                fontWeight:'400',
                  fontSize:20,
                }}>
               Payment Successful!

  
            </Text>
       
            <View >
              <Text style={{
                  color: 'white',
                  fontSize:12,
                }}>You have made a salon payment</Text>
              </View>

           
          </View>
         
            
           
</View>
  </View>
  </View>

  <Text style={{color:'white', marginHorizontal:12,marginTop:20, marginBottom:5, fontSize:13}}>Yesterday</Text>
  <View style={styles.container}>
 <View
        style={{
          flexDirection: 'column',
        
         
        }}>
    
          <View  style={{
           flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10,
    
     

           
           }}>
             <View style={{paddingVertical:8}}>
                   <Image source={AppImages.notification}
            style={{height:screenSize.height/12, width:screenSize.width/6, borderRadius:40 , }}  
               
            />
            </View>
           
             <View style={{flexDirection: 'column',  width:screenSize.width/1.47,  }}>
         
              <Text
                style={{
                  color: 'white',
                fontWeight:'400',
                  fontSize:19,
                }}>
              New Services Available!

  
            </Text>
       
            <View >
              <Text style={{
                  color: 'white',
                  fontSize:11.5,
                }}>Now you can search the nearest salon</Text>
              </View>

           
          </View>
         
            
           
</View>
  </View>
  </View>

  <View style={styles.container}>
 <View
        style={{
          flexDirection: 'column',
        
         
        }}>
    
          <View  style={{
           flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10,
    
     

           
           }}>
             <View style={{paddingVertical:8}}>
                   <Image source={AppImages.notification}
            style={{height:screenSize.height/12, width:screenSize.width/6, borderRadius:40 , }}  
               
            />
            </View>
           
             <View style={{flexDirection: 'column',  width:screenSize.width/1.47,  }}>
         
              <Text
                style={{
                  color: 'white',
                fontWeight:'400',
                  fontSize:20,
                }}>
              Credit Card Connected

  
            </Text>
       
            <View >
              <Text style={{
                  color: 'white',
                  fontSize:12,
                }}>Now you can search the nearest salon</Text>
              </View>

           
          </View>
         
            
           
</View>
  </View>
  </View>

  <Text style={{color:'white', marginHorizontal:12,marginTop:20, marginBottom:5, fontSize:13}}>December 11, 2024</Text>
  <View style={styles.container}>
 <View
        style={{
          flexDirection: 'column',
        
         
        }}>
    
          <View  style={{
           flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10,
    
     

           
           }}>
             <View style={{paddingVertical:8}}>
                   <Image source={AppImages.notification}
            style={{height:screenSize.height/12, width:screenSize.width/6, borderRadius:40 , }}  
               
            />
            </View>
           
             <View style={{flexDirection: 'column',  width:screenSize.width/1.47,  }}>
         
              <Text
                style={{
                  color: 'white',
                fontWeight:'400',
                  fontSize:20,
                }}>
               Today' s Special Offer

  
            </Text>
       
            <View >
              <Text style={{
                  color: 'white',
                  fontSize:12,
                }}>Now you can search the nearest salon</Text>
              </View>

           
          </View>
         
            
           
</View>
  </View>
  </View>

  <View style={styles.container}>
 <View
        style={{
          flexDirection: 'column',
        
         
        }}>
    
          <View  style={{
           flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10,
    
     

           
           }}>
             <View style={{paddingVertical:8}}>
                   <Image source={AppImages.notification}
            style={{height:screenSize.height/12, width:screenSize.width/6, borderRadius:40 , }}  
               
            />
            </View>
           
             <View style={{flexDirection: 'column',  width:screenSize.width/1.47,  }}>
         
              <Text
                style={{
                  color: 'white',
                fontWeight:'400',
                  fontSize:20,
                }}>
               Credit Card Connected

  
            </Text>
       
            <View >
              <Text style={{
                  color: 'white',
                  fontSize:12,
                }}>Now you can search the nearest salon</Text>
              </View>

           
          </View>
         
            
           
</View>
  </View>
  </View>

  <View style={styles.container}>
 <View
        style={{
          flexDirection: 'column',
        
         
        }}>
    
          <View  style={{
           flexDirection: 'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10,
    
     

           
           }}>
             <View style={{paddingVertical:8}}>
                   <Image source={AppImages.notification}
            style={{height:screenSize.height/12, width:screenSize.width/6, borderRadius:40 , }}  
               
            />
            </View>
           
             <View style={{flexDirection: 'column',  width:screenSize.width/1.47,  }}>
         
              <Text
                style={{
                  color: 'white',
                fontWeight:'400',
                  fontSize:20,
                }}>
               Payment Successful!

  
            </Text>
       
            <View >
              <Text style={{
                  color: 'white',
                  fontSize:12,
                }}>You have made a salon payment</Text>
              </View>

           
          </View>
         
            
           
</View>
  </View>
  </View>
  
</View>
  )}
export default Notification

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
      container:{
            width:screenSize.width/1.07,
            height:screenSize.height/9,
            borderWidth:1,
            borderRadius:40,
            backgroundColor:'#252525',
            marginHorizontal:10,
            marginVertical:3,
       justifyContent:'center',
         
           
          },
  
})