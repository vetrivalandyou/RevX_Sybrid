import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
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
import DeleteServices from './DeleteServices';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';

const Servicesboard = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const data = [
    {
      id: 1,
      name: 'Hair Cut',
      editimage: require('../../../assets/editimage.png'),
      deleteimage: require('../../../assets/deleteimage.png'),
    },
    {
      id: 2,
      name: 'Hair Coloring',
      editimage: require('../../../assets/editimage.png'),
      deleteimage: require('../../../assets/deleteimage.png'),
    },
    {
      id: 3,
      name: 'Hair Wash',
      editimage: require('../../../assets/editimage.png'),
      deleteimage: require('../../../assets/deleteimage.png'),
    },
    {
      id: 4,
      name: 'Shaving',
      editimage: require('../../../assets/editimage.png'),
      deleteimage: require('../../../assets/deleteimage.png'),
    },
    {
      id: 5,
      name: 'Skin Care',
      editimage: require('../../../assets/editimage.png'),
      deleteimage: require('../../../assets/deleteimage.png'),
    },

    {
      id: 6,
      name: 'Hair Dryer',
      editimage: require('../../../assets/editimage.png'),
      deleteimage: require('../../../assets/deleteimage.png'),
    },
  ];
  return (
    <Screen viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Our Services'}
          logIn={'success'}
        />
      </View>

      <ScrollView style={{flex: 0.8}}>
        {data?.map(item => (
          <Servicelist
            key={item.id}
            item={item}
            selected={selectedItem === item.id}
            onPress={() => setSelectedItem(item.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Add Services'}
          onPress={() =>
            navigation.navigate(constants.BarberScreen.Addservices)
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
    navigation.navigate(constants.BarberScreen.Editservices, {
      serviceName: item.name,
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
            <Text style={styles.textStyle}>{item.name}</Text>
          </View>

          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.editImageView}>
            <Image source={item.editimage} style={styles.editImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.DeleteimageView}>
            <Image source={item.deleteimage} style={styles.Deleteimagestyle} />
          </TouchableOpacity>

          <BottomSheet ref={refRBSheet} Height={200}>
            <DeleteServices refRBSheet={refRBSheet} />
          </BottomSheet>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Servicesboard;
