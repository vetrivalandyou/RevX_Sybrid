import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Platform,
    ActivityIndicator,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
import Screen from '../../components/atom/ScreenContainer/Screen';
import Header from '../../components/molecules/Header';
import CustomIcon, { Icons } from '../../components/molecules/CustomIcon/CustomIcon';
import { AppImages } from '../../AppConstants/AppImages';
import SimpleTextField from '../../components/molecules/TextFeilds/SimpleTextField';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../AppConstants/appColors';
import { screenSize } from '../../components/atom/ScreenSize';
  
 

 
  
 
  
  const EditProfile = ({navigation, }) => {
    const [isEye, setIsEye] = useState(false);
   


   

    return (
      <Screen viewStyle={{ flex: 1, padding: 15 , backgroundColor: appColors.Black}} statusBarColor={appColors.Black}>
        <View style={{flex: 0.1}}>
          <Header
            headerSubView={{marginHorizontal: 5}}
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Edit Profile'}
            logIn={'success'}
          />
        </View>
      
        
      
          <View style={{flex:0.8,}}>
       
          <View style={{flex:0.34,}}> 
          <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
          <Image
            source={AppImages.ProfileSlider}
            style={{ width: '23%', height: '80%', borderRadius: 80 ,borderWidth:3,borderColor:appColors.Goldcolor}}
          />
          <CustomIcon type={Icons.AntDesign} size={20} name={'pluscircle'} color={'white'}style={{position:'absolute', top:screenSize.height/11.1,left:screenSize.width/1.96,}}/>
          </View>
          <View  style={{flex:0.1,alignItems:'center',justifyContent:'center'}}>  
             <Text style={{color:appColors.White,fontSize:15,fontWeight:'bold'}}>Michel Smith</Text>
          </View>
          <View  style={{flex:0.4,alignItems:'center',}}>  
          <Text style={{color:appColors.White}}>Michelsmith@gmail.com</Text>
          </View>
         
          
          </View>
          {/* <TouchableOpacity onPress={()=> refRBSheet.current.open()}  style={{flex:0.34,alignItems:'center'}}>

    

          
    
          <Image
            source={AppImages.ProfileSlider}
            style={{ width: '19%', height: '%', borderRadius: 80 ,borderWidth:3,borderColor:appColors.Goldcolor}}
          />
   
          <CustomIcon type={Icons.AntDesign} size={20} name={'pluscircle'} color={'white'}style={{position:'absolute',left:183, top:78}}/>
   <Text style={{color:appColors.White,fontSize:15,fontWeight:'bold'}}>Michel Smith</Text>
   <Text style={{color:appColors.White}}>Michelsmith@gmail.com</Text>
      
        </TouchableOpacity> */}
       
       
          <View style={{flex: 0.11,}}>
          {/* <View style={styles.container}> */}
           
                <SimpleTextField
                // textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Name'}
                    placeholderTextColor={appColors.LightGray}
                    
                    
                  />
                   
              {/* </View> */}
        </View>
  

        <View style={{flex: 0.11, }}>
        {/* <View style={styles.container}> */}
            
                   <SimpleTextField
                  //  textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Email'}
                    placeholderTextColor={appColors.LightGray}
                    
                  />
                  
        </View>
 

        <View style={{flex: 0.11 }}>
        {/* <View style={styles.container}> */}
           
        <SimpleTextField
                    placeholder={'Enter Your Password'}
                    eyeOpen={isEye}
                    onPressIcon={() => setIsEye(!isEye)}
                    secureTextEntry={true}
                    placeholderTextColor={appColors.LightGray}
                   
                  />
             
              
</View>
<View style={{flex: 0.11 }}>
        {/* <View style={styles.container}> */}
           
                 <SimpleTextField
                    // textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Phone no'}
                    placeholderTextColor={appColors.LightGray}
                    
                    
                  />
                   
             
              
</View>
<View style={{flex: 0.11 }}>
        {/* <View style={styles.container}> */}
           
                 <SimpleTextField
                    // textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Description'}
                    placeholderTextColor={appColors.LightGray}
                    
                    
                  />
                   
             
              
</View>
<View style={{flex: 0.11 }}>
        {/* <View style={styles.container}> */}
           
                 <SimpleTextField
                    // textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Registration Id'}
                    placeholderTextColor={appColors.LightGray}
                    
                    
                  />
                   
             
              
</View>


        {/* <View style={{flex: 0.11, }}>
           
                   <SimpleTextField
                  //  textUpperView={ {borderWidth: 0,}}
                    placeholder={'Enter Van Model'}
                    placeholderTextColor={appColors.LightGray}
                   
                  />
                  
            
           
      
   
       


        </View> */}
        </View>
      
        <View style={styles.buttonView}>
          <ButtonComponent
            style={{
              backgroundColor: '#C79646',
              paddingVertical: Platform.OS == 'ios' ? 17 : 13,
              bottom: 1,
              position: 'absolute',
            }}
            btnTextColor={{color: 'white'}}
            title={'Save'}
           
          />
       
    </View>
    

  
       
      
       
  
     
      </Screen>
    );
  };
  
  
  
  export default EditProfile;

  const styles=StyleSheet.create({
    buttonView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems:'center',
     
      },
  })
  