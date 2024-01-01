import React from "react";

import { Text, View, StyleSheet, Image,TouchableOpacity } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import appColors from "../../../AppConstants/appColors";
import styles from "./styles";
import Header from "../../../components/molecules/Header";
import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
import { AppImages } from "../../../AppConstants/AppImages";
import constants from "../../../AppConstants/Constants.json"

const Report = ({navigation}) => {

    const BarberEarn = [
        {
            id: 1,
            price1: '$40,65',
            price2: '$42,65',
            name: 'Hanery pawl',
            Imagesource: AppImages.bb1
        },
        {
            id: 2,
            price1: '$40,65',
            price2: '$42,65',
            name: 'Hanery pawl',
            Imagesource: AppImages.chatsix
        },
    ]
    const BarberEarnContainer = ({ item }) => {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
        )
    };
    return (
        <Screen viewStyle={styles.mainContainer}>
            {/* Header View */}
            <View style={styles.HeaderView}>
                <Header
                    lefttIcoType={Icons.Ionicons}
                    leftIcoName={'chevron-back'}
                    headerText={'Report'}
                    rightIcoSize={20}
                    headerTextViewStyle={{ alignItems: "center" }}
                    onPressLeftIcon={() => navigation.goBack()}
                />
            </View>

            {/* Total Balance View */}

            <View style={styles.balanceView}>
                <Text style={styles.balanceText}>
                    Total Balance
                </Text>
                <Text style={styles.balance}>
                    $752.00
                </Text>

            </View>
            {/* Barber Earn Headding View */}

            <View style={styles.earnbarberView}>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.earnbarberText}>
                        Barber Earnings
                    </Text>
                </View>
                <View style={styles.viewallView}>
                    <TouchableOpacity  style={styles.viewallView}
                    onPress={()=>navigation.navigate(constants.AdminScreens.AdminBarberEarnings)}

                    >
                    <Text style={styles.viewallText}>
                        View All
                    </Text>
                    <CustomIcon type={Icons.Ionicons} name={"chevron-forward"} size={12} color={appColors.Goldcolor} />
                    </TouchableOpacity>
                    
                </View>
            </View>

            {/* Barber Earn Componenet View */}

            <View style={styles.barberEarnComponenet}>

                {BarberEarn.map((item) => (
                    <BarberEarnContainer key={item.id}
                        item={item}
                    />

                ))}


            </View>

            {/* Map View */}
            <View style={styles.mapView}>


            </View>

        </Screen>

    )

}
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
        color: appColors.White
    },
    earnings: {
        color: appColors.White,
        fontSize: 12,
        flexWrap: 'wrap'
    },
});