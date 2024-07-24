// In reducers/notificationReducer.js

import { INCREMENT_NOTIFICATION_COUNT, RESET_NOTIFICATION_COUNT } from "../ActionType/NotificationActionTypes";

const initialState = {
    Notification: []
};

const NotificationReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case INCREMENT_NOTIFICATION_COUNT:
            console.log("State", state.Notification)
            return {
                ...state,
                Notification: [...state.Notification, payload],
            };
        case RESET_NOTIFICATION_COUNT:
            return {
                ...state,
                Notification: []
            };
        default:
            return { ...state };
    }
};

export default NotificationReducer;
