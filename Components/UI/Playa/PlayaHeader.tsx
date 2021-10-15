import React from "react";

import {
  Text,
  StyleSheet,
  Pressable,
  View,
  Linking,
  Dimensions,
  Image
} from "react-native";

import { ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";
import { FontAwesome5 } from "@expo/vector-icons";

const window = Dimensions.get("window");

export interface Props {
  host_name: string;
  host_image: string;
  host_uri: string;
  playlist_name: string;
  playlist_uri: string;
  leaveRoom: () => void;
  styleButton?: object;
  styleText?: object;
}

const PlayaHeader: React.FC<Props> = ({
  host_name,
  host_image,
  host_uri,
  playlist_name,
  playlist_uri,
  leaveRoom
}) => {
  return (
    <View style={styles.header}>
      <Pressable
        style={{ ...styles.button, ...{ left: 0 } }}
        onPress={leaveRoom}
      >
        <FontAwesome5 name="chevron-left" size={32} color="white" />
      </Pressable>
      <View style={styles.headerText}>
        <Text style={styles.roomTitle}>{host_name}</Text>
        <Pressable onPress={() => Linking.openURL("spotify:open")}>
          <Text style={styles.playlistTitle}>{playlist_name}</Text>
        </Pressable>
      </View>
      {host_image !== "null" && (
        <Pressable
          style={{ ...styles.button, ...{ right: 0 } }}
          onPress={() => Linking.openURL(host_uri)}
        >
          <Image
            style={styles.hostImage}
            source={{
              uri: host_image
            }}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: window.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  headerText: {
    width: window.width * 0.7,
    paddingHorizontal: 5
  },
  roomTitle: {
    fontFamily: Fonts.REGULAR,
    color: ColorsHex.WHITE,
    fontSize: 24,
    textAlign: "center"
  },
  playlistTitle: {
    fontFamily: Fonts.THIN,
    color: ColorsHex.GREEN,
    fontSize: 24,
    textAlign: "center"
  },
  button: {
    position: "absolute",
    zIndex: 100,
    width: window.width * 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  hostImage: {
    width: window.width * 0.1,
    height: window.width * 0.1
  }
});

export default PlayaHeader;
