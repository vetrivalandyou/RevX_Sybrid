import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../../../components/atom/ScreenSize';

const LocationBottomSheet = ({handleUseMyCurrentLoc, refRBSheet}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [colorChange, setColorChange] = useState(true);

  const handleClickLocation = item => {
    console.log('handleClickLocation');
    setColorChange(!colorChange);
    setSelectedItem(item);
  };

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
  ];

  const handleLocation = () => {
    handleUseMyCurrentLoc();
    refRBSheet.current.close();
  };

  return (
    <View style={lbStyle.mainContainer}>
      <TouchableOpacity onPress={handleLocation} style={lbStyle.clContainer}>
        <View style={lbStyle.clIconView}>
          <CustomIcon
            type={Icons.Ionicons}
            name={'paper-plane-sharp'}
            size={20}
            color={appColors.White}
          />
        </View>
        <View style={lbStyle.clTextView}>
          <Text style={lbStyle.clTextStyle}>Use Current Location</Text>
        </View>
      </TouchableOpacity>
      <View style={{flex: 0.7, justifyContent: 'space-around'}}>
        {data?.map((x, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              handleClickLocation(x);
            }}
            style={{
              flex: 0.22,
              backgroundColor:
                selectedItem?.LocationId == x.LocationId
                  ? '#202020'
                  : appColors.Black,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <View style={lbStyle.clIconView}>
              <View
                style={[
                  lbStyle.OuterCircle,
                  selectedItem?.LocationId == x.LocationId && {
                    backgroundColor: appColors.White,
                  },
                ]}>
                {selectedItem?.LocationId == x.LocationId && (
                  <View style={lbStyle.innerCircle}></View>
                )}
              </View>
            </View>
            <View style={[lbStyle.clTextView, {flex: 0.7}]}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: appColors.White,
                }}>
                {x.locationName}
              </Text>
            </View>
            {selectedItem?.LocationId == x.LocationId && (
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
        ))}

        {/* <TouchableOpacity
          onPress={handleClickLocation}
          style={{
            flex: 0.22,
            backgroundColor: colorChange == true ? '#202020' : appColors.Black,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                colorChange && {backgroundColor: appColors.White},
              ]}>
              {colorChange && <View style={lbStyle.innerCircle}></View>}
            </View>
          </View>
          <View style={[lbStyle.clTextView]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              Lakson Group of Company
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClickLocation}
          style={{
            flex: 0.22,
            backgroundColor: colorChange == true ? '#202020' : appColors.Black,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                colorChange && {backgroundColor: appColors.White},
              ]}>
              {colorChange && <View style={lbStyle.innerCircle}></View>}
            </View>
          </View>
          <View style={[lbStyle.clTextView]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              Lakson Group of Company
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClickLocation}
          style={{
            flex: 0.22,
            backgroundColor: colorChange == true ? '#202020' : appColors.Black,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                colorChange && {backgroundColor: appColors.White},
              ]}>
              {colorChange && <View style={lbStyle.innerCircle}></View>}
            </View>
          </View>
          <View style={[lbStyle.clTextView]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              Lakson Group of Company
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClickLocation}
          style={{
            flex: 0.22,
            backgroundColor: colorChange == true ? '#202020' : appColors.Black,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <View style={lbStyle.clIconView}>
            <View
              style={[
                lbStyle.OuterCircle,
                colorChange && {backgroundColor: appColors.White},
              ]}>
              {colorChange && <View style={lbStyle.innerCircle}></View>}
            </View>
          </View>
          <View style={[lbStyle.clTextView, {flex: 0.7}]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: appColors.White,
              }}>
              My Home
            </Text>
          </View>
          {colorChange && (
            <View style={[lbStyle.clTextView, {flex: 0.1}]}>
              <CustomIcon
                type={Icons.MaterialIcons}
                name={'edit-location-alt'}
                size={20}
                color={appColors.White}
              />
            </View>
          )}
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={() => refRBSheet.current.close()}
        style={lbStyle.clContainer}>
        <View style={lbStyle.clIconView}>
          <CustomIcon
            type={Icons.Entypo}
            name={'plus'}
            size={20}
            color={appColors.White}
          />
        </View>
        <View style={lbStyle.clTextView}>
          <Text style={lbStyle.clTextStyle}>Add New Location</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const lbStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColors.Black,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  clContainer: {flex: 0.15, flexDirection: 'row'},
  clIconView: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  clTextView: {flex: 0.8, justifyContent: 'center'},
  clTextStyle: {fontSize: 15, fontWeight: '500', color: appColors.White},
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
});
export default LocationBottomSheet;
