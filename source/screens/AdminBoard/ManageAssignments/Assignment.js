import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {AppImages} from '../../../AppConstants/AppImages';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {getAsyncItem} from '../../../utils/SettingAsyncStorage';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import constants from '../../../AppConstants/Constants.json';
import Header from '../../../components/molecules/Header';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import appColors from '../../../AppConstants/appColors';
import DeleteAssignment from './DeleteAssignment';

const Assignments = ({}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [vanAssignment, setVanAssignment] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getUserDetail();
      PostbarberVanAssignment();
    }
  }, [isFocused]);

  const getUserDetail = async () => {
    const userDatail = await getAsyncItem(
      constants.AsyncStorageKeys.userDetails,
    );
    setUserDetails(userDatail);
  };

  const PostbarberVanAssignment = () => {
    payload = {
      id: null,
      barberId: null,
      vanId: null,
      operations: 0,
      createdBy: 1,
      userIP: '::1',
    };

    PostRequest(endPoint.GET_BARBER_VANASSIGNMENT, payload)
      .then(res => {
        if (res?.data?.code == 200) {
          setVanAssignment(res?.data?.data);
          setLoader(false);
        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);
          setLoader(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoader(false);
      });
  };

  const VanAssignmentList = ({item, onPress, selected}) => {
    const refRBSheet = useRef();
    const navigation = useNavigation();

    const handleEditPress = () => {
      navigation.navigate(constants.AdminScreens.EditAssignment, {
        item: item,
        isAdded: false,
        userDetails: userDetails,
      });
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
                source={{uri: `${imageUrl}${item.vanPhoto}`}}
                style={{width: 35, height: 35, borderRadius: 100}}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>{item.vanName}</Text>
            </View>
            <TouchableOpacity
              onPress={handleEditPress}
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
              <DeleteAssignment refRBSheet={refRBSheet} />
            </BottomSheet>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  console.log('vanAssignment', vanAssignment);

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
          headerText={'Barber Van Assignments'}
        />
      </View>
      {loader ? (
        <ActivityIndicator
          size="large"
          color="#C79646"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View style={{flex: 0.8}}>
          <FlatList
            data={vanAssignment}
            keyExtractor={item => item.barberId.toString()}
            renderItem={({item}) => (
              <VanAssignmentList
                key={item.vanId}
                item={item}
                selected={selectedItem === item.vanId}
                onPress={() => setSelectedItem(item.vanId)}
              />
            )}
          />
        </View>
      )}
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Assign Vans'}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.EditAssignment, {
              isAdded: true,
              userDetails: userDetails,
            })
          }
        />
      </View>
    </Screen>
  );
};

export default Assignments;
