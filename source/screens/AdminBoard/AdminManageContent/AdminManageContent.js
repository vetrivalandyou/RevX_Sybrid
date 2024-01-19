import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import {screenSize} from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import {Icons} from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from '../../../AppConstants/Constants.json';
import appColors from '../../../AppConstants/appColors';

const AdminManageContent = ({navigation}) => {
  return (
    <Screen viewStyle={{ flex: 1, backgroundColor: appColors.Black, padding: 15}} statusBarColor={appColors.Black}>
      <View style={{flex: 0.1}}>
        <Header
          headerSubView={{marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Manage Content'}
          rightIcoName={'bell-fill'}
          rightIcoType={Icons.Octicons}
          logIn={'success'}
          rightIcoSize={20}
          onPressRightIcon={() =>
            navigation.navigate(constants.AdminScreens.AdminNotification)
          }
          leftIcoStyle={{
            backgroundColor: appColors.lightBlack,
            borderRadius: 50,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View style={{flex: 0.9}}>
        <View
          style={{flex: 0.12, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{flex: 0.8, justifyContent: 'center', paddingLeft: 20}}>
                <Text style={{color: '#FFFFFF', fontSize: 17, fontWeight: 400}}>
                  Terms of Services
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    constants.AdminScreens.AdminTermsofServices,
                  )
                }
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/editimage.png')}
                  style={{width: '40%', height: '40%'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{flex: 0.12, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{flex: 0.8, justifyContent: 'center', paddingLeft: 20}}>
                <Text style={{color: '#FFFFFF', fontSize: 17, fontWeight: 400}}>
                  Privacy Policy
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(constants.AdminScreens.AdminPrivacypolicy)
                }
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/editimage.png')}
                  style={{width: '40%', height: '40%'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{flex: 0.12, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{flex: 0.8, justifyContent: 'center', paddingLeft: 20}}>
                <Text style={{color: '#FFFFFF', fontSize: 17, fontWeight: 400}}>
                  License
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(constants.AdminScreens.AdminLicensee)
                }
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/editimage.png')}
                  style={{width: '40%', height: '40%'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default AdminManageContent;

const styles = StyleSheet.create({
  container: {
    width: screenSize.width / 1.1,
    height: screenSize.height / 13,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#252525',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});
