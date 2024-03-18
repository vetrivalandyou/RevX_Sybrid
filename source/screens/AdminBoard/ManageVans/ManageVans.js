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
import DeleteVanServices from './DeleteVanServices';
import {GetRequest, PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';

const ManageVans = ({navigation}) => {
  const refRBSheet = useRef();
  const [selectedItem, setSelectedItem] = useState(null);
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    VanServices();
  }, []);

  const VanServices = () => {
    GetRequest(endPoint.VAN_SERVICES)
      .then(res => {
        console.log('RESPONSEDATA', res?.data);
        if (res?.data?.code == 200) {
          setLoading(false);
          console.log(res?.data);
          setVans(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
          setLoading(false);
        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
        setLoading(false);
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
          headerText={'Vans'}
          logIn={'success'}
        />
      </View>

      <View style={{flex: 0.8}}>
        {loading ? ( // Show loader if loading is true s
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
            navigation.navigate(constants.AdminScreens.AddVanservices)
          }
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({item, onPress, selected}) => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const handleEditPress = item => {
    navigation.navigate(constants.AdminScreens.EditVanservices, {
      vanDetil: item,
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
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{item.vanName}</Text>
          </View>

          <TouchableOpacity
            onPress={() => handleEditPress(item)}
            style={styles.editImageView}>
            <Image
              source={require('../../../assets/editimage.png')}
              style={styles.editImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image
              source={require('../../../assets/deleteimage.png')}
              style={styles.Deleteimagestyle}
            />
          </TouchableOpacity>

          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteVanServices refRBSheet={refRBSheet} vandetails={item} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ManageVans;
