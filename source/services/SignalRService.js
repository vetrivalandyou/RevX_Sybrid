import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { generateRandomNumber } from '../functions/AppFunctions';
import { INCREMENT_NOTIFICATION_COUNT } from '../redux/ActionType/NotificationActionTypes';

class SignalRService {
  constructor(props) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`http://124.29.235.8:8789/chat`) // Replace with your SignalR hub URL
      .configureLogging(LogLevel.Information)
      .build();

    this.dispatch = props ? props.dispatch : null;
  }

  startConnection = async (RoleID, UserID, dispatch) => {
    try {
      console.log('Inside');
      await this.connection.start();
      console.log('SignalR connected');
      let MeetingID = generateRandomNumber().toString();
      console.log('ABCDEFG', RoleID, UserID, MeetingID);
      await this.connection.invoke('JoinRoom', {
        RoleID,
        UserID,
        MeetingID,
      });
      await this.connection.on('GetNotification', (json) => {
        console.log("json inside", json)
        if (dispatch) {
          console.log("inside dispatch")
          let data = JSON.parse(json)
          console.log("data", data?.[0])
          dispatch({ type: INCREMENT_NOTIFICATION_COUNT, payload: data?.[0] });
        } else {
          console.error('Dispatch function is not available.');
        }
      });
    } catch (error) {
      console.error('Error while starting SignalR connection:', error);
    }
  };

  onGetChatList_BB = callback => {
    this.connection.on('GetChatList_BB', callback);
  };

  onGetChatList_CC = callback => {
    this.connection.on('GetChatList_CC', callback);
  };

  onBB_ReceiveJsonData = callback => {
    this.connection.on('BB_ReceiveJsonData', callback);
  };

  onCC_ReceiveJsonData = callback => {
    this.connection.on('CC_ReceiveJsonData', callback);
  };

  joinChat = async (OperationID, BarberID, CustomerID, MeetingID) => {
    try {
      console.log(
        'BarberID, CustomerID',
        OperationID,
        BarberID,
        CustomerID,
        MeetingID,
      );
      await this.connection.invoke(
        'JoinChat',
        OperationID,
        BarberID,
        CustomerID,
        MeetingID,
      );
    } catch (error) {
      console.error('Error while JoinChat:', error);
    }
  };

  onGetmeetingid = callback => {
    this.connection.on('GetMeetingID', callback);
  };

  onReceiveMessage = callback => {
    this.connection.on('ReceiveMessage', callback);
  };

  onGetNotification = callback => {
    this.connection.on('GetNotification', callback);
  };

  sendNotification = async (NotificationID) => {
    try {
      console.log("NotificationID", NotificationID)
      await this.connection.invoke('SendNotification', NotificationID);
    } catch (error) {
      console.error('Error while Sending Comments:', error);
    }
  };

  sendMessage = async (message, R_ID, S_ID, MeetingID, UserID) => {
    try {
      await this.connection.invoke('SendMessage', message, R_ID, S_ID, MeetingID, UserID);
    } catch (error) {
      console.error('Error while Sending Comments:', error);
    }
  };

  onRemoveUserFromGroup = async (R_ID, S_ID) => {
    try {
      await this.connection.invoke('RemoveUserFromGroup', R_ID, S_ID);
    } catch (error) {
      console.error('Error while Sending Comments:', error);
    }
  };

  isConnected = () => {
    return this.connection.state === 'Connected';
  };
}

export default new SignalRService();
