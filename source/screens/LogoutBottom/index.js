import React, {useEffect, useState} from 'react';
import {Text, View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';
import {screenSize} from '../../components/atom/ScreenSize';
import appColors from '../../AppConstants/appColors';
import {useDispatch} from 'react-redux';
import {LogOut} from '../../redux/Action/AuthAction';
import {getAsyncItem, setAsyncItem} from '../../utils/SettingAsyncStorage';
import constants from '../../AppConstants/Constants.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LogoutBottom = ({refRBSheet}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (isFocused) getAsyncData();
  }, [isFocused]);

  const getAsyncData = async () => {
    const userDetailsData = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDetailsData);
  };

  console.log('userDetails', userDetails);

  const onLogOut = async () => {
    await setAsyncItem(constants.AsyncStorageKeys.nearest_landmark, '');
    await setAsyncItem(constants.AsyncStorageKeys.longLat, {
      coords: {latitude: 0, longitude: 0},
    });
    dispatch(LogOut());
  };

  const signOut = async () => {
    try {
      if (userDetails?._RoleId == 4) {
        await GoogleSignin.signOut();
      }
      onLogOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[logoutStyle.container]}>
      <View
        style={{
          flex: 1,
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{flex: 0.5, justifyContent: 'center', marginHorizontal: 20}}>
          <Text
            style={{
              fontWeight: '500',
              color: appColors.White,
              fontSize: 18,
              paddingBottom: 10,
            }}>
            Logout?
          </Text>
          <Text style={{color: appColors.LightGray}}>
            Are you sure you want to logout from the app?
          </Text>
        </View>

        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <ButtonComponent
              title={'Cancel'}
              onPress={() => refRBSheet.current.close()}
              btnTextColor={{color: appColors.White}}
              btnColor={appColors.darkgrey}
              style={{
                width: '90%',
                borderWidth: 1,
                borderColor: appColors.White,
              }}
            />
          </View>
          <View style={{flex: 0.5, justifyContent: 'center'}}>
            <ButtonComponent
              onPress={() => {
                signOut();
              }}
              title={'Logout'}
              btnColor={appColors.Red}
              btnTextColor={{color: appColors.White}}
              style={{
                width: '90%',
                marginLeft: 8,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const logoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.darkgrey,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    // width:"100%"
  },
  titleView: {
    //  height: screenSize.height / 20,
    justifyContent: 'flex-end',
    flex: 0.5,
    backgroundColor: 'red',
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

export default LogoutBottom;
