import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../Utills/AppConstants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../../components/molecules/BottomSheetContent/BottomSheet';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import DeleteServices from './DeleteServices';
import constants from '../../../AppConstants/Constants.json';

const Addservices = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newService, setNewService] = useState('');
  const [data, setData] = useState([
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
  ]);
  return (
    <Screen viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Add Services'}
          logIn={'success'}
        />
      </View>
      <View style={{flex: 0.15, alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.74}}>
              <TextInput
                style={{
                  paddingLeft: 16,
                  paddingTop: 16,
                  fontSize: 15,
                  color: 'white',
                }}
                placeholder="Enter your Services"
                placeholderTextColor={'grey'}
                value={newService}
                onChangeText={text => setNewService(text)}
              />
            </View>
            <View
              style={{
                flex: 0.26,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ButtonComponent
                style={{
                  width: '82%',
                  backgroundColor: '#C79646',
                  borderRadius: 5,
                  paddingVertical: 11,
                }}
                btnTextColor={{color: 'white'}}
                title={'Add'}
                onPress={() => {
                  if (newService.trim() !== '') {
                    const newItem = {
                      id: data.length + 1,
                      name: newService.trim(),
                      editimage: require('../../../assets/editimage.png'),
                      deleteimage: require('../../../assets/deleteimage.png'),
                    };
                    setData([...data, newItem]);
                    setNewService(''); // Clear the input after adding the service
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={{flex: 0.65}}>
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
          title={'Save Services'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  );
};

const Servicelist = ({item, onPress, selected}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

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

export default Addservices;
