import { useState } from "react";
import { screenSize } from "../../../components/atom/ScreenSize";

const { View, Text, FlatList, TouchableOpacity } = require("react-native")

const AdminBlockUsers = ({ onPress }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

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
            statusId: 9,
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
            statusId: 9,
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

    const handleItemPress = (index) => {
        setSelectedIndex(index);
    };

    const [barberData, setBarberData] = useState(data)


    const renderSecondLevelItems = ({ item, index }) => (
        <View key={index} style={{
            height: screenSize.height / 8,
            width: screenSize.width / 1.1,
            marginBottom: 10,
            backgroundColor: '#252525',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'black',
            paddingHorizontal: 10, justifyContent: 'center'
        }}>
            <Text style={{ color: 'white' }}>{item.servicesId}</Text>
            <Text style={{ color: 'white' }}>{item.serviceName}</Text>
            <Text style={{ color: 'white' }}>{item.isApproved}</Text>
        </View>
    );

    const handleBarberPress = (item, index) => {
        console.log("item", item.isOpen)
        if (item.isOpen == false) {
            data[index]["isOpen"] = true
            setBarberData([...data])
        }
        else {
            data[index]["isOpen"] = false
            setBarberData([...data])
        }
    }


    return (
        <View style={{ backgroundColor: 'black', flex: 1, alignItems: 'center' }}>
            {barberData?.map((item, index) => (
                <TouchableOpacity onPress={() => handleBarberPress(item, index)} key={index} >
                    <View style={{
                        height: screenSize.height / 5,
                        width: screenSize.width / 1.1,
                        marginBottom: 10,
                        backgroundColor: 'red',
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: 'black',
                        paddingHorizontal: 10, justifyContent: 'center'
                    }}>
                        <Text style={{ color: 'white' }}>Barber ID: {item.barberId}</Text>
                        <Text style={{ color: 'white' }}>Barber Name: {item.barberName}</Text>
                        <Text style={{ color: 'white' }}>Barber StatusID: {item.statusId}</Text>

                        {item?.barberServices?.length > 0 && (
                            (
                                item?.isOpen == true && (
                                    <FlatList data={item?.barberServices}
                                        renderItem={renderSecondLevelItems}
                                        keyExtractor={(item) => item.servicesId}

                                    />
                                )
                            )
                        )}
                    </View>
                </TouchableOpacity>
            )
            )}
        </View>
    );
};



export default AdminBlockUsers;


//   const renderFirstLevelItems = ({ item, index }) => (
//     <TouchableOpacity onPress={() => handleItemPress(index)} style={{flex:1,backgroundColor:'yellow'}}>
//       <View  style={ {
//          height: screenSize.height / 8,
//         width: screenSize.width / 1.1,
//         marginBottom: 10,
//         backgroundColor: '#252525',
//        borderWidth: 1,
//        borderRadius: 20,
//        borderColor: 'black',
//      paddingHorizontal:10,justifyContent:'center'
//  }}>
//         <Text style={{color:'white'}}>Barber ID: {item.barberId}</Text>
//      <Text style={{color:'white'}}>Barber Name: {item.barberName}</Text>
//        <Text style={{color:'white'}}>Barber StatusID: {item.statusId}</Text>


//       </View>
//     </TouchableOpacity>
//   );

//   const renderSecondLevelItems = ({ item }) => (
//     <View  style={ {
//         height: screenSize.height / 8,
//        width: screenSize.width / 1.1,
//        marginBottom: 10,
//        backgroundColor: '#252525',
//       borderWidth: 1,
//       borderRadius: 20,
//       borderColor: 'black',
//     paddingHorizontal:10,justifyContent:'center'
// }}>
//        <Text style={{color:'white'}}>{item.servicesId}</Text>
//              <Text style={{color:'white'}}>{item.serviceName}</Text>
//            <Text style={{color:'white'}}>{item.isApproved}</Text>

//     </View>
//   );

//     <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'black',flex:1}}>
//     <FlatList
//       data={data}
//       renderItem={({ item, index }) => (

//         <View style={{flex:1,}}>
//                   <TouchableOpacity onPress={handleItemPress(index)}
//          style={ {
//             height: screenSize.height / 8,
//             width: screenSize.width / 1.1,
//             marginBottom: 10,
//             backgroundColor: '#252525',
//             borderWidth: 1,
//             borderRadius: 20,
//             borderColor: 'black',
//             paddingHorizontal:10,justifyContent:'center'
//           }}>
//           <Text style={{color:'white'}}>Barber ID: {item.barberId}</Text>
//           <Text style={{color:'white'}}>Barber Name: {item.barberName}</Text>
//           <Text style={{color:'white'}}>Barber StatusID: {item.statusId}</Text>

//           </TouchableOpacity>

//       </View>

//           )}
//       keyExtractor={(item) => item.barberId}
//     />

//         {    selectedIndex  !==null &&(  

//         <View style={{flex:1,backgroundColor:'black'}}>

//             <FlatList
//               data={[selectedIndex].barberServices}

//               renderItem={({ item ,}) => (
//                 <View style={ {
//                     height: screenSize.height / 8,
//                     width: screenSize.width / 1.1,
//                     marginBottom: 10,
//                     backgroundColor: '#252525',
//                     borderWidth: 1,
//                     borderRadius: 20,
//                     borderColor: 'black',
//                     paddingHorizontal:10,justifyContent:'center'
//                   }}> 
//                   <Text style={{color:'white'}}>{item.servicesId}</Text>
//                   <Text style={{color:'white'}}>{item.serviceName}</Text>
//                   <Text style={{color:'white'}}>{item.isApproved}</Text>
//                 </View>
//               )}
//               keyExtractor={(item) => item.servicesId}
//             />
//             </View>
//         )
// }



//     </View>

{/* <View style={{backgroundColor:'red'}}>

   
      <FlatList
        data={data}
        renderItem={renderFirstLevelItems}
        keyExtractor={(item) => item.barberId}
      /> 
   { selectedIndex !== null && (
        <FlatList
          data={data[selectedIndex].barberServices}
          renderItem={renderSecondLevelItems}
          keyExtractor={(item) => item.servicesId}
        />
      )} 
     
      </View> */}