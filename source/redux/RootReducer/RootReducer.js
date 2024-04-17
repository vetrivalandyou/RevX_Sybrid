import {combineReducers} from 'redux';
import AuthReducer from '../Reducers/AuthReducer';
import LocationReducer from '../Reducers/LocationReducer';

export default combineReducers({
  AuthReducer,
  LocationReducer,
});
