import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
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

const Report = ({navigation}) => {
  const [isDayClicked, setIsDayClicked] = React.useState(false);
  const [isMonthClicked, setIsMonthClicked] = React.useState(false);
  const [isYearClicked, setIsYearClicked] = React.useState(false);
  const [selectedInterval, setSelectedInterval] = React.useState('day');

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
    // Implement logic to fetch data based on the selected interval
    // For simplicity, using random data here
    const data = {
      day: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 60],
          },
        ],
      },
      month: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            data: [50, 70, 30, 90],
          },
        ],
      },
      year: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            data: [80, 60, 120, 100, 150, 130, 90, 110, 70, 100, 140, 120],
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
  console.log('data=====>>>', selectedInterval);
  // Function to convert values back to the original scale
  const scaleValues = value => value * 1000;

  // Custom render function for dots with dynamic color
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styless.container}>
          <Image source={item.Imagesource} style={styless.image} />
          <View style={styless.textContainer}>
            <Text style={styless.name}>{item.price1}</Text>
            <Text style={styless.earnings}>{item.name}</Text>
          </View>
        </View>

        <View style={styless.container}>
          <Image source={item.Imagesource} style={styless.image} />
          <View style={styless.textContainer}>
            <Text style={styless.name}>{item.price2}</Text>
            <Text style={styless.earnings}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Screen viewStyle={styles.mainContainer}>
      <View style={styles.HeaderView}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
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
        <Text style={styles.balance}>$752.00</Text>
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
              size={12}
              color={appColors.Goldcolor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.barberEarnComponenet}>
        {BarberEarn.map(item => (
          <BarberEarnContainer key={item.id} item={item} />
        ))}
      </View>

      <View
        style={{
          backgroundColor: appColors.darkgrey,
          flex: 0.1,
          borderRadius: 50,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          //  style={[styles.btnStyle, { borderRadius: isClicked? 0 : 50 }]}
          onPress={() => {
            handleButtonClick('day');
            handleDayButtonClick();
          }}
          style={{flex: 0.32, marginVertical: 15, justifyContent: 'center'}}>
          <View style={[styles.textStyle, isDayClicked && styles.btnStyle]}>
            <Text style={{color: appColors.White, textAlign: 'center'}}>
              Day
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          //  style={[styles.btnStyle, { borderRadius: isClicked? 0 : 50 }]}
          onPress={() => {
            handleButtonClick('month');
            handleMonthButtonClick();
          }}
          style={{flex: 0.32, marginVertical: 15, justifyContent: 'center'}}>
          <View style={[styles.textStyle, isMonthClicked && styles.btnStyle]}>
            <Text style={{color: appColors.White, textAlign: 'center'}}>
              Month
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          //  style={[styles.btnStyle, { borderRadius: isClicked? 0 : 50 }]}
          onPress={() => {
            handleButtonClick('year');
            handlYaerButtonClick();
          }}
          style={{flex: 0.32, marginVertical: 15, justifyContent: 'center'}}>
          <View style={[styles.textStyle, isYearClicked && styles.btnStyle]}>
            <Text style={{color: appColors.White, textAlign: 'center'}}>
              year
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.mapView}>
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
          yAxisInterval={1} // optional, defaults to 1
          fromZero
          chartConfig={{
            backgroundColor: '#e26a00',
            //  backgroundGradientFrom: "#fb8c00",
            // backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
      </View>
    </Screen>
  );
};
export default Report;
const styless = StyleSheet.create({
  container: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: appColors.darkgrey,
    borderColor: '#ccc',
    marginBottom: 10,
    overflow: 'hidden', // Ensures that the border radius is applied correctly
    justifyContent: 'space-between',
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
