import React from "react";
import { View, Text, Image, FlatList, AppRegistry } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import appColors from "../../../AppConstants/appColors";
import Header from "../../../components/molecules/Header";
import { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
import { AppImages } from "../../../AppConstants/AppImages";
import ButtonComponent from "../../../components/atom/CustomButtons/ButtonComponent";
import constants from "../../../AppConstants/Constants.json"

const AdminBarberEarnings = ({ navigation }) => {
    const BarberList = [
        {
            id: 1,
            title: '$40,65',
            name: 'Nathan Alexender',
            Imagesource: AppImages.bb1
        },
        {
            id: 2,
            title: '$40,65',
            name: 'Janny Winkles',
            Imagesource: AppImages.chatfive
        },
        {
            id: 3,
            title: '$40,65',
            name: 'Annabol rehanna',
            Imagesource: AppImages.chattwo
        },
        {
            id: 4,
            title: '$40,65',
            name: 'Titus Kitamura',
            Imagesource: AppImages.chatthree
        },
        {
            id: 5,
            title: '$40,65',
            name: 'Nathan Alexender',
            Imagesource: AppImages.chatfour
        },

        {
            id: 6,
            title: '$40,65',
            name: 'Merill Kelvin',
            Imagesource: AppImages.chatfive
        },
        {
            id: 7,
            title: '$40,65',
            name: 'Nathan Alexender',
            Imagesource: AppImages.bb1
        },
        {
            id: 8,
            title: '$40,65',
            name: 'Janny Winkles',
            Imagesource: AppImages.chatfive
        },
        {
            id: 9,
            title: '$40,65',
            name: 'Annabol rehanna',
            Imagesource: AppImages.chattwo
        },
        {
            id: 10,
            title: '$40,65',
            name: 'Titus Kitamura',
            Imagesource: AppImages.chatthree
        },
        {
            id: 11,
            title: '$40,65',
            name: 'Nathan Alexender',
            Imagesource: AppImages.chatfour
        },

        {
            id: 12,
            title: '$40,65',
            name: 'Merill Kelvin',
            Imagesource: AppImages.chatfive
        },


    ]
    const BarberSpecialistContainer = ({ item }) => {
        return (
            <View style={{
                backgroundColor: appColors.darkgrey,
                paddingVertical: 7,
                paddingHorizontal: 12,
                borderRadius: 70,
                flexDirection: 'row',
                marginVertical: 5,



            }}>
                <Image source={item.Imagesource} style={{}} />

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex: 0.85, justifyContent: 'center' }}>
                        <Text style={{ color: appColors.White, fontSize: 18, marginLeft: 5 }}>
                            {item.title}
                        </Text>
                        <Text style={{ color: appColors.White, marginLeft: 5, fontSize: 12 }}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ flex: 0.45 }}>
                        <ButtonComponent style={{}}
                        onPress={()=>navigation.navigate(constants.AdminScreens.BarberEarnReport)}
                            title={"View"}
                        />
                    </View>


                </View>
            </View>
        );
    };

    return (
        <Screen
            statusBarColor={appColors.Black}
            barStyle="light-content"
            viewStyle={{ padding: 0.9 }}

        >
            <View style={{ flex: 0.1 }}>

                <Header
                    lefttIcoType={Icons.Ionicons}
                    leftIcoName={"chevron-back"}
                    headerText={"Barber Earnings"}
                    rightIcoName={'bell-fill'}
                    rightIcoType={Icons.Octicons}
                    logIn={"success"}
                    rightIcoSize={20}
                    leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                    headerTextViewStyle={{ alignItems: 'center' }}
                    onPressLeftIcon={() => navigation.goBack()}
                />
            </View>

            <View style={{ flex: 0.8 }}>
                <FlatList
                    data={BarberList}
                    renderItem={({ item }) => <BarberSpecialistContainer item={item} />}
                    keyExtractor={item => item.id}
                />

            </View>
        </Screen>

    )
}
export default AdminBarberEarnings;
