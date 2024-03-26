import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import constants from '../../../AppConstants/Constants.json';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import appColors from '../../../AppConstants/appColors';
import DeleteVanServices from './DeleteVanServices';
import {GetRequest} from '../../../services/apiCall';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {AppImages} from '../../../AppConstants/AppImages';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';

const ManageVans = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getUserDetail();
      VanServices();
    }
  }, [isFocused]);

  const getUserDetail = async () => {
    const userDatail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDatail);
  };

  const VanServices = () => {
    GetRequest(endPoint.VAN_SERVICES)
      .then(res => {
        if (res?.data?.code == 200) {
          setVans(res?.data?.data);
          setLoading(false);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
          setLoading(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoading(false);
      });
  };

  const Servicelist = ({item, onPress, selected}) => {
    const refRBSheet = useRef();
    const navigation = useNavigation();
    const handleEditPress = item => {
      navigation.navigate(constants.AdminScreens.EditVanservices, {
        vanDetails: item,
        userDetails: userDetails,
      });
      console.log(item);
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.container,
            selected && {borderColor: '#c79647', borderWidth: 1.25},
          ]}>
          <View style={styles.Subcontainer}>
            <View style={[styles.textView, {flex: 0.1}]}>
              <Image
                source={{uri: `${imageUrl}${item.vanPhotos}`}}
                style={{width: 35, height: 35, borderRadius: 100}}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>{item.vanName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleEditPress(item)}
              style={styles.editImageView}>
              <Image
                source={AppImages.Editimage}
                style={styles.editImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={styles.DeleteimageView}>
              <Image
                source={AppImages.deleteimage}
                style={styles.Deleteimagestyle}
              />
            </TouchableOpacity>
            <BottomSheet ref={refRBSheet} Height={200}>
              <DeleteVanServices
                refRBSheet={refRBSheet}
                vanDetails={item}
                userDetails={userDetails}
                VanServices={VanServices}
              />
            </BottomSheet>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1, backgroundColor: appColors.Black}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Vans'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.8}}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#C79646"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          />
        ) : (
          <FlatList
            data={vans}
            keyExtractor={item => item.vanId.toString()}
            renderItem={({item}) => (
              <Servicelist
                key={item.vanId}
                item={item}
                selected={selectedItem === item.vanId}
                onPress={() => setSelectedItem(item.vanId)}
              />
            )}
          />
        )}
      </View>
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Add Vans'}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.AddVanservices, {
              userDetails: userDetails,
            })
          }
        />
      </View>
    </Screen>
  );
};

export default ManageVans;
