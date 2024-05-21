import { v4 as uuidv4 } from "uuid";

export const ADD_TIME = 'ADD_TIME';
export const UPDATE_COR = 'UPDATE_COR';
export const INITIALIZE_TIMES = 'INITIALIZE_TIMES';
export const DELETE_TIME = "DELETE_TIME";

const timesReducer = (state, action) => {
  switch (action.type) {

    case INITIALIZE_TIMES:
      return action.payload;

    case ADD_TIME:
      return [...state, { ...action.payload, id: uuidv4() }];

    case UPDATE_COR:
      return state.map(time => 
        time.id === action.payload.id
          ? { ...time, cor: action.payload.cor }
          : time
      );
    case DELETE_TIME: 
      return state.filter((time) => time.id !== action.payload);

    default:
      return state;
  }
};

export default timesReducer;