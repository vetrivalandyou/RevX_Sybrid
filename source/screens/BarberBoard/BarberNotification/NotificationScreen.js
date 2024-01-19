import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppImages} from '../../../AppConstants/AppImages';
import {screenSize} from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import CustomIcon, {
  Icons,
} from '../../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import Bookingbutton from '../../../components/atom/BookingButtons/Bookingbutton';
import constants from '../../../AppConstants/Constants.json';
import appColors from '../../../AppConstants/appColors';

const Notification = ({navigation}) => {
  const data = [
    {
      id: 1,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
    {
      id: 2,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
    {
      id: 3,
      date: 'Dec 24,2024 - 10.00am',
      name: 'Barberella Inova',
      title: '38947 Madeshow valley terrace services',
      label: 'Gulf Haircut, Thin Shampoo, Alovevera Shampo, Hair wash',
      Imagesource: require('../../../assets/rectangle2.png'),
      Booking: 'Cancel Booking',
      Receipt: 'View E-Receipt',
      ratingicon: <AntDesign name={'staro'} size={12} color={'#c79647'} />,
      rating: '4.1',
    },
  ];

  const ListPrebooking = item => {
    return (
      <View
        style={{
          height: screenSize.height / 2.8,
          width: screenSize.width / 1.1,
          marginBottom: 10,
          backgroundColor: '#252525',
          borderWidth: 1,
          borderRadius: 20,
          marginHorizontal: 17,
        }}>
        <View style={{flex: 1, borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 5,
            }}>
            <View style={{flex: 0.6}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                }}>
                {item.item.date}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  color: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Bookingbutton
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    height: 27,
                    flex: 0.8,
                  }}
                  stylebtn={{color: appColors.White, fontSize: 12}}
                  onPress={() =>
                    navigation.navigate(constants.BarberScreen.BarberEReceipt)
                  }
                  title={'View E-Recipt'}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              fontSize: 25,
              marginHorizontal: 14,
              borderBottomWidth: 2,
              borderStyle: 'dashed',
              borderBottomColor: '#c79647',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              flex: 0.58,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.35, alignItems: 'center'}}>
              <Image
                source={item.item.Imagesource}
                style={{
                  height: '80%',
                  width: '82%',
                  borderRadius: 7,
                  marginTop: 5,
                }}
              />
            </View>
            <View style={{flexDirection: 'column', flex: 0.63}}>
              <Text style={{fontSize: 22, fontWeight: '600', color: 'white'}}>
                {item.item.name}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#9E9E9E',
                    marginVertical: 9,
                  }}>
                  {item.item.title}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 12, fontWeight: '400', color: '#c79647'}}>
                  {item.item.label}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Bookingbutton
              style={{backgroundColor: '#c79647'}}
              stylebtn={{color: 'white'}}
              title={'Accept'}
            />
            <Bookingbutton
              style={{backgroundColor: '#E81F1C', borderColor: 'red'}}
              stylebtn={{color: 'white'}}
              title={'Reject'}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    // <View style={{height: screenSize.height, backgroundColor: 'black'}}>
    //   <View style={{flex: 0.6}}>
    //     <Header
    //       lefttIcoType={Icons.Ionicons}
    //       onPressLeftIcon={() => navigation.goBack()}
    //       leftIcoName={'chevron-back'}
    //       headerText={'Notification'}
    //       rightIcoName={'bell'}
    //       rightIcoType={Icons.SimpleLineIcons}
    //       logIn={'success'}
    //       rightIcoSize={20}
    //       leftIcoStyle={{
    //         backgroundColor: appColors.lightBlack,
    //         borderRadius: 50,
    //         height: 50,
    //         width: 50,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}
    //     />
    //   </View>
    // </View>
    <Screen statusBarColor={appColors.Black}>
      <View style={{height: screenSize.height, backgroundColor: appColors.Black}}>
        <View style={{flex: 0.6}}>
          <Header
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Notification'}
            // rightIcoName={'bell'}
            // rightIcoType={Icons.SimpleLineIcons}
            logIn={'success'}
            // rightIcoSize={20}
            // leftIcoStyle={{
            //   backgroundColor: appColors.lightBlack,
            //   borderRadius: 50,
            //   height: 50,
            //   width: 50,
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
          />
        </View>
        <Text
          style={{
            color: 'white',
            marginHorizontal: 12,
            marginVertical: 5,
            fontSize: 13,
          }}>
          Today
        </Text>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 8}}>
                <Image
                  source={AppImages.notification}
                  style={{
                    height: screenSize.height / 12,
                    width: screenSize.width / 6,
                    borderRadius: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  width: screenSize.width / 1.47,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 20,
                  }}>
                  Payment Successful!
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}>
                    You have made a salon payment
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            color: 'white',
            marginHorizontal: 12,
            marginTop: 20,
            marginBottom: 5,
            fontSize: 13,
          }}>
          Yesterday
        </Text>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 8}}>
                <Image
                  source={AppImages.notification}
                  style={{
                    height: screenSize.height / 12,
                    width: screenSize.width / 6,
                    borderRadius: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  width: screenSize.width / 1.47,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 19,
                  }}>
                  New Services Available!
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11.5,
                    }}>
                    Now you can search the nearest salon
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 8}}>
                <Image
                  source={AppImages.notification}
                  style={{
                    height: screenSize.height / 12,
                    width: screenSize.width / 6,
                    borderRadius: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  width: screenSize.width / 1.47,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 20,
                  }}>
                  Credit Card Connected
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}>
                    Now you can search the nearest salon
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            color: 'white',
            marginHorizontal: 12,
            marginTop: 20,
            marginBottom: 5,
            fontSize: 13,
          }}>
          December 11, 2024
        </Text>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 8}}>
                <Image
                  source={AppImages.notification}
                  style={{
                    height: screenSize.height / 12,
                    width: screenSize.width / 6,
                    borderRadius: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  width: screenSize.width / 1.47,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 20,
                  }}>
                  Today' s Special Offer
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}>
                    Now you can search the nearest salon
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 8}}>
                <Image
                  source={AppImages.notification}
                  style={{
                    height: screenSize.height / 12,
                    width: screenSize.width / 6,
                    borderRadius: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  width: screenSize.width / 1.47,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 20,
                  }}>
                  Credit Card Connected
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}>
                    Now you can search the nearest salon
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 8}}>
                <Image
                  source={AppImages.notification}
                  style={{
                    height: screenSize.height / 12,
                    width: screenSize.width / 6,
                    borderRadius: 40,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  width: screenSize.width / 1.47,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 20,
                  }}>
                  Payment Successful!
                </Text>

                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                    }}>
                    You have made a salon payment
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};
export default Notification;

const styles = StyleSheet.create({
  NoticationContainer: {
    height: screenSize.height / 18.5,
    width: screenSize.width / 9,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 2,

    alignItems: 'center',
    justifyContent: 'center',

    // backgroundColor:'green'
  },
  container: {
    width: screenSize.width / 1.07,
    height: screenSize.height / 9,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#252525',
    marginHorizontal: 10,
    marginVertical: 3,
    justifyContent: 'center',
  },
});
