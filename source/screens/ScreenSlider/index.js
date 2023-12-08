import React, {useEffect} from 'react';
import {Text, View, StatusBar, StyleSheet} from 'react-native';
import Carousel from '../../components/atom/Carousel/cerousel';
import Screen from '../../components/atom/ScreenContainer/Screen';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import {AppImages} from '../../AppConstants/AppImages';
import AppColors from '../../AppConstants/appColors';
import {useNavigation} from '@react-navigation/native';
import constants from '../../AppConstants/Constants.json';

const ScreenSlider = ({navigation}) => {
  const imageData = [
    {
      image: AppImages.slider1,
      text: 'Find Barber & Salons Easily in Your Hands',
    },
    {
      image: AppImages.slider2,
      text: 'Book Your Favorite Barber & Salon Quickly',
    },
    {
      image: AppImages.slider3,
      text: 'Schedule the Appointment in the best Salon',
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  // const [displayText, setDisplayText] = React.useState(imageData[0].text);

  const onCurrentImagePressed = index => {
    // Handle logic when the current image is pressed
    console.log('Current image pressed!');

    // Update the text based on the current image index
    setCurrentImageIndex(index);
  };
  //  console.log(displayText)
  //   console.log("test>>>>>>>",displayText)
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Carousel
        images={imageData.map(item => item.image)}
        onCurrentImagePressed={index => onCurrentImagePressed(index)}
        currentImageEmitter={index => setCurrentImageIndex(index)}
        ImageComponentStyle={{width: '100%', height: '100%'}}
        paginationBoxVerticalPadding={100}
      />

      <Text style={styles.CarouselText}>
        {imageData[currentImageIndex].text}
      </Text>

      <View style={{alignItems: 'center'}}>
        <ButtonComponent
          style={{width: '90%', position: 'absolute', bottom: 20}}
          title={'Get Start'}
          onPress={() => navigation.navigate(constants.screen.Login)}
        />
      </View>
    </View>
  );
};
export default ScreenSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'center',
    //  backgroundColor:'red',
    //justifyContent:'flex-end'
  },

  CarouselText: {
    position: 'absolute',
    fontWeight: '600',
    color: AppColors.White,
    fontSize: 45,
    bottom: 130,
    marginLeft: 12,
  },
});
