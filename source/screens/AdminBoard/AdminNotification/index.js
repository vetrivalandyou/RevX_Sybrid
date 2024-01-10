import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppImages} from '../../../AppConstants/AppImages';
import {screenSize} from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import appColors from '../../../AppConstants/appColors';

const AdminNotification = ({navigation}) => {
  return (
    <View style={{height: screenSize.height, backgroundColor: appColors.Black}}>
      <View style={{flex: 0.6}}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Notification'}
          // rightIcoName={'bell'}
          rightIcoType={Icons.SimpleLineIcons}
          logIn={'success'}
          rightIcoSize={20}
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
      <View></View>

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
              style={{flexDirection: 'column', width: screenSize.width / 1.47}}>
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
              style={{flexDirection: 'column', width: screenSize.width / 1.47}}>
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
              style={{flexDirection: 'column', width: screenSize.width / 1.47}}>
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
              style={{flexDirection: 'column', width: screenSize.width / 1.47}}>
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
              style={{flexDirection: 'column', width: screenSize.width / 1.47}}>
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
              style={{flexDirection: 'column', width: screenSize.width / 1.47}}>
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
  );
};
export default AdminNotification;

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
