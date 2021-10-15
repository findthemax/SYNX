import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { AdminState } from "../interfaces";

const initialState: AdminState = {
  loading: false,
  admin_errors: []
};

const reducer = produce(
  (state: AdminState = initialState, action: Action): AdminState => {
    switch (action.type) {
      case ActionType.ADD_MEMBERSHIP:
        state.loading = true;
        state.admin_errors = [];
        return state;
      case ActionType.ADD_MEMBERSHIP_SUCCESS:
        state.loading = false;
        state.admin_errors = [];
        return state;
      case ActionType.ADD_MEMBERSHIP_ERROR:
        state.loading = false;
        state.admin_errors = action.payload.errors;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
