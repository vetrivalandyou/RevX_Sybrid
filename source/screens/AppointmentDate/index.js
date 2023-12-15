import React from "react";
import Header from "../../components/molecules/Header";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Text, View } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import appColors from "../../AppConstants/appColors";
import ButtonComponent from "../../components/atom/CustomButtons/ButtonComponent";
import constants from "../../AppConstants/Constants.json"


const AppointmentDate = ({ navigation }) => {

    const originalData = [
        { time: '10.00 AM' },
        { time: '10.00 AM' },
        { time: '10.00 AM' },
        { time: '10.00 AM' },
        { time: '10.00 AM' },


    ];

    const data3 = [
        {
            id: '1',
            title: '10:00 AM',
            title2: '10:30 AM',

        },
        {
            id: '2',
            title: '11:00 AM',
            title2: '11:30 AM',

        },
        {
            id: '3',
            title: '12:00 PM',
            title2: '12:30 AM',

        },
        {
            id: '4',
            title: '01:00 PM',
            title2: '01:30 PM',

        },



    ]
    const [selected, setSelected] = React.useState('');

    const SelectedHourse = ({ item }) => {

        return (

            <View style={{ flexDirection: 'row',marginVertical:5 }}>
                <View style={{ marginHorizontal: 10, borderWidth: 1, borderColor: appColors.darkgrey, borderRadius: 10, padding: 10, width: '45%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 13.5, fontWeight: '400' }}>{item.title}

                    </Text>
                </View>


                <View style={{ marginHorizontal: 10, borderWidth: 1, borderColor: appColors.darkgrey, borderRadius: 10, padding: 10, width: '45%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 13.5, fontWeight: '400' }}>{item.title2}

                </Text>
            </View>
            </View>


        )
    }

    return (
        <Screen
            statusBarColor={appColors.Black}
            barStyle="light-content"
            viewStyle={{ backgroundColor: appColors.Black, padding: 15 }}

        >
            <View style={{ flex: 0.15 }}>
                <Header
                    lefttIcoType={Icons.Ionicons}
                    leftIcoName={"chevron-back"}
                    headerText={"Appointment Date"}
                    rightIcoName={"bell"}
                    rightIcoType={Icons.SimpleLineIcons}
                    logIn={"Appointment Date"}
                    rightIcoSize={20}
                    leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                />
            </View>

            <View style={{ borderRadius: 50, flex: 0.4, backgroundColor: 'red' }}>
                <Calendar
                    style={{
                        // borderWidth: 1,
                        // borderColor: 'gray',
                        // height: 200,
                        borderRadius: 20,
                        backgroundColor: appColors.darkgrey,
                        //   backgroundColor:appColors.Goldcolor
                        height: 300

                    }}
                    theme={{
                        backgroundColor: appColors.darkgrey,
                        calendarBackground: appColors.darkgrey,
                        textSectionTitleColor: appColors.White,
                        selectedDayBackgroundColor: appColors.Goldcolor,
                        selectedDayTextColor: appColors.White,
                        todayTextColor: appColors.White,
                        dayTextColor: appColors.White,
                        textDisabledColor: appColors.White,


                    }}
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: appColors.Goldcolor }
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', flex: 0.1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: appColors.White, fontSize: 20 }}>
                    Selected Hours
                </Text>
                <Text style={{ color: appColors.Goldcolor }}>
                    See all
                </Text>

            </View>
            <View style={{ flex: 0.3, flexWrap: 'wrap', padding: 5, }}>

                {data3.map((item) => (
                    <SelectedHourse key={item.id} item={item} />
                ))}

            </View>
       
            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                <ButtonComponent title={'Continue'} onPress={() => navigation.navigate(constants.screen.PaymentMethod)} />

            </View>


        </Screen>
    )

}
export default AppointmentDate;