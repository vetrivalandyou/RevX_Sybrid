import { StyleSheet } from "react-native";
import { screenSize } from "../../../components/atom/ScreenSize";
export default StyleSheet.create({
    // bookngButonsView:
    // {
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     flex: 0.09,
    // },
    Containerstyle: {
            height: screenSize.height / 3.5,
            width: screenSize.width / 1.1,
            marginBottom: 10,
            backgroundColor: '#252525',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'black',
            marginHorizontal: 20,
          },
    

    ContainerInnerview:{
        flexDirection: 'row',
        flex: 0.25,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 5,
      },
    Dateview:
    {
        flex: 0.6,
    },
    DateTextstyle:
    {
        color: 'white',
        fontSize: 14
    },
    CancelbuttonView:
    {
        flex: 0.25,
    },
    ContainerSecondview:
    {
        flexDirection: 'row',
        flex: 0.72,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageView:
    {
        flex: 0.35,
        alignItems: 'center',
    },
    imageStyle: {
        height: '89%',
        width: '82%',
        borderRadius: 7,
        marginTop: 10,
      },
    Textview:
    {
        flexDirection: 'column',
        flex: 0.63,
    },
    nameStyle:
    {
        fontSize: 22,
        fontWeight: '600',
        color: 'white'
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#9E9E9E',
        marginVertical: 9,
      },
    labelStyle:
    {fontSize: 12, fontWeight: '400', color: '#c79647'},

    completedContaierstyle:
    {
        height: screenSize.height / 2.8,
            width: screenSize.width / 1.1,
            marginBottom: 10,
            backgroundColor: '#252525',
            borderWidth: 1,
            borderRadius: 20,
            marginHorizontal: 20,
    },
    ContainerInnerView: {
        
              flexDirection: 'row',
              flex: 0.2,
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 5,
    },

    CompletedDateview:
    {
        flex: 0.6, justifyContent: 'center'
    },
    completedDatestyle:
    {
        color: 'white', fontSize: 14
    },
    completedButtonview:
    {
            flex: 0.25,
            justifyContent: 'center',
    },
    EreciptView: {
        
            flex: 0.35,
            justifyContent: 'center',
          
    },
    EreciptInnerView: {
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    EreciptbuttonStyle:
     {
        borderColor: 'white',
        color: 'white',
        height: 27,
        flex: 0.9,
      },
    DashLineView:
    {
        height: 1,
        position: 'relative',
        marginHorizontal: 15
    },
    DashLinestyle:
    { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, borderWidth: 1, borderColor: appColors.Goldcolor, borderStyle: 'dashed', backgroundColor:'transparent'  },
    containerSecondview: {
        flexDirection: 'row',
        flex: 0.58,
        justifyContent: 'center',
        alignItems: 'center',
      },
    completedImageview:
    {
        flex: 0.35,
        alignItems: 'center'
    },
    completedImagestyle: {
        height: '80%',
        width: '82%',
        borderRadius: 7,
        marginTop: 5,
    },
    completedTextview:
    {
        flexDirection: 'column',
        flex: 0.63
    },
    Nametext:
    {
        fontSize: 22,
        fontWeight: '600', color: 'white'
    },
    Titletext: {
        fontSize: 14, 
        fontWeight: '400',
        color: 'white',
        marginVertical: 9,
    },
    Labeltext:
    {
        fontSize: 12, 
        fontWeight: '400',
        color: '#c79647'
    },
    ButtonsView: 
        {
            flex: 0.25,
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }
    ,


    bookingContainerstyle: 
       {
          height: screenSize.height / 2.8,
          width: screenSize.width / 1.1,
          marginBottom: 10,
          backgroundColor: '#252525',
          borderWidth: 1,
          borderRadius: 20,
          marginHorizontal: 20,
        },
    
    bookingInnercontainerView: 
        {
            flexDirection: 'row',
            flex: 0.2,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 5,
          },
    bookingDateview:
    {
        flex: 0.6
    },
    dateTextstyle:
    {
        color: 'white',
        fontSize: 14
    },
    EreciptButtonView:
    {
        flex: 0.6,
        alignItems: 'flex-end',
      },
      EreciptInnerView: {
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      EreciptButtonstyle:
     {
        borderColor: 'white',
        color: 'white',
        height: 27,
        flex: 0.8,
      },

      imagetextContainerView:{
        flexDirection: 'row',
        flex: 0.58,
        justifyContent: 'center',
        alignItems: 'center',
      },
    bookingImageview:
    {
        flex: 0.35,
        alignItems: 'center'
    },
    bookingImagestyle: {
        height: '80%',
        width: '82%',
        borderRadius: 7,
        marginTop: 5,
    },
    bookingTextview:
    {
        flexDirection: 'column',
        flex: 0.63
    },
    NoticationContainer: {
        height: screenSize.height / 18.5,
        width: screenSize.width / 9,
        borderRadius: 40,
        backgroundColor: '#252525',
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },

      barberDetailsContainer: {
        height: screenSize.height / 2.95,
        width: screenSize.width / 1.1,
        paddingVertical: 17,
        marginTop: 5,
        backgroundColor: '#252525',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginHorizontal: 17,
      },

      barberSevicesContainer:{
        height: screenSize.height / 4.1,
        width: screenSize.width / 1.1,
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#252525',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginHorizontal: 17,
      },
      Button: {
    alignItems: 'center',
    backgroundColor: '#c79647',
    paddingVertical: 15,
    marginHorizontal: 13,
    borderRadius: 40,
    position: 'absolute',
    bottom: 5,
    width: screenSize.width / 1.07,
  },
});



