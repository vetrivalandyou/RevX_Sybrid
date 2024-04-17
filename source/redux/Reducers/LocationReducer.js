import {UPDATE_LOCATION} from '../Action/LocationAction/UpdateLocationActionType';

const initialState = {
  coords: {}
};

const LocationReducer = (state = initialState, action) => {
  let {type, payload} = action;
  switch (type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        coords: payload.coords,
      };
    default:
      return state;
  }
};

export default LocationReducer;
