import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
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
import {PostRequest} from '../../services/apiCall';
import {endPoint} from '../../AppConstants/urlConstants';
import {SimpleSnackBar} from '../../components/atom/Snakbar/Snakbar';
import Bookingbutton from '../../components/atom/BookingButtons/Bookingbutton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RatingScreen = ({route, navigation}) => {
  const {userDetails, userCompletedBooking} = route.params || 0;
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [feedback, setFeedback] = useState('');

  const starMark = [
    {id: 1, title: '5', Imagesource: AppImages.Star},
    {id: 2, title: '4', Imagesource: AppImages.Star},
    {id: 3, title: '3', Imagesource: AppImages.Star},
    {id: 4, title: '2', Imagesource: AppImages.Star},
    {id: 5, title: '1', Imagesource: AppImages.Star},
  ];

  const commentRating = [
    {id: 1, title: 'Beautiful'},
    {id: 2, title: 'Love it !!!'},
    {id: 3, title: 'Awesome'},
    {id: 4, title: 'Fast Delivery'},
  ];

  const StarData = ({item}) => {
    const isSelected = item.id === selectedStar;
    return (
      <TouchableOpacity
        onPress={() => setSelectedStar(item.id)}
        style={{justifyContent: 'center'}}>
        <View
          key={item.id}
          style={{
            marginHorizontal: 5,
            height: screenSize.height / 22,
            width: screenSize.width / 5,
            // justifyContent: 'center',
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

  const CommentRatingData = ({item}) => {
    const isSelected = item.id === selectedComment;
    return (
      <TouchableOpacity onPress={() => setSelectedComment(item.id)}>
        <View
          key={item.id}
          style={{
            marginHorizontal: 5,
            height: screenSize.height / 22,
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

  const SendRatingByUser = (ratingValue, comments, feedback) => {
    const payload = {
      operationID: 1,
      ratingID: 0,
      userID: userDetails?.userId,
      barberId: userCompletedBooking?.BarbarID,
      rateBy: userDetails?.userId,
      ratingValue: ratingValue,
      isActive: 0,
      feedback: feedback,
      comments: comments,
    };
    console.log('payload payload payload', payload);
    PostRequest(endPoint?.USER_RATING_FOR_BARBER, payload)
      .then(res => {
        console.log('res?.data', res?.data);
        if (res?.data?.Table?.[0]?.Haserror == 0) {
          console.log(
            'res?.data?.[0]?.Message',
            res?.data?.Table?.[0]?.Message,
          );
          SimpleSnackBar(res?.data?.Table?.[0]?.Message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.Message, appColors.Red);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const onPressSubmit = () => {
    const selectedStarItem = starMark.find(star => star.id === selectedStar);
    const selectedCommentItem = commentRating.find(
      comment => comment.id === selectedComment,
    );
    const selectedStarTitle = selectedStarItem ? selectedStarItem.title : null;
    const selectedCommentTitle = selectedCommentItem
      ? selectedCommentItem.title
      : null;
    SendRatingByUser(selectedStarTitle, selectedCommentTitle, feedback);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <Screen
        statusBarColor={appColors.Black}
        barStyle="light-content"
        viewStyle={{
          padding: 15,
          minHeight: screenSize.height,
        }}>
        <View style={{flex: 0.1}}>
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
        {/* <View style={{flex: 0.1}}>
          <View style={{color: appColors.White}}>
            <Text style={{fontSize: 15, color: appColors.White}}>
              Comment Rating
            </Text>
          </View>
        </View> */}
        <View style={{flex: 0.1}}>
          <TextInput
            style={{
              color: 'white',
              paddingHorizontal: 25,
              fontSize: 14,
              borderBottomWidth: 1,
              borderColor: appColors.White,
              paddingHorizontal: 5,
            }}
            placeholder="Comment Rating"
            placeholderTextColor={appColors.LightGray}
            maxLength={50}
            value={feedback}
            onChangeText={text => setFeedback(text)}
          />
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
            flex: 0.6,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Bookingbutton
            style={{
              backgroundColor: appColors.Goldcolor,
              flex: 0.1,
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%',

              opacity:
                !selectedStar == '' && !selectedComment == '' ? 0.9 : 0.3,
            }}
            disabled={selectedStar === null || selectedComment === null}
            title={'Submit'}
            onPress={onPressSubmit}
          />
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default RatingScreen;
