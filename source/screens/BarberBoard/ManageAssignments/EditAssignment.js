import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { screenSize } from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import CustomDropdownPicker from '../../../components/molecules/CustomDropdownPicker';

const EditAssignment = ({ route }) => {
  const navigation = useNavigation();
  const { serviceName, isAdded } = route.params || {};

  console.log("isAddedtrue", isAdded,)
  console.log("serviceName", serviceName,)

  const [selectedVans, setselectedvans] = useState(serviceName);
  const [selectedAssignment, setselectedAssignment] = useState(serviceName);

  const onSave = () => {
    navigation.goBack()
  }
  const dropDownData = [
    { label: 'edit1', value: 'edit1' },
    { label: 'edit2', value: 'edit2' },
    { label: 'edit3', value: 'edit3' },
    { label: 'edit4', value: 'edit4' },
  ]

  return (
    <Screen viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={isAdded ? 'Add Van Assignment' : 'Edit Van Assignment'}
          logIn={'success'}
        />
      </View>
      <View style={{ flex: 0.8, }}>
        <View style={{ flex: 0.15, justifyContent: 'center' }}>
          <View style={{ flex: 0.65, }}>
            <CustomDropdownPicker label={'Select a value'}
              value={selectedVans}
              onValueChange={(itemValue) => setselectedvans(itemValue)}
              dropDownData={dropDownData}
              style={{ backgroundColor: 'black', borderColor: appColors.AppLightGray, borderRadius: 30, paddingHorizontal: 10 }}
            />
          </View>
        </View>

        <View style={{ flex: 0.15, justifyContent: 'center' }}>
          <View style={{ flex: 0.65, }}>
            <CustomDropdownPicker label={'Select a value'}
              value={selectedAssignment}
              onValueChange={(itemValue) => setselectedAssignment(itemValue)}
              dropDownData={dropDownData}
              style={{ backgroundColor: 'black', borderColor: appColors.AppLightGray, borderRadius: 30, paddingHorizontal: 10 }}
            />
          </View>
        </View>
      </View>

      {/* <ScrollView style={{height: screenSize.height / 10,backgroundColor:'red'}}>
          <TextInput
            style={[
              styles.container,
              {color: 'white', paddingHorizontal: 25, fontSize: 15},
            ]}
            value={editedServiceName}
            onChangeText={text => setEditedServiceName(text)}
          />
        </ScrollView> */}
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{ color: 'white' }}
          title={isAdded ? 'Save' : 'Update'}

          onPress={onSave}
        />
      </View>
    </Screen>
  );
};


export default EditAssignment;
