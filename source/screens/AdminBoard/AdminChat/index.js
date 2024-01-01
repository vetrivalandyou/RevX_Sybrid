import React from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import styles from "./styles";
import Header from "../../../components/molecules/Header";
import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";
import Search from "../../../components/atom/Search/Search";
import { TouchableHighlight } from "@gorhom/bottom-sheet";
import appColors from "../../../AppConstants/appColors";
import { screenSize } from "../../../components/atom/ScreenSize";
import constants from "../../../AppConstants/Constants.json"


const AdminChat = ({navigation}) => {

    const [isFocused, setFocused] = React.useState(false);


    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const ChatData = [
        {
            id: 1,
            message: "Hi Good Morning",
            time: "10:00"
        },
        {
            id: 2,
            message: "Hi Good Morning",
            time: "10:00"
        },
        {
            id: 3,
            message: "Hi Good Morning",
            time: "10:00"
        },
       


    ]

    const ChatDataContainer = ({ item, onPress }) => {

        return (

            <View style={styles.chatContainer}>

                <TouchableOpacity style={{ flex: 1,justifyContent: 'space-between' }}
                    onPress={onPress}
                >
              <View style={{flex:0.85}}>
                  <Text style={{ color: appColors.White, }}>{item.message}</Text>
                
              </View>
              <View style={{flex:0.15,alignItems:'flex-end'}}>   
              <Text style={{ color: appColors.White,fontSize:12 }}>{item.time}</Text>

              </View>
                </TouchableOpacity>




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
                    headerText={'The Barber Show'}
                    rightIcoName={"call"}
                    rightIcoType={Icons.Ionicons}
                    leftIcoStyle={{ backgroundColor: appColors.lightBlack, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                    rightIcoSize={20}
                    onPressLeftIcon={() => navigation.goBack()}                />
            </View>

            {/* chatDataContainer View */}

            <View style={styles.chatDataContainerView}>

                <FlatList
                    data={ChatData}
                    renderItem={({ item }) => <ChatDataContainer item={item} />}
                    keyExtractor={item => item.id}
                />

            </View>

            {/* MasgType View */}

            <View style={styles.MasgTypeView}>

                <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center' }}>


                    <TextInput
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Message..." style={[styles.input,isFocused && styles.focusedInput]}
                        placeholderTextColor={appColors.White}
                         />


                    <TouchableOpacity style={{ position: 'absolute', right: 20 }}>

                        <CustomIcon type={Icons.EvilIcons} name={"camera"} size={21} color={appColors.White} />

                    </TouchableOpacity>


                </View>

                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>

                    <TouchableOpacity style={{ backgroundColor: appColors.Goldcolor, height: '60%', borderRadius: 100, width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomIcon type={Icons.MaterialIcons} name={"keyboard-voice"} color={appColors.White} size={24} />

                    </TouchableOpacity>

                </View>

            </View>

        </Screen>
    )

}
export default AdminChat;
