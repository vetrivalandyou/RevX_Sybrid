import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  TouchableOpacity,
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

const AdminViewUsers = ({navigation}) => {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
         headerSubView={{ marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          headerText={'View Users'}
          logIn={'success'}
          rightIcoSize={20}
          headerTextViewStyle={{alignItems: 'center'}}
          onPressLeftIcon={() => navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={AppImages.barberearbreport} />
        <Text style={{color: appColors.White, fontSize: 22}}>Michel Smith</Text>
        <Text style={{color: appColors.White, fontSize: 14}}>
          mailto:michelsmith@gmail.com
        </Text>
      </View>
     
      <View style={{flex: 0.6,justifyContent: 'space-evenly'}}>
      <SimpleTextField
            placeholder={'Michel Smith'}
            placeholderTextColor={appColors.White}
          />
          <SimpleTextField
            placeholder={'Michelsmith@gmail.com'}
            placeholderTextColor={appColors.White}
          />

          <SimpleTextField
            placeholder={'+1 123 456 789 00'}
            value={passwordValue}
            onChangeText={setPasswordValue}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={appColors.White}
          />
          <SimpleTextField
            placeholder={'Lorem Ipsum is simply dummy text of the printing ...'}
            placeholderTextColor={appColors.White}
          />
          <SimpleTextField
            placeholder={'Makeup Artist'}
            placeholderTextColor={appColors.White}
          />
          <SimpleTextField
            placeholder={'Barber'}
            placeholderTextColor={appColors.White}
          />
            <SimpleTextField
            placeholder={'Barber'}
            placeholderTextColor={appColors.White}
          />
         
      
      </View>
    </Screen>
  );
};
export default AdminViewUsers;
