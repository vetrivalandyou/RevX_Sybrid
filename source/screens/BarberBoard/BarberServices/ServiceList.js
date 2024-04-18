
<<<<<<< HEAD
import React, { useEffect }  from "react";
=======
import React from "react";
>>>>>>> 5760164d7a4498bd7794da1825e2e003f8b7db58
import { useState } from "react";

import { FlatList, Text, TextInput, TouchableOpacity, View,Image } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import Header from "../../../components/molecules/Header";
import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";

import styles from "./styles";
import ButtonComponent from "../../../components/atom/CustomButtons/ButtonComponent";

import appColors from "../../../AppConstants/appColors";
import { PostRequest } from "../../../services/apiCall";
import { endPoint, messages } from "../../../AppConstants/urlConstants";
import Dropdown from "../../../components/molecules/Dropdown/Dropdown";
import Servicesboard from ".";
import { SimpleSnackBar } from "../../../components/atom/Snakbar/Snakbar";
import { AppImages } from "../../../AppConstants/AppImages";




<<<<<<< HEAD
const ServiceList =({navigation, route})=>{
  const {item} = route.params;
    const [selectedValue, setSelectedValue] = useState(null);
    const [newService, setNewService] = useState('');
    const [Services, setServices] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    // const [dropDownData, SetdropdownData]  = useState([])
    // const [servicesList, setServiceslist] = useState([]);
    useEffect(() => {
      customerservices();
    }, []);
  
    const customerservices = () => {
      const payload = {
        servicesId: 0,
        barberId: 94,
        categoryServicesId: item.serviceCategoryId,
  
      };
  
      PostRequest(endPoint.CUSTOMER_SERVICES, payload)
        .then(res => {
          // setLoading(false);
          if (res?.data?.code == 200) {
            console.log(res?.data);
            setServices(res?.data?.data);
          } else {
            SimpleSnackBar(res?.data?.message);
            // setLoading(false);
          }
        })
        .catch(res => {
          SimpleSnackBar(messages.Catch, appColors.Red);
          setLoading(false);
        });
    };
   

   
    return(
      
        <Screen viewStyle={{ flex: 1, padding: 15 , backgroundColor: appColors.Black}} statusBarColor={appColors.Black} >
        <View style={{ flex: 0.1, backgroundColor: appColors.Black }}>
          <Header
            headerSubView={{ marginHorizontal: 5}}
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Sub Services'}
           
          />
        </View>
        <View style={{flex: 0.8}}>
          <FlatList
            data={Services}
            renderItem={({item}) => (
              <Servicedetails
                item={item}
                selected={selectedItems === item.serviceCategoryId}
                onPress={() => setSelectedItems(item.serviceCategoryId)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.buttonView}>
=======
const ServiceList = ({ navigation, }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const dropDownData = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    // Add more options as needed
  ];

  const handleAddItem = () => {
    if (selectedValue && !selectedItems.includes(selectedValue)) {
      setSelectedItems([...selectedItems, selectedValue]);
      setSelectedValue(null); // Clear the selected value after adding
    }
  };
  const handleRemoveItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1); // Remove the item at the specified index
    setSelectedItems(newItems); // Update the state with the new array
  };

  return (
    <Screen viewStyle={{ flex: 1, padding: 15, backgroundColor: appColors.Black }} statusBarColor={appColors.Black} >
      <View style={{ flex: 0.1, backgroundColor: appColors.Black }}>
        <Header
          headerSubView={{ marginHorizontal: 5 }}
          lefttIcoType={Icons.Ionicons}
          onPressLeftIcon={() => navigation.goBack()}
          leftIcoName={'chevron-back'}
          headerText={'Our Services'}

        />
      </View>
      <View style={{ flex: 0.07, flexDirection: 'row', paddingHorizontal: 7 }}>
        <View style={{ flex: 0.85, justifyContent: 'center', }}>
          <Dropdown
            label="Add Barber Services"
            value={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            dropDownData={dropDownData}
            style={{ backgroundColor: appColors.Black, borderColor: appColors.AppLightGray, borderRadius: 25, paddingHorizontal: 10 }} // Example custom style
          />
        </View>
        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity onPress={handleAddItem}>
            <CustomIcon
              type={Icons.MaterialIcons}
              name={'add'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>


      </View>
      <View style={{ flex: 0.73, alignItems: 'center', marginTop: 10, }}>
        <FlatList data={selectedItems}
          renderItem={({ item, index }) => (

            <View style={styles.container}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, paddingHorizontal: 10 }}>
                <View style={{ flex: 0.9 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>{item}</Text>
                </View>
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                    <CustomIcon
                      type={Icons.Entypo}
                      name={'cross'}
                      size={30}
                      color={'red'}
                    />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
          keyExtractor={(item, index) => (item, index)}
        />

      </View>
      <View style={styles.buttonView}>
>>>>>>> 5760164d7a4498bd7794da1825e2e003f8b7db58
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
<<<<<<< HEAD
          btnTextColor={{color: 'white'}}
          title={'Add'}
          // onPress={handleditService}
=======
          btnTextColor={{ color: 'white' }}
          title={'Save'}
          onPress={() => navigation.goBack()}
>>>>>>> 5760164d7a4498bd7794da1825e2e003f8b7db58
        />
      </View>
     
      

    </Screen>

  )
}

const Servicedetails = ({item, selected, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          selected && {borderColor: appColors.Goldcolor, borderWidth: 1.25},
        ]}>
        <View style={styles.Subcontainer}>
          
            <View style={{paddingVertical: 8,flex:0.2}}>
             <Image source={item.serviceImage}/>
            </View>

            <View style={{flex:0.45,justifyContent:'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '400',
                  fontSize: 18,
                }}>
                {item.serviceName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex:0.2
              }}>
              {/* <Text style={{color:'white', textAlign:'center', paddingVertical:12, fontSize:12, fontWeight:'bold'}}>View</Text> */}
              <Text style={{color: '#c79647', fontSize: 19, fontWeight: '600',}}>
                ${item.servicePrice}
              </Text>
            </View>
          
           <TouchableOpacity  style={{flex: 0.15,justifyContent: 'center',alignItems:'center',}}>
            <Image source={AppImages.Editimage} style={styles.editImageStyle}/>
            
           </TouchableOpacity>
     
          
          </View>
          </View>
      

    </TouchableOpacity>
  );
};
export default ServiceList;