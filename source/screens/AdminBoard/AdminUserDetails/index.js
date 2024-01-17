import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../../components/atom/ScreenContainer/Screen'
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent'
import styles from './styles'
import { AppImages } from '../../../AppConstants/AppImages';
import { screenSize } from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from "../../../AppConstants/Constants.json"
import appColors from '../../../AppConstants/appColors';




const AdminUserDetails = ({ navigation }) => {

  const data = [
    {
      id: 1,
      name: 'Nathan Alexender',
      title: 'Senior Barber',
      Imagesource: AppImages.chatone,
      Viewbutton: 'View User',
      Blockbutton: 'Block User',

    },
    {
      id: 2,
      name: 'Nathan Alexender',
      title: 'Senior Barber',
      Imagesource: AppImages.chatone,
      Viewbutton: 'View User',
      Blockbutton: 'Block User',
    },
    {
      id: 3,
      name: 'Nathan Alexender',
      title: 'Senior Barber',
      Imagesource: AppImages.chatone,
      Viewbutton: 'View User',
      Blockbutton: 'Block User',
    },
    {
      id: 4,
      name: 'Nathan Alexender',
      title: 'Senior Barber',
      Imagesource: AppImages.chatone,
      Viewbutton: 'View User',
      Blockbutton: 'Block User',
    },
    {
      id: 5,
      name: 'Nathan Alexender',
      title: 'Senior Barber',
      Imagesource: AppImages.chatone,
      Viewbutton: 'View User',
      Blockbutton: 'Block User',
    },
  ];
  return (
    <Screen viewStyle={{ padding: 15, flex: 1 , backgroundColor: appColors.Black}} statusBarColor={appColors.Black}
    >
      <View style={{ flex: 0.1 }}>
        <Header
        headerSubView={{ marginHorizontal: 5}}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'User Details'}
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


      <ScrollView style={{ flex: 0.9 }}>
        {data?.map((item) => (
          <Detailslist key={item.id} item={item} onPress={() => navigation.navigate(constants.AdminScreens.AdminViewUsers)} />
        ))}
      </ScrollView>





    </Screen>

  )
}

const Detailslist = ({ item, onPress }) => {
  return (
    <View style={styles.Containerstyle}>
      <View style={{ flex: 1,}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          flex: 0.6,
        }}>
          <View style={{ paddingVertical: 8, flex: 0.3, alignItems:'flex-start'}}>
            <Image source={item.Imagesource}
              style={{ height: 80, width: 80, borderRadius: 40, }}
            />
          </View>
          <View style={{ flexDirection: 'column', flex: 0.7,}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                fontSize: 17,
              }}>
              {item.name}
            </Text>
            <View >
              <Text style={{
                color: 'white',
                fontSize: 12,
              }}>{item.title}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, position:'relative', marginHorizontal: 15, }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor:'transparent'  }}></View>
          </View>
        {/* <View
          style={{
            fontSize: 25,
            marginHorizontal: 14,
            borderBottomWidth: 2,
            borderStyle: 'dashed',
            borderBottomColor: '#c79647'
          }}></View> */}
        <View style={{ flex: 0.4, flexDirection: 'row', }}>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <ButtonComponent
              onPress={onPress}
              style={{ backgroundColor: '#c79647', width: '90%', paddingVertical: 9 }}
              title={'View User'}
            />
          </View>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <ButtonComponent
              style={{ backgroundColor: '#e81f1c', width: '90%', paddingVertical: 9 }}
              title={'Block User'}

            />
          </View>
        </View>
      </View>
    </View>
  )
}



export default AdminUserDetails;




