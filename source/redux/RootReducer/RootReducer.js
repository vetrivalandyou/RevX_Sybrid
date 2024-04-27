import {combineReducers} from 'redux';
import AuthReducer from '../Reducers/AuthReducer';
import LocationReducer from '../Reducers/LocationReducer';
import AppointmentReducer from '../Reducers/AppointmentReducer';

export default combineReducers({
  AuthReducer,
  LocationReducer,
  AppointmentReducer,
});
