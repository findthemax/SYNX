import { combineReducers } from "redux";
import userReducer from "./userReducer";
import playlistsReducer from "./playlistsReducer";
import roomReducer from "./roomReducer";
import playbackReducer from "./playbackReducer";
import usersReducer from "./usersReducer";
import adminReducer from "./adminReducer";
import rewardReducer from "./rewardReducer";
import errorReducer from "./errorReducer";

const reducers = combineReducers({
  user: userReducer,
  playlists: playlistsReducer,
  room: roomReducer,
  playback: playbackReducer,
  users: usersReducer,
  admin: adminReducer,
  reward: rewardReducer,
  error: errorReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
