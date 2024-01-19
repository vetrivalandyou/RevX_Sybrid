import React, { useState } from 'react';
import { View, Text, StyleSheet ,Image,StatusBar} from 'react-native';
import Carousel, { Pagination ,ParallaxImage} from 'react-native-snap-carousel';
import { AppImages } from '../../AppConstants/AppImages';
import { screenSize } from '../../components/atom/ScreenSize';
import appColors from '../../AppConstants/appColors';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import constants from "../../AppConstants/Constants.json"
import { useNavigation } from '@react-navigation/native';

const ScreenSlider  = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);

  // const data = [
  //   {
  //     image: AppImages.slider1,
  //     text: 'Find Barber & Salons Easily in Your Hands',
  //   },
  //   {
  //     image: AppImages.slider2,
  //     text: 'Book Your Favorite Barber & Salon Quickly',
  //   },
  //   {
  //     image: AppImages.slider3,
  //     text: 'Schedule the Appointment in the best Salon',
  //   },
  // ];
  const ENTRIES1 = [
    {
      title: 'Find Barber & Salons Easily in Your Hands',
      illustration: AppImages.slider1
    },
    {
      title: 'Book Your Favorite Barber & Salon Quickly',
      illustration: AppImages.slider2
    },
    {
      title: 'Schedule the Appointment in the best Salon',
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
    <View style={styles.container}>
        <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Carousel
    //  ref={carouselRef}
        data={ENTRIES1}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={screenSize.width}
        itemWidth={screenSize.width}
        autoplay={true}
      />
      <Pagination
        dotsLength={ENTRIES1.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
       
      />
       <View style={{alignItems: 'center'}}>
        <ButtonComponent
          style={{width: '90%', position: 'absolute', bottom:20}}
          title={'Get Start'}
          onPress={() => navigation.navigate(constants.AuthScreen.Login)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    fontWeight: '600',
    color: appColors.White,
    fontSize: 45,
    bottom: 130,
    marginLeft: 12,
  },
  paginationContainer: {
   // marginTop: -20,
   position:'absolute',
   bottom:60,
  // backgroundColor:'red',
   alignSelf:'center'
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
    backgroundColor:appColors.darkgrey
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

export default ScreenSlider ;