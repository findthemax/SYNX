import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { RewardState } from "../interfaces";

const initialState: RewardState = {
  reward_loading: false
};

const reducer = produce(
  (state: RewardState = initialState, action: Action): RewardState => {
    switch (action.type) {
      case ActionType.ADD_REWARD:
        state.reward_loading = true;
        return state;
      case ActionType.ADD_REWARD_SUCCESS:
        state.reward_loading = false;
        return state;
      case ActionType.ADD_REWARD_ERROR:
        state.reward_loading = false;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
