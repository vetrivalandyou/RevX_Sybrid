import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {generateRandomNumber} from '../functions/AppFunctions';

class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`http://124.29.235.8:8789/chat`) // Replace with your SignalR hub URL
      .configureLogging(LogLevel.Information)
      .build();
  }

  startConnection = async (RoleID, UserID) => {
    try {
      console.log('Inside');
      await this.connection.start();
      console.log('SignalR connected');
      let MeetingID = generateRandomNumber().toString();
      console.log('ABCDEFG', RoleID, UserID, MeetingID);
      await this.connection.invoke('JoinRoom', {
        // BarberID,
        // CustomerID,
        RoleID,
        UserID,
        MeetingID,
      });
      // if (RoleID == 4) {
      //   await this.connection.invoke('GetChatListForCustomer', {
      //     BarberID,
      //     CustomerID,
      //     RoleID,
      //     UserID,
      //   });
      // } else {
      //   await this.connection.invoke('GetChatListForBarber', {
      //     BarberID,
      //     CustomerID,
      //     RoleID,
      //     UserID,
      //   });
      // }
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

  sendMessage = async (message, R_ID, S_ID, MeetingID) => {
    try {
      await this.connection.invoke('SendMessage', message, R_ID, S_ID, MeetingID);
    } catch (error) {
      console.error('Error while Sending Comments:', error);
    }
  };

  isConnected = () => {
    return this.connection.state === 'Connected';
  };
}

export default new SignalRService();
