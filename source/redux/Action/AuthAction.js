import {LOG_IN, LOG_OUT} from './actionTypes';

const LogIn = (loggedIn, token, expiry) => {
  return {
    type: LOG_IN,
    payload: {
      loggedIn: loggedIn,
      token: token,
      expiry: expiry,
    },
  };
};

const LogOut = () => {
  return {
    type: LOG_OUT,
  };
};

export {LogIn, LogOut};
