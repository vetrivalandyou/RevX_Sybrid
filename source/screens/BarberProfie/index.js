import React, { useState } from 'react';
import { Image, ImageBackground, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/atom/ScreenContainer/Screen';
import Header from '../../components/molecules/Header';
import CustomIcon, { Icons } from '../../components/molecules/CustomIcon/CustomIcon';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import appColors from '../../AppConstants/appColors';
import { AppImages } from '../../AppConstants/AppImages';
import { screenSize } from '../../components/atom/ScreenSize';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../AppConstants/Constants.json';

const BarberProfile = ({ navigation }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const Profiles = [
        {
            // title: 'Find Barber & Salons Easily in Your Hands',
            illustration: AppImages.ProfileSlider
        },
        {
            // title: 'Book Your Favorite Barber & Salon Quickly',
            illustration: AppImages.slider2
        },
        {
            // title: 'Schedule the Appointment in the best Salon',
            illustration: AppImages.slider3
        },


    ];

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.slide}>
                <Image source={item.illustration} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>

            </View>
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: appColors.Black }}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="light-content"
            />



            <View style={{ flex: 0.4,  }}>
                <Carousel
                    //  ref={carouselRef}
                    data={Profiles}
                    renderItem={renderItem}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    sliderWidth={screenSize.width}
                    itemWidth={screenSize.width}
                    autoplay={true}
                />
                <Pagination
                    dotsLength={Profiles.length}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.dotStyle}
                    inactiveDotStyle={styles.inactiveDotStyle}
                    inactiveDotOpacity={0.6}
                    inactiveDotScale={0.8}

                />
                <View style={{ flex: 1, position: 'absolute', top: 40, left: 0, right: 0, }}>
                    <View style={{ flex: 0.1 }}>
                        <Header
                            lefttIcoType={Icons.Ionicons}
                            onPressLeftIcon={() => navigation.goBack()}
                            leftIcoName={'chevron-back'}
                            doubleIcon={true}
                            color={appColors.Black}
                            // headerText={'Barber Special List'}
                            rightIcoName={'bell'}
                            rightIcoType={Icons.SimpleLineIcons}
                            rightIcoSize={20}
                            iconStyle={{color:appColors.Black,fontWeight:'bold'}}
                            iconContainerStyle1={{
                                backgroundColor: appColors.White,
                                borderRadius: 50,
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                              
                            }}
                            rightIcoName2={'filter'}
                            rightIcoType2={Icons.Feather}
                            rightIcoSize2={20}
                           
                            iconContainerStyle2={{
                                backgroundColor: appColors.White,
                                borderRadius: 50,
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            
                            }}
                        
                        />
                    </View>
                  
                </View>
                
            </View>
            <View style={{flex:0.1, flexDirection:'row',paddingHorizontal:10}}>
                <View style={{flex:0.79, }}>
                    <View style={{flex:0.5, justifyContent:'flex-end'}}>
                        <Text style={{fontSize:27, color:appColors.White,}}>The Barber Shop</Text>
                        </View>
                        <View style={{flex:0.35, flexDirection:'row',}}>
                        <View style={{flex:0.33, flexDirection:'row'}}>
                            <View style={{flex:0.23, justifyContent:'center', }}>
                        <CustomIcon
                  type={Icons.Ionicons}
                  name={'location-outline'}
                  color={appColors.White}
                  size={20}
                />
                </View>
                <View style={{flex:0.77, justifyContent:'center'}}>
                    <View  >
                <Text style={{color:appColors.White, fontSize:15,fontWeight:'500'}}>1.6km</Text>
                </View>
                </View>
                        </View>
                        <View style={{flex:0.77,flexDirection:'row'}}>
                        <View style={{flex:0.11,justifyContent:'center'}}>
                        <CustomIcon
                  type={Icons.AntDesign}
                  name={'staro'}
                  color={appColors.Goldcolor}
                  size={18}
                />
                </View>
                <View style={{flex:0.89,justifyContent:'center',}}>
                <Text style={{color:appColors.White, fontSize:15,fontWeight:'500',}}>4.1rating</Text>
                        </View>
                        </View>
                     
                 
                        </View>
                        </View>
                        <View style={{flex: 0.21, }}>
                            <View style={{flex:0.5,justifyContent:'flex-end',alignItems:'center'}}>
              <View style={styles.Ratingbox}>
                <View
                  style={{
                    color: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                 <CustomIcon
                  type={Icons.AntDesign}
                  name={'staro'}
                  color={appColors.Goldcolor}
                  size={17}
                />
                  <Text style={{color: '#c79647', fontSize: 12}}>
                    4.1
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex:0.35 ,justifyContent:'center'}}>
                <View>
                    <Text style={{color:appColors.Goldcolor, fontSize:16,fontWeight:'500'}}>
                        5k+ ratings
                    </Text>
                </View>
                </View>
                

            </View>
                        <View>

                        </View>
                    </View>
                    <View style={{flex:0.11, flexDirection:'row',paddingHorizontal:5}}>
                        
                        <View style={{flex:0.2,}}>
                            <View style={{flex:0.73, alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity
                
                style={{
                  
                  borderRadius: 50,
                  height: 55,
                  width: 55,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor:appColors.White,
                  borderWidth:2,
                }}>
                <CustomIcon
                  type={Icons.Ionicons}
                  name={'location-outline'}
                  color={appColors.White}
                  size={25}
                />
              </TouchableOpacity>
              </View>
              <View style={{flex:0.27,justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
              <Text style={{color:appColors.White,fontSize:17,fontWeight:'500',}}>location</Text>
              </View>
              </View>
             
              
              </View>
              <View style={{flex:0.2,}}>
              <View style={{flex:0.73, alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                
                style={{
                  
                  borderRadius: 50,
                  height: 55,
                  width: 55,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor:appColors.White,
                  borderWidth:2,
                }}>
                <CustomIcon
                  type={Icons.Ionicons}
                  name={'chatbubble-ellipses-outline'}
                  color={appColors.White}
                  size={25}
                />
              </TouchableOpacity>
              </View>
              <View style={{flex:0.27,justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
              <Text style={{color:appColors.White,fontSize:17,}}>Chat</Text>
              </View>
              </View>
             
              </View>
              <View style={{flex:0.2,}}>
              <View style={{flex:0.73,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                
                style={{
                  
                  borderRadius: 50,
                  height: 55,
                  width: 55,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor:appColors.White,
                  borderWidth:2,
                }}>
                <CustomIcon
                  type={Icons.Ionicons}
                  name={'share-outline'}
                  color={appColors.White}
                  size={25}
                />
              </TouchableOpacity>
              </View>
             
              <View style={{flex:0.27,}}>
                <View style={{alignItems:'center'}}>
              <Text style={{color:appColors.White,fontSize:17,fontWeight:'500',}}>Share</Text>
              </View>
              </View>
              </View>
                    </View>
                    <View style={{flex:0.04, marginHorizontal: 10,justifyContent:'center'}}>
            <View style={{ borderWidth: 1, borderColor: appColors.White, borderStyle: 'dashed', backgroundColor:'transparent'  }}></View>
          </View>
          <View style={{flex:0.05, justifyContent:'center',marginHorizontal:12}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:18,color:appColors.White}}>Barber Specialist</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.screen.BarberSpecialist)
              }>
            <Text style={{color:appColors.Goldcolor,fontSize:15}}>See all</Text>
            </TouchableOpacity>
            </View>
           
          </View >
<View style={{flex:0.1,justifyContent:'center'}}>
          <View
        style={{
          backgroundColor: appColors.darkgrey,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderRadius: 70,
          flexDirection: 'row',
          marginVertical: 5,
          marginHorizontal:6,
        }}>
        <Image  source={AppImages.bb1}/>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.8, justifyContent: 'center'}}>
            <Text style={{color: appColors.White, fontSize: 18, marginLeft: 5}}>
              Nathan Alexender
            </Text>
            <Text style={{color: appColors.White, marginLeft: 5, fontSize: 12}}>
              Senior Barber
            </Text>
          </View>
          <View style={{flex: 0.5,alignItems:'center',justifyContent:'center'}}>
            <ButtonComponent style={{width: '98%'}} title={'Message'} />
          </View>
        </View>
      </View>
      </View>
      <View style={{flex:0.1, justifyContent:'center'}}>
          <View
        style={{
          backgroundColor: appColors.darkgrey,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderRadius: 70,
          flexDirection: 'row',
          marginVertical: 5,
          marginHorizontal:6,
        }}>
        <Image  source={AppImages.bb1}/>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.8, justifyContent: 'center'}}>
            <Text style={{color: appColors.White, fontSize: 18, marginLeft: 5}}>
              Nathan Alexender
            </Text>
            <Text style={{color: appColors.White, marginLeft: 5, fontSize: 12}}>
              Senior Barber
            </Text>
          </View>
          <View style={{flex: 0.5,alignItems:'center',justifyContent:'center'}}>
            <ButtonComponent style={{width: '98%'}} title={'Message'} />
          </View>
        </View>
      </View>
      </View>

      <View
        style={{
          flex: 0.1,
         
          justifyContent:'center',
          paddingHorizontal:12,
        }}>
        <ButtonComponent
          title={'Book Now'}
          onPress={() => navigation.navigate(constants.screen.PaymentDetails)}
       
        />
      </View>

        </View>
    )

}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.Black,
       


    },
   
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: appColors.Goldcolor
    },
    inactiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: appColors.darkgrey
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
    
    },
    image: {
        height: "100%", width: "100%",
        resizeMode: 'cover',

    },
    Ratingbox: {
        height: screenSize.height / 28,
        width: screenSize.width / 7,
        justifyContent: 'center',
    
        borderWidth: 0.75,
        borderRadius: 7,
        borderColor: '#c79647',
      },
});
export default BarberProfile;

