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
import { AppImages } from '../../../AppConstants/AppImages';
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import constants from '../../../AppConstants/Constants.json';
import { BarChart, Grid } from 'react-native-svg-charts';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';

const AdminViewUsers = ({ navigation, route }) => {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { UserName, ProfileImage, UserEmail, PhoneNo } = route.params;
  console.log("userimage...", ProfileImage)

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{ padding: 15 }}>
      <View style={{ flex: 0.1 }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          headerText={'View Users'}
          logIn={'success'}
          rightIcoSize={20}
          headerTextViewStyle={{ alignItems: 'center' }}
          onPressLeftIcon={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{
            borderWidth: 2,
            borderColor: appColors.Goldcolor,
            borderRadius: 90,
          }}
          source={{ uri: ProfileImage }}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        <Text
          style={{ color: appColors.White, fontSize: 22, paddingVertical: 4 }}>
          {UserName}
        </Text>
        <Text style={{ color: appColors.White, fontSize: 14 }}>
        </Text>
      </View>

      <View style={{ flex: 0.3, justifyContent: 'space-evenly' }}>
        <SimpleTextField
          placeholder={UserName}
          placeholderTextColor={appColors.White}
        />
        <SimpleTextField
          placeholder={UserEmail}
          placeholderTextColor={appColors.White}
        />

        <SimpleTextField
          placeholder={PhoneNo}
          placeholderTextColor={appColors.White}
        />
      </View>
    </Screen>
  );
};
export default AdminViewUsers;
