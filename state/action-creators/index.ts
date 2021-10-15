import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import SYNXApi from "../../Constants/SYNXApi";
import { Url } from "../../Constants/Spotify";
import { CreateRoomInterface } from "../interfaces";

let config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const authConfigGenerator = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

const getTokenFromCode = (code: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.AUTHENTICATE_USER
    });

    try {
      const body = JSON.stringify({
        code
      });

      const res = await axios.post(`${SYNXApi.URL}/auth`, body, config);

      console.log("return data - actions:: ", res.data);
      dispatch({
        type: ActionType.AUTHENTICATE_USER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      //when testing change the "native" in login/index and change SYNXApi round
      // console.log("Error getTokenFromCode: ", err.response.data);
      dispatch({
        type: ActionType.AUTHENTICATE_USER_ERROR,
        payload: err.response.data
      });
    }
  };
};

const logout = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT
    });
  };
};

const getUserPlaylists = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_USER_PLAYLISTS
    });

    const authConfig = authConfigGenerator(token);

    try {
      let data: object[] = [];

      let url = `${Url.PLAYLISTS}?offset=0&limit=50`;

      while (url !== null) {
        const res = await axios.get(url, {
          headers: authConfig
        });
        url = res.data.next;
        data = data.concat(res.data.items);
      }

      dispatch({
        type: ActionType.GET_USER_PLAYLISTS_SUCCESS,
        payload: data
      });
    } catch (err) {
      console.log("Error getUserPlaylists: ", err);
      console.log("Error getUserPlaylists: ", err.response.data);
      dispatch({
        type: ActionType.GET_USER_PLAYLISTS_ERROR,
        payload: err.response.data
      });
    }
  };
};

const createRoom = (token: string, data: CreateRoomInterface) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_ROOM
    });

    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.post(`${SYNXApi.URL}/room`, data, {
        headers: authConfig
      });

      dispatch({
        type: ActionType.CREATE_ROOM_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error createRoom: ", err.response.data);
      dispatch({
        type: ActionType.CREATE_ROOM_ERROR,
        payload: err.response.data
      });
    }
  };
};

const getRoom = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.get(`${SYNXApi.URL}/room`, {
        headers: authConfig
      });

      dispatch({
        type: ActionType.AUTHENTICATE_USER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error getRoom: ", err);
      dispatch({
        type: ActionType.GET_ROOM_ERROR,
        payload: err.response.data
      });
    }
  };
};

const leaveRoom = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.delete(`${SYNXApi.URL}/room`, {
        headers: authConfig
      });

      dispatch({
        type: ActionType.LEAVE_ROOM_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error leaveRoom: ", err);
      dispatch({
        type: ActionType.LEAVE_ROOM_ERROR,
        payload: err
      });
    }
  };
};

const getPlayback = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.get(`${Url.PLAYBACK}`, {
        headers: authConfig
      });

      dispatch({
        type: ActionType.GET_PLAYBACK_SUCCESS,
        payload: res.data
          ? {
              device_type: res.data.device.type,
              device_name: res.data.device.name,
              is_playing: res.data.is_playing,
              track: res.data.item.uri
            }
          : {
              device_type: null,
              device_name: null,
              is_playing: false,
              track: null
            }
      });
    } catch (err) {
      console.log("Error getPlayback: ", err);
      dispatch({
        type: ActionType.GET_PLAYBACK_ERROR,
        payload: err
      });
    }
  };
};

const play = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PLAY
    });

    try {
      let res;

      const authConfig = authConfigGenerator(token);

      res = await axios.post(
        `${SYNXApi.URL}/player/play`,
        {},
        {
          headers: authConfig
        }
      );

      const spotRes = await axios.get(`${Url.PLAYBACK}`, {
        headers: authConfig
      });

      if (spotRes.data.context === null && spotRes.data.is_playing === true) {
        dispatch({
          type: ActionType.PLAY_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      console.log("Error play: ", err);
      dispatch({
        type: ActionType.PLAY_ERROR,
        payload: err
      });
    }
  };
};

const joinRoom = (token: string, room_id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.JOIN_ROOM
    });
    const authConfig = authConfigGenerator(token);

    const data = {
      room_id
    };

    try {
      const res = await axios.post(`${SYNXApi.URL}/room/join`, data, {
        headers: authConfig
      });

      dispatch({
        type: ActionType.JOIN_ROOM_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error JoinRoom: ", err);
      dispatch({
        type: ActionType.JOIN_ROOM_ERROR,
        payload: err.response.data
      });
    }
  };
};

const synx = (token: string, level: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SYNX
    });
    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.post(
        `${SYNXApi.URL}/player/synx`,
        { level },
        {
          headers: authConfig
        }
      );

      dispatch({
        type: ActionType.SYNX_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error Synx Error: ", err);
      dispatch({
        type: ActionType.SYNX_ERROR,
        payload: err
      });
    }
  };
};

const getUsers = (token: string, name?: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_USERS
    });
    const authConfig = authConfigGenerator(token);
    const params = {};
    if (name) {
      params.name = name;
    }
    try {
      const res = await axios.get(`${SYNXApi.URL}/admin/accounts`, {
        headers: authConfig,
        params
      });

      // console.log("return users: ", res.data);

      dispatch({
        type: ActionType.GET_USERS_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error GetUsers: ", err);
      dispatch({
        type: ActionType.GET_USERS_ERROR,
        payload: err
      });
    }
  };
};

const addMembershipAdmin = (
  token: string,
  user_id: string,
  expiry_date: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_MEMBERSHIP
    });
    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.post(
        `${SYNXApi.URL}/admin/membership`,
        { user_id, expiry_date },
        {
          headers: authConfig
        }
      );

      dispatch({
        type: ActionType.ADD_MEMBERSHIP_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error addMembershipAdmin: ", err);
      dispatch({
        type: ActionType.ADD_MEMBERSHIP_ERROR,
        payload: err
      });
    }
  };
};

const addReward = (token: string, reward_level: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_REWARD
    });
    const authConfig = authConfigGenerator(token);

    try {
      const res = await axios.post(
        `${SYNXApi.URL}/admob/reward`,
        { reward_level },
        {
          headers: authConfig
        }
      );

      dispatch({
        type: ActionType.ADD_REWARD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log("Error addReward: ", err);
      dispatch({
        type: ActionType.ADD_REWARD_ERROR,
        payload: err.response.data
      });
    }
  };
};

const clearError = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLEAR_ERROR
    });
  };
};

export const actionCreators = {
  getTokenFromCode,
  getUserPlaylists,
  createRoom,
  leaveRoom,
  getPlayback,
  play,
  getRoom,
  joinRoom,
  synx,
  getUsers,
  logout,
  addMembershipAdmin,
  addReward,
  clearError
};
