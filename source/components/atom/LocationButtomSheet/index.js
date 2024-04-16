import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {screenSize} from '../ScreenSize';

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
      <TouchableOpacity onPress={handleLocation} style={[lbStyle.clContainer]}>
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
      <View style={{flex: 0.6}}>
        <FlatList
          data={data}
          keyExtractor={item => item.LocationId}
          renderItem={({item}) => <LocationList item={item} />}
        />
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
      <TouchableOpacity
        onPress={() => refRBSheet.current.close()}
        style={[
          lbStyle.clContainer,
          {justifyContent: 'center', alignItems: 'flex-end'},
        ]}>
        <View style={lbStyle.clButotnView}>
          <Text style={[lbStyle.clTextStyle, {textAlign: 'center'}]}>
            Confirm Location
          </Text>
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
  clContainer: {flex: 0.13, flexDirection: 'row'},
  clIconView: {flex: 0.15, justifyContent: 'center', alignItems: 'center'},
  clTextView: {flex: 0.8, justifyContent: 'center'},
  clTextStyle: {fontSize: 13, fontWeight: '500', color: appColors.White},
  clSelectLocation: {
    flex: 1,
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
    width: 250,
    height: '80%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default LocationBottomSheet;
