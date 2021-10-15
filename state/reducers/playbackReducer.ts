import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { PlaybackState } from "../interfaces";

const initialState: PlaybackState = {
  device_type: null,
  device_name: null,
  is_playing: false,
  track: null
};

const reducer = produce(
  (state: PlaybackState = initialState, action: Action): PlaybackState => {
    switch (action.type) {
      case ActionType.GET_PLAYBACK_SUCCESS:
        state.device_type = action.payload.device_type;
        state.device_name = action.payload.device_name;
        state.is_playing = action.payload.is_playing;
        state.track = action.payload.track;
        return state;
      case ActionType.GET_PLAYBACK_ERROR:
        state.device_type = null;
        state.device_name = null;
        state.is_playing = false;
        state.track = null;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
