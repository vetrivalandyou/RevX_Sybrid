import React from "react";

import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import styles from "./styles";
import Header from "../../../components/molecules/Header";
import { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
import appColors from "../../../AppConstants/appColors";
import { AppImages } from "../../../AppConstants/AppImages";
import ButtonComponent from "../../../components/atom/CustomButtons/ButtonComponent";

const AdminPaymentMethod = ({navigation}) => {

    const [isPressedCreditCard, setIsPressedCreditCard] = React.useState(false);
    const [isPressedPayPal, setIsPressedPayPal] = React.useState(false);
    const [isPressedApplePay, setIsPressedApplePay] = React.useState(false);


    const handlePressCreditCrad = () => {
        setIsPressedCreditCard(!isPressedCreditCard);
    };

    const handlePressPaypal = () => {
        setIsPressedPayPal(!isPressedPayPal);
    };
    const handlePressApplePay = () => {
        setIsPressedApplePay(!isPressedApplePay);
    };



    const PaymentMethodContainer = ({ onPress, isPressed, outerColor, innerColor, source, title }) => {

        return (

            <View style={styles.PaymentMethodContainerView}>
                
                <View style={styles.ImgStyle}>
                    <Image source={source} />

                </View>


                <View style={styles.PaymentMethodInnerContainer}>

                    <View style={{ flex: 0.8, }}>
                        <Text style={styles.PaymentTextStyle}>{title}</Text>
                    </View>

                    <View style={{ flex: 0.2 }}>
                        <TouchableOpacity
                            style={[styles.outerCircle, isPressed && { backgroundColor: outerColor }]}
                            onPress={onPress}
                            underlayColor="transparent"
                        >
                            <View style={[styles.innerCircle, isPressed && { backgroundColor: innerColor }]} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>


        )


    }


    return (
        <Screen viewStyle={styles.mainContainer}>

            {/* Header View */}
            <View style={styles.HeaderView}>

                <Header
                    lefttIcoType={Icons.Ionicons}
                    leftIcoName={'chevron-back'}
                    headerText={'Payment Method'}
                    rightIcoName={'bell-fill'}
                    rightIcoType={Icons.Octicons}
                    leftIcoStyle={styles.headerleftIcoStyle}
                    rightIcoSize={20}
                    headerTextViewStyle={{ alignItems: "center" }}
                    onPressLeftIcon={() => navigation.goBack()}
                />
            </View>


            {/* Cards Container View */}

            <View style={styles.balanceView}>
                <View style={{ flex: 0.15,  }}>
                    <PaymentMethodContainer title={"Credit card"} source={AppImages.creditcard}
                        onPress={handlePressCreditCrad}
                        isPressed={isPressedCreditCard}
                        outerColor={appColors.Goldcolor}
                        innerColor={appColors.White}


                    />

                </View>

                <View style={{ flex: 0.15,  }}>
                    <PaymentMethodContainer title={"Paypal"} source={AppImages.paypal}
                        onPress={handlePressPaypal}
                        isPressed={isPressedPayPal}
                        outerColor={appColors.Goldcolor}
                        innerColor={appColors.White}


                    />

                </View>
                <View style={{ flex: 0.15,  }}>
                    <PaymentMethodContainer title={"Apple Pay"} source={AppImages.applepay}
                        onPress={handlePressApplePay}
                        isPressed={isPressedApplePay}
                        outerColor={appColors.Goldcolor}
                       // innerColor={appColors.White}


                    />

                </View>
            </View>

            {/* Button View */}
            <View style={styles.btnViewStyle}>

                <ButtonComponent title={"Continue"} />
            </View>




        </Screen>

    )
}
export default AdminPaymentMethod;


