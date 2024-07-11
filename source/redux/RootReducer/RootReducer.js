import {combineReducers} from 'redux';
import AuthReducer from '../Reducers/AuthReducer';
import LocationReducer from '../Reducers/LocationReducer';
import AppointmentReducer from '../Reducers/AppointmentReducer';
import CrudFormReducer from '../Reducers/CrudFormReducer';

export default combineReducers({
  AuthReducer,
  LocationReducer,
  AppointmentReducer,
  CrudFormReducer
});
