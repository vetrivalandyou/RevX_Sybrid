import { StyleSheet } from "react-native";
import appColors from "../../../AppConstants/appColors";


export default StyleSheet.create({
    MianContainer: {
        padding: 15
    },
    headerView: {
        flex: 0.1
    },
    headerleftIcoStyle: {
        backgroundColor: appColors.lightBlack,
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        flex: 0.25,
        backgroundColor: appColors.darkgrey,
        borderRadius: 10

    },
    imgContainer: {
        flex: 0.5,

    },
    cardInnerContainer: {
        flex: 0.5,
        marginHorizontal: 20

    },
    AvailableBalancetTextViewStyle: {
        flex: 0.5,
        justifyContent: 'center',

    },
    AvailableBalanceTextStyle: {
        fontSize: 13.4,
        color: appColors.White, marginTop: 15
    },
    balanceMainViewStyle: {
        flex: 0.5,
        flexDirection: 'row'

    },
    balanceViewStyle: {
        flex: 0.5


    },
    balanceTextStyle: {
        fontSize: 31.03,
        color: appColors.White

    },
    ExViewStyle: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'center',

    },
    ExTextStyle: {
        fontSize: 13.41,
        color: appColors.White

    },
    RecentTransactionMainView: {
        flex: 0.1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    BarberEarningsTextStyle: {
        fontWeight: '400',
        fontSize: 22,
        color: appColors.White
    },
    ViewAllMainView: {
        flex: 0.5,
        justifyContent: 'flex-end',
        flexDirection: 'row'

    },
    ViewAllTextStyle: {
        color: appColors.Goldcolor,
        fontSize: 12,
        marginTop: 5
    },
    RecentTransactionContainer: {
        flex: 1,
        backgroundColor: appColors.darkgrey,
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
    }


})