export type AuthParamList = {
  Home: undefined;
  Auth: undefined;
  Membership: undefined;
  Host: undefined;
  Scanner: undefined;
  Playa: undefined;
  Admin: undefined;
  Users: undefined;
  Rooms: undefined;
  UserInspector: {
    admin: boolean;
    users_id: string;
    membership: string;
    name: string;
    spotify_uri: string;
    spotify_image: string;
  };
};
