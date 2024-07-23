import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Search from '../../components/atom/Search/Search';
import Header from '../../components/molecules/Header';
import {Icons} from '../../components/molecules/CustomIcon/CustomIcon';
import Screen from '../../components/atom/ScreenContainer/Screen';
import appColors from '../../AppConstants/appColors';
import constants from '../../AppConstants/Constants.json';
import {AppImages} from '../../AppConstants/AppImages';
import {useNavigation} from '@react-navigation/native';
import {screenSize} from '../../components/atom/ScreenSize';
import ButtonComponent from '../../components/atom/CustomButtons/ButtonComponent';

const RatingScreen = () => {
  const navigation = useNavigation();
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const starMark = [
    {id: 1, title: 'All', Imagesource: AppImages.Star},
    {id: 2, title: '5', Imagesource: AppImages.Star},
    {id: 3, title: '4', Imagesource: AppImages.Star},
    {id: 4, title: '3', Imagesource: AppImages.Star},
    {id: 5, title: '2', Imagesource: AppImages.Star},
    {id: 6, title: '1', Imagesource: AppImages.Star},
  ];

  const StarData = ({item}) => {
    const isSelected = item.id === selectedStar;
    return (
      <TouchableOpacity onPress={() => setSelectedStar(item.id)}>
        <View
          key={item.id}
          style={{
            marginHorizontal: 3,
            height: screenSize.height / 18,
            width: screenSize.width / 5,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: isSelected
                ? appColors.Goldcolor
                : appColors.darkgrey,
              borderRadius: 100,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 16, height: 16, marginHorizontal: 8}}
                source={item.Imagesource}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: appColors.White,
                }}>
                {item.title}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const commentRating = [
    {id: 1, title: 'Beautiful'},
    {id: 2, title: 'Love it !!!'},
    {id: 3, title: '😍😍😍'},
    {id: 4, title: 'Fast Delivery'},
  ];

  const CommentRatingData = ({item}) => {
    const isSelected = item.id === selectedComment;
    return (
      <TouchableOpacity onPress={() => setSelectedComment(item.id)}>
        <View
          key={item.id}
          style={{
            marginHorizontal: 3,
            height: screenSize.height / 16,
            width: screenSize.width / 4,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: isSelected
                ? appColors.Goldcolor
                : appColors.Black,
              borderRadius: 100,
              borderColor: appColors.White,
              borderWidth: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: appColors.White,
                }}>
                {item.title}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen
      statusBarColor={appColors.Black}
      barStyle="light-content"
      viewStyle={{
        flex: 0.9,
        padding: 15,
        minHeight: screenSize.height,
        maxHeight: 'auto',
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 55}>
        <View style={{flex: 0.08}}>
          <Header
            headerSubView={{marginHorizontal: 5}}
            lefttIcoType={Icons.Ionicons}
            onPressLeftIcon={() => navigation.goBack()}
            leftIcoName={'chevron-back'}
            headerText={'Rating'}
            rightIcoName={'bell'}
            rightIcoType={Icons.SimpleLineIcons}
            onPressRightIcon={() =>
              navigation.navigate(constants.screen.Notification)
            }
            logIn={'success'}
            rightIcoSize={20}
            leftIcoStyle={{
              backgroundColor: appColors.lightBlack,
              borderRadius: 50,
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
        <View style={{flex: 0.1}}>
          <FlatList
            data={starMark}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <StarData item={item} />}
          />
        </View>
        <View style={{flex: 0.04}}>
          <View style={{color: appColors.White}}>
            <Text style={{fontSize: 17, color: appColors.White}}>
              Comment Rating
            </Text>
          </View>
        </View>
        <View style={{flex: 0.04}}>
          <View
            style={{
              color: appColors.White,
              borderBottomWidth: 1,
              borderBlockColor: appColors.White,
            }}></View>
        </View>
        <View style={{flex: 0.1}}>
          <FlatList
            data={commentRating}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <CommentRatingData item={item} />}
          />
        </View>
        <View
          style={{
            flex: 0.62,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <ButtonComponent
            style={{
              backgroundColor: appColors.Goldcolor,
            }}
            title={'Submit'}
            // onPress={onPressSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default RatingScreen;
