import {UPDATE_LOCATION} from './UpdateLocationActionType';

const UpdateLocation = coords => {
  console.log("UpdateLocation_Coords",coords)
  return {
    type: UPDATE_LOCATION,
    payload: {
      coords: coords,
    },
  };
};

export {UpdateLocation};
