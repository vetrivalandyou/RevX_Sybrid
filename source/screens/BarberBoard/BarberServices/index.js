import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { screenSize } from '../../../components/atom/ScreenSize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
// import BottomSheet from '../../components/atom/BottomSheet';

import Screen from '../../../components/atom/ScreenContainer/Screen';
import constants from '../../../AppConstants/Constants.json';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import DeleteServices from './DeleteServices';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import appColors from '../../../AppConstants/appColors';
import { endPoint, messages } from '../../../AppConstants/urlConstants';
import { SimpleSnackBar } from '../../../components/atom/Snakbar/Snakbar';
import { GetRequest, PostRequest } from '../../../services/apiCall';
import { AppImages } from '../../../AppConstants/AppImages';

const Servicesboard = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [servicesList, setServiceslist] = useState([]);

  useEffect(() => {
    GetsetupCategories();
  }, []);

  const GetsetupCategories = () => {
    const payload = {
      categoryId: 0,
      categoryName: "",
      operations: 3,
      createdBy: 0
    }
    PostRequest(endPoint.GET_SETUP_CATEGORIES,payload)

      .then(res => {
        console.log('responseeee>>>>.>', res?.data?.data)
        if (res?.data?.code == 200) {
          setServiceslist(res?.data?.data);

        } else {
          SimpleSnackBar(res?.data?.message, appColors.Red);

        }
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);

      });
  };


  const handleItemPress = (item) => {
    setSelectedItem(item.categoryId);
    navigation.navigate(constants.BarberScreen.ServiceList, {
      serviceName: item.categoryName,
    });
  };
  console.log("servielist===", servicesList)
  return (
    <Screen viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }} statusBarColor={appColors.Black} >
      <View style={{ flex: 0.1, backgroundColor: appColors.Black }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Our Services'}
          logIn={'success'}
        />
      </View>

      <ScrollView style={{ flex: 0.8, }}>
        {servicesList?.map(item => (
          <Servicelist
            key={item.categoryId}
            item={item}
            selected={selectedItem === item.categoryId}
            onPress={() => handleItemPress(item)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{ color: 'white' }}
          title={'Add Services'}
          onPress={() =>
            navigation.navigate(constants.BarberScreen.Addservices)
          }
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({ item, onPress, selected }) => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const handleEditPress = () => {
    navigation.navigate(constants.BarberScreen.Editservices, {
      serviceName: item.categoryName,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          selected && { borderColor: '#c79647', borderWidth: 1.25 },
        ]}>
        <View style={styles.Subcontainer}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{item.categoryName}</Text>
          </View>

          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.editImageView}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image source={AppImages.deleteimage} style={styles.Deleteimagestyle} />
          </TouchableOpacity>

          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteServices refRBSheet={refRBSheet}/>
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Servicesboard;
