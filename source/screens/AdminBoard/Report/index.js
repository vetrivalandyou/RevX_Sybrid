import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import appColors from '../../../AppConstants/appColors';
import styles from './styles';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import {AppImages} from '../../../AppConstants/AppImages';
import constants from '../../../AppConstants/Constants.json';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {screenSize} from '../../../components/atom/ScreenSize';
import {useIsFocused} from '@react-navigation/native';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {PostRequest} from '../../../services/apiCall';

const Report = ({navigation}) => {
  const isFocused = useIsFocused();
  const timeoutRef = useRef();
  const [isDayClicked, setIsDayClicked] = useState(true);
  const [isMonthClicked, setIsMonthClicked] = useState(false);
  const [isYearClicked, setIsYearClicked] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState('day');

  const [isLoading, setIsLoading] = useState(true);
  const [revxReport, setRevXReport] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getRevxEarningReport();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isFocused]);

  const getRevxEarningReport = () => {
    const payload = {
      operationID: 3,
      parameterID: 1,
      barberID: 0,
      _PageNumber: 0,
      _RowsOfPage: 0,
    };
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then(res => {
        console.log('res', res?.data);
        setRevXReport(res?.data);
        setIsLoading(false);
        timeoutRef.current = setTimeout(() => setVisible(true), 3000);
      })
      .catch(err => {
        console.log('error', err);
        setIsLoading(false);
      });
  };

  const handleDayButtonClick = () => {
    setIsDayClicked(!isDayClicked);
    setIsMonthClicked(false);
    setIsYearClicked(false);
  };

  const handleMonthButtonClick = () => {
    setIsMonthClicked(!isMonthClicked);
    setIsDayClicked(false);
    setIsYearClicked(false);
  };

  const handlYaerButtonClick = () => {
    setIsYearClicked(!isYearClicked);
    setIsMonthClicked(false);
    setIsDayClicked(false);
  };

  const getDataForInterval = interval => {
    const data = {
      day: {
        labels:
          revxReport?.Table2?.length > 0 &&
          revxReport?.Table2?.map(obj => obj?.Day),
        datasets: [
          {
            data:
              revxReport?.Table2?.length > 0 &&
              revxReport?.Table2?.map(obj => obj?.total_amount),
          },
        ],
      },
      // day: {
      //   labels: ['1', '2', '3', '4', '5', '6', '7'],
      //   datasets: [
      //     {
      //       data: [20, 45, 28, 80, 99, 43, 60],
      //     },
      //   ],
      // },
      month: {
        labels:
          revxReport?.Table3?.length > 0 &&
          revxReport?.Table3?.map(obj => obj.Month),
        datasets: [
          {
            data:
              revxReport?.Table3?.length > 0 &&
              revxReport?.Table3?.map(obj => obj.total_amount),
          },
        ],
      },
      year: {
        labels:
          revxReport?.Table4?.length > 0 &&
          revxReport?.Table4?.map(obj => obj.Year),
        datasets: [
          {
            data:
              revxReport?.Table4?.length > 0 &&
              revxReport?.Table4?.map(obj => obj.total_amount),
          },
        ],
      },
    };

    return data[interval];
  };

  const handleButtonClick = interval => {
    setSelectedInterval(interval);
    console.log('data=====>>>', interval);
  };

  const scaleValues = value => value * 1000;

  const renderDots = ({x, y, index, value}) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(scaleValues(value))}
      r={6}
      fill={value > 20 ? 'green' : 'red'} // Dynamic color based on condition
    />
  );

  const BarberEarn = [
    {
      id: 1,
      price1: '$40,65',
      price2: '$42,65',
      name: 'Hanery pawl',
      Imagesource: AppImages.bb1,
    },
    {
      id: 2,
      price1: '$40,65',
      price2: '$42,65',
      name: 'Hanery pawl',
      Imagesource: AppImages.chatsix,
    },
  ];

  const BarberEarnContainer = ({item}) => {
    return (
      <View
        style={{
          height: screenSize.height / 10,
          width: screenSize.width / 2.35,
          margin: 5,
        }}>
        <View style={styless.container}>
          <Image
            source={{uri: `${imageUrl}${item?.ProfileImage}`}}
            style={styless.image}
          />
          <View style={styless.textContainer}>
            <Text style={styless.name}>${item.P_Amount.toLocaleString()}</Text>
            <Text style={styless.earnings}>{item.UserName}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Screen viewStyle={styles.mainContainer} statusBarColor={appColors.Black}>
      <View style={styles.HeaderView}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          leftIcoName={'chevron-back'}
          headerText={'Report'}
          rightIcoSize={20}
          headerTextViewStyle={{alignItems: 'center'}}
          onPressLeftIcon={() => navigation.goBack()}
        />
      </View>

      <View style={styles.balanceView}>
        <Text style={styles.balanceText}>Total Balance</Text>
        <Text style={styles.balance}>
          ${revxReport?.Table?.[0]?.TotalEarning.toLocaleString()}
        </Text>
      </View>

      <View style={styles.earnbarberView}>
        <View style={{flex: 0.5}}>
          <Text style={styles.earnbarberText}>Barber Earnings</Text>
        </View>
        <View style={styles.viewallView}>
          <TouchableOpacity
            style={styles.viewallView}
            onPress={() =>
              navigation.navigate(constants.AdminScreens.AdminBarberEarnings)
            }>
            <Text style={styles.viewallText}>View All</Text>
            <CustomIcon
              type={Icons.Ionicons}
              name={'chevron-forward'}
              size={15}
              color={appColors.Goldcolor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.barberEarnComponenet}>
        {revxReport?.Table1?.map((item, index) => (
          <BarberEarnContainer key={index} item={item} />
        ))}
      </View>

      <View
        style={{
          flex: 0.1,
        }}>
        <View
          style={{
            height: 55,
            backgroundColor: appColors.darkgrey,
            borderRadius: 50,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleButtonClick('day');
              handleDayButtonClick();
            }}
            style={{flex: 0.32, marginVertical: 5, justifyContent: 'center'}}>
            <View style={[styles.textStyle, isDayClicked && styles.btnStyle]}>
              <Text style={{color: appColors.White, textAlign: 'center'}}>
                Day
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleButtonClick('month');
              handleMonthButtonClick();
            }}
            style={{flex: 0.32, marginVertical: 5, justifyContent: 'center'}}>
            <View style={[styles.textStyle, isMonthClicked && styles.btnStyle]}>
              <Text style={{color: appColors.White, textAlign: 'center'}}>
                Month
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleButtonClick('year');
              handlYaerButtonClick();
            }}
            style={{flex: 0.32, marginVertical: 5, justifyContent: 'center'}}>
            <View style={[styles.textStyle, isYearClicked && styles.btnStyle]}>
              <Text style={{color: appColors.White, textAlign: 'center'}}>
                year
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapView}>
        {isVisible == true ? (
          <LineChart
            data={getDataForInterval(selectedInterval)}
            width={370}
            height={200}
            // svg={{ stroke: 'rgb(134, 65, 244)' }}
            verticalLabelRotation={3}
            yAxisSuffix="k"
            svg={{
              stroke: 'red', // Change the line color here
              strokeWidth: 10,
            }}
            yAxisInterval={15} // optional, defaults to 1
            fromZero
            chartConfig={{
              backgroundColor: '#0C0C0D',
              backgroundGradientFrom: '#0C0C0D',
              backgroundGradientTo: '#0C0C0D',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
              useShadowColorFromDataset: true,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={
              {
                // marginVertical: 8,
                // borderRadius: 16
              }
            }
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color={appColors.Goldcolor} />
          </View>
        )}
      </View>
    </Screen>
  );
};
export default Report;

const styless = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: appColors.darkgrey,
    borderColor: '#ccc',
    marginBottom: 10,
    overflow: 'hidden', // Ensures that the border radius is applied correctly
    // justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width/height to create a circular image
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column', // Change to 'row' for horizontal arrangement
    //  backgroundColor:'red'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Add margin for spacing between name and earnings
    color: appColors.White,
  },
  earnings: {
    color: appColors.White,
    fontSize: 12,
    flexWrap: 'wrap',
  },
});
