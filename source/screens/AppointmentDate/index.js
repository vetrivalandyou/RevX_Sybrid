import React from "react";
import Header from "../../components/molecules/Header";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Text, View } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import appColors from "../../AppConstants/appColors";
import ButtonComponent from "../../components/atom/CustomButtons/ButtonComponent";
import constants from "../../AppConstants/Constants.json"


const AppointmentDate = ({navigation}) => {

    const originalData = [
        {  time: '10.00 AM' },
        {  time: '10.00 AM' },
        {  time: '10.00 AM' },
        {  time: '10.00 AM' },
        {  time: '10.00 AM' },

       
      ];
    const [selected, setSelected] = React.useState('');

    return (
        <Screen
            statusBarColor={appColors.Black}
            barStyle="light-content"
            viewStyle={{ backgroundColor: appColors.Black }}

        >
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
            <View style={{ flex: 0.9, padding: 10, backgroundColor: appColors.Black }}>
                <View style={{ borderRadius: 50, flex: 0.47 }}>
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
                <View style={{ flexDirection: 'row', flex: 0.1, justifyContent: 'space-between' ,alignItems:'center'}}>
                    <Text style={{ color: appColors.White, fontSize: 20 }}>
                        Selected Hours
                    </Text>
                    <Text style={{ color: appColors.Goldcolor }}>
                        See all
                    </Text>

                </View>
                <View style={{flex:0.3,flexWrap:'wrap',padding:5}}>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,width:'45%',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,marginTop:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,marginTop:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,marginTop:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                        
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,marginTop:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                        
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,marginTop:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                        
                    </View>
                    <View style={{borderWidth:1,borderColor:appColors.darkgrey,borderRadius:10,padding:10,marginTop:10,width:'45%',alignItems:'center'}}>
                        <Text style={{color:appColors.White}}>
                            10.00 AM
                        </Text>
                        
                    </View>
                    
                    
                    

                </View>
                <View style={{flex:0.13,justifyContent:'center'}}>
                    <ButtonComponent title={'Continue'} onPress={()=>navigation.navigate(constants.screen.PaymentMethod)}/>

                </View>


            </View>
        </Screen>
    )

}
export default AppointmentDate;