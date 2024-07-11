import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Screen from '../components/atom/ScreenContainer/Screen'
// import {screenSize} from '../Utills/AppConstants';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {AppImages} from '../../../AppConstants/AppImages';
import {screenSize} from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import styles from './styles';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import constants from '../../../AppConstants/Constants.json';
import appColors from '../../../AppConstants/appColors';
import {PostRequest} from '../../../services/apiCall';
import {endPoint, imageUrl} from '../../../AppConstants/urlConstants';
import {debounce} from '../../../functions/AppFunctions';

const RecentTransactions = ({route}) => {
  const {RecentTransaction} = route?.params || false;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isLoadng, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (isFocused) getTransactionReport();
  }, [isFocused]);

  const data = [
    {
      id: 1,
      title: '28th aprail 2023',
      name: 'Henry James',
      Imagesource: AppImages.chatone,
      price: '$185.00',
    },
    {
      id: 2,
      title: '824 Booked',
      name: 'Under Cut',
      Imagesource: AppImages.chattwo,
      price: '$354.35',
    },
    {
      id: 3,
      title: '824 Booked',
      name: 'Crew Cut',
      Imagesource: AppImages.chatthree,
      price: '$12.00',
    },
    {
      id: 4,
      title: '824 Booked',
      name: 'Regular Cut',
      Imagesource: AppImages.chatfour,
      price: '$18.00',
    },
    {
      id: 5,
      title: '824 Booked',
      name: 'Temple Fade',
      Imagesource: AppImages.chatone,
      price: '$14.00',
    },

    {
      id: 6,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chatfive,
      price: '$16.00',
    },
    {
      id: 7,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chatsix,
      price: '$16.00',
    },
    {
      id: 8,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chatone,
      price: '$16.00',
    },
    {
      id: 9,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chattwo,
      price: '$16.00',
    },
    {
      id: 10,
      title: '824 Booked',
      name: 'Hair Cut',
      Imagesource: AppImages.chatthree,
      price: '$16.00',
    },
  ];

  const getTransactionReport = () => {
    const payload = {
      operationID: RecentTransaction ? 4 : 5,
      parameterID: 0,
      barberID: 0,
      _PageNumber: pageNo,
      _RowsOfPage: 5,
    };
    PostRequest(endPoint.ADMIN_REPORTS, payload)
      .then(res => {
        console.log('res', res?.data);
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

  const renderFooter = () => {
    if (hasMore == false) return null;
    return (
      <View style={{margin: 10}}>
        <ActivityIndicator size="small" color={appColors.Goldcolor} />
      </View>
    );
  };

  const handleLoadMore = debounce(() => {
    if (hasMore == true) {
      getTransactionReport();
    }
  }, 300);

  return (
    <Screen
      viewStyle={{flex: 1, padding: 15, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={
            RecentTransaction ? 'Recent Transactions' : 'All Transaction'
          }
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

      <View style={{flex: 0.07, justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 18, paddingLeft: 5}}>
          {RecentTransaction ? 'Recent Transactions' : 'All Transaction'}
        </Text>
      </View>
      <View style={{flex: 0.83}}>
        {isLoadng ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color={appColors.Goldcolor} />
          </View>
        ) : (
          <FlatList
            data={transactions}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => (
              <Transactioninfo item={item} index={index} />
            )}
          />
        )}
      </View>
    </Screen>
  );
};

const Transactioninfo = ({item}) => {
  return (
    <View style={styless.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View style={{paddingVertical: 5}}>
          <Image
            source={{uri: `${imageUrl}${item?.ProfileImage}`}}
            // source={item.Imagesource}
            style={{height: 52, width: 52, borderRadius: 40}}
          />
        </View>

        <View style={{flexDirection: 'column', width: '53%', paddingLeft: 3}}>
          <Text
            style={{
              color: 'white',
              fontWeight: '400',
              fontSize: 17.5,
            }}>
            {item.UserName}
          </Text>

          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 11.5,
              }}>
              28th April 2023
              {/* {item.title} */}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: '#c79647', fontSize: 16, fontWeight: '600'}}>
            ${item.Amount}.00
          </Text>
        </View>
        <View style={styles.Circlecontrainer}>
          <View style={styles.InnerCircle}></View>
        </View>
      </View>
    </View>
  );
};

