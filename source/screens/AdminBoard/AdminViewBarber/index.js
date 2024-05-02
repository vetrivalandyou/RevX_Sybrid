import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../../AppConstants/AppImages';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../../AppConstants/Constants.json';
import {BarChart, Grid} from 'react-native-svg-charts';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import {imageUrl} from '../../../AppConstants/urlConstants';

const AdminViewBarber = ({navigation, route}) => {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const {UserName, ProfileImage, UserEmail, PhoneNo, userList} = route.params;
  console.log('userimage...', userList);

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          headerText={'View Barber'}
          logIn={'success'}
          rightIcoSize={20}
          headerTextViewStyle={{alignItems: 'center'}}
          onPressLeftIcon={() => navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: `${imageUrl}${userList?.item?.ProfileImage}`}}
          style={{
            borderWidth: 2,
            borderColor: appColors.Goldcolor,
            borderRadius: 90,
            height: 130,
            width: 130,
          }}
        />
        <Text
          style={{color: appColors.White, fontSize: 24, paddingVertical: 6}}>
          {userList?.item?.UserName == ''
            ? 'No data by user'
            : userList?.item?.UserName}
        </Text>
        <Text style={{color: appColors.White, fontSize: 16}}>
          {userList?.item?.UserEmail == ''
            ? 'No data by user'
            : userList?.item?.UserEmail}
        </Text>
      </View>

      <View style={{flex: 0.26, justifyContent: 'space-evenly'}}>
        <Text style={styles.userDetails}>
          {userList?.item?.UserName == ''
            ? 'No data by user'
            : userList?.item?.UserName}
        </Text>
        <Text style={styles.userDetails}>
          {userList?.item?.UserEmail == ''
            ? 'No data by user'
            : userList?.item?.UserEmail}
        </Text>
        <Text style={styles.userDetails}>
          {userList?.item?.PhoneNo == ''
            ? 'No data by user'
            : userList?.item?.PhoneNo}
        </Text>
      </View>
    </Screen>
  );
};
export default AdminViewBarber;

const styles = StyleSheet.create({
  userDetails: {
    borderWidth: 1,
    borderColor: appColors.LightGray,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
    marginVertical: 10,
    color: appColors.White,
  },
});
