import React, {useEffect, useRef} from 'react';
import {useState} from 'react';

import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';

import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../../AppConstants/Constants.json';

import appColors from '../../../AppConstants/appColors';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, messages} from '../../../AppConstants/urlConstants';
import Dropdown from '../../../components/molecules/Dropdown/Dropdown';
import Servicesboard from '.';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';

import {SimpleSnackBar} from '../../../components/atom/Snakbar/Snakbar';
import {AppImages} from '../../../AppConstants/AppImages';
import DeleteSubServices from './DeleteSubServices';

const ServiceList = ({navigation, route}) => {
  const {item} = route.params;
  const [selectedValue, setSelectedValue] = useState(null);
  const [newService, setNewService] = useState('');
  const [Services, setServices] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // const [dropDownData, SetdropdownData]  = useState([])
  // const [servicesList, setServiceslist] = useState([]);
  useEffect(() => {
    customerservices();
  }, []);

  const customerservices = () => {
    const payload = {
      servicesId: 0,
      barberId: 94,
      categoryServicesId: item.serviceCategoryId,
    };

    PostRequest(endPoint.CUSTOMER_SERVICES, payload)
      .then(res => {
        // setLoading(false);
        if (res?.data?.code == 200) {
          console.log(res?.data);
          setServices(res?.data?.data);
        } else {
          SimpleSnackBar(res?.data?.message);
          // setLoading(false);
        }
      })
      .catch(res => {
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
          headerText={'Sub Services'}
        />
      </View>
      <View style={{flex: 0.8}}>
        <FlatList
          data={Services}
          renderItem={({item}) => (
            <Servicedetails
              item={item}
              selected={selectedItems === item.serviceCategoryId}
              onPress={() => setSelectedItems(item.serviceCategoryId)}
            />
          )}
          keyExtractor={item => item.id}
        />
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
          title={'Request Sub Service'}
          onPress={() =>
            navigation.navigate(constants.BarberScreen.AddSubservices)
          }
          // onPress={handleditService}
        />
      </View>
    </Screen>
  );
};

const Servicedetails = ({item, selected, onPress}) => {
  const refRBSheet = useRef();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          selected && {borderColor: appColors.Goldcolor, borderWidth: 1.25},
        ]}>
        <View style={styles.Subcontainer}>
          <View style={{paddingVertical: 8, flex: 0.2}}>
            {item.serviceImage && <Image source={item.serviceImage} />}
          </View>

          <View style={{flex: 0.45, justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontSize: 18,
              }}>
              {item.serviceName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 0.3,
            }}>
            {/* <Text style={{color:'white', textAlign:'center', paddingVertical:12, fontSize:12, fontWeight:'bold'}}>View</Text> */}
            <Text style={{color: '#c79647', fontSize: 19, fontWeight: '600'}}>
              ${item.servicePrice}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image
              source={AppImages.deleteimage}
              style={styles.Deleteimagestyle}
            />
          </TouchableOpacity>
          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteSubServices refRBSheet={refRBSheet} DeleteService={item} />
          </BottomSheet>

          {/* <TouchableOpacity
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ServiceList;