export default RecentTransactions;
const styless = StyleSheet.create({
  container: {
    width: screenSize.width / 1.1,
    height: screenSize.height / 11,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#252525',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});

// import {
//     StyleSheet,
//     Text,
//     View,
//     FlatList,
//     Image,
//     TouchableOpacity,
//   } from 'react-native';
//   import AntDesign from 'react-native-vector-icons/AntDesign';
//   import FontAwesome from 'react-native-vector-icons/FontAwesome';

//   import React from 'react';
// import Screen from '../components/atom/ScreenContainer/Screen'

//   const BarberSpecialist = ({navigation}) => {
//     const data = [
//       {
//         id: 1,
//         title: '824 Booked',
//         name: 'Hair Cut',
//         Imagesource: require('../../assets/Barber1.png'),
//         price: '$40.00',
//       },
//       {
//         id: 2,
//         title: '824 Booked',
//         name: 'Under Cut',
//         Imagesource: require('../../assets/Barberr.png'),
//         price: '$17.00',
//       },
//       {
//         id: 3,
//         title: '824 Booked',
//         name: 'Crew Cut',
//         Imagesource: require('../../assets/Barberrr.png'),
//         price: '$12.00',
//       },
//       {
//         id: 4,
//         title: '824 Booked',
//         name: 'Regular Cut',
//         Imagesource: require('../../assets/Barber1.png'),
//         price: '$18.00',
//       },
//       {
//         id: 5,
//         title: '824 Booked',
//         name: 'Temple Fade',
//         Imagesource: require('../../assets/Barberrr.png'),
//         price: '$14.00',
//       },

//       {
//         id: 6,
//         title: '824 Booked',
//         name: 'Hair Cut',
//         Imagesource: require('../../assets/Barberr.png'),
//         price: '$16.00',
//       },
//     ];
//     return (
//       <View style={{backgroundColor: 'black', flex: 1}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginHorizontal: 10,
//             alignItems: 'center',
//             marginVertical: 6,
//           }}>
//           <AntDesign name={'left'} size={15} color={'white'} />

//           <Text style={{fontWeight: '500', color: 'white', fontSize: 17}}>
//             Hair Cut
//           </Text>
//           <View style={styles.NoticationContainer}>
//             <FontAwesome name={'bell'} size={15} color={'white'} />
//           </View>
//         </View>

//         <View>
//           <FlatList
//             data={data}
//             renderItem={({item}) => <Barberinfo item={item} />}
//             keyExtractor={item => item.id}
//           />
//         </View>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('ServicesDetails')}
//           style={styles.ApplyNOWButton}>
//           <Text style={{fontWeight: '600', fontSize: 13}}> Apply Now</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const Barberinfo = ({item}) => {
//     return (
//       <View style={styles.container}>
//         <View
//           style={{
//             flexDirection: 'column',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-evenly',
//             }}>
//             <View style={{paddingVertical: 8}}>
//               <Image
//                 source={item.Imagesource}
//                 style={{height: 62, width: 60, borderRadius: 5}}
//               />
//             </View>

//             <View style={{flexDirection: 'column', width: '40%'}}>
//               <Text
//                 style={{
//                   color: 'white',
//                   fontWeight: '400',
//                   fontSize: 18,
//                 }}>
//                 {item.name}
//               </Text>

//               <View>
//                 <Text
//                   style={{
//                     color: 'white',
//                     fontSize: 11.5,
//                   }}>
//                   {item.title}
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               {/* <Text style={{color:'white', textAlign:'center', paddingVertical:12, fontSize:12, fontWeight:'bold'}}>View</Text> */}
//               <Text style={{color: '#c79647', fontSize: 17, fontWeight: '600'}}>
//                 {item.price}
//               </Text>
//             </View>
//             <View style={styles.Circlecontrainer}>
//               <View style={styles.InnerCircle}></View>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   export default BarberSpecialist;

//   const styles = StyleSheet.create({
//     container: {
//       width: '95%',

//       borderWidth: 1,
//       borderRadius: 15,
//       backgroundColor: '#252525',
//       marginHorizontal: 10,
//       marginVertical: 8,
//     },

//     NoticationContainer: {
//       height: 40,
//       width: 40,
//       borderRadius: 40,
//       backgroundColor: '#252525',
//       marginHorizontal: 2,

//       alignItems: 'center',
//       justifyContent: 'center',

//       // backgroundColor:'green'
//     },
//     Circlecontrainer: {
//       height: 30,
//       width: 30,
//       borderRadius: 40,
//       backgroundColor: '#252525',
//       borderColor: 'white',
//       borderWidth: 2,
//       alignItems: 'center',
//       justifyContent: 'center',

//       // backgroundColor:'green'
//     },

//     InnerCircle: {
//       height: 15,
//       width: 15,
//       borderRadius: 40,
//       backgroundColor: '#c79647',

//       position: 'absolute',

//       // backgroundColor:'green'
//     },
//     ApplyNOWButton: {
//       alignItems: 'center',
//       backgroundColor: '#c79647',
//       paddingVertical: 15,
//       marginHorizontal: 12,
//       borderRadius: 40,
//       marginTop: 13,
//       marginBottom: 17,
//     },
//   });
