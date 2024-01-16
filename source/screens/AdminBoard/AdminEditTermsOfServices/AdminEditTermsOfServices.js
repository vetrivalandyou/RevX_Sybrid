import { FlatList, StyleSheet, Text, View, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'

import Screen from '../../../components/atom/ScreenContainer/Screen'
import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import { screenSize } from '../../../components/atom/ScreenSize';
import Header from '../../../components/molecules/Header';
import { Icons } from '../../../components/molecules/CustomIcon/CustomIcon';
import constants from "../../../AppConstants/Constants.json";
import appColors from '../../../AppConstants/appColors';


const AdminEditTermsOfServices = ({ route, navigation }) => {

  const { description, } = route.params;
  const [editedDescription, setEditedDescription] = useState(description);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Screen viewStyle={{ flex: 1, backgroundColor: appColors.Black, padding: 15 }} statusBarColor={appColors.Black}>
      <View style={{ flex: 0.1 }}>
        <Header
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Terms of Service'}
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

      <View
        style={{
          flex: 0.8,

          paddingVertical: 5,
        }}>
        <View
          style={{
            height: 'auto',
            backgroundColor: '#252525',
            borderRadius: 20,
            marginBottom: 20,
            alignContent: 'center',
            padding: 20,
            borderColor: isFocused ? '#C79646' : 'transparent', // Change border color conditionally
            borderWidth: isFocused ? 1 : 0, // Adjust the border width
          }}>
          <Text
            style={{
              color: '#C79646',
              fontSize: 20,
              fontWeight: '500',
              paddingBottom: 5,
            }}>
            Type of date
          </Text>
          <TextInput
            style={{ fontSize: 16, color: 'white', lineHeight: 20, }}
            multiline
            value={editedDescription}
            onChangeText={(text) => setEditedDescription(text)}
           // onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}


          />

        </View>
      </View>
      <View style={styles.buttonView}>

        <ButtonComponent
          style={{ backgroundColor: '#C79646', paddingVertical: Platform.OS == 'ios' ? 18 : 13, bottom: 1, position: 'absolute' }}
          title={'Save'}
          onPress={() => navigation.goBack({
            descriptionEdit: editedDescription,// Pass the current description to the edit screen
            // Pass the function to update the description
          })
          }

        />
      </View>
    </Screen>
  );
};





export default AdminEditTermsOfServices;

const styles = StyleSheet.create({
  buttonView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})