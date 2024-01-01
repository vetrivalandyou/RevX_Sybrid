import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import appColors from "../../../AppConstants/appColors";
import styles from "./styles";
import Header from "../../../components/molecules/Header";
import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
import { AppImages } from "../../../AppConstants/AppImages";
import Sizes from "../../../AppConstants/Sizes";

const RecentTransactionsMain = () => {

    const RecentTransactionContainer = ({ source, name, date, amount }) => {

        return (

            <View style={styles.RecentTransactionContainer}>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={source} />

                </View>
                <View style={{ flex: 0.5, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: appColors.White }}>
                        {name}
                    </Text>
                    <Text style={{ color: appColors.White, fontSize: 12 }}>
                        {date}
                    </Text>

                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: appColors.Goldcolor, fontSize: 14 }}>
                        {amount}
                    </Text>

                </View>

            </View>
        )


    }

    return (

        <Screen statusBarColor={appColors.Black} viewStyle={styles.MianContainer}>

            {/* Header View */}
            <View style={styles.headerView}>

                <Header
                    lefttIcoType={Icons.Ionicons}
                    leftIcoName={'chevron-back'}
                    headerText={'Recent Transactions'}
                    rightIcoName={'bell-fill'}
                    rightIcoType={Icons.Octicons}
                    logIn={'success'}
                    leftIcoStyle={styles.headerleftIcoStyle}
                    rightIcoSize={16}
                    headerTextViewStyle={{ alignItems: 'center' }}


                />
            </View>
            {/* Card View */}

            <View style={styles.cardContainer}>
                {/* Card Image View */}

                <View style={styles.imgContainer}>
                    <Image source={AppImages.visaimg} style={{ flex: 1 }} />

                </View>

                {/* Card InnerContainer View */}

                <View style={styles.cardInnerContainer}>

                    <View style={styles.AvailableBalancetTextViewStyle}>
                        <Text style={styles.AvailableBalanceTextStyle}>
                            Available Balance
                        </Text>

                    </View>

                    <View style={styles.balanceMainViewStyle}>

                        <View style={styles.balanceViewStyle}>
                            <Text style={styles.balanceTextStyle}>
                                $XXXX.XX
                            </Text>

                        </View>

                        <View style={styles.ExViewStyle}>
                            <Text style={styles.ExTextStyle}>
                                EX 06/24
                            </Text>
                        </View>


                    </View>
                </View>

            </View>
            {/* Recent Transaction View */}

            <View style={styles.RecentTransactionMainView}>

                <View style={{ flex: 0.5 }}>
                    <Text style={styles.BarberEarningsTextStyle}>
                        Recent Transaction
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.ViewAllMainView}>
                    <Text style={styles.ViewAllTextStyle}>
                        View All
                    </Text>
                    <CustomIcon
                        type={Icons.Ionicons}
                        name={"chevron-forward"}
                        size={15} color={appColors.Goldcolor}
                        style={{ marginLeft: 5, marginTop: 5 }} />
                </TouchableOpacity>

            </View>
            <View style={{ flex: 0.22, }}>
                <RecentTransactionContainer source={AppImages.chatthree}
                    name={"Henry"}
                    date={"28th april 2023"}
                    amount={"-$185.00"} />
                <RecentTransactionContainer source={AppImages.chatfour}
                    name={"Henry"}
                    date={"28th april 2023"}
                    amount={"-$185.00"} />

            </View>
            <View style={styles.RecentTransactionMainView}>

                <View style={{ flex: 0.5 }}>
                    <Text style={styles.BarberEarningsTextStyle}>
                        Tommorrow
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.ViewAllMainView}>
                    <Text style={styles.ViewAllTextStyle}>
                        View All
                    </Text>
                    <CustomIcon
                        type={Icons.Ionicons}
                        name={"chevron-forward"}
                        size={15} color={appColors.Goldcolor}
                        style={{ marginLeft: 5, marginTop: 5 }} />
                </TouchableOpacity>

            </View>

            <View style={{ flex: 0.23 }}>

                 <RecentTransactionContainer
                    source={AppImages.chatsix}
                    name={"Henry"}
                    date={"28th april 2023"}
                    amount={"-$185.00"} />

                  <RecentTransactionContainer
                    source={AppImages.chatfive}
                    name={"Henry"}
                    date={"28th april 2023"}
                    amount={"-$185.00"} />

            </View>
        </Screen>
    )

}
export default RecentTransactionsMain;
