import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Linking,
  ActivityIndicator
} from "react-native";

import { QRCode } from "react-native-custom-qr-codes-expo";
import { Ionicons } from "@expo/vector-icons";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { ColorsHex, Colors } from "../../Constants/Colors";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../Navigator/AuthParamList";
import { Fonts, Weights } from "../../Constants/Fonts";

import SYNXApi from "../../Constants/SYNXApi";
import PlayaHeader from "../../Components/UI/Playa/PlayaHeader";
import MainButton from "../../Components/UI/Buttons/MainButton";
import SynxControls from "./components/SynxControls";
import MiniButton from "../../Components/UI/Buttons/MiniButton";

const window = Dimensions.get("window");

type Props = StackScreenProps<AuthParamList, "Playa">;

const PlayaScreen: React.FC<Props> = ({ navigation }) => {
  const { token, user_id } = useTypedSelector(state => state.user);
  // const { playlists } = useTypedSelector(state => state.playlists);
  const {
    loadingSynx,
    synx_id,
    playlist_uri,
    playlist_name,
    album_cover_url,
    host,
    host_name,
    host_uri,
    host_image_url,
    host_playing,
    first_play
  } = useTypedSelector(state => state.room);

  const { is_playing } = useTypedSelector(state => state.playback);

  const { leaveRoom, getPlayback, play, synx, getRoom } = useActions();

  const [synxLevel, setSynxLevel] = useState(5);

  useEffect(() => {
    //if is_playing changes - getRoom!
    if (token && host !== user_id) {
      if (!is_playing) {
        getRoom(token);
      }
    }
  }, [is_playing]);

  const getPlaybackHandler = () => {
    if (token) {
      getPlayback(token);
    }
  };

  useEffect(() => {
    //How you leave the room
    if (!synx_id) {
      navigation.goBack();
    }
  }, [synx_id]);

  useEffect(() => {
    if (token) {
      getPlayback(token);
    }
  }, []);

  const leaveRoomHandler = () => {
    //check if host
    if (token) {
      if (host === user_id) {
        //are you sure you want to leave the room, it will close it
        Alert.alert(
          "Close Room",
          "Are you sure you want to leave the room, it will close it for all users?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => leaveRoom(token) }
          ],
          { cancelable: true }
        );
      } else {
        //are you sure you want to leave the room
        Alert.alert(
          "Leave Room",
          "Are you sure you want to leave the room?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => leaveRoom(token) }
          ],
          { cancelable: true }
        );
      }
    }
  };

  const playHandler = () => {
    if (token) {
      play(token);
    }
  };

  const synxHandler = (num: number) => {
    if (token) {
      if (num === 3) {
        if (synxLevel < 35) {
          synx(token, synxLevel + 1);
          setSynxLevel(val => val + 1);
        }
      } else if (num === 2) {
        synx(token, synxLevel);
      } else {
        if (synxLevel > -10) {
          synx(token, synxLevel - 1);
          setSynxLevel(val => val - 1);
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center"
      }}
    >
      <View style={styles.options}>
        <PlayaHeader
          host_name={host_name}
          host_image={host_image_url}
          host_uri={host_uri}
          playlist_name={playlist_name}
          playlist_uri={playlist_uri}
          leaveRoom={leaveRoomHandler}
        />

        <QRCode
          content={SYNXApi.QR_URL + synx_id}
          color={ColorsHex.GREEN}
          codeStyle="dot"
          outerEyeStyle="square"
          innerEyeStyle="square"
          logo={{ uri: album_cover_url }}
          logoSize={60}
        />

        {is_playing ? (
          host === user_id ? (
            host_playing ? (
              <View style={styles.player}>
                <Text style={styles.hintText}>
                  You have started this playlist via SYNX and users can now SYNX
                  to your playback. Use spotify to change tracks in the play
                  queue via the spotify player. Remember not to press 'shuffle'
                  on Spotify or SYNX will no longer work.
                </Text>
                <MainButton
                  title="OPEN Spotify"
                  onPress={() => Linking.openURL("spotify:open")}
                  styleButton={{ width: "90%" }}
                  styleText={{
                    textTransform: "uppercase"
                  }}
                />
              </View>
            ) : (
              <View style={styles.player}>
                <Text style={styles.hintText}>
                  When you are ready to start your SYNX session click the play
                  button. You need to have pressed play before people can SYNX
                  to your playback.
                </Text>
                <Pressable
                  style={styles.playCircle}
                  onPress={() => playHandler()}
                >
                  <Ionicons
                    name="ios-play"
                    size={75}
                    color={`rgba(${Colors.BLACK}, .8)`}
                  />
                </Pressable>
              </View>
            )
          ) : loadingSynx ? (
            <View style={styles.player}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={styles.player}>
              <SynxControls
                synxHandler={synxHandler}
                synxLevel={synxLevel}
                firstPlay={first_play}
              />
            </View>
          )
        ) : (
          <View style={styles.synxWarningContainer}>
            <Text style={styles.synxWarningText}>
              You currently have no songs playing. In order for SYNX to locate
              your device please play any song in Spotify on the device you want
              to SYNX and then press 'OK'
            </Text>
            <View style={styles.buttonContainer}>
              <MiniButton
                onPress={() => {
                  getPlaybackHandler();
                }}
                title="OK"
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  player: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15
  },
  options: {
    marginVertical: 10,
    width: "90%",
    flex: 1,
    alignItems: "center"
  },
  hintText: {
    fontFamily: Fonts.MAIN,
    fontWeight: "500",
    color: ColorsHex.WHITE,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20
  },
  playback: {
    width: "100%"
  },
  playCircle: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: window.width * 0.2,
    backgroundColor: `rgba(${Colors.WHITE}, .7)`,
    paddingLeft: 10,
    marginVertical: 20
  },

  synxWarningContainer: {
    width: "90%",
    marginBottom: 40,
    padding: 15,
    borderWidth: 2,
    borderColor: ColorsHex.GREEN,
    backgroundColor: `rgba(${Colors.GREY_BACKGROUND}, .8)`
  },
  synxWarningText: {
    fontFamily: Fonts.MAIN,
    fontWeight: "500",
    color: ColorsHex.GREEN,
    fontSize: 18,
    textAlign: "center"
  },
  buttonContainer: {
    width: "100%",
    // alignItems: "center"
    padding: 20
  }
});

export default PlayaScreen;
