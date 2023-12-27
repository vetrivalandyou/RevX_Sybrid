import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppImages} from '../../../AppConstants/AppImages';
import {screenSize} from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';

const Notification = ({navigation}) => {
  return (
    <View style={{height: screenSize.height, backgroundColor: 'black'}}>
      <View style={{flex: 0.6}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Notification'}
          rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
};
export default Notification;

const styles = StyleSheet.create({
  NoticationContainer: {
    height: screenSize.height / 18.5,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },
  container: {
    width: screenSize.width / 1.07,
    height: screenSize.height / 9,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 10,
    marginVertical: 3,
    justifyContent: 'center',
  },
});
