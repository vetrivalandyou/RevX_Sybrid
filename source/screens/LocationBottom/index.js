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

import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
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

const LocationBottom = ({refRBSheet}) => {
  const onLogOut = () => {
    refRBSheet?.current?.close();
  };

  return (
    <View style={[logoutStyle.container]}>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: appColors.White, fontSize: 22}}>Details</Text>
        <Text style={{fontSize: 16, color: appColors.Goldcolor}}>
          See all barbers
        </Text>
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <View style={{height: 1, backgroundColor: appColors.LightGray}} />
      </View>

      <View
        style={{flex: 0.3, backgroundColor: appColors.Gray, borderRadius: 20}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
          }}>
          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Image
              source={AppImages.bottomsheetimg}
              style={{flex: 1, resizeMode: 'contain'}}
            />
          </View>

          <View style={{flex: 0.7}}>
            <View style={{flex: 0.25, flexDirection: 'row'}}>
              <View style={{flex: 0.5, flexWrap: 'wrap'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: appColors.White,
                    fontWeight: '500',
                  }}>
                  Nathan Alexender
                </Text>
              </View>

              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <View
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
                </View>
              </View>
            </View>

            <View style={{flex: 0.65}}>
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
                    km
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
        </View>
      </View>
      <View style={{flex: 0.2, justifyContent: 'center'}}>
        <ButtonComponent
          title={'Get direction'}
          style={{backgroundColor: appColors.Gray}}
          onPress={() => onLogOut()}
        />
      </View>

      {/* <View style={[logoutStyle.titleView]}>
        <Text style={[logoutStyle.titleText]}>Logout?</Text>
      </View> */}
      {/* <View style={[logoutStyle.descriptionView]}>
        <Text style={[logoutStyle.descriptionText]}>
          Are you sure you want to logout
        </Text>
      </View> */}
      {/* <View style={[logoutStyle.buttonsMainView]}>
        <View style={[logoutStyle.buttonLeftView]}>
          <ButtonComponent
            style={[logoutStyle.cancelButtonStyle]}
            textStyle={{color: appColors.AppGreen}}
            title={'Cancel'}
            onPress={onLogOut}
          />
        </View>
        <View style={[logoutStyle.buttonRightView]}>
          <ButtonComponent
            style={[logoutStyle.logoutButtonStyle]}
            title={'Logout'}
            onPress={onLogOut}
          />
        </View>
      </View> */}
    </View>
  );
};

const logoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.darkgrey,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    padding: 15,
    // width:"100%"
  },
  titleView: {
    //  height: screenSize.height / 20,
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  titleText: {
    // fontSize: sizes.large,
    marginLeft: 20,
    fontWeight: '500',
    // fontWeight: fontWeight.bold,
    color: appColors.White,
  },
  descriptionView: {
    height: screenSize.height / 20,
    justifyContent: 'center',
  },
  descriptionText: {
    // fontSize: sizes.medium,
    marginLeft: 20,
    color: appColors.White,
  },
  buttonsMainView: {
    height: screenSize.height / 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
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
