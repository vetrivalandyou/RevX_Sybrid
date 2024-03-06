
import React  from "react";
import { useState } from "react";

import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Screen from "../../../components/atom/ScreenContainer/Screen";
import Header from "../../../components/molecules/Header";
import CustomIcon, { Icons } from "../../../components/molecules/CustomIcon/CustomIcon";

import styles from "./styles";
import ButtonComponent from "../../../components/atom/CustomButtons/ButtonComponent";
import Dropdown from "../../../components/molecules/Dropdown";
import appColors from "../../../AppConstants/appColors";




const ServiceList =({navigation,})=>{
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
        if(selectedValue && !selectedItems.includes(selectedValue)) {
            setSelectedItems([...selectedItems, selectedValue]);
            setSelectedValue(null); // Clear the selected value after adding
        }
    };
    const handleRemoveItem = (index) => {
        const newItems = [...selectedItems];
        newItems.splice(index, 1); // Remove the item at the specified index
        setSelectedItems(newItems); // Update the state with the new array
    };

    return(
        <Screen viewStyle={{ flex: 1, padding: 15 , backgroundColor: appColors.Black}} statusBarColor={appColors.Black} >
        <View style={{ flex: 0.1, backgroundColor: appColors.Black }}>
          <Header
            headerSubView={{ marginHorizontal: 5}}
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Our Services'}
           
          />
        </View>
       <View style={{ flex:0.07,flexDirection:'row',paddingHorizontal:7}}>
        <View style={{flex:0.85,justifyContent:'center',}}>
<Dropdown
                    label="Add Barber Services"
                    value={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    dropDownData={dropDownData}
                    style={{backgroundColor:appColors.Black, borderColor: appColors.AppLightGray, borderRadius: 25, paddingHorizontal: 10 }} // Example custom style
                  />
</View>
<View style={{flex:0.15, justifyContent:'center',alignItems:'center',}}>
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
<View style={{ flex: 0.73, alignItems:'center',marginTop:10,}}>
   <FlatList data={selectedItems}
   renderItem={({item, index}) =>(

                    <View  style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',flex:1 ,paddingHorizontal:10}}>
                            <View style={{flex:0.9}}>
                            <Text style={{ color: 'white',fontSize:16 }}>{item}</Text>
                            </View>
                            <View style={{flex:0.1,justifyContent:'center',alignItems:'flex-end'}}>
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
    keyExtractor={(item, index) => (item,index)}
    />
         
            </View>
            <View style={styles.buttonView}>
        <ButtonComponent
          style={{
            backgroundColor: '#C79646',
            paddingVertical: Platform.OS == 'ios' ? 17 : 13,
            bottom: 1,
            position: 'absolute',
          }}
          btnTextColor={{color: 'white'}}
          title={'Save'}
          onPress={() => navigation.goBack()}
        />
      </View>

        </Screen>
      
    )
}
export default ServiceList;