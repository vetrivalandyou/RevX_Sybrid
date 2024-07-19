import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import styles from './styles';
import {screenSize} from '../../../components/atom/ScreenSize';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';
import Header from '../../../components/molecules/Header';
import Search from '../../../components/atom/Search/Search';
import {AppImages} from '../../../AppConstants/AppImages';
import constants from '../../../AppConstants/Constants.json';
import {useNavigation} from '@react-navigation/native';

const HomeSuperAdmin = () => {
  const navigation = useNavigation();
  const BarberEarnings = [
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
      Imagesource: AppImages.chatfour,
    },
  ];

  const BarberEarningsContainer = ({item}) => {
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
    <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>
      <View style={{flex: 1}}>
        <View
          style={{
            minHeight: screenSize.height / 1.2,
            maxHeight: 'auto',
          }}>
          <View style={styles.headerView}>
            <Header
              image={true}
              headerText={'Super Admin'}
              onPressRightIcon={() =>
                navigation.navigate(constants.AdminScreens.AdminNotification)
              }
              rightIcoName={'bell-fill'}
              rightIcoType={Icons.Octicons}
              logIn={'success'}
              rightIcoSize={16}
              leftIcoStyle={styles.headerleftIcoStyle}
              headerTextt={{
                marginLeft: 10,
                fontSize: Sizes.medium,
                textAlign: 'left',
              }}
            />
          </View>

          <View style={styles.searchBarContainer}>
            <Search style={{marginVertical: 10}} />
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.imgContainer}>
              <Image source={AppImages.visaimg} style={{flex: 1}} />
            </View>

            <View style={styles.cardInnerContainer}>
              <View style={styles.AvailableBalancetTextViewStyle}>
                <Text style={styles.AvailableBalanceTextStyle}>
                  Available Balance
                </Text>
              </View>

              <View style={styles.balanceMainViewStyle}>
                <View style={styles.balanceViewStyle}>
                  <Text style={styles.balanceTextStyle}>$XXXX.XX</Text>
                </View>

                <View style={styles.ExViewStyle}>
                  <Text style={styles.ExTextStyle}>EX 06/24</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{flex: 0.2, alignItems: 'center'}}
              onPress={() =>
                navigation.navigate(constants.AdminScreens.AdminPaymentMethod)
              }>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  justifyContent: 'green',
                  justifyContent: 'center',
                }}>
                <Image source={AppImages.Transfer} />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  Transfer
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  constants.AdminScreens.RecentTransactionsMain,
                )
              }>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  justifyContent: 'green',
                  justifyContent: 'center',
                }}>
                <Image source={AppImages.Transaction} />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  Transaction
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(constants.AdminScreens.Report)
              }>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  justifyContent: 'green',
                  justifyContent: 'center',
                }}>
                <Image source={AppImages.Report} />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  Report
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.AdminScreens.AdminManageContent)
              }
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  justifyContent: 'green',
                  justifyContent: 'center',
                }}>
                <Image source={AppImages.Report} />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  Content Manage
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.AdminScreens.AdminUserDetails)
              }
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  justifyContent: 'green',
                  justifyContent: 'center',
                }}>
                <Image source={AppImages.UserPage} />
              </View>
              <View style={{flex: 0.3}}>
                <Text style={{color: appColors.White, fontSize: 12}}>
                  User Page
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.5, paddingLeft: 8}}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 22,
                  color: appColors.White,
                }}>
                Barber Earnings
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(constants.AdminScreens.AdminBarberEarnings)
              }
              style={{
                flex: 0.5,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <Text style={{color: appColors.Goldcolor, fontSize: 14}}>
                View All
              </Text>
              <CustomIcon
                type={Icons.Ionicons}
                name={'chevron-forward'}
                size={15}
                color={appColors.Goldcolor}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 0.25, justifyContent: 'center'}}>
            {BarberEarnings.map(item => (
              <BarberEarningsContainer key={item.id} item={item} />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
};
export default HomeSuperAdmin;

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
