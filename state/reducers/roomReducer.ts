import produce from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { RoomState } from "../interfaces";

const initialState: RoomState = {
  loadingRoom: false,
  loadingSynx: false,
  synx_id: null,
  playlist_name: null,
  playlist_uri: null,
  guests: [],
  host: null,
  host_name: null,
  host_uri: null,
  host_image_url: null,
  album_cover_url: null,
  tracks: [],
  host_playing: false,
  first_play: false
};

const reducer = produce(
  (state: RoomState = initialState, action: Action): RoomState => {
    switch (action.type) {
      case ActionType.CREATE_ROOM:
        state.loadingRoom = true;
        state.synx_id = null;
        state.playlist_name = null;
        state.playlist_uri = null;
        state.guests = [];
        state.host = null;
        state.host_name = null;
        state.host_uri = null;
        state.host_image_url = null;
        state.album_cover_url = null;
        state.tracks = [];
        state.host_playing = false;
        state.first_play = false;
        return state;
      case ActionType.CREATE_ROOM_ERROR:
        state.loadingRoom = false;
        state.synx_id = null;
        state.playlist_name = null;
        state.playlist_uri = null;
        state.guests = [];
        state.host = null;
        state.host_name = null;
        state.host_uri = null;
        state.host_image_url = null;
        state.album_cover_url = null;
        state.tracks = [];
        state.host_playing = false;
        state.first_play = false;
        return state;
      case ActionType.JOIN_ROOM_SUCCESS:
      case ActionType.CREATE_ROOM_SUCCESS:
      case ActionType.AUTHENTICATE_USER_SUCCESS:
        state.synx_id = action.payload.user.room
          ? action.payload.user.room.id
          : null;
        state.playlist_name = action.payload.user.room
          ? action.payload.user.room.playlist_name
          : null;
        state.playlist_uri = action.payload.user.room
          ? action.payload.user.room.playlist_uri
          : null;
        state.guests = action.payload.user.room
          ? action.payload.user.room.guests
          : [];
        state.host = action.payload.user.room
          ? action.payload.user.room.host
          : null;
        state.host_name = action.payload.user.room
          ? action.payload.user.room.host_name
          : null;
        state.host_uri = action.payload.user.room
          ? action.payload.user.room.host_uri
          : null;
        state.host_image_url = action.payload.user.room
          ? action.payload.user.room.host_image_url
          : null;
        state.album_cover_url = action.payload.user.room
          ? action.payload.user.room.album_cover_url
          : null;
        state.tracks = action.payload.user.room
          ? action.payload.user.room.tracks
          : [];
        state.host_playing = action.payload.user.room
          ? action.payload.user.room.host_playing
          : false;
        state.first_play = false;
        return state;
      case ActionType.LEAVE_ROOM_SUCCESS:
        state.loadingRoom = false;
        state.synx_id = null;
        state.playlist_name = null;
        state.playlist_uri = null;
        state.guests = [];
        state.host = null;
        state.host_name = null;
        state.host_uri = null;
        state.host_image_url = null;
        state.album_cover_url = null;
        state.tracks = [];
        state.host_playing = false;
        state.first_play = false;
        return state;
      case ActionType.LEAVE_ROOM_ERROR:
        state.loadingRoom = false;
        return state;
      case ActionType.SYNX:
      case ActionType.PLAY:
        state.loadingSynx = true;
        return state;
      case ActionType.SYNX_SUCCESS:
      case ActionType.PLAY_SUCCESS:
        state.loadingSynx = false;
        state.synx_id = action.payload.room.id;
        state.playlist_name = action.payload.room.playlist_name;
        state.playlist_uri = action.payload.room.playlist_uri;
        state.guests = action.payload.room.guests;
        state.host = action.payload.room.host;
        state.host_name = action.payload.room.host_name;
        state.host_uri = action.payload.room.host_uri;
        state.host_image_url = action.payload.room.host_image_url;
        state.album_cover_url = action.payload.room.album_cover_url;
        state.tracks = action.payload.room.tracks;
        state.host_playing = action.payload.room.host_playing;
        state.first_play = true;
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
