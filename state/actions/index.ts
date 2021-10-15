import { ActionType } from "../action-types";
import {
  ErrorInterface,
  RoomInterface,
  SynxUsersInterface
} from "../interfaces";

interface AuthenticateUserAction {
  type: ActionType.AUTHENTICATE_USER;
}

interface AuthenticateUserSuccessAction {
  type: ActionType.AUTHENTICATE_USER_SUCCESS;
  payload: {
    user: {
      name: string;
      id: string;
      access_token: string;
      token_expiry: string;
      spotify_uri: string;
      spotify_image: string;
      room: RoomInterface | null;
      device: string;
      admin: boolean;
      membership: string;
    };
    access: {
      access_token: string;
    };
  };
}

interface AuthenticateUserErrorAction {
  type: ActionType.AUTHENTICATE_USER_ERROR;
  payload: {
    errors: [ErrorInterface];
  };
}

interface GetUserPlaylistAction {
  type: ActionType.GET_USER_PLAYLISTS;
}

interface GetUserPlaylistSuccessAction {
  type: ActionType.GET_USER_PLAYLISTS_SUCCESS;
  payload: object[];
}

interface GetUserPlaylistErrorAction {
  type: ActionType.GET_USER_PLAYLISTS_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface CreateRoomAction {
  type: ActionType.CREATE_ROOM;
}

interface CreateRoomSuccessAction {
  type: ActionType.CREATE_ROOM_SUCCESS;
  payload: {
    user: {
      room: RoomInterface;
    };
    access: {
      access_token: string;
    };
  };
}

interface CreateRoomErrorAction {
  type: ActionType.CREATE_ROOM_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface GetRoomErrorAction {
  type: ActionType.GET_ROOM_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface LeaveRoomSuccessAction {
  type: ActionType.LEAVE_ROOM_SUCCESS;
  payload: {
    access: {
      access_token: string;
    };
  };
}

interface LeaveRoomErrorAction {
  type: ActionType.LEAVE_ROOM_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface GetPlaybackSuccessAction {
  type: ActionType.GET_PLAYBACK_SUCCESS;
  payload: {
    device_type: string | null;
    device_name: string | null;
    is_playing: boolean;
    track: string | null;
  };
}

interface GetPlaybackErrorAction {
  type: ActionType.GET_PLAYBACK_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}
interface PlayAction {
  type: ActionType.PLAY;
}

interface PlaySuccessAction {
  type: ActionType.PLAY_SUCCESS;
  payload: {
    room: RoomInterface;
    access: {
      access_token: string;
    };
  };
}

interface PlayErrorAction {
  type: ActionType.PLAY_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface JoinRoomAction {
  type: ActionType.JOIN_ROOM;
}

interface JoinRoomSuccessAction {
  type: ActionType.JOIN_ROOM_SUCCESS;
  payload: {
    user: {
      name: string;
      id: string;
      access_token: string;
      token_expiry: string;
      spotify_uri: string;
      spotify_image: string;
      room: RoomInterface | null;
      device: string;
      admin: boolean;
    };
    access: {
      access_token: string;
    };
  };
}

interface JoinRoomErrorAction {
  type: ActionType.JOIN_ROOM_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface SynxAction {
  type: ActionType.SYNX;
}

interface SynxSuccessAction {
  type: ActionType.SYNX_SUCCESS;
  payload: {
    room: RoomInterface;
    access: {
      access_token: string;
    };
  };
}

interface SynxErrorAction {
  type: ActionType.SYNX_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface GetUsersAction {
  type: ActionType.GET_USERS;
}

interface GetUsersSuccessAction {
  type: ActionType.GET_USERS_SUCCESS;
  payload: {
    users: SynxUsersInterface[];
    access: {
      access_token: string;
    };
  };
}

interface GetUsersErrorAction {
  type: ActionType.GET_USERS_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}

interface AddMembershipAction {
  type: ActionType.ADD_MEMBERSHIP;
}

interface AddMembershipSuccessAction {
  type: ActionType.ADD_MEMBERSHIP_SUCCESS;
  payload: {
    users: SynxUsersInterface[];
    access: {
      access_token: string;
    };
  };
}

interface AddMembershipErrorAction {
  type: ActionType.ADD_MEMBERSHIP_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface AddRewardAction {
  type: ActionType.ADD_REWARD;
}

interface AddRewardSuccessAction {
  type: ActionType.ADD_REWARD_SUCCESS;
  payload: {
    membership: string;
    access: {
      access_token: string;
    };
  };
}

interface AddRewardErrorAction {
  type: ActionType.ADD_REWARD_ERROR;
  payload: {
    errors: ErrorInterface[];
  };
}

interface ClearErrorAction {
  type: ActionType.CLEAR_ERROR;
}

export type Action =
  | AuthenticateUserAction
  | AuthenticateUserSuccessAction
  | AuthenticateUserErrorAction
  | GetUserPlaylistAction
  | GetUserPlaylistSuccessAction
  | GetUserPlaylistErrorAction
  | CreateRoomAction
  | CreateRoomSuccessAction
  | CreateRoomErrorAction
  | GetRoomErrorAction
  | LeaveRoomSuccessAction
  | LeaveRoomErrorAction
  | GetPlaybackSuccessAction
  | GetPlaybackErrorAction
  | PlayAction
  | PlaySuccessAction
  | PlayErrorAction
  | JoinRoomAction
  | JoinRoomSuccessAction
  | JoinRoomErrorAction
  | SynxAction
  | SynxSuccessAction
  | SynxErrorAction
  | GetUsersAction
  | GetUsersSuccessAction
  | GetUsersErrorAction
  | LogoutAction
  | AddMembershipAction
  | AddMembershipSuccessAction
  | AddMembershipErrorAction
  | AddRewardAction
  | AddRewardSuccessAction
  | AddRewardErrorAction
  | ClearErrorAction;
