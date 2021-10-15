import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { UsersState } from "../interfaces";

const initialState: UsersState = {
  loading: false,
  users_errors: [],
  users: []
};

const reducer = produce(
  (state: UsersState = initialState, action: Action): UsersState => {
    switch (action.type) {
      case ActionType.GET_USERS:
        state.loading = true;
        state.users_errors = [];
        state.users = [];
        return state;
      case ActionType.GET_USERS_SUCCESS:
        state.loading = false;
        state.users_errors = [];
        state.users = action.payload.users;
        return state;
      case ActionType.GET_USERS_ERROR:
        state.loading = false;
        state.users_errors = action.payload.errors;
        state.users = [];
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
