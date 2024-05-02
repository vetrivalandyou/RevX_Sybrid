// import React from "react";
// import {Text,View} from "react-native";

// const LocationBottom =()=>{
//     return(
//      <Text>
//         LocationBottom
//      </Text>
//     )
// }
// export default LocationBottom;

import React, {useEffect} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
// import {
//   appColors,
//   fontWeight,
//   screenSize,
//   sizes,
// } from '../../AppConstant/AppColors';
// import SmallButton from '../../Components/Button/SmallButton';

import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import {screenSize} from '../../components/atom/ScreenSize';
import appColors from '../../AppConstants/appColors';
import {AppImages} from '../../AppConstants/AppImages';
import CustomIcon, {
  Icons,
} from '../../components/molecules/CustomIcon/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import constants from '../../AppConstants/Constants.json';
import { imageUrl } from '../../AppConstants/urlConstants';

const LocationBottom = ({
  refRBSheet,
  selectedBarberDetails,
  setCalculateDirection,
}) => {
  const navigation = useNavigation();
  const onPressGetDirection = () => {
    setCalculateDirection(true);
    refRBSheet?.current?.close();
  };

  return (
    <View style={[logoutStyle.container]}>
      <View
        style={{
          flex: 0.05,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 5
        }}>
        <Text style={{color: appColors.White, fontSize: 18, fontWeight: 'bold'}}>Details</Text>
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <View style={{height: 1, backgroundColor: appColors.LightGray}} />
      </View>
      <View
        style={{flex: 0.3, backgroundColor: appColors.Gray, borderRadius: 20}}>
        <TouchableOpacity
          onPress={() => {
            refRBSheet?.current?.close();
            navigation.navigate(constants.screen.Services, {
              userId: selectedBarberDetails?.UserId,
            });
          }}
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems:'center',
            padding: 10,
          }}>
          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Image
              source={{uri: `${imageUrl}${selectedBarberDetails?.ProfileImage}`}}
              style={{ width: 80, height: 80, borderRadius: 10}}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flex: 0.3, alignItems:'flex-end', flexDirection: 'row'}}>
              <View style={{flex: 0.5, flexWrap: 'wrap', marginLeft: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: appColors.White,
                    fontWeight: '500',
                  }}>
                  {selectedBarberDetails?.UserName}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                {/* <View
                  style={{
                    flex: 0.6,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <CustomIcon
                    type={Icons.Ionicons}
                    name={'timer-outline'}
                    size={16}
                    color={appColors.Goldcolor}
                  />
                </View>
                <View
                  style={{flex: 0.4, justifyContent: 'center', marginLeft: 2}}>
                  <Text style={{fontSize: 10, color: appColors.Goldcolor}}>
                    40 Mins
                  </Text>
                </View> */}
              </View>
            </View>
            <View style={{flex: 0.65, marginLeft: 5}}>
              <View style={{flex: 0.5, justifyContent: 'center'}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  Senior Barber
                </Text>
              </View>
              <View style={{flex: 0.5, flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', flex: 0.2}}>
                  <CustomIcon
                    type={Icons.Feather}
                    name={'map-pin'}
                    color={appColors.White}
                    size={13}
                  />
                  <Text
                    style={{
                      color: appColors.White,
                      marginLeft: 5,
                      fontSize: 10.4,
                    }}>
                    {selectedBarberDetails?.Distance} km
                  </Text>
                </View>
                <View style={{flexDirection: 'row', flex: 0.8}}>
                  <CustomIcon
                    type={Icons.AntDesign}
                    name={'staro'}
                    color={'yellow'}
                    size={13}
                  />
                  <Text
                    style={{
                      color: appColors.White,
                      marginLeft: 5,
                      fontSize: 10.4,
                    }}>
                    4.1 rating
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.5}}>
        <ButtonComponent
          title={'Get Direction'}
          style={{backgroundColor: appColors.Gray, marginTop: 10}}
          onPress={() => onPressGetDirection()}
        />
      </View>
    </View>
  );
};

const logoutStyle = StyleSheet.create({
  container: {
    height: screenSize.height / 1.99,
    backgroundColor: appColors.darkgrey,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    padding: 15,
  },
  titleView: {
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  titleText: {
    marginLeft: 20,
    fontWeight: '500',
    color: appColors.White,
  },
  descriptionView: {
    height: screenSize.height / 20,
    justifyContent: 'center',
  },
  descriptionText: {
    marginLeft: 20,
    color: appColors.White,
  },
  buttonsMainView: {
    height: screenSize.height / 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLeftView: {
    width: screenSize.width / 2,
    height: screenSize.height / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonStyle: {
    height: screenSize.height / 22,
    margin: 22,
    width: screenSize.width / 4,
    backgroundColor: 'transparent',
    borderColor: appColors.AppGreen,
    borderWidth: 1,
  },
  buttonRightView: {
    width: screenSize.width / 2,
    height: screenSize.height / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonStyle: {
    height: screenSize.height / 22,
    margin: 22,
    width: screenSize.width / 4,
  },
});

export default LocationBottom;
