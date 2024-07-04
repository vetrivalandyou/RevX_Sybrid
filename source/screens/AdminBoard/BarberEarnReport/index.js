import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppRegistry,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
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
import {useIsFocused} from '@react-navigation/native';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {barberRevenueReportGraph} from '../../../functions/AppFunctions';

const BarberEarnReport = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const {BarberData} = route?.params || {};
  const [particularbarberReport, setparticularBarberReport] = useState();

  useEffect(() => {
    if (isFocused) {
      getBarberEarning();
    }
  }, [isFocused]);

  const getBarberEarning = () => {
    const payload = {
      operationID: 2,
      barberID: BarberData?.BarbarID,
      _PageNumber: 0,
      _RowsOfPage: 0,
    };
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then(res => {
        console.log('response ', res?.data);
        setparticularBarberReport(res?.data);
        barberRevenueReportGraph(res?.data?.Table);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

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
      {particularbarberReport == undefined ? (
        <View
          style={{flex: 0.9, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={appColors.Goldcolor} />
        </View>
      ) : (
        <>
          <View style={{flex: 0.3}}>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {particularbarberReport?.Table1?.[0]?.ProfileImage ==
              undefined ? (
                <ActivityIndicator size="small" color={appColors.Goldcolor} />
              ) : (
                <Image
                  source={{
                    uri: `${imageUrl}${particularbarberReport?.Table1?.[0]?.ProfileImage}`,
                  }}
                  style={{width: 120, height: 120, borderRadius: 100}}
                />
              )}
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{color: appColors.White, fontSize: 22}}>
                {particularbarberReport?.Table1?.[0]?.UserName}
              </Text>
              <Text style={{color: appColors.White, fontSize: 14}}>
                {particularbarberReport?.Table1?.[0]?.UserEmail}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.15,
              backgroundColor: appColors.Goldcolor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              marginHorizontal: 10,
            }}>
            <Text style={{color: appColors.White, fontSize: 16}}>
              Total Balance
            </Text>
            <Text
              style={{color: appColors.White, fontSize: 42, fontWeight: '500'}}>
              ${particularbarberReport?.Table1?.[0]?.P_Amount.toLocaleString()}
            </Text>
          </View>
          <View
            style={{
              flex: 0.45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BarChart
              width={screenSize.width}
              spacing={15}
              height={280}
              noOfSections={1}
              // stackBorderRadius={50}
              barBorderRadius={50}
              stackData={barberRevenueReportGraph(
                particularbarberReport?.Table,
              )}
              // stackData={stackData}
              barWidth={
                Platform.OS == 'ios'
                  ? screenSize?.width / 25
                  : screenSize?.width / 28
              }
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
              // pointerConfig={{
              //   activatePointersOnLongPress: true,
              //   initialPointerIndex: 0,
              //   stripBehindBars: true,
              //   pointerStripHeight: 150,
              //   pointerLabelComponent: items => {
              //     return (
              //       <View
              //         style={{
              //           width: 50,
              //           padding: 3,
              //           borderWidth: 1,
              //           borderRadius: 30,
              //           backgroundColor: appColors.Goldcolor,
              //           justifyContent:'center',
              //           alignItems:'center'
              //         }}>
              //         {/* <Text>{items?.[0]?.stacks?.[0]?.value}</Text> */}
              //         <Text>{items?.[0]?.stacks?.[0]?.value}</Text>
              //       </View>
              //     );
              //   },
              // }}
            />
          </View>
        </>
      )}
    </Screen>
  );
};
export default BarberEarnReport;
