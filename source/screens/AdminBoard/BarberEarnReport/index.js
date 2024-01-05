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

const BarberEarnReport = ({navigation}) => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{padding: 0.9, padding: 15}}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          headerText={'Barber Balance View'}
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
      <View
        style={{
          flex: 0.15,
          backgroundColor: appColors.Goldcolor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
        }}>
        <Text style={{color: appColors.White, fontSize: 16}}>
          Total Balance
        </Text>
        <Text style={{color: appColors.White, fontSize: 42, fontWeight: '500'}}>
          $252.00
        </Text>
      </View>
      {/* <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={()=>navigation.navigate(constants.AdminScreens.Report)}>
                    <CustomIcon type={Icons.Foundation} name={"graph-pie"} color={"purple"} />
                </TouchableOpacity>


            </View> */}
      <View style={{flex: 0.45}}>
        <BarChart
          style={{height: 500}}
          //   horizontal={true}
          spacingInner={0.1}
          gridMin={0}
          gridMax={100}
          data={data}
          svg={{fill: 'rgb(134, 65, 244)'}}
          contentInset={{top: 30, bottom: 30}}>
          <Grid />
        </BarChart>
      </View>
    </Screen>
  );
};
export default BarberEarnReport;
