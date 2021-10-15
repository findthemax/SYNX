import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { ErrorState } from "../interfaces";

const initialState: ErrorState = {
  errors: []
};

const reducer = produce(
  (state: ErrorState = initialState, action: Action): ErrorState => {
    switch (action.type) {
      case ActionType.CLEAR_ERROR:
        state.errors = [];
        return state;
      case ActionType.AUTHENTICATE_USER_ERROR:
      case ActionType.ADD_REWARD_ERROR:
      case ActionType.CREATE_ROOM_ERROR:
      case ActionType.JOIN_ROOM_ERROR:
        state.errors = action.payload.errors;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
