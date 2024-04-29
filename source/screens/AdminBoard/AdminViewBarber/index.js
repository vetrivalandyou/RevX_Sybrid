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

const AdminViewBarber = ({navigation}) => {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

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
      <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            borderWidth: 2,
            borderColor: appColors.Goldcolor,
            borderRadius: 90,
          }}
          source={AppImages.barberearbreport}
        />
        <Text
          style={{color: appColors.White, fontSize: 22, paddingVertical: 4}}>
          Michel Smith
        </Text>
        <Text style={{color: appColors.White, fontSize: 14}}>
          michelsmith@gmail.com
        </Text>
      </View>

      <View style={{flex: 0.3, justifyContent: 'space-evenly'}}>
        <SimpleTextField
          placeholder={'Michel Smith'}
          placeholderTextColor={appColors.White}
        />
        <SimpleTextField
          placeholder={'Michelsmith@gmail.com'}
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
export default AdminViewBarber;
