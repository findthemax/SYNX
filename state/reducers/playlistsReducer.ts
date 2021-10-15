import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { PlaylistsState } from "../interfaces";

const initialState: PlaylistsState = {
  loadingPlaylists: false,
  playlists: []
};

const reducer = produce(
  (state: PlaylistsState = initialState, action: Action): PlaylistsState => {
    // console.log(action);
    switch (action.type) {
      case ActionType.GET_USER_PLAYLISTS:
        state.loadingPlaylists = true;
        state.playlists = [];
        return state;
      case ActionType.GET_USER_PLAYLISTS_SUCCESS:
        state.loadingPlaylists = false;
        state.playlists = action.payload;
        return state;
      case ActionType.GET_USER_PLAYLISTS_ERROR:
        state.loadingPlaylists = true;
        state.playlists = [];
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
