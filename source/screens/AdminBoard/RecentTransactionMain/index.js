import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
import Sizes from '../../../AppConstants/Sizes';
import {useNavigation} from '@react-navigation/native';
import constants from '../../../AppConstants/Constants.json';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
const RecentTransactionsMain = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [isLoadng, setIsLoading] = useState(true);

  useEffect(() => {
    getTransactionReport();
  }, []);

  const getTransactionReport = () => {
    const payload = {
      operationID: 4,
      parameterID: 0,
      barberID: 0,
      _PageNumber: 0,
      _RowsOfPage: 5,
    };
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then(res => {
        console.log('res res res', res?.data);
        if (res?.data?.Table?.length > 0) {
          setTransactions(transactions => [
            ...transactions,
            ...res?.data?.Table,
          ]);
          setPageNo(pageNo + 1);
          setIsLoading(false);
        } else {
          setHasMore(false);
        }
      })
      .catch(err => {
        console.log('error', err);
        setIsLoading(false);
      });
  };

  const RecentTransactionContainer = ({item}) => {
    console.log('items????????????????', item);
    return (
      <View style={styles.RecentTransactionContainer}>
        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: `${imageUrl}${item.ProfileImage}`,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25, // Half of the width/height to create a circular image
              marginRight: 10,
            }}
          />
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Text style={{fontSize: 16, color: appColors.White}}>
            {item.UserName}
          </Text>
          <Text style={{color: appColors.White, fontSize: 12}}>
            {item.CreatedDate}
          </Text>
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: appColors.Goldcolor, fontSize: 20}}>
            ${item.Amount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>
      {/* Header View */}
      <View style={styles.headerView}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Recent Transactions'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          leftIcoStyle={styles.headerleftIcoStyle}
          rightIcoSize={16}
          headerTextViewStyle={{alignItems: 'center'}}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
        />
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

      <View style={styles.RecentTransactionMainView}>
        <View style={{flex: 0.7}}>
          <Text style={styles.BarberEarningsTextStyle}>Recent Transaction</Text>
        </View>

        <TouchableOpacity
          style={styles.ViewAllMainView}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.RecentTransactions, {
              RecentTransaction: true,
            })
          }>
          <Text style={styles.ViewAllTextStyle}>View All</Text>
          <CustomIcon
            type={Icons.Ionicons}
            name={'chevron-forward'}
            size={15}
            color={appColors.Goldcolor}
            style={{marginLeft: 5, marginTop: 5}}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.22}}>
        {/* <RecentTransactionContainer
          source={AppImages.chatthree}
          name={'Henry'}
          date={'28th april 2023'}
          amount={'-$185.00'}
        />
        <RecentTransactionContainer
          source={AppImages.chatfour}
          name={'Henry'}
          date={'28th april 2023'}
          amount={'-$185.00'}
        /> */}
        {isLoadng ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="small" color={appColors.Goldcolor} />
          </View>
        ) : (
          <>
            {transactions.slice(0, 2).map((item, index) => (
              <RecentTransactionContainer key={item.id || index} item={item} />
            ))}
          </>
        )}
      </View>

      <View style={styles.RecentTransactionMainView}>
        <View style={{flex: 0.5}}>
          <Text style={styles.BarberEarningsTextStyle}>Tommorrow</Text>
        </View>

        <TouchableOpacity
          style={styles.ViewAllMainView}
          onPress={() =>
            navigation.navigate(constants.AdminScreens.RecentTransactions, {
              RecentTransaction: false,
            })
          }>
          <Text style={styles.ViewAllTextStyle}>View All</Text>
          <CustomIcon
            type={Icons.Ionicons}
            name={'chevron-forward'}
            size={15}
            color={appColors.Goldcolor}
            style={{marginLeft: 5, marginTop: 5}}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.23}}>
        {isLoadng ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="small" color={appColors.Goldcolor} />
          </View>
        ) : (
          <>
            {transactions.slice(0, 2).map((item, index) => (
              <RecentTransactionContainer key={item.id || index} item={item} />
            ))}
          </>
        )}
      </View>
    </Screen>
  );
};
export default RecentTransactionsMain;
