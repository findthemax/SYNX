import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
  ActivityIndicator
} from "react-native";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import SearchInput from "../../Components/UI/Input/SearchInput";
import { useActions } from "../../hooks/useActions";
import PlaylistItem from "./components/PlaylistItem";
import { ColorsHex } from "../../Constants/Colors";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../Navigator/AuthParamList";
import { Fonts, Weights } from "../../Constants/Fonts";

type Props = StackScreenProps<AuthParamList, "Host">;

// On load gets the users playlist
// On create room a room is created and added to the room state -
// handler at home screen will auto navigate to the player

const HostScreen: React.FC<Props> = () => {
  const { token } = useTypedSelector(state => state.user);
  const { loadingRoom } = useTypedSelector(state => state.room);
  const { playlists, loadingPlaylists } = useTypedSelector(
    state => state.playlists
  );

  const { getUserPlaylists, createRoom } = useActions();

  useEffect(() => {
    if (token) {
      getUserPlaylists(token);
    }
  }, []);

  const [state, setState] = useState({
    search: "",
    shuffle: false
  });

  const setSearch = (text: string) => {
    setState({ ...state, search: text });
    searchFilterFunction(text);
  };

  const setSlider = (value: boolean) => {
    setState({ ...state, shuffle: value });
  };

  const [filteredPlaylists, setFilteredPlaylists] = useState<object[] | null>(
    null
  );

  const searchFilterFunction = (text: string) => {
    if (text === "") {
      setFilteredPlaylists(null);
    } else {
      const data = playlists.filter(play => {
        const plName = play.name.toUpperCase();
        const textData = text.toUpperCase();
        return plName.indexOf(textData) > -1;
      });
      setFilteredPlaylists(data);
    }
  };

  const submitRoomHandler = (playlist_uri: string) => {
    if (token) {
      createRoom(token, {
        playlist_uri,
        shuffle: state.shuffle
      });
    }
  };

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <PlaylistItem
      image={item.images[0].url}
      name={item.name}
      displayName={item.owner.display_name}
      onPress={() => {
        submitRoomHandler(item.uri);
      }}
    />
  );

  if (loadingRoom) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View>
          <Text style={styles.text}>Creating Room</Text>
        </View>

        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center"
      }}
    >
      <View style={styles.options}>
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Shuffle</Text>
          <View style={styles.switchBox}>
            <Text style={styles.switchBoxText}>Off</Text>
            <Switch
              trackColor={{ false: ColorsHex.GREY_FORM, true: ColorsHex.GREEN }}
              value={state.shuffle}
              onValueChange={setSlider}
            />
            <Text style={styles.switchBoxText}>On</Text>
          </View>
          <Text style={styles.infoText}>
            Please note: make sure that shuffle is off on your Spotify player or
            SYNX will not work
          </Text>
        </View>
      </View>
      <View style={{ ...styles.options, flex: 1 }}>
        <Text style={styles.text}>Playlist</Text>
        <SearchInput
          title="Find in playlists"
          value={state.search}
          valueUpdate={setSearch}
          style={{ paddingBottom: 20 }}
        />

        {loadingPlaylists ? (
          <ActivityIndicator />
        ) : playlists.length > 0 ? (
          filteredPlaylists ? (
            filteredPlaylists.length > 0 ? (
              <FlatList
                style={{ width: "100%" }}
                data={filteredPlaylists}
                renderItem={renderItem}
              />
            ) : (
              <Text style={{ color: ColorsHex.WHITE }}>
                The playlist you searched for can't be found. Make sure that any
                playlist you want to access is made public on spotify. By
                default any playlist you make or follow is kept private until
                you make it public for your account.
              </Text>
            )
          ) : (
            <FlatList
              style={{ width: "100%" }}
              data={playlists}
              renderItem={renderItem}
            />
          )
        ) : (
          <Text style={{ color: ColorsHex.WHITE }}>
            You have no playlists or your playlists are private - please switch
            to Spotify and make your spotify playlist public. By default any
            playlist you make or follow is kept private until you make it public
            for your account.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  options: {
    marginVertical: 10,
    width: "90%",
    alignItems: "center"
  },
  text: {
    width: "100%",
    paddingBottom: 16,
    fontFamily: Fonts.MAIN,
    fontWeight: "700",
    color: ColorsHex.WHITE,
    fontSize: 22
  },
  switchBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  switchBoxText: {
    paddingHorizontal: 16,
    fontFamily: Fonts.MAIN,
    fontWeight: "500",
    color: ColorsHex.WHITE,
    fontSize: 18
  },
  infoText: {
    width: "100%",
    paddingBottom: 16,
    fontFamily: Fonts.MAIN,
    fontWeight: "200",
    color: ColorsHex.GREEN,
    fontSize: 18
  }
});

export default HostScreen;
