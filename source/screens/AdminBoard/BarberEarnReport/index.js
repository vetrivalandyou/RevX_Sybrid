import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../../AppConstants/AppImages';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
import {screenSize} from '../../../components/atom/ScreenSize';

const BarberEarnReport = ({navigation}) => {
  const stackData = [
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'Jan',
    },

    {
      stacks: [
        {value: 14, color: '#9A72F5'},
        {value: 18, color: '#292929', marginBottom: 5},
      ],
      label: 'Feb',
    },
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 14, color: '#9A72F5'},
        {value: 18, color: '#292929', marginBottom: 5},
      ],
      label: 'Apr',
    },
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'May',
    },
    {
      stacks: [
        {value: 14, color: '#9A72F5'},
        {value: 18, color: '#292929', marginBottom: 5},
      ],
      label: 'Jun',
    },
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'Jul',
    },

    {
      stacks: [
        {value: 14, color: '#9A72F5'},
        {value: 18, color: '#292929', marginBottom: 5},
      ],
      label: 'Aug',
    },
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'Sep',
    },
    {
      stacks: [
        {value: 14, color: '#9A72F5'},
        {value: 18, color: '#292929', marginBottom: 5},
      ],
      label: 'Oct',
    },
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'Nov',
    },
    {
      stacks: [
        {value: 20, color: appColors.Goldcolor},
        {value: 10, color: '#292929', marginBottom: 5},
      ],
      label: 'Dec',
    },
  ];

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{padding: 0.9, padding: 5}}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
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
          marginHorizontal: 10
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
      <View style={{flex: 0.45, justifyContent:'center', alignItems:'center'}}>
        <BarChart
          width={screenSize.width}
          spacing={15}
          height={280}
          noOfSections={1}
          stackBorderRadius={50}
          stackData={stackData}
          barWidth={Platform.OS == 'ios' ? 19 : 14}
          yAxisSuffix=""
          yAxisLabelTexts=""
          yAxisLabel=""
          yAxisLabelWidth={0}
          //  yAxisInterval= {2}
          xAxisLabelTextStyle={{color: 'lightgray', fontSize: 10}}
          //stacks={5}
          // showValuesAsTopLabel
          hideYAxisText={true}
          hideAxesAndRules={true}
          hideOrigin={true}
          hideRules={true}
          yAxisOffset={false}
          pointerConfig={{
            initialPointerIndex: 0,
            stripBehindBars: true,
            pointerStripHeight: 150,

            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    width: 25,
                    padding: 3,
                    borderWidth: 1,
                    borderRadius: 30,
                    backgroundColor: '#eee',
                  }}>
                  <Text>{items[0].stacks[0].value}</Text>
                </View>
              );
            },
          }}
        />
      </View>
    </Screen>
  );
};
export default BarberEarnReport;
