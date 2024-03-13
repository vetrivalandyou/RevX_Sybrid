import { useState } from "react";
import { screenSize } from "../../../components/atom/ScreenSize";

const { View, Text, FlatList, TouchableOpacity, ScrollView } = require("react-native")

const AdminBlockUsers = ({ onPress }) => {


    const data = [
        {
            barberId: 182,
            barberName: "User7",
            statusId: 10,
            isOpen: false,
            barberServices: [
                {
                    servicesId: 1,
                    serviceName: "Buz Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 2,
                    serviceName: "null",
                    isApproved: "false"
                },
                {
                    servicesId: 3,
                    serviceName: "Buz Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 13,
                    serviceName: "null",
                    isApproved: "false"
                },
                {
                    servicesId: 4,
                    serviceName: "Buz Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 5,
                    serviceName: "ABC",
                    isApproved: "false"
                },
                {
                    servicesId: 6,
                    serviceName: "ACD",
                    isApproved: "false"
                },
                {
                    servicesId: 7,
                    serviceName: "EFG",
                    isApproved: "false"
                },
                {
                    servicesId: 8,
                    serviceName: "Buz Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 9,
                    serviceName: "CDE",
                    isApproved: "false"
                },
                {
                    servicesId: 10,
                    serviceName: "Beard & Mustache Trims & Styles",
                    isApproved: "true"
                },
                {
                    servicesId: 11,
                    serviceName: "Buz Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 12,
                    serviceName: "Hair Trimming",
                    isApproved: "false"
                }
            ]
        },
        {
            barberId: 20,
            barberName: "John Walter",
            statusId: 13,
            isOpen: false,
            barberServices: "null"
        },
        {
            barberId: 21,
            barberName: "Carl James",
            statusId: 9,
            isOpen: false,
            barberServices: "null"
        },
        {
            barberId: 22,
            barberName: "John Walter",
            statusId: 12,
            isOpen: false,
            barberServices: "null"
        },
        {
            barberId: 80,
            barberName: "Arther Jack",
            statusId: 365,
            isOpen: false,
            barberServices: [
                {
                    servicesId: 15,
                    serviceName: "Facebook Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 16,
                    serviceName: "Twitter Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 17,
                    serviceName: "Google Cut",
                    isApproved: "false"
                },
                {
                    servicesId: 18,
                    serviceName: "Hello Cut",
                    isApproved: "false"
                }
            ]
        },
    ]




    const [barberData, setBarberData] = useState(data)

    // const handleBarberPress = (item) => {
    //     console.log("items", item?.item?.isOpen)
    //     if (item?.item?.isOpen == false) {
    //         barberData[item?.index]["isOpen"] = true
    //         setBarberData([...barberData])
    //     }
    //     else {
    //         barberData[item?.index]["isOpen"] = false
    //         setBarberData([...barberData])
    //     }
    // }

    const handleBarberPress = (item) => {
        const newData = barberData.map(barber => {
            if (barber.barberId === item.item.barberId) {
                return { ...barber, isOpen: !barber.isOpen };
            }
            return barber;
        });
        setBarberData(newData);
    }


    return (
        <View style={{backgroundColor:'black',alignItems: 'center',flex:1}}>
            <FlatList 
                data={barberData}
                renderItem={(item) => (
                    <View>
                        <TouchableOpacity style={{
                                height: screenSize.height / 4,
                                width: screenSize.width / 1.1,
                                marginBottom: 10,
                                backgroundColor: '#252525',
                                borderWidth: 1,
                                borderRadius: 20,
                                borderColor: 'black',
                                paddingHorizontal: 10, justifyContent: 'center'}}onPress={() => handleBarberPress(item)}>
                                <Text style={{ color: 'white' }}>Barber ID: {item.item.barberId}</Text>
                                <Text style={{ color: 'white' }}>Barber Name: {item.item.barberName}</Text>
                                <Text style={{ color: 'white' }}>Barber StatusID: {item.item.statusId}</Text>
                       
                        </TouchableOpacity>

                        {Array.isArray(item.item.barberServices) && item.item.isOpen && (
                          
                            <ScrollView    >
                                
                                {item.item.barberServices.map((service, index) => (
                                    <View key={index} style={{
                                        height: screenSize.height / 10,
                                        width: screenSize.width / 1.1,
                                        marginBottom: 10,
                                        backgroundColor: '#252525',
                                        borderWidth: 1, 
                                        borderRadius: 20,
                                        borderColor: 'black',
                                        paddingHorizontal: 10, justifyContent: 'center'
                                    }}>
                                        <Text style={{ color: 'white' }}>{service.serviceName}</Text>
                                        <Text style={{ color: 'white' }}>Approved: {service.isApproved}</Text>
                                    </View>
                                ))}
                               
                            </ScrollView>
                           
                        )}

                    </View>
                )}
                keyExtractor={(item) => (item.barberId.toString())} />
        </View>
    )

}
export default AdminBlockUsers;


