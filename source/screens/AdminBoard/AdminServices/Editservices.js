import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {screenSize} from '../../../components/atom/ScreenSize';
// import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import Header from '../../../components/molecules/Header';

const Editservices = ({route, navigation}) => {
  // const navigation = useNavigation();
  // const {serviceName} = route.params;
  // const [editedServiceName, setEditedServiceName] = useState(serviceName);

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Edit Service'}
          logIn={'success'}
        />
      </View>
      <ScrollView style={{height: screenSize.height / 10}}>
        <TextInput
          style={[
            styles.container,
            {color: 'white', paddingHorizontal: 25, fontSize: 15},
          ]}
          // value={editedServiceName}
          // onChangeText={text => setEditedServiceName(text)}
        />
      </ScrollView>
      <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Save Service'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  );
};

export default Editservices;
