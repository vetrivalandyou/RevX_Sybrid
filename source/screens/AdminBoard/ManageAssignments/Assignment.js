import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {screenSize} from '../../../components/atom/ScreenSize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
// import BottomSheet from '../../components/atom/BottomSheet';

import Screen from '../../../components/atom/ScreenContainer/Screen';
import constants from '../../../AppConstants/Constants.json';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';

import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import appColors from '../../../AppConstants/appColors';
import DeleteAssignment from './DeleteAssignment';
import {endPoint} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';
import {AppImages} from '../../../AppConstants/AppImages';
import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';

const Assignments = ({}) => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [vanAssignment, setvanAssignment] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    PostbarberVanAssignment();
  },[]);

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
          setvanAssignment(res?.data?.data);
          setLoader(false);
        } else {
          SimpleSnackBar(res?.data?.message);
          console.log('................else', res.data);
          setLoader(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoader(false);
      });
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
          headerText={'Assignments'}
        />
      </View>
      {loader ? (
        <ActivityIndicator
          size="large"
          color="#C79646"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <ScrollView style={{flex: 0.8}}>
          {vanAssignment?.map(item => (
            <Servicelist
              key={item.vanId}
              item={item}
              selected={selectedItem === item.vanId}
              onPress={() => setSelectedItem(item.vanId)}
            />
          ))}
        </ScrollView>
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
          title={'Add Assignment'}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.EditAssignment, {
              isAdded: true,
            })
          }
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({item, onPress, selected}) => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const handleEditPress = () => {
    navigation.navigate(constants.AdminScreens.EditAssignment, {
      serviceName: item.vanName,
      isAdded: false,
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
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{item.vanName}</Text>
          </View>

          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.editImageView}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
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

export default Assignments;
