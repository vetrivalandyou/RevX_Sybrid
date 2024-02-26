import { LOG_IN, LOG_OUT } from "../Action/actionTypes";

initialState = {
    loggedIn: 0,
    token: null,
    expiry: null,
};

const AuthReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOG_IN:
            return { ...state, loggedIn: action.payload.loggedIn, token: action.payload.token, expiry: action.payload.expiry};

        case LOG_OUT:
            return { ...state, loggedIn: 0, token: null, expiry: null };

        default:
            return state;
    }
}

export default AuthReducer;