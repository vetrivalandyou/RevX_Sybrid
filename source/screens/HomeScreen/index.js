import React from "react";
import { Image, Text, View, TouchableOpacity, FlatList,ScrollView } from "react-native";
import Screen from "../../components/atom/ScreenContainer/Screen";
import appColors from "../../AppConstants/appColors";
import styles from "./styles";
import { AppImages } from "../../AppConstants/AppImages";
import CustomIcon, { Icons } from "../../components/molecules/CustomIcon/CustomIcon";
import Search from "../../components/atom/Search/Search";
import { screenSize } from "../../components/atom/ScreenSize";
import ButtonComponent from "../../components/atom/CustomButtons/ButtonComponent";
import constants from "../../AppConstants/Constants.json"


const HomeScreen = ({navigation}) => {
    const OurServicesData = [
        {
            id: 1,
            title: 'Haircut for Men',
            Imagesource: AppImages.ourservices
        },
        {
            id: 2,
            title: 'Haircut for Men',
            Imagesource: AppImages.ourservices
        },
        {
            id: 3,
            title: 'Haircut for Men',
            Imagesource: AppImages.ourservices
        },
        {
            id: 4,
            title: 'Haircut for Men',
            Imagesource: AppImages.ourservices
        },
        {
            id: 5,
            title: 'Haircut for Men',
            Imagesource: AppImages.ourservices
        },
        {
            id: 6,
            title: 'Haircut for Men',
            Imagesource: AppImages.ourservices
        },

    ]
    const NearbyBarbersData = [
       
        {
            id: 1,
            title: 'The Barber Shop',
            Imagesource: AppImages.nearbybarbers
        },
        {
            id: 2,
            title: 'The Barber Shop',
            Imagesource: AppImages.nearbybarbers
        },
        {
            id: 3,
            title: 'The Barber Shop',
            Imagesource: AppImages.nearbybarbers
        },
        {
            id: 4,
            title: 'The Barber Shop',
            Imagesource: AppImages.nearbybarbers
        },
        {
            id: 5,
            title: 'The Barber Shop',
            Imagesource: AppImages.nearbybarbers
        },

    ]
    const OurServices = ({ item }) => {
        return (
            <View style={{ marginHorizontal: 3, height: screenSize.height/6,width:screenSize.width/3, alignItems: 'center' }}>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ flex: 1 }} source={item.Imagesource} />



                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: appColors.White, fontSize: 16, }}>
                            Shave For Men
                        </Text>
                    </View>
                </View>

            </View>
        );
    };

    const NearbyBarbers = ({ item }) => {
        return(

            <View style={{ marginHorizontal: 5, height: screenSize.height/3, width: screenSize.width / 2, alignItems: 'center' ,borderRadius:10,borderWidth:2,borderColor:appColors.darkgrey,padding:10}}>
            <View style={{ flex: 1,width:"100%" }}>

                <View style={{ flex: 0.5,alignItems:'center'}}>
                    <Image style={{ aspectRatio:1,resizeMode:'contain',flex:1,}} source={item.Imagesource} />
                    
                    
                </View>
                <View style={{ flex: 0.12, justifyContent: 'center' }}>
                    <Text style={{ color: appColors.White, fontSize: 20, }}>
                        {item.title}
                    </Text>
                </View>

                <View style={{flex:0.11,flexDirection:'row'}}>
                    <View style={{flexDirection:'row',flex:0.5}}>
                       <CustomIcon type={Icons.Feather} name={"map-pin"} color={appColors.White}/>
                       <Text style={{color:appColors.White,marginLeft:5}}>0.8km</Text>
                    </View>
                    <View style={{flexDirection:'row',flex:0.5}}>
                       <CustomIcon type={Icons.AntDesign} name={"staro"} color={appColors.Goldcolor}/>
                       <Text style={{color:appColors.White,marginLeft:5}}>0.8km</Text>
                    </View>
                    
                   

                </View>
                <View style={{flex:0.1,justifyContent:'center'}}>
                <View
               style={{height:1, backgroundColor: appColors.darkgrey, width: '100%'}}>

               </View>

                </View>
                <View style={{flex:0.2}}>
                    <ButtonComponent title={"View Barber Profile"} style={{paddingVertical:10}}/>

                </View>
              
            </View>

        </View>

        )

      

    }


    return (

        <Screen statusBarColor={appColors.Black}
          
            barStyle="light-content"
        >
            <View style={{ flex: 0.2, justifyContent: 'space-between', flexDirection: "row", marginHorizontal: 10, }}>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={AppImages.profile} style={{}} />
                </View>

                <View style={{ flex: 0.8, flexDirection: 'row' }}>
                    <View style={{ flex: 0.6, justifyContent: 'center', }}>
                        <View style={{ flex: 0.4, justifyContent: 'center' }}>
                            <Text style={{ marginLeft: 5, fontSize: 24, color: appColors.White, marginTop: 10 }}>
                                Jonna Emma
                            </Text>
                        </View>

                        <View style={{ flex: 0.3, flexDirection: 'row' }}>
                            <CustomIcon type={Icons.Feather} name={"map-pin"} color={appColors.White} />

                            <Text style={{ marginLeft: 5, color: appColors.White, fontSize: 14 }}>
                                Washington DC
                            </Text>
                        </View>



                    </View>
                    <View style={{ flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>

                        <TouchableOpacity
                            style={{ backgroundColor: appColors.darkgrey, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <CustomIcon type={Icons.FontAwesome5} name={"bell"} color={appColors.White} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: appColors.darkgrey, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <CustomIcon type={Icons.Feather} name={"filter"} color={appColors.White} />

                        </TouchableOpacity>



                    </View>

                </View>

            </View>
          

            {/* </View> */}
            <View style={{ flex: 0.8, padding: 15}}>
            <View style={{ flex: 0.1 }}>
                <Search />

            </View>
           
            <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: appColors.White }}>
                    Our Services
                </Text>
                <TouchableOpacity
                onPress={()=>navigation.navigate(constants.screen.Services)}
                    style={{}}
                >
                    <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
                        See all
                    </Text>
                </TouchableOpacity>


            </View>
            <View style={{ flex: 0.15, }}>
                <FlatList
                    data={OurServicesData}
                    renderItem={({ item }) => <OurServices item={item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />

            </View>
            <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: appColors.White }}>
                    Nearby Barbers
                </Text>
                <TouchableOpacity
                     onPress={()=>navigation.navigate(constants.screen.BarberSpecialist)}
                    style={{}}
                >
                    <Text style={{ color: appColors.Goldcolor, fontSize: 16 }}>
                        See all
                    </Text>
                </TouchableOpacity>


            </View>
            <View style={{ flex: 0.5}}>
                <FlatList
                    data={NearbyBarbersData}
                    renderItem={({ item }) => <NearbyBarbers item={item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
               
            </View>


            </View>



        </Screen>


    )
}

export default HomeScreen;