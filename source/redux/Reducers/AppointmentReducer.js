import {PULL_CHILDSERVICE_DATA, PUSH_CHILDSERVICE_DATA} from '../Action/AppointmentActionType';

const initialState = {
  SelectedChildServices: [],
};

const AppointmentReducer = (state = initialState, action) => {
  let {type, payload} = action;
  switch (type) {
    case PUSH_CHILDSERVICE_DATA:
      return {
        ...state,
        SelectedChildServices: [...state.SelectedChildServices, payload], // Pushing new data into dataArray
      };
    case PULL_CHILDSERVICE_DATA:
      return {
        ...state,
        SelectedChildServices: state.SelectedChildServices.filter(
          item => item.ChildServiceID !== payload,
        ), // Remove data from dataArray
      };
    default:
      return {...state};
  }
};

export default AppointmentReducer;
