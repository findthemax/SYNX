import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { UserState } from "../interfaces";

const initialState: UserState = {
  user_loading: true,
  token: null,
  user_id: null,
  name: null,
  image_url: null,
  uri: null,
  admin: false,
  membership: null,
  alerts: []
};

const reducer = produce(
  (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
      case ActionType.AUTHENTICATE_USER:
        state.user_loading = true;
        state.token = null;
        state.user_id = null;
        state.name = null;
        state.image_url = null;
        state.uri = null;
        state.admin = false;
        state.membership = null;
        return state;
      case ActionType.AUTHENTICATE_USER_SUCCESS:
        state.user_loading = false;
        state.token = action.payload.access.access_token;
        state.user_id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.image_url = action.payload.user.spotify_image;
        state.uri = action.payload.user.spotify_uri;
        state.admin = action.payload.user.admin;
        state.membership = action.payload.user.membership;
        return state;
      case ActionType.ADD_REWARD_SUCCESS:
        state.token = action.payload.access.access_token;
        state.membership = action.payload.membership;
        return state;
      case ActionType.CREATE_ROOM_SUCCESS:
      case ActionType.LEAVE_ROOM_SUCCESS:
      case ActionType.JOIN_ROOM_SUCCESS:
      case ActionType.SYNX_SUCCESS:
      case ActionType.GET_USERS_SUCCESS:
      case ActionType.ADD_MEMBERSHIP_SUCCESS:
        state.token = action.payload.access.access_token;
        return state;
      case ActionType.AUTHENTICATE_USER_ERROR:
        state.user_loading = false;
        state.token = null;
        state.user_id = null;
        state.name = null;
        state.image_url = null;
        state.uri = null;
        state.admin = false;
        state.membership = null;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
