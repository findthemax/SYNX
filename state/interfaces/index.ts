export type errorType = "input" | "server" | "app";

export interface ErrorInterface {
  msg: string;
  location?: string;
  param?: string;
  accepted: boolean;
}

export interface ErrorState {
  errors: Array<ErrorInterface> | [];
}

export interface UserState {
  user_loading: boolean;
  token: string | null;
  alerts: string[];
  user_id: string | null;
  name: string | null;
  image_url: string | null;
  uri: string | null;
  admin: boolean | false;
  membership: string | null;
}

export interface PlaybackState {
  device_type: string | null;
  device_name: string | null;
  is_playing: boolean;
  track: string | null;
}

export interface RoomState {
  loadingRoom: boolean;
  loadingSynx: boolean;
  synx_id: string | null;
  playlist_uri: string | null;
  playlist_name: string | null;
  guests: string[];
  host: string | null;
  host_name: string | null;
  host_uri: string | null;
  host_image_url: string | null;
  album_cover_url: string | null;
  tracks: string[];
  host_playing: boolean;
  first_play: boolean;
}
export interface RoomInterface {
  id: string;
  playlist_name: string;
  playlist_uri: string;
  guests: string[];
  host: string;
  host_name: string;
  host_uri: string;
  album_cover_url: string;
  host_image_url: string;
  tracks: string[];
  host_playing: boolean;
}

export interface TrackInterface {
  image: string;
  name: string;
  artists: string[];
  duration: number;
  uri: string;
}

export interface CreateRoomInterface {
  playlist_uri: string;
  shuffle: boolean;
}

export interface ImageInterface {
  height: null;
  url: string;
  width: null;
}

export interface PlayListTracksInterface {
  href: string;
  total: number;
}

export interface PlaylistsState {
  loadingPlaylists: boolean;
  playlists: PlaylistInterface[] | object[];
}

export interface PlaylistInterface {
  collaborative: boolean;
  description: string;
  external_urls: object;
  href: string;
  id: string;
  images: Array<ImageInterface>;
  name: string;
  owner: object;
  primary_color: any;
  public: boolean;
  snapshot_id: string;
  tracks: PlayListTracksInterface;
  type: string;
  uri: string;
}

export interface SpotifyTrackInterface {
  album: {
    images: [{ url: string }];
    artists: [{ name: string }];
  };
  uri: string;
  duration_ms: number;
  name: string;
}

export interface SynxUsersInterface {
  admin: boolean;
  id: string;
  name: string;
  room: string;
  spotify_id: string;
  spotify_image: string;
  spotify_uri: string;
}

export interface UsersState {
  loading: boolean;
  users_errors: Array<ErrorInterface> | [];
  users: Array<SynxUsersInterface> | [];
}

export interface AdminState {
  loading: boolean;
  admin_errors: Array<ErrorInterface> | [];
}

export interface RewardState {
  reward_loading: boolean;
}
