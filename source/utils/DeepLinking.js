import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import constant from '../AppConstants/Constants.json';
import {getAsyncItem} from './SettingAsyncStorage';
import { useSelector } from 'react-redux';

const DeepLinking = () => {
  const navigation = useNavigation();
  const {loggedIn} = useSelector(state => state.AuthReducer);
  useEffect(() => {
    const handleDeepLink = (userDetail, url) => {
      const profileId = url.split('profileId=')[1];
      if (userDetail?._RoleId == 4) {
        if (url === `revx://revx.com/barberprofile/profileId=${profileId}`) {
          navigation.navigate(constant.screen.BarberProfile, {
            barberId: profileId,
          });
        }
      }
    };
    const getAsyncDetail = async ({url}) => {
      const userDetail = await getAsyncItem(
        constant.AsyncStorageKeys.userDetails,
      );
      console.log('userDetailuserDetail', userDetail);
      handleDeepLink(userDetail, url);
    };
    Linking.addEventListener('url', getAsyncDetail);
    // return () => {
    //   Linking.removeEventListener('url', getAsyncDetail);
    // };
  }, [loggedIn]);
  return null;
};

export default DeepLinking;
