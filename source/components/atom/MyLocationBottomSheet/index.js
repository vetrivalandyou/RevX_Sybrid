import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../ScreenSize';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';
import SimpleTextField from '../../molecules/TextFeilds/SimpleTextField';

const MyLocationBottomSheet = ({handleUseMyCurrentLoc, refRBSheet}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [colorChange, setColorChange] = useState(true);
  const navigation = useNavigation();

  const handleClickLocation = item => {
    console.log('handleClickLocation');
    setColorChange(!colorChange);
    setSelectedItem(item);
  };

  const [locationName, setLocationName] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');

  const isButtonDisabled = !locationName || !nearestLandmark;

  const data = [
    {
      LocationId: 1,
      locationName: 'Lakson Group of Companies',
    },
    {
      LocationId: 2,
      locationName: 'My Home',
    },
    {
      LocationId: 3,
      locationName: 'Ayesha Manzil',
    },
    {
      LocationId: 4,
      locationName: 'Karimabad',
    },
    {
      LocationId: 5,
      locationName: 'Machar Colony',
    },
    {
      LocationId: 6,
      locationName: 'Dehli Colony',
    },
  ];

  const handleLocation = () => {
    handleUseMyCurrentLoc();
    // refRBSheet.current.close();
  };

  const openLocationScreen = () => {
    navigation.navigate(constants.screen.MyLocation),
      refRBSheet.current.close();
  };

  const LocationList = ({item}) => {
    return (
      <View
        style={{
          height: screenSize.height / 15,
          width: 'auto',
          margin: 5,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          key={item?.LocationId}
          onPress={() => {
            handleClickLocation(item);
          }}
          style={[
            lbStyle.clSelectLocation,
            {
              backgroundColor:
                selectedItem?.LocationId == item.LocationId
                  ? '#202020'
                  : appColors.Black,
            },
          ]}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                selectedItem?.LocationId == item.LocationId && {
                  backgroundColor: appColors.White,
                },
              ]}>
              {selectedItem?.LocationId == item.LocationId && (
                <View style={lbStyle.innerCircle}></View>
              )}
            </View>
          </View>
          <View style={[lbStyle.clTextView, {flex: 0.7}]}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              {item.locationName}
            </Text>
          </View>
          {selectedItem?.LocationId == item.LocationId && (
            <View style={[lbStyle.clTextView, {flex: 0.1}]}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'edit-location-alt'}
                size={20}
                color={appColors.White}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={lbStyle.mainContainer}>
      <View
        style={{
          flex: 0.3,
          borderRadius: 3,
        }}>
        <SimpleTextField
          placeholder={'Location Name'}
          placeholderTextColor={appColors.LightGray}
          onChangeText={text => setLocationName(text)}
          value={locationName}
          //   onChangeText={handleChange('UserEmail')}
          //   onBlur={handleBlur('UserEmail')}
          //   value={values.UserEmail}
        />
      </View>
      <View
        style={{
          flex: 0.3,
        }}>
        <SimpleTextField
          placeholder={'Nearst Landmark'}
          placeholderTextColor={appColors.LightGray}
          onChangeText={text => setNearestLandmark(text)}
          value={nearestLandmark}
          //   onChangeText={handleChange('UserEmail')}
          //   onBlur={handleBlur('UserEmail')}
          //   value={values.UserEmail}
        />
      </View>
      <View style={{flex: 0.3}}>
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={[
            lbStyle.clContainer,
            {justifyContent: 'center', alignItems: 'center'},
            (disabled = {isButtonDisabled}),
          ]}>
          <View style={lbStyle.clButotnView}>
            <Text style={[lbStyle.clTextStyle, {textAlign: 'center'}]}>
              Add address details
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 0.4,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    // backgroundColor: appColors.AppBlue,
  },

  clTextStyle: {fontSize: 13, fontWeight: '500', color: appColors.White},
  clSelectLocation: {
    borderRadius: 20,
    flexDirection: 'row',
  },

  OuterCircle: {
    height: 25,
    width: 25,
    borderRadius: 40,
    borderColor: appColors.Goldcolor,
    borderWidth: 2,
    backgroundColor: appColors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 40,
    backgroundColor: appColors.Goldcolor,
    position: 'absolute',
  },

  clButotnView: {
    backgroundColor: appColors.Goldcolor,
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default MyLocationBottomSheet;
